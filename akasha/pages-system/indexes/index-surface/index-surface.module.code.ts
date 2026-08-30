import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

export type Listed = {
  readonly name: string
  readonly directory: boolean
}

export type Reading = {
  readonly holds: (at: string) => boolean
  readonly listing: (at: string) => readonly Listed[]
  readonly lines: (at: string) => readonly string[]
}

export type Filing = {
  readonly at: string
  readonly lines: readonly string[]
}

const SLASH = "/"

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
    lines: (at) => {
      try {
        return readFileSync(join(index, at), "utf8")
          .split("\n")
          .filter((one) => one !== "")
      } catch {
        return []
      }
    },
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

export function overlaidOn(under: Reading, filings: readonly Filing[]): Reading {
  const held = new Map<string, readonly string[]>()
  for (const one of filings) held.set(one.at, one.lines)

  const standing = new Set<string>()
  const emptied = new Set<string>()
  for (const [at, lines] of held) {
    if (lines.length === 0) emptied.add(at)
    else standing.add(at)
  }

  const added = new Map(
    [...Map.groupBy([...standing].flatMap(notedUp), (one) => one.dir)].map(
      ([dir, noted]): readonly [string, ReadonlyMap<string, boolean>] => [
        dir,
        new Map(noted.map((one): readonly [string, boolean] => [one.name, one.directory])),
      ]
    )
  )

  const thinned = new Set([...emptied].flatMap(markedUp))

  const stands = (at: string): boolean => {
    if (standing.has(at)) return true
    if (emptied.has(at)) return false
    if ((added.get(at)?.size ?? 0) > 0) return true
    if (!thinned.has(at)) return under.holds(at)
    return anythingLeft(under, at, emptied)
  }

  return {
    holds: stands,
    lines: (at) => held.get(at) ?? under.lines(at),
    listing: (at) => {
      const found = new Map<string, boolean>()
      for (const one of under.listing(at)) found.set(one.name, one.directory)
      for (const [name, directory] of added.get(at) ?? []) found.set(name, directory)
      const said: Listed[] = []
      for (const [name, directory] of found) {
        if (thinned.has(at) && !stands(beneath(at, name))) continue
        said.push({ name, directory })
      }
      return said
    },
  }
}
