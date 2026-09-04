import { argvFor } from "@akasha/git/git-running"
import { ran } from "@akasha/utils-run/running"
import { textOf } from "../asking/asking.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"

const SEGMENT = /[A-Za-z0-9._-]/

const LEADING = /[A-Za-z0-9._@/-]/

const APART = SEGMENT.source.replace("[", "[^")

const PATTERNED = /[$()*+.?[\\\]^{|}]/g

const PARTED_BY = "/"

const FOUND_NOTHING = 1

const AT_MOST = 60000

const REACHED_AT_MOST = 20000

const AS_WRITTEN = "-F"

const AS_PATTERN = "-E"

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

export type Respellings = { readonly respelt: readonly Respelt[] } | { readonly refusal: string }

export function boundedAt(text: string, at: number, was: string): boolean {
  const before = at === 0 ? "" : text.slice(at - 1, at)
  const after = text.slice(at + was.length, at + was.length + 1)
  if (before !== "" && LEADING.test(before)) return false
  return after === "" || !SEGMENT.test(after)
}

export function namesIn(text: string, named: ReadonlyMap<string, string>): readonly Placed[] {
  const found: Placed[] = []
  for (const [was, now] of named) {
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
  const held = parts.map(escapedFor).join("|")
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

function foundBy(root: string, base: string, how: string, said: readonly string[]): Found {
  const paths: string[] = []
  const held = `${base}:`
  for (const batch of batchedIn(said)) {
    const asked = batch.flatMap((one) => ["-e", one])
    const done = ran(argvFor(root, ["grep", "-l", "-I", "-z", how, ...asked, base, "--"]))
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
  return foundBy(root, base, AS_WRITTEN, named)
}

export function reachedTracked(root: string, base: string, parts: readonly string[]): Found {
  if (parts.length === 0) return { paths: [] }
  const paths: string[] = []
  for (const batch of batchedIn(parts, REACHED_AT_MOST)) {
    const found = foundBy(root, base, AS_PATTERN, reachesFor(batch))
    if ("refusal" in found) return found
    paths.push(...found.paths)
  }
  return { paths: [...new Set(paths)].sort() }
}

export function spelledTracked(root: string, base: string, spelled: readonly string[]): Found {
  if (spelled.length === 0) return { paths: [] }
  return foundBy(root, base, AS_PATTERN, spelled.map(endedFor))
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
  for (const path of found.paths) {
    if (already.has(path)) continue
    const held = bodyAt(root, base, path)
    if (held === null) continue
    const was = textOf(held)
    if (was === null) continue
    const text = respelling(path, was)
    if (text === was) continue
    respelt.push({ path, held, was, text })
  }
  return { respelt }
}
