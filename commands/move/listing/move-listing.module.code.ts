import { literalOf, parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import { splicedIn } from "../../refactor/type-renaming/type-renaming.module.code.ts"

export const PART_SLUGS = "partSlugs"

type Item = { readonly text: string; readonly start: number; readonly end: number }

type Listing = { readonly open: number; readonly items: readonly Item[] }

function keyOf(one: ts.ObjectLiteralElementLike): string | null {
  if (!ts.isPropertyAssignment(one)) return null
  return ts.isIdentifier(one.name) || ts.isStringLiteral(one.name) ? one.name.text : null
}

function listedIn(source: ts.SourceFile, array: ts.ArrayLiteralExpression): Listing | null {
  const items: Item[] = []
  for (const element of array.elements) {
    if (!ts.isStringLiteral(element)) return null
    items.push({ text: element.text, start: element.getStart(source), end: element.getEnd() })
  }
  return { open: array.getStart(source) + 1, items }
}

function listingIn(path: string, text: string): Listing | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const held = literalOf(one.initializer)
      if (held === null) continue
      for (const property of held.properties) {
        if (keyOf(property) !== PART_SLUGS || !ts.isPropertyAssignment(property)) continue
        const array = property.initializer
        return ts.isArrayLiteralExpression(array) ? listedIn(source, array) : null
      }
      return null
    }
  }
  return null
}

function blank(said: string | undefined): boolean {
  return said === " " || said === "\t"
}

function lineOpen(text: string, at: number): number {
  let start = at
  while (start > 0 && text[start - 1] !== "\n") start -= 1
  return start
}

function indentAt(text: string, at: number): string | null {
  const said = text.slice(lineOpen(text, at), at)
  return said.trim() === "" ? said : null
}

export function withoutPart(path: string, text: string, named: readonly string[]): string | null {
  const listing = listingIn(path, text)
  if (listing === null) return null
  const item = listing.items.find((one) => named.includes(one.text))
  if (item === undefined) return null
  let end = item.end
  while (blank(text[end])) end += 1
  const comma = text[end] === ","
  if (comma) end += 1
  let start = item.start
  if (comma) {
    while (blank(text[end])) end += 1
  } else {
    let back = item.start
    while (back > 0 && blank(text[back - 1])) back -= 1
    if (text[back - 1] === ",") start = back - 1
  }
  const open = lineOpen(text, start)
  if (open > 0 && indentAt(text, start) !== null) start = open - 1
  return splicedIn(text, [[{ start, end }, ""]])
}

function spliced(text: string, at: number, said: string): string {
  return splicedIn(text, [[{ start: at, end: at }, said]])
}

function afterLast(text: string, last: Item, said: string): string {
  const indent = indentAt(text, last.start)
  if (indent === null) return spliced(text, last.end, `, ${said}`)
  let end = last.end
  while (blank(text[end])) end += 1
  if (text[end] === ",") end += 1
  return spliced(text, end, `\n${indent}${said},`)
}

export function withPart(path: string, text: string, address: string): string | null {
  const listing = listingIn(path, text)
  if (listing === null) return null
  if (listing.items.some((one) => one.text === address)) return text
  const said = JSON.stringify(address)
  const after = listing.items.find((one) => one.text > address)
  if (after !== undefined) {
    const indent = indentAt(text, after.start)
    if (indent === null) return spliced(text, after.start, `${said}, `)
    return spliced(text, lineOpen(text, after.start), `${indent}${said},\n`)
  }
  const last = listing.items[listing.items.length - 1]
  if (last !== undefined) return afterLast(text, last, said)
  const outer = indentAt(text, lineOpen(text, listing.open)) ?? ""
  return spliced(text, listing.open, `\n${outer}  ${said},\n${outer}`)
}
