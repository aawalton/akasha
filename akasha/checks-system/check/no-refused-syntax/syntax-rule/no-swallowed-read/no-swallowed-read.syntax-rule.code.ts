import ts from "typescript"
import { lineOf } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const WALKED: ReadonlySet<string> = new Set(["Change", "Judging", "Judged"])

const READS: ReadonlySet<string> = new Set([
  "readFileSync",
  "readFile",
  "readlinkSync",
  "readlink",
  "readdirSync",
  "readdir",
  "statSync",
  "stat",
  "lstatSync",
  "lstat",
  "accessSync",
  "access",
  "decode",
])

const COUNTED =
  "the path stays among those judged with nothing said against it, so a body nobody could read rounds up to clean"

function walksAChange(source: ts.SourceFile): boolean {
  return source.statements.some((one) => {
    if (!ts.isImportDeclaration(one)) return false
    const bound = one.importClause?.namedBindings
    if (bound === undefined || !ts.isNamedImports(bound)) return false
    return bound.elements.some((each) => WALKED.has(each.name.text))
  })
}

function calledAs(call: ts.CallExpression): string | undefined {
  const target = call.expression
  if (ts.isIdentifier(target)) return target.text
  if (ts.isPropertyAccessExpression(target)) return target.name.text
  return undefined
}

function isBunFile(call: ts.CallExpression): boolean {
  const target = call.expression
  if (!ts.isPropertyAccessExpression(target)) return false
  return (
    ts.isIdentifier(target.expression) &&
    target.expression.text === "Bun" &&
    target.name.text === "file"
  )
}

function holdsOne(root: ts.Node, matching: (node: ts.Node) => boolean): boolean {
  let found = false
  const visit = (node: ts.Node): undefined => {
    if (found) return undefined
    if (matching(node)) {
      found = true
      return undefined
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(root)
  return found
}

function namedFunctionIn(
  node: ts.Node
): { readonly name: string; readonly body: ts.Node } | undefined {
  if (ts.isFunctionDeclaration(node) && node.name !== undefined && node.body !== undefined) {
    return { name: node.name.text, body: node.body }
  }
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer !== undefined
  ) {
    const held = node.initializer
    if (ts.isArrowFunction(held) || ts.isFunctionExpression(held)) {
      return { name: node.name.text, body: held.body }
    }
  }
  return undefined
}

function requiringIn(source: ts.SourceFile): ReadonlySet<string> {
  const named = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const held = node.initializer
      if (
        held !== undefined &&
        ts.isCallExpression(held) &&
        ts.isIdentifier(held.expression) &&
        held.expression.text === "createRequire"
      ) {
        named.add(node.name.text)
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(source, visit)
  return named
}

function readingWith(requiring: ReadonlySet<string>): (node: ts.Node) => boolean {
  return (node) => {
    if (ts.isNewExpression(node)) {
      return ts.isIdentifier(node.expression) && node.expression.text === "TextDecoder"
    }
    if (!ts.isCallExpression(node)) return false
    if (isBunFile(node)) return true
    const name = calledAs(node)
    return name !== undefined && (READS.has(name) || requiring.has(name))
  }
}

function readersIn(source: ts.SourceFile, reads: (node: ts.Node) => boolean): ReadonlySet<string> {
  const named = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    const held = namedFunctionIn(node)
    if (held !== undefined && holdsOne(held.body, reads)) named.add(held.name)
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(source, visit)
  return named
}

function neverIn(source: ts.SourceFile): ReadonlySet<string> {
  const named = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    const held = namedFunctionIn(node)
    if (held !== undefined) {
      const said = ts.isFunctionDeclaration(node)
        ? node.type
        : ts.isVariableDeclaration(node) &&
            node.initializer !== undefined &&
            ts.isFunctionLike(node.initializer)
          ? node.initializer.type
          : undefined
      if (said?.kind === ts.SyntaxKind.NeverKeyword) named.add(held.name)
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(source, visit)
  return named
}

function endsTheRun(one: ts.Statement, never: ReadonlySet<string>): boolean {
  if (ts.isThrowStatement(one)) return true
  const said = ts.isExpressionStatement(one)
    ? one.expression
    : ts.isReturnStatement(one)
      ? one.expression
      : undefined
  if (said === undefined || !ts.isCallExpression(said)) return false
  const target = said.expression
  if (ts.isIdentifier(target)) return never.has(target.text)
  if (ts.isPropertyAccessExpression(target)) {
    return (
      ts.isIdentifier(target.expression) &&
      target.expression.text === "process" &&
      target.name.text === "exit"
    )
  }
  return false
}

function resumesTheWalk(block: ts.Block): string | undefined {
  let said: string | undefined
  const visit = (node: ts.Node): undefined => {
    if (said !== undefined) return undefined
    if (ts.isContinueStatement(node)) {
      said = "continue"
      return undefined
    }
    if (ts.isBreakStatement(node)) {
      said = "break"
      return undefined
    }
    if (
      ts.isIterationStatement(node, false) ||
      ts.isSwitchStatement(node) ||
      ts.isFunctionLike(node)
    ) {
      return undefined
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(block, visit)
  return said
}

export function noSwallowedRead(standing: Standing): readonly Refusal[] {
  const source = standing.source
  if (!walksAChange(source)) return []
  const reads = readingWith(requiringIn(source))
  const readers = readersIn(source, reads)
  const never = neverIn(source)
  const touched = (node: ts.Node): boolean => {
    if (reads(node)) return true
    if (!ts.isCallExpression(node)) return false
    const name = calledAs(node)
    return name !== undefined && readers.has(name)
  }
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    const caught = ts.isTryStatement(node) ? node.catchClause : undefined
    if (caught !== undefined && ts.isTryStatement(node) && holdsOne(node.tryBlock, touched)) {
      const resumed = resumesTheWalk(caught.block)
      const said =
        resumed !== undefined
          ? `this catch resumes the walk with \`${resumed}\``
          : caught.block.statements.some((one) => endsTheRun(one, never))
            ? undefined
            : "this catch neither throws nor ends the run"
      if (said !== undefined) {
        found.push({
          line: lineOf(source, caught),
          reason: `${said}, and the try above it read a body — ${COUNTED}`,
        })
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(source, visit)
  return found
}
