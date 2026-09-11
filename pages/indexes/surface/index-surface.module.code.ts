import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Child, Filing, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const ROOT = ""

const SLASH = "/"

export const INDEX_AT = ".git/data/index"

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
  const held = new Map<string, readonly string[]>()
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
    lines: (at) => {
      const found = held.get(at)
      if (found !== undefined) return found
      const made = linesOf(join(index, at))
      held.set(at, made)
      return made
    },
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

type Laid = {
  readonly base: Reading
  readonly held: ReadonlyMap<string, readonly string[]>
}

const LAID = new WeakMap<Reading, Laid>()

export function overlaidOn(under: Reading, filings: readonly Filing[]): Reading {
  const laid = LAID.get(under)
  const base = laid?.base ?? under
  const held = new Map<string, readonly string[]>(laid?.held)
  for (const one of filings) held.set(one.at, one.lines)

  const filled = new Set<string>()
  const emptied = new Set<string>()
  for (const [at, lines] of held) {
    if (lines.length === 0) emptied.add(at)
    else filled.add(at)
  }

  const added = new Map(
    [...Map.groupBy([...filled].flatMap(notedUp), (one) => one.dir)].map(
      ([dir, noted]): readonly [string, ReadonlyMap<string, boolean>] => [
        dir,
        new Map(noted.map((one): readonly [string, boolean] => [one.name, one.directory])),
      ]
    )
  )

  const thinned = new Set([...emptied].flatMap(markedUp))

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
      for (const [name, directory] of added.get(at) ?? []) found.set(name, directory)
      const said: Child[] = []
      for (const [name, directory] of found) {
        if (thinned.has(at) && !holds(beneath(at, name))) continue
        said.push({ name, directory })
      }
      return said
    },
  }
  LAID.set(laying, { base, held })
  return laying
}
