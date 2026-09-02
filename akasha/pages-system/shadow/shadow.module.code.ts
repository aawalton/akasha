import { createHash } from "node:crypto"
import { textOf } from "@akasha/code-system/body-text"
import { everyValue, readingIn } from "@akasha/indexes"
import { type Answering, answeringOver } from "@akasha/indexes/answering"
import { settlingOver } from "@akasha/indexes/indexing"
import type { Filing, Reading } from "@akasha/indexes/shape"
import type { Change } from "../change/change.module.code.ts"
import { type Value, valueAt, valueIn } from "../pages/value/page-value.module.code.ts"

export type Shadow = {
  readonly index: Answering
  readonly filed: () => readonly Filing[]
  readonly pageOf: (path: string) => Value | null
  readonly codeAt: (path: string) => string | null
}

export type Made = {
  readonly shadow: Shadow
  readonly reading: Reading
}

export type Cast = Made | { readonly refused: string }

export const NOT_WORKED_OUT =
  "the files and index as this change leaves them could not be worked out"

function remembering(pageOf: (path: string) => Value | null): (path: string) => Value | null {
  const held = new Map<string, Value | null>()
  return (path) => {
    const found = held.get(path)
    if (found !== undefined || held.has(path)) return found ?? null
    const value = pageOf(path)
    held.set(path, value)
    return value
  }
}

function filedOver(
  reading: Reading,
  bodyOf: (path: string) => Value | null
): (path: string) => Value | null {
  let filed: ReadonlyMap<string, Value> | null = null
  return (path) => {
    if (filed === null) filed = everyValue(reading)
    return filed.get(path) ?? bodyOf(path)
  }
}

function bodyIn(change: Change): (path: string) => Value | null {
  return (path) => {
    const body = textOf(change.after(path))
    return body === null ? null : valueIn(body)
  }
}

function bodyOnDisk(root: string): (path: string) => Value | null {
  return (path) => valueAt(path, root)
}

function nothingMoved(change: Change): boolean {
  return change.after === change.before
}

function heldToHead(change: Change): string | null {
  return nothingMoved(change) ? change.root : null
}

function keyOf(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex")
}

function codeOver(change: Change): (path: string) => string | null {
  const carried = new Set(change.changed)
  let held: Map<string, string> | null = null
  const before = (): Map<string, string> => {
    if (held !== null) return held
    const found = new Map<string, string>()
    for (const path of change.changed) {
      const bytes = change.before(path)
      if (bytes !== null) found.set(keyOf(bytes), path)
    }
    held = found
    return found
  }
  return (path) => {
    if (!carried.has(path)) return path
    const after = change.after(path)
    if (after === null) return null
    return before().get(keyOf(after)) ?? null
  }
}

function shadowOver(
  reading: Reading,
  root: string,
  bodyOf: (path: string) => Value | null
): Shadow {
  const pageOf = remembering(filedOver(reading, bodyOf))
  return {
    index: answeringOver(reading, root, pageOf),
    filed: () => [],
    pageOf,
    codeAt: (path) => path,
  }
}

export function shadowAt(root: string): Shadow {
  return shadowOver(readingIn(root), root, bodyOnDisk(root))
}

function castOver(change: Change): Cast {
  const body = bodyIn(change)
  if (nothingMoved(change)) {
    const reading = readingIn(change.root)
    return { shadow: shadowOver(reading, change.root, body), reading }
  }
  const carried = new Set(change.changed)
  const filed = filedOver(readingIn(change.root), body)
  const pageOf = remembering((path) => (carried.has(path) ? body(path) : filed(path)))
  try {
    const moving = change.changed.map((path) => ({
      path,
      before: textOf(change.before(path)),
      after: textOf(change.after(path)),
    }))
    const settled = settlingOver(readingIn(change.root), change.root, moving, pageOf)
    const reading = settled.reading
    const index = answeringOver(reading, heldToHead(change), pageOf)
    const filed = (): readonly Filing[] => settled.filings
    return { shadow: { index, filed, pageOf, codeAt: codeOver(change) }, reading }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { refused: `${NOT_WORKED_OUT} — ${why}` }
  }
}

export function shadowAsked(change: Change): Shadow {
  let held: Made | null = null
  const worked = (): Made => {
    if (held !== null) return held
    const found = shadowFor(change)
    if ("refused" in found) throw new Error(found.refused)
    held = found
    return held
  }
  const reading: Reading = {
    holds: (at) => worked().reading.holds(at),
    listing: (at) => worked().reading.listing(at),
    lines: (at) => worked().reading.lines(at),
  }
  const pageOf = (path: string): Value | null => worked().shadow.pageOf(path)
  return {
    index: answeringOver(reading, heldToHead(change), pageOf),
    filed: () => worked().shadow.filed(),
    pageOf,
    codeAt: (path) => worked().shadow.codeAt(path),
  }
}

const cast = new WeakMap<Change, Cast>()

export function shadowFor(change: Change): Cast {
  const found = cast.get(change)
  if (found !== undefined) return found
  const made = castOver(change)
  cast.set(change, made)
  return made
}
