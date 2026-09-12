import type {
  Given,
  Marking,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code/modules/source/code-source.module.code.ts"
import ts from "typescript"

const RUNNER_UNDER = "utils/run/"

const RUNNER_IN = "/running/"

function runnerAt(path: string): boolean {
  return path.startsWith(RUNNER_UNDER) && path.includes(RUNNER_IN)
}

const CHILD = "node:child_process"

const BUN = "Bun"

const SYNC = "spawnSync"

const CAPTURES: ReadonlySet<string> = new Set([
  "spawnSync",
  "exec",
  "execSync",
  "execFile",
  "execFileSync",
])

export const mark: Marking = (text, path) =>
  !runnerAt(path) && (text.includes(CHILD) || (text.includes(BUN) && text.includes(SYNC)))

const INSTEAD = "reach for `ran` or `said` or `bytes` or `shown` from the `running` module"

type Bound = {
  readonly named: ReadonlySet<string>
  readonly spaces: ReadonlySet<string>
}

function boundIn(source: ts.SourceFile): Bound {
  const named = new Set<string>()
  const spaces = new Set<string>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const from = one.moduleSpecifier
    if (!ts.isStringLiteral(from) || from.text !== CHILD) continue
    const bindings = one.importClause?.namedBindings
    if (bindings === undefined) continue
    if (ts.isNamespaceImport(bindings)) {
      spaces.add(bindings.name.text)
      continue
    }
    for (const element of bindings.elements) {
      const origin = element.propertyName?.text ?? element.name.text
      if (CAPTURES.has(origin)) named.add(element.name.text)
    }
  }
  return { named, spaces }
}

function capturedBy(node: ts.CallExpression, bound: Bound): string | null {
  const called = node.expression
  if (ts.isIdentifier(called)) return bound.named.has(called.text) ? called.text : null
  if (!ts.isPropertyAccessExpression(called)) return null
  const holder = called.expression
  if (!ts.isIdentifier(holder)) return null
  const reached = called.name.text
  if (holder.text === BUN && reached === SYNC) return `${BUN}.${reached}`
  if (bound.spaces.has(holder.text) && CAPTURES.has(reached)) return `${holder.text}.${reached}`
  return null
}

export function noRunOutsideTheRunner(standing: Given): readonly Refusal[] {
  if (runnerAt(standing.path)) return []
  const bound = boundIn(standing.source)
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const said = capturedBy(node, bound)
      if (said !== null) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this call runs a process to its end through \`${said}\`, and one module starts every process akasha runs — ${INSTEAD}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
