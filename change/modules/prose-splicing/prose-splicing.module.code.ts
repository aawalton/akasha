import {
  refusing,
  type Said,
  type Splice,
  spliced,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  listIn,
  matchingIn,
  recordsIn,
  statedIn,
  textsOf,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type Restating = {
  readonly key: string
  readonly under: readonly string[]
  readonly was: string
  readonly now: string
}

function spotAt(source: ts.SourceFile, held: ts.StringLiteral, now: string): Splice {
  return { from: held.getStart(source), to: held.getEnd(), put: JSON.stringify(now) }
}

function underKey(path: string, source: ts.SourceFile, one: Restating): Splice | string {
  const held = statedIn(source).get(one.key)
  if (held === undefined) return `\`${path}\` states no text under \`${one.key}\``
  if (held.text === one.now) return `\`${one.now}\` is what \`${one.key}\` states already`
  return spotAt(source, held, one.now)
}

type Found =
  | { readonly record: ts.ObjectLiteralExpression }
  | { readonly many: number }
  | { readonly none: true }

function recordIn(list: ts.ArrayLiteralExpression, field: string, was: string): Found {
  const found = matchingIn(list, field, was)
  if (found.length > 1) return { many: found.length }
  const at = found[0]
  const one = at === undefined ? undefined : list.elements[at]
  if (one === undefined || !ts.isObjectLiteralExpression(one)) return { none: true }
  return { record: one }
}

function underField(
  path: string,
  source: ts.SourceFile,
  one: Restating,
  field: string
): Splice | string {
  const list = listIn(source, one.key)
  if (list === null || recordsIn(list).length === 0) {
    return `\`${path}\` states no records under \`${one.key}\``
  }
  const found = recordIn(list, field, one.was)
  if ("none" in found) return `no record under \`${one.key}\` states that text under \`${field}\``
  if ("many" in found) {
    return (
      `${found.many} records under \`${one.key}\` state that text under \`${field}\`,` +
      " and one change works one"
    )
  }
  const held = textsOf(found.record).get(field)
  if (held === undefined) return `that record states no text under \`${field}\``
  if (held.text === one.now) return `\`${one.now}\` is what \`${field}\` states already`
  return spotAt(source, held, one.now)
}

function spotIn(path: string, source: ts.SourceFile, one: Restating): Splice | string {
  const field = one.under[one.under.length - 1]
  if (field === undefined) return underKey(path, source, one)
  return underField(path, source, one, field)
}

function overAll(text: string, spots: readonly Splice[]): Splice | null {
  const held = [...spots].sort((here, there) => here.from - there.from)
  const first = held[0]
  const last = held[held.length - 1]
  if (first === undefined || last === undefined) return null
  let put = ""
  let at = first.from
  for (const one of held) {
    put = `${put}${text.slice(at, one.from)}${one.put}`
    at = one.to
  }
  return { from: first.from, to: last.to, put }
}

export function bodyRestated(path: string, text: string, held: readonly Restating[]): Said {
  const source = parsedAs(path, text)
  const spots: Splice[] = []
  for (const one of held) {
    const spot = spotIn(path, source, one)
    if (typeof spot === "string") return refusing(spot)
    spots.push(spot)
  }
  const over = overAll(text, spots)
  return over === null ? stating([]) : stating(spliced(path, text, over))
}
