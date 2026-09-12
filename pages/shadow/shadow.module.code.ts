import { textOf } from "akasha/code/body-text/body-text.module.code.ts"
import { digestOf } from "akasha/code/carried-file/carried-file.module.code.ts"
import { bodyAt } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { told } from "akasha/git/running/git-running.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  type Answering,
  answeringOver,
} from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import { bodiesFrom } from "akasha/pages/indexes/keeping/index-keeping.module.code.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { settlingOver } from "akasha/pages/indexes/settling/index-settling.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { indexIn, readingAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export type Shadow = {
  readonly index: Answering
  readonly filed: () => ReadonlyMap<string, string | null>
  readonly refusals: () => readonly string[]
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
}

export function remembered(): Remembered {
  return { values: new Map() }
}

export function forgotten(held: Remembered, paths: Iterable<string>): undefined {
  for (const path of paths) held.values.delete(path)
}

export function heldPerShadow<Held>(made: (shadow: Shadow) => Held): (shadow: Shadow) => Held {
  const held = new WeakMap<Shadow, Held>()
  return (shadow) => {
    const found = held.get(shadow)
    if (found !== undefined) return found
    const one = made(shadow)
    held.set(shadow, one)
    return one
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

function bodyOver(reading: Reading): (path: string) => Value | null {
  return (path) => {
    const body = reading.read(path)
    return body === null ? null : valueIn(body)
  }
}

function bodyIn(change: Change): (path: string) => Value | null {
  return (path) => {
    const body = textOf(change.after(path))
    return body === null ? null : valueIn(body)
  }
}

function nothingMoved(change: Change): boolean {
  return change.after === change.before
}

function leftOver(before: readonly string[], after: readonly string[]): readonly string[] {
  const had = new Set(before)
  return after.filter((one) => !had.has(one))
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
    const moved = before().get(digestOf(after))
    if (moved !== undefined) return moved
    return change.before(path) === null ? null : path
  }
}

function shadowOver(
  reading: Reading,
  bodyOf: (path: string) => Value | null,
  held: Remembered = remembered()
): Shadow {
  const pageOf = remembering(bodyOf, held.values)
  return {
    index: answeringOver(reading, pageOf),
    filed: () => new Map(),
    refusals: () => [],
    pageOf,
    codeAt: (path) => path,
  }
}

export function shadowAt(root: string): Shadow {
  const reading = readingIn(root)
  return shadowOver(reading, bodyOver(reading), remembered())
}

function castFrom(was: Reading, change: Change, held: Remembered): Cast {
  const body = bodyIn(change)
  if (nothingMoved(change)) {
    return { shadow: shadowOver(was, body, held), reading: was }
  }
  const carried = new Set(change.changed)
  const beneath = bodyOver(was)
  const pageOf = remembering(
    (path) => (carried.has(path) ? body(path) : beneath(path)),
    held.values
  )
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
    let bodies: ReadonlyMap<string, string | null> | null = null
    const filed = (): ReadonlyMap<string, string | null> => {
      if (bodies === null) bodies = bodiesFrom(reading, settled.filings)
      return bodies
    }
    const left = leftOver(settled.refusedBefore, settled.refused)
    const refusals = (): readonly string[] => left
    return { shadow: { index, filed, refusals, pageOf, codeAt: codeOver(change) }, reading }
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

function pinnedIn(root: string): Reading {
  const head = told(root, ["rev-parse", "HEAD"])
  const commit = head === null ? null : head.trim()
  const under = readingAt(indexIn(root), root)
  const bodies = new Map<string, string | null>()
  return {
    holds: under.holds,
    listing: under.listing,
    lines: under.lines,
    read: (path) => {
      if (bodies.has(path)) return bodies.get(path) ?? null
      const said = commit === null ? null : textOf(bodyAt(root, commit, path))
      const made = said ?? under.read(path)
      bodies.set(path, made)
      return made
    },
  }
}

function castOver(change: Change): Cast {
  return castFrom(pinnedIn(change.root), change, remembered())
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
    read: (path) => worked().reading.read(path),
  }
  const pageOf = (path: string): Value | null => worked().shadow.pageOf(path)
  return {
    index: answeringOver(reading, pageOf),
    filed: () => worked().shadow.filed(),
    refusals: () => worked().shadow.refusals(),
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
