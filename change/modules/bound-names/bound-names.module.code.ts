import { everyIn, importsIn } from "akasha/change/modules/import-lines/import-lines.module.code.ts"
import ts from "typescript"

function namesOf(name: ts.BindingName, into: Set<string>): undefined {
  if (ts.isIdentifier(name)) {
    into.add(name.text)
    return
  }
  for (const one of name.elements) {
    if (ts.isOmittedExpression(one)) continue
    namesOf(one.name, into)
  }
}

function boundUnder(node: ts.Node, into: Set<string>): undefined {
  if (ts.isParameter(node) || ts.isVariableDeclaration(node) || ts.isBindingElement(node)) {
    namesOf(node.name, into)
  }
  if (ts.isTypeParameterDeclaration(node)) into.add(node.name.text)
  if (ts.isFunctionDeclaration(node) && node.name !== undefined) into.add(node.name.text)
  return ts.forEachChild(node, (one) => boundUnder(one, into))
}

export function boundIn(declared: ts.Node): ReadonlySet<string> {
  const found = new Set<string>()
  ts.forEachChild(declared, (one) => boundUnder(one, found))
  if (!ts.isVariableStatement(declared)) return found
  for (const one of declared.declarationList.declarations) {
    if (ts.isIdentifier(one.name)) found.delete(one.name.text)
  }
  return found
}

export function thereIn(source: ts.SourceFile): ReadonlySet<string> {
  const found = new Set([...importsIn(source).keys(), ...everyIn(source).keys()])
  for (const one of source.statements) {
    if (ts.isImportDeclaration(one)) {
      const named = one.importClause?.name
      if (named !== undefined) found.add(named.text)
      continue
    }
    if (ts.isVariableStatement(one)) {
      for (const each of one.declarationList.declarations) namesOf(each.name, found)
      continue
    }
    if (ts.isFunctionDeclaration(one) || ts.isClassDeclaration(one)) {
      if (one.name !== undefined) found.add(one.name.text)
      continue
    }
    if (ts.isTypeAliasDeclaration(one) || ts.isInterfaceDeclaration(one)) found.add(one.name.text)
    if (ts.isEnumDeclaration(one)) found.add(one.name.text)
  }
  return found
}

export function shadowedIn(source: ts.SourceFile, declared: ts.Node): string | null {
  const there = thereIn(source)
  for (const name of boundIn(declared)) {
    if (there.has(name)) return name
  }
  return null
}
