import type { Stated } from "./files.ts"

const NAMING: readonly string[] = ["slug", "id"]

const AT = "#"

const BREAK = "\n"

export type RowPage = {
  readonly at: string
  readonly name: string
  readonly stated: Stated
}

export type RowUnread = {
  readonly at: string
  readonly unread: string
}

export const namedIn = (stated: Stated): string | null => {
  for (const key of NAMING) {
    const held = stated[key]
    if (typeof held === "string" && held.trim() !== "") return held.trim()
  }
  return null
}

const statedIn = (line: string): Stated | null => {
  let held: unknown
  try {
    held = JSON.parse(line)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Stated
}

function* walk(at: string, text: string, holder: string): Generator<RowPage | RowUnread> {
  let from = 0
  let line = 0
  while (from < text.length) {
    const ends = text.indexOf(BREAK, from)
    const held = (ends < 0 ? text.slice(from) : text.slice(from, ends)).trim()
    from = ends < 0 ? text.length : ends + 1
    line += 1
    if (held === "") continue
    const stated = statedIn(held)
    if (stated === null) {
      yield { at: `${at}${AT}${line}`, unread: `line ${line} is not one JSON object, so it names no page` }
      continue
    }
    const name = namedIn(stated) ?? `${holder}${AT}${line}`
    yield { at: `${at}${AT}${name}`, name, stated }
  }
}

export const rowsIn = (at: string, text: string, holder: string): Iterable<RowPage | RowUnread> => ({
  [Symbol.iterator]: () => walk(at, text, holder),
})
