import { scoping } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type Bound = {
  readonly scope: ts.Node
  readonly declared: ts.Node
}

function scopeAbove(node: ts.Node): ts.Node {
  let held: ts.Node | undefined = node.parent
  while (held !== undefined && !scoping(held)) held = held.parent
  return held ?? node.getSourceFile()
}

function namesOf(name: ts.BindingName, into: Map<string, ts.Node>): undefined {
  if (ts.isIdentifier(name)) {
    into.set(name.text, name)
    return
  }
  for (const one of name.elements) {
    if (ts.isOmittedExpression(one)) continue
    namesOf(one.name, into)
  }
}

export function declaredIn(scope: ts.Node): ReadonlyMap<string, ts.Node> {
  const found = new Map<string, ts.Node>()
  if (ts.isFunctionLike(scope)) for (const one of scope.parameters) namesOf(one.name, found)
  if (ts.isCatchClause(scope) && scope.variableDeclaration !== undefined) {
    namesOf(scope.variableDeclaration.name, found)
  }
  const walk = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node)) namesOf(node.name, found)
    else if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      found.set(node.name.text, node.name)
    } else if (ts.isClassDeclaration(node) && node.name !== undefined) {
      found.set(node.name.text, node.name)
    } else if (ts.isImportSpecifier(node) || ts.isNamespaceImport(node)) {
      found.set(node.name.text, node.name)
    } else if (ts.isImportClause(node) && node.name !== undefined) {
      found.set(node.name.text, node.name)
    }
    if (node !== scope && scoping(node)) return
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(scope, walk)
  return found
}

export function referencing(node: ts.Identifier): boolean {
  const up = node.parent
  if (up === undefined) return false
  if (ts.isPropertyAccessExpression(up)) return up.name !== node
  if (ts.isQualifiedName(up)) return up.right !== node
  if (ts.isPropertyAssignment(up)) return up.name !== node
  if (ts.isBindingElement(up)) return up.propertyName !== node
  if (ts.isImportSpecifier(up) || ts.isExportSpecifier(up)) return false
  if (ts.isMethodDeclaration(up) || ts.isPropertyDeclaration(up)) return up.name !== node
  if (ts.isPropertySignature(up) || ts.isMethodSignature(up)) return up.name !== node
  return true
}

export function identifiersIn(node: ts.Node): readonly ts.Identifier[] {
  const found: ts.Identifier[] = []
  const walk = (one: ts.Node): undefined => {
    if (ts.isIdentifier(one)) found.push(one)
    ts.forEachChild(one, walk)
  }
  walk(node)
  return found
}

export function bindingOf(named: ts.Identifier): Bound | null {
  let scope: ts.Node = scopeAbove(named)
  for (;;) {
    const declared = declaredIn(scope).get(named.text)
    if (declared !== undefined) return { scope, declared }
    if (ts.isSourceFile(scope)) return null
    scope = scopeAbove(scope)
  }
}
