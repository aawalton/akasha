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

type Edit = {
  readonly came: ReadonlySet<string>
  readonly went: ReadonlySet<string>
}

type Named = Map<string, Map<string, boolean>>

type Laid = {
  readonly base: Reading
  readonly edits: ReadonlyMap<string, Edit>
  readonly named: ReadonlyMap<string, ReadonlyMap<string, boolean>>
  readonly thinned: ReadonlySet<string>
}

const LAID = new WeakMap<Reading, Laid>()

function editedBy(was: Edit | undefined, one: Filing): Edit {
  const came = new Set(one.came)
  const went = new Set(one.went)
  for (const line of was?.came ?? []) {
    if (!went.has(line)) came.add(line)
  }
  for (const line of was?.went ?? []) {
    if (!came.has(line)) went.add(line)
  }
  return { came, went }
}

export function mergedIn(sorted: readonly string[], coming: readonly string[]): readonly string[] {
  if (coming.length === 0) return sorted
  const said: string[] = []
  let at = 0
  for (const one of coming) {
    for (; at < sorted.length; at += 1) {
      const held = sorted[at]
      if (held === undefined || held > one) break
      said.push(held)
    }
    said.push(one)
  }
  for (; at < sorted.length; at += 1) {
    const held = sorted[at]
    if (held !== undefined) said.push(held)
  }
  return said
}

function owned(named: Named, owns: Set<string>, dir: string): Map<string, boolean> {
  const found = named.get(dir)
  if (found !== undefined && owns.has(dir)) return found
  const made = new Map(found)
  owns.add(dir)
  named.set(dir, made)
  return made
}

export function overlaidOn(under: Reading, filings: readonly Filing[]): Reading {
  const laid = LAID.get(under)
  const base = laid?.base ?? under
  const edits = new Map<string, Edit>(laid?.edits)
  const named: Named = new Map(laid?.named as ReadonlyMap<string, Map<string, boolean>>)
  const thinned = new Set<string>(laid?.thinned)
  const owns = new Set<string>()

  for (const one of filings) {
    edits.set(one.at, editedBy(edits.get(one.at), one))
    for (const noted of notedUp(one.at)) {
      owned(named, owns, noted.dir).set(noted.name, noted.directory)
    }
    if (one.went.length === 0) continue
    for (const dir of markedUp(one.at)) thinned.add(dir)
  }

  const composed = new Map<string, readonly string[]>()

  const linesAt = (at: string): readonly string[] => {
    const edit = edits.get(at)
    if (edit === undefined) return base.lines(at)
    const found = composed.get(at)
    if (found !== undefined) return found
    const held: string[] = []
    for (const line of base.lines(at)) {
      if (!edit.went.has(line) && !edit.came.has(line)) held.push(line)
    }
    const made = mergedIn(held, [...edit.came].sort())
    composed.set(at, made)
    return made
  }

  const holds = (at: string): boolean => {
    if (edits.has(at)) return linesAt(at).length > 0
    for (const name of named.get(at)?.keys() ?? []) {
      if (holds(beneath(at, name))) return true
    }
    if (at === ROOT || !thinned.has(at) || !base.holds(at)) return base.holds(at)
    for (const one of base.listing(at)) {
      if (holds(beneath(at, one.name))) return true
    }
    return false
  }

  const laying: Reading = {
    holds: holds,
    lines: linesAt,
    listing: (at) => {
      const found = new Map<string, boolean>()
      for (const one of base.listing(at)) found.set(one.name, one.directory)
      for (const [name, directory] of named.get(at) ?? []) found.set(name, directory)
      const said: Child[] = []
      for (const [name, directory] of found) {
        if (thinned.has(at) && !holds(beneath(at, name))) continue
        said.push({ name, directory })
      }
      return said
    },
  }
  LAID.set(laying, { base, edits, named, thinned })
  return laying
}
