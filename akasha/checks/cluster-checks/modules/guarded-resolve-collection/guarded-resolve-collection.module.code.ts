import ts from "typescript"
import {
  calleeName,
  type PathBindings,
  resolvePathExpr,
  type ScopeInfo,
  stringLiteralText,
} from "../guarded-resolve-scope/guarded-resolve-scope.module.code.ts"

export type CollectionSense = "true-on-absence" | "true-on-presence"

export interface CollectionExistsBinding {
  readonly rels: readonly string[]
  readonly sense: CollectionSense
  readonly existsCall: ts.CallExpression
  readonly arg: ts.Expression
}

function unwrapParens(expr: ts.Expression): ts.Expression {
  let e = expr
  while (ts.isParenthesizedExpression(e)) e = e.expression
  return e
}

function resolveStringList(expr: ts.Expression, scope: ScopeInfo): readonly string[] | null {
  let e = unwrapParens(expr)
  if (ts.isIdentifier(e)) {
    const init = scope.initByName.get(e.text)
    if (init === undefined) return null
    e = unwrapParens(init)
  }
  while (ts.isAsExpression(e) || ts.isSatisfiesExpression(e)) e = unwrapParens(e.expression)
  if (!ts.isArrayLiteralExpression(e)) return null
  const out: string[] = []
  for (const element of e.elements) {
    const text = stringLiteralText(element)
    if (text === null) return null
    out.push(text)
  }
  return out.length > 0 ? out : null
}

function predicateResult(fn: ts.ArrowFunction | ts.FunctionExpression): ts.Expression | null {
  const body = fn.body
  if (!ts.isBlock(body)) return body
  if (body.statements.length !== 1) return null
  const only = body.statements[0]
  if (only === undefined || !ts.isReturnStatement(only)) return null
  return only.expression ?? null
}

function readExistsResult(
  expr: ts.Expression
): { readonly call: ts.CallExpression; readonly negated: boolean } | null {
  let e = unwrapParens(expr)
  let negated = false
  if (ts.isPrefixUnaryExpression(e) && e.operator === ts.SyntaxKind.ExclamationToken) {
    negated = true
    e = unwrapParens(e.operand)
  }
  if (!ts.isCallExpression(e) || calleeName(e) !== "existsSync") return null
  return { call: e, negated }
}

function senseOf(method: string, negated: boolean): CollectionSense | null {
  if (negated && (method === "filter" || method === "some")) return "true-on-absence"
  if (!negated && method === "every") return "true-on-presence"
  return null
}

export function resolveCollectionExistsVar(params: {
  readonly name: string
  readonly sf: ts.SourceFile
  readonly fileDir: string
  readonly scope: ScopeInfo
  readonly topLevelDirs: ReadonlySet<string>
}): CollectionExistsBinding | null {
  const { name, sf, fileDir, scope, topLevelDirs } = params
  const init = scope.initByName.get(name)
  if (init === undefined || !ts.isCallExpression(init)) return null

  const callee = init.expression
  if (!ts.isPropertyAccessExpression(callee)) return null
  const method = callee.name.text
  if (method !== "filter" && method !== "some" && method !== "every") return null

  const members = resolveStringList(callee.expression, scope)
  if (members === null) return null

  const predicate = init.arguments[0]
  if (
    predicate === undefined ||
    (!ts.isArrowFunction(predicate) && !ts.isFunctionExpression(predicate))
  ) {
    return null
  }
  const parameter = predicate.parameters[0]
  if (
    predicate.parameters.length !== 1 ||
    parameter === undefined ||
    !ts.isIdentifier(parameter.name)
  ) {
    return null
  }

  const result = predicateResult(predicate)
  if (result === null) return null
  const exists = readExistsResult(result)
  if (exists === null) return null
  const sense = senseOf(method, exists.negated)
  if (sense === null) return null

  const arg = exists.call.arguments[0]
  if (arg === undefined || exists.call.arguments.length !== 1) return null

  const parameterName = parameter.name.text
  const rels: string[] = []
  for (const member of members) {
    const bindings: PathBindings = new Map([[parameterName, member]])
    const rel = resolvePathExpr(arg, sf, fileDir, scope, topLevelDirs, true, bindings)
    if (rel === null) return null
    rels.push(rel)
  }

  return { rels, sense, existsCall: exists.call, arg }
}

function numericValue(expr: ts.Expression): number | null {
  const e = unwrapParens(expr)
  if (!ts.isNumericLiteral(e)) return null
  return Number(e.text)
}

function lengthOwner(expr: ts.Expression): ts.Identifier | null {
  const e = unwrapParens(expr)
  if (!ts.isPropertyAccessExpression(e)) return null
  if (e.name.text !== "length") return null
  if (!ts.isIdentifier(e.expression)) return null
  return e.expression
}

function matchNonEmptyComparison(expr: ts.BinaryExpression): ts.Identifier | null {
  const op = expr.operatorToken.kind
  const notEqual =
    op === ts.SyntaxKind.ExclamationEqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken

  const left = lengthOwner(expr.left)
  const rightNumber = numericValue(expr.right)
  if (left !== null && rightNumber !== null) {
    if (op === ts.SyntaxKind.GreaterThanToken && rightNumber === 0) return left
    if (notEqual && rightNumber === 0) return left
    if (op === ts.SyntaxKind.GreaterThanEqualsToken && rightNumber === 1) return left
  }

  const right = lengthOwner(expr.right)
  const leftNumber = numericValue(expr.left)
  if (right !== null && leftNumber !== null) {
    if (op === ts.SyntaxKind.LessThanToken && leftNumber === 0) return right
    if (notEqual && leftNumber === 0) return right
    if (op === ts.SyntaxKind.LessThanEqualsToken && leftNumber === 1) return right
  }

  return null
}

export function collectNonEmptyIdentifiers(cond: ts.Expression): readonly ts.Identifier[] {
  const out: ts.Identifier[] = []
  function visit(expr: ts.Expression): undefined {
    const e = unwrapParens(expr)
    if (ts.isBinaryExpression(e)) {
      const op = e.operatorToken.kind
      if (op === ts.SyntaxKind.AmpersandAmpersandToken || op === ts.SyntaxKind.BarBarToken) {
        visit(e.left)
        visit(e.right)
        return
      }
      const owner = matchNonEmptyComparison(e)
      if (owner !== null) out.push(owner)
      return
    }
    if (ts.isIdentifier(e)) out.push(e)
  }
  visit(cond)
  return out
}
