import { createHash } from "node:crypto"
import { textOf } from "@akasha/code-system/body-text"
import { everyValue, readingIn } from "@akasha/indexes"
import { type Answering, answeringOver } from "@akasha/indexes/answering"
import { settlingOver } from "@akasha/indexes/indexing"
import type { Filing, Reading } from "@akasha/indexes/shape"
import type { Change } from "../change/change.module.code.ts"
import { type Value, valueAt, valueIn } from "../page/page-value/page-value.module.code.ts"

export type Shadow = {
  readonly reading: Reading
  readonly index: Answering
  readonly filed: () => readonly Filing[]
  readonly pageOf: (path: string) => Value | null
  readonly codeAt: (path: string) => string | null
}

export type Cast = { readonly shadow: Shadow } | { readonly refused: string }

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

function filedIn(reading: Reading, root: string): (path: string) => Value | null {
  let filed: ReadonlyMap<string, Value> | null = null
  return (path) => {
    if (filed === null) filed = everyValue(reading)
    return filed.get(path) ?? valueAt(path, root)
  }
}

function nothingMoved(change: Change): boolean {
  return change.after === change.before
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

export function shadowAt(root: string): Shadow {
  const reading = readingIn(root)
  const pageOf = remembering(filedIn(reading, root))
  return {
    reading,
    index: answeringOver(reading, root, pageOf),
    filed: () => [],
    pageOf,
    codeAt: (path) => path,
  }
}

function castOver(change: Change): Cast {
  if (nothingMoved(change)) return { shadow: shadowAt(change.root) }
  const carried = new Set(change.changed)
  const filed = filedIn(readingIn(change.root), change.root)
  const pageOf = remembering((path) => {
    if (!carried.has(path)) return filed(path)
    const body = textOf(change.after(path))
    return body === null ? null : valueIn(body)
  })
  try {
    const moving = change.changed.map((path) => ({
      path,
      before: textOf(change.before(path)),
      after: textOf(change.after(path)),
    }))
    const settled = settlingOver(readingIn(change.root), change.root, moving, pageOf)
    const reading = settled.reading
    const index = answeringOver(reading, change.root, pageOf)
    const filed = (): readonly Filing[] => settled.filings
    return { shadow: { reading, index, filed, pageOf, codeAt: codeOver(change) } }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { refused: `${NOT_WORKED_OUT} — ${why}` }
  }
}

export function shadowAsked(change: Change): Shadow {
  let held: Shadow | null = null
  const worked = (): Shadow => {
    if (held !== null) return held
    const found = shadowFor(change)
    if ("refused" in found) throw new Error(found.refused)
    held = found.shadow
    return held
  }
  const reading: Reading = {
    holds: (at) => worked().reading.holds(at),
    listing: (at) => worked().reading.listing(at),
    lines: (at) => worked().reading.lines(at),
  }
  const pageOf = (path: string): Value | null => worked().pageOf(path)
  return {
    reading,
    index: answeringOver(reading, change.root, pageOf),
    filed: () => worked().filed(),
    pageOf,
    codeAt: (path) => worked().codeAt(path),
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
