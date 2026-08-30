import ts from "typescript"
import { parsedAs } from "../code-source/code-source.module.code.ts"

export type Spelt = {
  readonly name: string
  readonly rule: string
  readonly exported: boolean
}

function bound(fn: ts.FunctionLikeDeclaration): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const take = (name: string): void => {
    if (!found.has(name)) found.set(name, `$${found.size}`)
  }
  for (const one of fn.parameters) if (ts.isIdentifier(one.name)) take(one.name.text)
  const walk = (node: ts.Node): void => {
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
  const emit = (node: ts.Node): void => {
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
  const walk = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      const rule = ruleOf(node, source)
      if (rule !== null) found.push({ name: node.name.text, rule, exported: exported(node) })
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    ) {
      const rule = ruleOf(node.initializer, source)
      if (rule !== null) found.push({ name: node.name.text, rule, exported: exported(node) })
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
  return found
}
