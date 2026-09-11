import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Child, Filing, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const ROOT = ""

const SLASH = "/"

export const INDEX_AT = ".git/indexes"

export function indexIn(root: string): string {
  return join(root, INDEX_AT)
}

export function indexAt(indexName: string, ...parts: readonly string[]): string {
  return join(INDEX_AT, indexName, ...parts)
}

function linesOf(at: string): readonly string[] {
  try {
    return readFileSync(at, "utf8")
      .split("\n")
      .filter((one) => one !== "")
  } catch {
    return []
  }
}

export function readingAt(index: string): Reading {
  return {
    holds: (at) => existsSync(join(index, at)),
    listing: (at) => {
      try {
        return readdirSync(join(index, at), { withFileTypes: true }).map((one) => ({
          name: one.name,
          directory: one.isDirectory(),
        }))
      } catch {
        return []
      }
    },
    lines: (at) => linesOf(join(index, at)),
  }
}

export function readingNone(): Reading {
  return {
    holds: (at) => at === "",
    listing: () => [],
    lines: () => [],
  }
}

export function readingOf(given: string | Reading): Reading {
  return typeof given === "string" ? readingAt(given) : given
}

export function beneath(at: string, name: string): string {
  return at === "" ? name : `${at}${SLASH}${name}`
}

function aboveOf(at: string): { readonly dir: string; readonly name: string } {
  const cut = at.lastIndexOf(SLASH)
  return cut < 0 ? { dir: "", name: at } : { dir: at.slice(0, cut), name: at.slice(cut + 1) }
}

type Noted = {
  readonly dir: string
  readonly name: string
  readonly directory: boolean
}

function notedUp(at: string): readonly Noted[] {
  const found: Noted[] = []
  let here = at
  let directory = false
  for (;;) {
    const { dir, name } = aboveOf(here)
    found.push({ dir, name, directory })
    if (dir === "") return found
    here = dir
    directory = true
  }
}

function markedUp(at: string): readonly string[] {
  const found: string[] = []
  let here = at
  for (;;) {
    const { dir } = aboveOf(here)
    found.push(dir)
    if (dir === "") return found
    here = dir
  }
}

function anythingLeft(under: Reading, at: string, emptied: ReadonlySet<string>): boolean {
  for (const one of under.listing(at)) {
    const next = beneath(at, one.name)
    if (one.directory) {
      if (anythingLeft(under, next, emptied)) return true
      continue
    }
    if (!emptied.has(next)) return true
  }
  return false
}

type Counted = {
  readonly directory: boolean
  readonly count: number
}

type Added = Map<string, ReadonlyMap<string, Counted>>

type Laid = {
  readonly base: Reading
  readonly held: ReadonlyMap<string, readonly string[]>
  readonly filled: ReadonlySet<string>
  readonly emptied: ReadonlySet<string>
  readonly added: ReadonlyMap<string, ReadonlyMap<string, Counted>>
  readonly thinned: ReadonlyMap<string, number>
}

const LAID = new WeakMap<Reading, Laid>()

type Touched = Map<string, Map<string, Counted>>

function owned(added: Added, touched: Touched, dir: string): Map<string, Counted> {
  const found = touched.get(dir)
  if (found !== undefined) return found
  const made = new Map(added.get(dir))
  touched.set(dir, made)
  added.set(dir, made)
  return made
}

function countingIn(added: Added, touched: Touched, at: string, by: number): undefined {
  for (const one of notedUp(at)) {
    const held = owned(added, touched, one.dir)
    const count = (held.get(one.name)?.count ?? 0) + by
    if (count > 0) held.set(one.name, { directory: one.directory, count })
    else held.delete(one.name)
  }
}

function thinningIn(thinned: Map<string, number>, at: string, by: number): undefined {
  for (const dir of markedUp(at)) {
    const count = (thinned.get(dir) ?? 0) + by
    if (count > 0) thinned.set(dir, count)
    else thinned.delete(dir)
  }
}

export function overlaidOn(under: Reading, filings: readonly Filing[]): Reading {
  const laid = LAID.get(under)
  const base = laid?.base ?? under
  const held = new Map<string, readonly string[]>(laid?.held)
  const filled = new Set<string>(laid?.filled)
  const emptied = new Set<string>(laid?.emptied)
  const added: Added = new Map(laid?.added)
  const thinned = new Map<string, number>(laid?.thinned)
  const touched: Touched = new Map()

  for (const one of filings) {
    const was = held.get(one.at)
    const wasFilled = was !== undefined && was.length > 0
    const wasEmptied = was !== undefined && was.length === 0
    const fills = one.lines.length > 0
    if (wasFilled !== fills) countingIn(added, touched, one.at, fills ? 1 : -1)
    if (wasEmptied === fills) thinningIn(thinned, one.at, fills ? -1 : 1)
    held.set(one.at, one.lines)
    if (fills) filled.add(one.at)
    else filled.delete(one.at)
    if (fills) emptied.delete(one.at)
    else emptied.add(one.at)
  }
  for (const [dir, names] of touched) {
    if (names.size === 0) added.delete(dir)
  }

  const holds = (at: string): boolean => {
    if (filled.has(at)) return true
    if (emptied.has(at)) return false
    if ((added.get(at)?.size ?? 0) > 0) return true
    if (at === ROOT || !thinned.has(at)) return base.holds(at)
    return anythingLeft(base, at, emptied)
  }

  const laying: Reading = {
    holds: holds,
    lines: (at) => held.get(at) ?? base.lines(at),
    listing: (at) => {
      const found = new Map<string, boolean>()
      for (const one of base.listing(at)) found.set(one.name, one.directory)
      for (const [name, counted] of added.get(at) ?? []) found.set(name, counted.directory)
      const said: Child[] = []
      for (const [name, directory] of found) {
        if (thinned.has(at) && !holds(beneath(at, name))) continue
        said.push({ name, directory })
      }
      return said
    },
  }
  LAID.set(laying, { base, held, filled, emptied, added, thinned })
  return laying
}
