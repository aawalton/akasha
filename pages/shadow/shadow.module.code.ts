import { textOf } from "@akasha/code/body-text"
import { digestOf } from "@akasha/code/carried-file"
import {
  type Answering,
  answeringOver,
} from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import { readingIn, valuesByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { settlingOver } from "akasha/pages/indexes/settling/index-settling.module.code.ts"
import type { Filing, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Change } from "../change/change.module.code.ts"
import { partedIn } from "../file-name/page-file-name.module.code.ts"
import { type Value, valueAt, valueIn } from "../value/page-value.module.code.ts"

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

export type Remembered = {
  readonly values: Map<string, Value | null>
  readonly filed: Map<string, ReadonlyMap<string, Value>>
}

export function remembered(): Remembered {
  return { values: new Map(), filed: new Map() }
}

export function forgotten(held: Remembered, paths: Iterable<string>): undefined {
  for (const path of paths) {
    held.values.delete(path)
    const said = partedIn(path)
    if (said !== null) held.filed.delete(said.pageType)
  }
}

function remembering(
  pageOf: (path: string) => Value | null,
  values: Map<string, Value | null>
): (path: string) => Value | null {
  return (path) => {
    const found = values.get(path)
    if (found !== undefined || values.has(path)) return found ?? null
    const value = pageOf(path)
    values.set(path, value)
    return value
  }
}

function filedOver(
  reading: Reading,
  bodyOf: (path: string) => Value | null,
  held: Map<string, ReadonlyMap<string, Value>>
): (path: string) => Value | null {
  const filed = (pageType: string): ReadonlyMap<string, Value> => {
    const found = held.get(pageType)
    if (found !== undefined) return found
    const made = valuesByPath(reading, pageType)
    held.set(pageType, made)
    return made
  }
  return (path) => {
    const said = partedIn(path)
    if (said === null) return bodyOf(path)
    return filed(said.pageType).get(path) ?? bodyOf(path)
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

function codeOver(change: Change): (path: string) => string | null {
  const carried = new Set(change.changed)
  let held: Map<string, string> | null = null
  const before = (): Map<string, string> => {
    if (held !== null) return held
    const found = new Map<string, string>()
    for (const path of change.changed) {
      const bytes = change.before(path)
      if (bytes !== null) found.set(digestOf(bytes), path)
    }
    held = found
    return found
  }
  return (path) => {
    if (!carried.has(path)) return path
    const after = change.after(path)
    if (after === null) return null
    return before().get(digestOf(after)) ?? null
  }
}

function shadowOver(
  reading: Reading,
  bodyOf: (path: string) => Value | null,
  held: Remembered = remembered()
): Shadow {
  const pageOf = remembering(filedOver(reading, bodyOf, held.filed), held.values)
  return {
    index: answeringOver(reading, pageOf),
    filed: () => [],
    pageOf,
    codeAt: (path) => path,
  }
}

export function shadowAt(root: string): Shadow {
  return shadowOver(readingIn(root), bodyOnDisk(root), remembered())
}

function castFrom(was: Reading, change: Change, held: Remembered): Cast {
  const body = bodyIn(change)
  if (nothingMoved(change)) {
    return { shadow: shadowOver(was, body, held), reading: was }
  }
  const carried = new Set(change.changed)
  const under = filedOver(was, body, held.filed)
  const pageOf = remembering((path) => (carried.has(path) ? body(path) : under(path)), held.values)
  try {
    const moving = change.changed.map((path) => ({
      path,
      before: textOf(change.before(path)),
      after: textOf(change.after(path)),
    }))
    const settled = settlingOver(was, change.root, moving, pageOf, (path) =>
      textOf(change.after(path))
    )
    const reading = settled.reading
    const index = answeringOver(reading, pageOf)
    const filed = (): readonly Filing[] => settled.filings
    return { shadow: { index, filed, pageOf, codeAt: codeOver(change) }, reading }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { refused: `${NOT_WORKED_OUT} — ${why}` }
  }
}

export function shadowOnto(
  was: Reading | null,
  change: Change,
  held: Remembered = remembered()
): Cast {
  return castFrom(was ?? readingIn(change.root), change, held)
}

function castOver(change: Change): Cast {
  return castFrom(readingIn(change.root), change, remembered())
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
    index: answeringOver(reading, pageOf),
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
