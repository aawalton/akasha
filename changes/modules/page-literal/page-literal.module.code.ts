import { exported, literalOf } from "akasha/code/source/code-source.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import ts from "typescript"

const BARE = /^[A-Za-z_$][A-Za-z0-9_$]*$/

export function spelledBare(text: string): boolean {
  return BARE.test(text)
}

export function keyFaultIn(key: string): string | null {
  if (spelledBare(key)) return null
  const spelled = exportedAs(key)
  if (!spelledBare(spelled)) return `\`${key}\` is no key a page spells`
  return `\`${key}\` is no key a page spells, and \`${spelled}\` is the key that spelling names`
}

export function keyOf(held: ts.PropertyAssignment): string | null {
  const name = held.name
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
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

export function textsOf(held: ts.ObjectLiteralExpression): ReadonlyMap<string, ts.StringLiteral> {
  const found = new Map<string, ts.StringLiteral>()
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = keyOf(one)
    if (key === null || !ts.isStringLiteral(one.initializer)) continue
    found.set(key, one.initializer)
  }
  return found
}

export function statedIn(source: ts.SourceFile): ReadonlyMap<string, ts.StringLiteral> {
  const held = literalIn(source)
  return held === null ? new Map() : textsOf(held)
}

function initializerAt(source: ts.SourceFile, key: string): ts.Expression | null {
  const held = literalIn(source)
  if (held === null) return null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || keyOf(one) !== key) continue
    return one.initializer
  }
  return null
}

export function manyIn(source: ts.SourceFile, key: string): boolean {
  const held = initializerAt(source, key)
  return held !== null && ts.isArrayLiteralExpression(held)
}

export function listIn(source: ts.SourceFile, key: string): ts.ArrayLiteralExpression | null {
  const held = initializerAt(source, key)
  return held !== null && ts.isArrayLiteralExpression(held) ? held : null
}

export function recordsIn(list: ts.ArrayLiteralExpression): readonly ts.ObjectLiteralExpression[] {
  return list.elements.filter(ts.isObjectLiteralExpression)
}

export function valuesIn(
  source: ts.SourceFile,
  key: string
): readonly ts.ObjectLiteralExpression[] {
  const held = listIn(source, key)
  return held === null ? [] : recordsIn(held)
}

export function matchingIn(
  list: ts.ArrayLiteralExpression,
  where: string,
  is: string
): readonly number[] {
  const found: number[] = []
  list.elements.forEach((each, at) => {
    if (ts.isObjectLiteralExpression(each) && textsOf(each).get(where)?.text === is) found.push(at)
  })
  return found
}
