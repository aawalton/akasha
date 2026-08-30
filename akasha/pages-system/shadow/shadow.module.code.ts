import { textOf } from "../../code-system/body-text/body-text.module.code.ts"
import { type Value, valueAt, valueIn } from "../indexes/index-entries/index-entries.module.code.ts"
import { indexIn } from "../indexes/index-reading/index-reading.module.code.ts"
import {
  overlaidOn,
  type Reading,
  readingAt,
} from "../indexes/index-surface/index-surface.module.code.ts"
import { settlingOver } from "../indexes/indexing/indexing.module.code.ts"

export type Change = {
  readonly root: string
  readonly changed: readonly string[]
  readonly before: (path: string) => Uint8Array | null
  readonly after: (path: string) => Uint8Array | null
}

export type Shadow = {
  readonly reading: Reading
  readonly pageOf: (path: string) => Value | null
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

export function shadowAt(root: string): Shadow {
  return {
    reading: readingAt(indexIn(root)),
    pageOf: remembering((path) => valueAt(path, root)),
  }
}

function castOver(change: Change): Cast {
  if (nothingMoved(change)) return { shadow: shadowAt(change.root) }
  const under = readingAt(indexIn(change.root))
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
    const found = settlingOver(under, change.root, moving, pageOf)
    return { shadow: { reading: overlaidOn(under, found.filings), pageOf } }
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
