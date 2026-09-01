import { createHash } from "node:crypto"
import { textOf } from "@akasha/code-system/body-text"
import { readingIn } from "@akasha/indexes"
import { readingOver } from "@akasha/indexes/indexing"
import type { Reading } from "@akasha/indexes/shape"
import type { Change } from "../change/change.module.code.ts"
import { type Value, valueAt, valueIn } from "../page/page-value/page-value.module.code.ts"

export type Shadow = {
  readonly reading: Reading
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
  return {
    reading: readingIn(root),
    pageOf: remembering((path) => valueAt(path, root)),
    codeAt: (path) => path,
  }
}

function castOver(change: Change): Cast {
  if (nothingMoved(change)) return { shadow: shadowAt(change.root) }
  const carried = new Set(change.changed)
  const pageOf = remembering((path) => {
    if (!carried.has(path)) return valueAt(path, change.root)
    const body = textOf(change.after(path))
    return body === null ? null : valueIn(body)
  })
  try {
    const moving = change.changed.map((path) => ({
      path,
      before: textOf(change.before(path)),
      after: textOf(change.after(path)),
    }))
    const reading = readingOver(change.root, moving, pageOf)
    return { shadow: { reading, pageOf, codeAt: codeOver(change) } }
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
  return {
    reading: {
      holds: (at) => worked().reading.holds(at),
      listing: (at) => worked().reading.listing(at),
      lines: (at) => worked().reading.lines(at),
    },
    pageOf: (path) => worked().pageOf(path),
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
