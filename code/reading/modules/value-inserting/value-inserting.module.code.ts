import {
  literalOf,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

type Placing = "first" | "last"

type Found = { readonly source: ts.SourceFile; readonly literal: ts.ObjectLiteralExpression }

function firstLiteral(path: string, text: string): Found | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const held = declared.initializer
      if (held === undefined) continue
      const literal = literalOf(held)
      if (literal !== null) return { source, literal }
    }
  }
  return null
}

export function insertedInto(
  path: string,
  text: string,
  key: string,
  said: string,
  placing: Placing = "first"
): string | null {
  const found = firstLiteral(path, text)
  if (found === null) return null
  const { source, literal } = found
  const last = literal.properties.at(-1)
  if (placing === "last" && last !== undefined) {
    const at = last.getEnd()
    return `${text.slice(0, at)}, ${key}: ${said}${text.slice(at)}`
  }
  const first = literal.properties[0]
  const at = first === undefined ? literal.getStart(source) + 1 : first.getStart(source)
  return `${text.slice(0, at)}${key}: ${said}, ${text.slice(at)}`
}

function keyOf(one: ts.ObjectLiteralElementLike): string | null {
  if (!ts.isPropertyAssignment(one)) return null
  const name = one.name
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text
  return null
}

export function replacedIn(path: string, text: string, key: string, said: string): string | null {
  const found = firstLiteral(path, text)
  if (found === null) return null
  for (const one of found.literal.properties) {
    if (keyOf(one) !== key || !ts.isPropertyAssignment(one)) continue
    const held = one.initializer
    return `${text.slice(0, held.getStart(found.source))}${said}${text.slice(held.getEnd())}`
  }
  return null
}
