import { lineOf } from "@akasha/code-system/code-source"
import { basenameOf } from "@akasha/hook-system/shell-calls"
import ts from "typescript"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const DISPATCHER = "command-system/cli/cli.module.code.ts"

const DISPATCHER_AT = "akasha/command-system/cli/"

const COMMAND = "akasha"

const SHELL = "$"

const LAUNCHERS: ReadonlySet<string> = new Set([
  "spawn",
  "spawnSync",
  "exec",
  "execSync",
  "execFile",
  "execFileSync",
])

const INSTEAD =
  "call the function the command reaches instead of passing arguments through a process"

type Bound = ReadonlyMap<string, string>

function plainIn(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  return null
}

export function boundIn(source: ts.SourceFile): Bound {
  const found = new Map<string, string>()
  for (const one of source.statements) {
    if (!ts.isVariableStatement(one)) continue
    for (const declared of one.declarationList.declarations) {
      const started = declared.initializer
      if (started === undefined || !ts.isIdentifier(declared.name)) continue
      const value = plainIn(started)
      if (value !== null) found.set(declared.name.text, value)
    }
  }
  return found
}

export function spelledIn(node: ts.Node, bound: Bound): readonly string[] {
  const plain = plainIn(node)
  if (plain !== null) return [plain]
  if (ts.isIdentifier(node)) {
    const held = bound.get(node.text)
    return held === undefined ? [] : [held]
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.flatMap((one) => spelledIn(one, bound))
  }
  if (ts.isCallExpression(node)) return node.arguments.flatMap((one) => spelledIn(one, bound))
  return []
}

function launchedBy(node: ts.CallExpression): boolean {
  const called = node.expression
  if (ts.isIdentifier(called)) return LAUNCHERS.has(called.text)
  return ts.isPropertyAccessExpression(called) && LAUNCHERS.has(called.name.text)
}

export function programIn(node: ts.CallExpression, bound: Bound): readonly string[] {
  const first = node.arguments[0]
  if (first === undefined) return []
  if (ts.isArrayLiteralExpression(first)) {
    const head = first.elements[0]
    return head === undefined ? [] : spelledIn(head, bound)
  }
  return spelledIn(first, bound)
}

export function shellHeadIn(node: ts.TaggedTemplateExpression): string | null {
  const tag = node.tag
  const named = ts.isIdentifier(tag)
    ? tag.text
    : ts.isPropertyAccessExpression(tag)
      ? tag.name.text
      : null
  if (named !== SHELL) return null
  const template = node.template
  const head = ts.isNoSubstitutionTemplateLiteral(template) ? template.text : template.head.text
  const first = head.trim().split(/\s+/)[0]
  return first === undefined || first === "" ? null : first
}

export function noAkashaCommandFromCode(standing: Standing): readonly Refusal[] {
  if (standing.path.startsWith(DISPATCHER_AT)) return []
  const bound = boundIn(standing.source)
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node) && launchedBy(node)) {
      const every = node.arguments.flatMap((one) => spelledIn(one, bound))
      const dispatcher = every.find((one) => one.endsWith(DISPATCHER))
      const named = programIn(node, bound).find((one) => basenameOf(one) === COMMAND)
      const said = dispatcher ?? named
      if (said !== undefined) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this call runs \`${said}\`, and code inside akasha reaches akasha's own functions by importing them — ${INSTEAD}`,
        })
      }
    }
    if (ts.isTaggedTemplateExpression(node)) {
      const head = shellHeadIn(node)
      if (head !== null && basenameOf(head) === COMMAND) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this shell call runs \`${head}\`, and code inside akasha reaches akasha's own functions by importing them — ${INSTEAD}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
