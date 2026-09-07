import { literalOf } from "@akasha/code/code-source"
import ts from "typescript"

export function keyOf(held: ts.PropertyAssignment): string | null {
  const name = held.name
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
}

function exported(statement: ts.VariableStatement): boolean {
  return statement.modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true
}

export function literalIn(source: ts.SourceFile): ts.ObjectLiteralExpression | null {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const held = literalOf(one.initializer)
      if (held !== null) return held
    }
  }
  return null
}

export function boundIn(source: ts.SourceFile): string | null {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined || literalOf(one.initializer) === null) continue
      if (ts.isIdentifier(one.name)) return one.name.text
    }
  }
  return null
}

export function statedIn(source: ts.SourceFile): ReadonlyMap<string, ts.StringLiteral> {
  const held = literalIn(source)
  const found = new Map<string, ts.StringLiteral>()
  if (held === null) return found
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = keyOf(one)
    if (key === null || !ts.isStringLiteral(one.initializer)) continue
    found.set(key, one.initializer)
  }
  return found
}

export function manyIn(source: ts.SourceFile, key: string): boolean {
  const held = literalIn(source)
  if (held === null) return false
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || keyOf(one) !== key) continue
    return ts.isArrayLiteralExpression(one.initializer)
  }
  return false
}
