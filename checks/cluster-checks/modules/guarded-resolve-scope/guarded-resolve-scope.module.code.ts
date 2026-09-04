import { posix } from "node:path"
import ts from "typescript"
import { classifyPath, homePrefixOf } from "../repo-path-resolver/repo-path-resolver.module.code.ts"

export function scriptKindFor(filePath: string): ts.ScriptKind {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX
  if (filePath.endsWith(".mjs") || filePath.endsWith(".cjs") || filePath.endsWith(".js")) {
    return ts.ScriptKind.JS
  }
  return ts.ScriptKind.TS
}

export function exprText(node: ts.Node, sf: ts.SourceFile): string {
  return sf.text.slice(node.getStart(sf), node.getEnd()).trim()
}

export function calleeName(call: ts.CallExpression): string | null {
  const callee = call.expression
  if (ts.isIdentifier(callee)) return callee.text
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text
  return null
}

export interface ScopeInfo {
  readonly initByName: ReadonlyMap<string, ts.Expression>
}

export function collectScope(sf: ts.SourceFile): ScopeInfo {
  const declCount = new Map<string, number>()
  const firstInit = new Map<string, ts.Expression>()
  const reassigned = new Set<string>()

  function visit(node: ts.Node): undefined {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const name = node.name.text
      declCount.set(name, (declCount.get(name) ?? 0) + 1)
      if (node.initializer !== undefined && !firstInit.has(name)) {
        firstInit.set(name, node.initializer)
      }
    }
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
      node.operatorToken.kind <= ts.SyntaxKind.LastAssignment &&
      ts.isIdentifier(node.left)
    ) {
      reassigned.add(node.left.text)
    }
    if (
      (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) &&
      (node.operator === ts.SyntaxKind.PlusPlusToken ||
        node.operator === ts.SyntaxKind.MinusMinusToken) &&
      ts.isIdentifier(node.operand)
    ) {
      reassigned.add(node.operand.text)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sf, visit)

  const initByName = new Map<string, ts.Expression>()
  for (const [name, init] of firstInit) {
    if (declCount.get(name) === 1 && !reassigned.has(name)) initByName.set(name, init)
  }
  return { initByName }
}

function literalToRepoRel(text: string, topLevelDirs: ReadonlySet<string>): string | null {
  const kind = classifyPath(text, topLevelDirs)
  if (kind === "repo-rooted") return posix.normalize(text)
  if (kind === "home-anchored") {
    const prefix = homePrefixOf(text)
    if (prefix !== null) return posix.normalize(text.slice(prefix.length))
  }
  return null
}

function isDirAnchor(node: ts.Node, sf: ts.SourceFile): boolean {
  const t = exprText(node, sf)
  return t === "import.meta.dir" || t === "__dirname"
}

function isResolveOrJoin(call: ts.CallExpression): boolean {
  const callee = call.expression
  const name = ts.isIdentifier(callee)
    ? callee.text
    : ts.isPropertyAccessExpression(callee)
      ? callee.name.text
      : null
  return name === "resolve" || name === "join"
}

export function stringLiteralText(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  return null
}

export type PathBindings = ReadonlyMap<string, string>

const NO_BINDINGS: PathBindings = new Map<string, string>()

function resolveJoinToRepoRel(
  call: ts.CallExpression,
  sf: ts.SourceFile,
  fileDir: string,
  scope: ScopeInfo,
  topLevelDirs: ReadonlySet<string>,
  allowVarHop: boolean,
  bindings: PathBindings
): string | null {
  const args = call.arguments
  const first = args[0]
  if (first === undefined) return null

  let base: string
  const firstLiteral = stringLiteralText(first)
  if (isDirAnchor(first, sf)) {
    base = fileDir
  } else if (firstLiteral !== null) {
    const rel = literalToRepoRel(firstLiteral, topLevelDirs)
    if (rel === null) return null
    base = rel
  } else if (allowVarHop && ts.isIdentifier(first)) {
    const init = scope.initByName.get(first.text)
    if (init === undefined) return null
    const rel = resolvePathExpr(init, sf, fileDir, scope, topLevelDirs, false, bindings)
    if (rel === null) return null
    base = rel
  } else {
    return null
  }

  const segments: string[] = []
  for (let i = 1; i < args.length; i++) {
    const seg = args[i]
    if (seg === undefined) return null
    const literal = stringLiteralText(seg)
    if (literal !== null) {
      segments.push(literal)
      continue
    }
    if (ts.isIdentifier(seg)) {
      const bound = bindings.get(seg.text)
      if (bound === undefined) return null
      segments.push(bound)
      continue
    }
    return null
  }

  const joined = posix.normalize(posix.join(base, ...segments))
  if (joined.startsWith("..") || joined.startsWith("/")) return null
  return joined
}

export function resolvePathExpr(
  expr: ts.Expression,
  sf: ts.SourceFile,
  fileDir: string,
  scope: ScopeInfo,
  topLevelDirs: ReadonlySet<string>,
  allowVarHop: boolean,
  bindings: PathBindings = NO_BINDINGS
): string | null {
  if (ts.isIdentifier(expr)) {
    const bound = bindings.get(expr.text)
    if (bound !== undefined) return literalToRepoRel(bound, topLevelDirs)
    if (!allowVarHop) return null
    const init = scope.initByName.get(expr.text)
    if (init === undefined) return null
    return resolvePathExpr(init, sf, fileDir, scope, topLevelDirs, false, bindings)
  }
  const literal = stringLiteralText(expr)
  if (literal !== null) return literalToRepoRel(literal, topLevelDirs)
  if (ts.isCallExpression(expr) && isResolveOrJoin(expr)) {
    return resolveJoinToRepoRel(expr, sf, fileDir, scope, topLevelDirs, allowVarHop, bindings)
  }
  return null
}

export function isSkipShaped(stmt: ts.Statement): boolean {
  let hasSkip = false
  let hasFailLoud = false

  function visit(node: ts.Node): undefined {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node)
    ) {
      return
    }
    if (ts.isReturnStatement(node) || ts.isContinueStatement(node)) hasSkip = true
    if (ts.isThrowStatement(node)) hasFailLoud = true
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const obj = node.expression.expression
      const member = node.expression.name.text
      if (ts.isIdentifier(obj)) {
        if (obj.text === "process" && member === "exit") hasFailLoud = true
        if (obj.text === "console" && member === "error") hasFailLoud = true
        if (
          obj.text === "console" &&
          (member === "log" || member === "warn" || member === "info")
        ) {
          hasSkip = true
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(stmt)
  return hasSkip && !hasFailLoud
}

export function collectNegatedIdentifiers(cond: ts.Expression): readonly ts.Identifier[] {
  const out: ts.Identifier[] = []
  function visit(node: ts.Node): undefined {
    if (
      ts.isPrefixUnaryExpression(node) &&
      node.operator === ts.SyntaxKind.ExclamationToken &&
      ts.isIdentifier(node.operand)
    ) {
      out.push(node.operand)
    }
    ts.forEachChild(node, visit)
  }
  visit(cond)
  return out
}

export function isSkipGate(call: ts.CallExpression): boolean {
  const callee = call.expression
  return (
    ts.isPropertyAccessExpression(callee) &&
    (callee.name.text === "skipIf" || callee.name.text === "skip")
  )
}
