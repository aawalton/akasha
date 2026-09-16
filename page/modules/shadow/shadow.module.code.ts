import { readFileSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { pathsListed } from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { digestOf } from "akasha/code/body/modules/carried-file/carried-file.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  type Answering,
  answeringOver,
} from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  bodiesBeside,
  bodiesFrom,
} from "akasha/page/index/modules/keeping/index-keeping.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  type Settling,
  settlingOver,
} from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { indexIn, readingAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Shadow = {
  readonly root: string
  readonly index: Answering
  readonly before: () => Answering
  readonly filed: () => ReadonlyMap<string, string | null>
  readonly holds: (path: string) => boolean
  readonly listed: (folder?: string) => readonly string[]
  readonly refusals: () => readonly string[]
  readonly pageOf: (path: string) => Value | null
  readonly codeAt: (path: string) => string | null
}

const HERE = "."

const EVERYWHERE = ""

function merged(held: readonly string[], put: readonly string[]): readonly string[] {
  const found: string[] = []
  let at = 0
  for (const one of held) {
    let next = put[at]
    while (next !== undefined && next < one) {
      found.push(next)
      at += 1
      next = put[at]
    }
    found.push(one)
  }
  for (let rest = at; rest < put.length; rest += 1) {
    const one = put[rest]
    if (one !== undefined) found.push(one)
  }
  return found
}

function laidOver(root: string, change: Change | null): readonly string[] {
  const listed = pathsListed(root)
  if (change === null || change.changed.length === 0) return listed
  const gone = new Set<string>()
  const put = new Set<string>()
  for (const path of change.changed) {
    if (change.after(path) === null) {
      put.delete(path)
      gone.add(path)
    } else {
      gone.delete(path)
      put.add(path)
    }
  }
  const held = listed.filter((one) => !gone.has(one) && !put.has(one))
  return merged(held, [...put].sort())
}

function foldedInto(paths: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of paths) {
    const at = dirname(one)
    const folder = at === HERE ? EVERYWHERE : at
    const held = found.get(folder)
    if (held === undefined) found.set(folder, [one])
    else held.push(one)
  }
  return found
}

function listingIn(root: string, change: Change | null): (folder?: string) => readonly string[] {
  let every: readonly string[] | null = null
  let under: ReadonlyMap<string, readonly string[]> | null = null
  const all = (): readonly string[] => {
    if (every === null) every = laidOver(root, change)
    return every
  }
  return (folder) => {
    if (folder === undefined) return all()
    if (under === null) under = foldedInto(all())
    return under.get(folder) ?? []
  }
}

export type Made = {
  readonly shadow: Shadow
  readonly reading: Reading
  readonly settled: Settling | null
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

function bytesOnDisk(at: string): Uint8Array | null {
  const found = statSync(at, { throwIfNoEntry: false })
  return found?.isFile() === true ? readFileSync(at) : null
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
    const wanted = digestOf(after)
    const disk = bytesOnDisk(join(change.root, path))
    if (disk !== null && digestOf(disk) === wanted) return path
    const moved = before().get(wanted)
    if (moved !== undefined) return moved
    return change.before(path) === null ? null : path
  }
}

function shadowOver(
  root: string,
  reading: Reading,
  bodyOf: (path: string) => Value | null,
  held: Remembered = remembered()
): Shadow {
  const pageOf = remembering(bodyOf, held.values)
  const index = answeringOver(reading, pageOf)
  return {
    root,
    index,
    before: () => index,
    filed: () => new Map(),
    holds: (path) => reading.read(path) !== null,
    listed: listingIn(root, null),
    refusals: () => [],
    pageOf,
    codeAt: (path) => path,
  }
}

export function shadowAt(root: string): Shadow {
  const reading = readingIn(root)
  return shadowOver(root, reading, bodyOver(reading), remembered())
}

function castFrom(was: Reading, change: Change, held: Remembered): Cast {
  const body = bodyIn(change)
  if (nothingMoved(change)) {
    return { shadow: shadowOver(change.root, was, body, held), reading: was, settled: null }
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
      if (bodies === null) {
        bodies = new Map([
          ...bodiesFrom(reading, settled.filings),
          ...bodiesBeside(was, settled.references),
          ...settled.carried,
        ])
      }
      return bodies
    }
    const left = leftOver(settled.refusedBefore, settled.refused)
    const refusals = (): readonly string[] => left
    let had: Answering | null = null
    const before = (): Answering => {
      if (had === null) had = answeringOver(was, beneath)
      return had
    }
    const shadow: Shadow = {
      root: change.root,
      index,
      before,
      filed,
      holds: (path) => reading.read(path) !== null,
      listed: listingIn(change.root, change),
      refusals,
      pageOf,
      codeAt: codeOver(change),
    }
    return { shadow, reading, settled }
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

function pinnedIn(root: string, base: string | undefined): Reading {
  const head = base ?? told(root, ["rev-parse", "HEAD"])
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
  return castFrom(pinnedIn(change.root, change.base), change, remembered())
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
    root: change.root,
    index: answeringOver(reading, pageOf),
    before: () => worked().shadow.before(),
    filed: () => worked().shadow.filed(),
    holds: (path) => reading.read(path) !== null,
    listed: listingIn(change.root, change),
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
