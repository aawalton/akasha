import ts from "typescript"
import { parsedAs } from "../code-source/code-source.module.code.ts"

export type Spelt = {
  readonly name: string
  readonly rule: string
  readonly exported: boolean
  readonly forwards: boolean
}

const SAYING: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.BigIntLiteral,
  ts.SyntaxKind.RegularExpressionLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateExpression,
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

function bound(fn: ts.FunctionLikeDeclaration): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const take = (name: string): undefined => {
    if (!found.has(name)) found.set(name, `$${found.size}`)
  }
  for (const one of fn.parameters) if (ts.isIdentifier(one.name)) take(one.name.text)
  const walk = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) take(node.name.text)
    if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      for (const one of node.parameters) if (ts.isIdentifier(one.name)) take(one.name.text)
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
        })
      }
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
  return found
}
