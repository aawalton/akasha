import { parsedAs } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

export type Spelt = {
  readonly name: string
  readonly rule: string
  readonly exported: boolean
  readonly forwards: boolean
  readonly literal: boolean
}

const SAYING: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.BigIntLiteral,
  ts.SyntaxKind.RegularExpressionLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TaggedTemplateExpression,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.ObjectLiteralExpression,
  ts.SyntaxKind.ArrayLiteralExpression,
  ts.SyntaxKind.BinaryExpression,
  ts.SyntaxKind.PrefixUnaryExpression,
  ts.SyntaxKind.PostfixUnaryExpression,
  ts.SyntaxKind.ConditionalExpression,
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.SwitchStatement,
  ts.SyntaxKind.TryStatement,
])

const ONLY: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.BigIntLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.NullKeyword,
])

const DECLARED = "function"

const ARROW = "=>"

function naming(name: ts.BindingName, take: (one: string) => undefined): undefined {
  if (ts.isIdentifier(name)) {
    take(name.text)
    return
  }
  const object = ts.isObjectBindingPattern(name)
  for (const one of name.elements) {
    if (!ts.isBindingElement(one)) continue
    if (object && one.propertyName === undefined && one.dotDotDotToken === undefined) continue
    naming(one.name, take)
  }
}

function bound(fn: ts.FunctionLikeDeclaration): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const take = (name: string): undefined => {
    if (!found.has(name)) found.set(name, `$${found.size}`)
  }
  for (const one of fn.parameters) naming(one.name, take)
  const walk = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node)) naming(node.name, take)
    if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      for (const one of node.parameters) naming(one.name, take)
    }
    ts.forEachChild(node, walk)
  }
  if (fn.body !== undefined) walk(fn.body)
  return found
}

function ruleOf(fn: ts.FunctionLikeDeclaration, source: ts.SourceFile): string | null {
  if (fn.body === undefined) return null
  const names = bound(fn)
  const said: string[] = []
  const emit = (node: ts.Node): undefined => {
    const kids = node.getChildren(source)
    if (kids.length > 0) {
      for (const kid of kids) emit(kid)
      return
    }
    const text = node.getText(source)
    if (text === "") return
    said.push(ts.isIdentifier(node) ? (names.get(node.text) ?? text) : text)
  }
  for (const one of fn.parameters) emit(one)
  if (fn.type !== undefined && ts.isTypePredicateNode(fn.type)) {
    said.push(":")
    emit(fn.type)
  }
  said.push("=>")
  emit(fn.body)
  return said.join(" ")
}

function forwarding(fn: ts.FunctionLikeDeclaration): boolean {
  if (fn.body === undefined) return false
  let only = true
  const walk = (node: ts.Node): undefined => {
    if (SAYING.has(node.kind)) only = false
    ts.forEachChild(node, walk)
  }
  walk(fn.body)
  return only
}

function keyed(name: ts.PropertyName): boolean {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)
}

function onlyLiteral(node: ts.Node): boolean {
  if (ts.isParenthesizedExpression(node)) return onlyLiteral(node.expression)
  if (ONLY.has(node.kind)) return true
  if (ts.isArrayLiteralExpression(node)) return node.elements.every((one) => onlyLiteral(one))
  if (ts.isObjectLiteralExpression(node)) {
    return node.properties.every(
      (one) => ts.isPropertyAssignment(one) && keyed(one.name) && onlyLiteral(one.initializer)
    )
  }
  return false
}

function answered(body: ts.Node): ts.Node | null {
  if (!ts.isBlock(body)) return body
  const [one] = body.statements
  if (body.statements.length !== 1 || one === undefined) return null
  if (!ts.isReturnStatement(one)) return null
  return one.expression ?? null
}

function literalBody(fn: ts.FunctionLikeDeclaration): boolean {
  if (fn.body === undefined) return false
  const said = answered(fn.body)
  return said !== null && onlyLiteral(said)
}

function exported(node: ts.Node): boolean {
  const held = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  if (held?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true) return true
  const up = node.parent
  if (up !== undefined && ts.isVariableDeclarationList(up) && up.parent !== undefined) {
    return exported(up.parent)
  }
  return false
}

export function speltIn(path: string, text: string): readonly Spelt[] {
  if (!text.includes(DECLARED) && !text.includes(ARROW)) return []
  const source = parsedAs(path, text)
  const found: Spelt[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      const rule = ruleOf(node, source)
      if (rule !== null) {
        found.push({
          name: node.name.text,
          rule,
          exported: exported(node),
          forwards: forwarding(node),
          literal: literalBody(node),
        })
      }
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    ) {
      const rule = ruleOf(node.initializer, source)
      if (rule !== null) {
        found.push({
          name: node.name.text,
          rule,
          exported: exported(node),
          forwards: forwarding(node.initializer),
          literal: literalBody(node.initializer),
        })
      }
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
  return found
}
