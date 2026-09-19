import type { Splice } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  keyOf,
  literalIn,
  statedIn,
  valuesIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

const TRAILING_LINES = /\n+$/

const ALREADY = "already"

const OPENS = "{"

const SHUTS = "}"

const OPENS_LIST = "["

const SHUTS_LIST = "]"

const NEXT = ","

const QUOTE = '"'

const ESCAPE = "\\"

const OUTERMOST = 1

const NO_ENTRIES = "reads as no run of entries, so no key is respelled"

export type Spotted = { readonly spots: readonly Splice[] } | { readonly refused: string }

export function slugSpotted(path: string, text: string, key: string, to: string): Spotted {
  const stated = to.replace(TRAILING_LINES, "")
  const source = parsedAs(path, text)
  const held = statedIn(source).get(key)
  if (held === undefined) return { refused: `\`${path}\` states no text under \`${key}\`` }
  if (held.text === stated) return { refused: `\`${stated}\` is what \`${key}\` states already` }
  const put = JSON.stringify(stated)
  return { spots: [{ from: held.getStart(source), to: held.getEnd(), put }] }
}

function spelledKey(name: ts.PropertyName, now: string): string {
  return ts.isStringLiteral(name) ? JSON.stringify(now) : now
}

function namedKeyIn(
  held: ts.ObjectLiteralExpression,
  was: string,
  now: string
): ts.PropertyName | null | typeof ALREADY {
  let found: ts.PropertyName | null = null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = keyOf(one)
    if (key === now) return ALREADY
    if (key === was) found = one.name
  }
  return found
}

export function keySpotted(
  path: string,
  text: string,
  was: string,
  now: string,
  within: string | null
): Spotted {
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  if (owner === null) return { refused: `\`${path}\` exports no object` }
  const holding = within === null ? [owner] : valuesIn(source, within)
  const spots: Splice[] = []
  for (const one of holding) {
    const name = namedKeyIn(one, was, now)
    if (name === ALREADY) return { refused: `\`${path}\` states \`${now}\` already` }
    if (name === null) continue
    spots.push({ from: name.getStart(source), to: name.getEnd(), put: spelledKey(name, now) })
  }
  if (spots.length > 0) return { spots }
  return within === null ? { refused: `\`${path}\` states no \`${was}\`` } : { spots: [] }
}

type Quoted = {
  readonly said: string
  readonly to: number
}

function quotedOn(text: string, from: number): Quoted | null {
  let at = from + 1
  while (at < text.length) {
    const here = text[at] ?? ""
    if (here === ESCAPE) {
      at = at + 2
      continue
    }
    if (here !== QUOTE) {
      at = at + 1
      continue
    }
    let said: unknown
    try {
      said = JSON.parse(text.slice(from, at + 1))
    } catch {
      return null
    }
    return typeof said === "string" ? { said, to: at + 1 } : null
  }
  return null
}

type Keyed = {
  readonly spots: readonly Splice[]
  readonly holding: boolean
}

function keyedOver(text: string, was: string, now: string): Keyed | null {
  const spots: Splice[] = []
  let holding = false
  let named = false
  let opened = 0
  let depth = 0
  let keying = false
  let at = 0
  while (at < text.length) {
    const here = text[at] ?? ""
    if (here === QUOTE) {
      const held = quotedOn(text, at)
      if (held === null) return null
      if (keying && depth === OUTERMOST) {
        if (held.said === now) named = true
        if (held.said === was) spots.push({ from: at, to: held.to, put: JSON.stringify(now) })
      }
      keying = false
      at = held.to
      continue
    }
    if (here === OPENS || here === OPENS_LIST) {
      depth = depth + 1
      keying = here === OPENS && depth === OUTERMOST
      if (keying) {
        named = false
        opened = spots.length
      }
    } else if (here === SHUTS || here === SHUTS_LIST) {
      depth = depth - 1
      if (depth === 0 && named && spots.length > opened) holding = true
      keying = false
    } else if (here === NEXT) {
      keying = depth === OUTERMOST
    }
    at = at + 1
  }
  return depth === 0 ? { spots, holding } : null
}

function spannedOver(text: string, spots: readonly Splice[]): Splice | null {
  const first = spots[0]
  const last = spots[spots.length - 1]
  if (first === undefined || last === undefined) return null
  const put: string[] = []
  let at = first.from
  for (const one of spots) {
    put.push(text.slice(at, one.from), one.put)
    at = one.to
  }
  return { from: first.from, to: last.to, put: put.join("") }
}

export function entrySpotted(path: string, text: string, was: string, now: string): Spotted {
  const held = keyedOver(text, was, now)
  if (held === null) return { refused: `\`${path}\` ${NO_ENTRIES}` }
  if (held.holding) return { refused: `\`${path}\` states \`${was}\` and \`${now}\` in one entry` }
  const over = spannedOver(text, held.spots)
  return { spots: over === null ? [] : [over] }
}
