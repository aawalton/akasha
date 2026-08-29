import { textOf } from "../../../code-system/body-text/body-text.module.code.ts"
import { type Value, valueAt, valueIn } from "../index-entries/index-entries.module.code.ts"
import { indexIn } from "../index-reading/index-reading.module.code.ts"
import { overlaidOn, type Reading, readingAt } from "../index-surface/index-surface.module.code.ts"
import { settlingOver } from "../indexing/indexing.module.code.ts"

export type Patch = {
  readonly root: string
  readonly changed: readonly string[]
  readonly at: (path: string) => Uint8Array | null
  readonly was: (path: string) => Uint8Array | null
}

export type Shadow = {
  readonly reading: Reading
  readonly pageOf: (path: string) => Value | null
}

export type Cast = { readonly shadow: Shadow } | { readonly refused: string }

export const NOT_WORKED_OUT = "the index as this change leaves it could not be worked out"

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

export function shadowAt(root: string): Shadow {
  return {
    reading: readingAt(indexIn(root)),
    pageOf: remembering((path) => valueAt(path, root)),
  }
}

export function shadowOver(patch: Patch): Cast {
  if (patch.at === patch.was) return { shadow: shadowAt(patch.root) }
  const under = readingAt(indexIn(patch.root))
  const carried = new Set(patch.changed)
  const pageOf = remembering((path) => {
    if (!carried.has(path)) return valueAt(path, patch.root)
    const body = textOf(patch.at(path))
    return body === null ? null : valueIn(body)
  })
  try {
    const moving = patch.changed.map((path) => ({
      path,
      before: textOf(patch.was(path)),
      after: textOf(patch.at(path)),
    }))
    const found = settlingOver(under, patch.root, moving, pageOf)
    return { shadow: { reading: overlaidOn(under, found.filings), pageOf } }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { refused: `${NOT_WORKED_OUT} — ${why}` }
  }
}

const cast = new WeakMap<Patch, Cast>()

export function shadowFor(patch: Patch): Cast {
  const found = cast.get(patch)
  if (found !== undefined) return found
  const made = shadowOver(patch)
  cast.set(patch, made)
  return made
}
