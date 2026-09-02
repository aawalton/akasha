import { argvFor } from "@akasha/git/git-running"
import { ran } from "@akasha/utils-run/running"
import { textOf } from "../asking/asking.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"

export const INSIDE = "akasha/"

const SEGMENT = /[A-Za-z0-9._-]/

const LEADING = /[A-Za-z0-9._@/-]/

const FOUND_NOTHING = 1

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

export type Outside = { readonly respelt: readonly Respelt[] } | { readonly refusal: string }

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

export function namedTracked(
  root: string,
  base: string,
  named: readonly string[],
  limits: readonly string[]
): Found {
  if (named.length === 0) return { paths: [] }
  const said = named.flatMap((one) => ["-e", one])
  const done = ran(argvFor(root, ["grep", "-l", "-I", "-z", "-F", ...said, base, "--", ...limits]))
  if (done.code === FOUND_NOTHING) return { paths: [] }
  if (done.code !== 0) {
    return {
      refusal:
        "git could not say which tracked files carry what was asked after, so nothing was " +
        `judged — ${done.err.trim()}`,
    }
  }
  const held = `${base}:`
  const paths = done.out
    .split("\0")
    .flatMap((one) => (one.startsWith(held) ? [one.slice(held.length)] : []))
  return { paths: [...new Set(paths)].sort() }
}

export function outsideRespelt(
  root: string,
  base: string,
  named: readonly string[],
  respelling: Respelling
): Outside {
  const found = namedTracked(root, base, named, [`:(exclude)${INSIDE}`])
  if ("refusal" in found) return found
  const respelt: Respelt[] = []
  for (const path of found.paths) {
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
