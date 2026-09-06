import { argvFor } from "@akasha/git/git-running"
import { ran } from "@akasha/utils-run/running"
import { textOf } from "../asking/asking.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"

const SEGMENT = /[A-Za-z0-9._-]/

const LEADING = /[A-Za-z0-9._@/-]/

const APART = SEGMENT.source.replace("[", "[^")

const PATTERNED = /[$()*+.?[\\\]^{|}]/g

/** A name every character of which a path-like run of a body carries. */
const RUN_CARRIES = /^[A-Za-z0-9._@/-]+$/

/** The names no run carries whole, worked out once for each set of names handed in. */
const CARRIED_APART = new WeakMap<object, readonly string[]>()

/** The names gathered for looking up, worked out once for each set of names handed in. */
const GATHERED = new WeakMap<object, ReadonlySet<string>>()

const PARTED_BY = "/"

const FOUND_NOTHING = 1

const AT_MOST = 60000

const REACHED_AT_MOST = 20000

const AS_PATTERN = "-E"

const EITHER = "|"

export type Placed = {
  readonly at: number
  readonly was: string
  readonly now: string
}

export type Found = { readonly paths: readonly string[] } | { readonly refusal: string }

export type Respelt = {
  readonly path: string
  readonly held: Uint8Array
  readonly was: string
  readonly text: string
}

export type Respelling = (path: string, text: string) => string

export type Respellings =
  | { readonly respelt: readonly Respelt[]; readonly left: readonly string[] }
  | { readonly refusal: string }

export function boundedAt(text: string, at: number, was: string): boolean {
  const before = at === 0 ? "" : text.slice(at - 1, at)
  const after = text.slice(at + was.length, at + was.length + 1)
  if (before !== "" && LEADING.test(before)) return false
  if (!was.includes(PARTED_BY)) return after === PARTED_BY
  return after === "" || !SEGMENT.test(after)
}

function apartFrom(names: Iterable<string>, at: object): readonly string[] {
  const found = CARRIED_APART.get(at)
  if (found !== undefined) return found
  const apart: string[] = []
  for (const one of names) if (!RUN_CARRIES.test(one)) apart.push(one)
  CARRIED_APART.set(at, apart)
  return apart
}

function gatheredIn(names: Iterable<string>, at: object): ReadonlySet<string> {
  const found = GATHERED.get(at)
  if (found !== undefined) return found
  const held = new Set(names)
  GATHERED.set(at, held)
  return held
}

/** Where a name a run leads could end, which is wherever the run stops carrying a segment. */
function endsIn(run: string): readonly number[] {
  const found: number[] = [run.length]
  for (let at = 1; at < run.length; at = at + 1) {
    if (!SEGMENT.test(run.charAt(at))) found.push(at)
  }
  return found
}

/**
 * Every name a body could carry, told once for each place a name could start. A name starts
 * where a path-like run starts, no other place having a character before it that leaves a name
 * bounded, so the body is read through once however many names are looked for.
 */
function runsTold(text: string, told: (at: number, was: string) => boolean): boolean {
  const runs = /[A-Za-z0-9._@/-]+/g
  for (let one = runs.exec(text); one !== null; one = runs.exec(text)) {
    const run = one[0]
    for (const end of endsIn(run)) {
      if (told(one.index, end === run.length ? run : run.slice(0, end))) return true
    }
  }
  return false
}

export function spellsBounded(text: string, named: readonly string[]): boolean {
  const held = gatheredIn(named, named)
  if (runsTold(text, (at, was) => held.has(was) && boundedAt(text, at, was))) return true
  for (const was of apartFrom(named, named)) {
    for (let at = text.indexOf(was); at >= 0; at = text.indexOf(was, at + 1)) {
      if (boundedAt(text, at, was)) return true
    }
  }
  return false
}

export function namesIn(text: string, named: ReadonlyMap<string, string>): readonly Placed[] {
  const found: Placed[] = []
  runsTold(text, (at, was) => {
    const now = named.get(was)
    if (now !== undefined && boundedAt(text, at, was)) found.push({ at, was, now })
    return false
  })
  for (const was of apartFrom(named.keys(), named)) {
    const now = named.get(was)
    if (now === undefined) continue
    for (let at = text.indexOf(was); at >= 0; at = text.indexOf(was, at + 1)) {
      if (boundedAt(text, at, was)) found.push({ at, was, now })
    }
  }
  return found
}

export function splicedOver(text: string, found: readonly Placed[]): string {
  const sorted = [...found].sort(
    (one, other) => one.at - other.at || other.was.length - one.was.length
  )
  let out = ""
  let at = 0
  for (const one of sorted) {
    if (one.at < at) continue
    out = `${out}${text.slice(at, one.at)}${one.now}`
    at = one.at + one.was.length
  }
  return `${out}${text.slice(at)}`
}

export function respeltNames(text: string, named: ReadonlyMap<string, string>): string {
  return splicedOver(text, namesIn(text, named))
}

export function escapedFor(one: string): string {
  return one.replace(PATTERNED, (was) => `\\${was}`)
}

export function reachesFor(parts: readonly string[]): readonly string[] {
  const held = parts.map(escapedFor).join(EITHER)
  return [`${PARTED_BY}(${held})($|${APART})`, `(^|${APART})(${held})${PARTED_BY}`]
}

export function endedFor(name: string): string {
  return `${escapedFor(name)}($|${APART})`
}

export function batchedIn(
  said: readonly string[],
  atMost: number = AT_MOST
): readonly (readonly string[])[] {
  const batches: string[][] = []
  let held: string[] = []
  let width = 0
  for (const one of said) {
    if (held.length > 0 && width + one.length > atMost) {
      batches.push(held)
      held = []
      width = 0
    }
    held.push(one)
    width = width + one.length
  }
  if (held.length > 0) batches.push(held)
  return batches
}

/** The shortest names asked after, which every longer name asked after ends with. */
export function lookedFor(named: readonly string[]): readonly string[] {
  const held = new Set(named)
  const found: string[] = []
  for (const one of named) {
    const parts = one.split(PARTED_BY)
    let shorter = false
    for (let at = 1; at < parts.length && !shorter; at = at + 1) {
      shorter = held.has(parts.slice(at).join(PARTED_BY))
    }
    if (!shorter) found.push(one)
  }
  return found
}

function foundBy(root: string, base: string, said: readonly string[]): Found {
  const paths: string[] = []
  const held = `${base}:`
  for (const batch of batchedIn(said)) {
    const asked = batch.join(EITHER)
    const done = ran(argvFor(root, ["grep", "-l", "-I", "-z", AS_PATTERN, "-e", asked, base, "--"]))
    if (done.code === FOUND_NOTHING) continue
    if (done.code !== 0) {
      return {
        refusal:
          "git could not say which tracked files carry what was asked after, so nothing was " +
          `judged — ${done.err.trim()}`,
      }
    }
    for (const one of done.out.split("\0")) {
      if (one.startsWith(held)) paths.push(one.slice(held.length))
    }
  }
  return { paths: [...new Set(paths)].sort() }
}

export function namedTracked(root: string, base: string, named: readonly string[]): Found {
  if (named.length === 0) return { paths: [] }
  return foundBy(root, base, lookedFor(named).map(escapedFor))
}

export function reachedTracked(root: string, base: string, parts: readonly string[]): Found {
  if (parts.length === 0) return { paths: [] }
  const paths: string[] = []
  for (const batch of batchedIn(parts, REACHED_AT_MOST)) {
    const found = foundBy(root, base, reachesFor(batch))
    if ("refusal" in found) return found
    paths.push(...found.paths)
  }
  return { paths: [...new Set(paths)].sort() }
}

export function spelledTracked(root: string, base: string, spelled: readonly string[]): Found {
  if (spelled.length === 0) return { paths: [] }
  return foundBy(root, base, spelled.map(endedFor))
}

export function spelledRespelt(
  root: string,
  base: string,
  named: readonly string[],
  respelling: Respelling,
  already: ReadonlySet<string>
): Respellings {
  const found = namedTracked(root, base, named)
  if ("refusal" in found) return found
  const respelt: Respelt[] = []
  const left: string[] = []
  for (const path of found.paths) {
    if (already.has(path)) continue
    const held = bodyAt(root, base, path)
    if (held === null) continue
    const was = textOf(held)
    if (was === null) continue
    const text = respelling(path, was)
    if (text === was) {
      if (spellsBounded(was, named)) left.push(path)
      continue
    }
    respelt.push({ path, held, was, text })
  }
  return { respelt, left }
}
