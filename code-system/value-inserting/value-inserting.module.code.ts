import ts from "typescript"
import { literalOf, parsedAs } from "../code-source/code-source.module.code.ts"

export function insertedInto(path: string, text: string, key: string, said: string): string | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const held = declared.initializer
      if (held === undefined) continue
      const literal = literalOf(held)
      if (literal === null) continue
      const first = literal.properties[0]
      const at = first === undefined ? literal.getStart(source) + 1 : first.getStart(source)
      return `${text.slice(0, at)}${key}: ${said}, ${text.slice(at)}`
    }
  }
  return null
}
