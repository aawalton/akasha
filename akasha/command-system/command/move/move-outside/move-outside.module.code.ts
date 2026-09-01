import { argvFor } from "@akasha/git/git-running"
import { ran } from "@akasha/utils-run/running"
import { counted, textOf } from "../../../asking/asking.module.code.ts"
import { bodyAt } from "../../../commit-reading/commit-reading.module.code.ts"
import type { FileEdit } from "../../../landing/landing.module.code.ts"
import type { Carry } from "../../../reading/reading.module.code.ts"
import { blobIdOf } from "../../../reading/reading.module.code.ts"

const INSIDE = "akasha/"

const SEGMENT = /[A-Za-z0-9._-]/

const LEADING = /[A-Za-z0-9._@/-]/

const FOUND_NOTHING = 1

export const OUTSIDE_SPELLING =
  `a path that moved is looked for outside \`${INSIDE}\` as the path itself, so a body naming ` +
  "what moved by any other spelling is left alone"

export type Found = { readonly paths: readonly string[] } | { readonly refusal: string }

export type Outside = {
  readonly paths: readonly string[]
  readonly changes: readonly FileEdit[]
  readonly carries: readonly Carry[]
}

type Placed = {
  readonly at: number
  readonly was: string
  readonly now: string
}

function boundedAt(text: string, at: number, was: string): boolean {
  const before = at === 0 ? "" : text.slice(at - 1, at)
  const after = text.slice(at + was.length, at + was.length + 1)
  if (before !== "" && LEADING.test(before)) return false
  return after === "" || !SEGMENT.test(after)
}

function foundIn(text: string, moved: ReadonlyMap<string, string>): readonly Placed[] {
  const found: Placed[] = []
  for (const [was, now] of moved) {
    for (let at = text.indexOf(was); at >= 0; at = text.indexOf(was, at + 1)) {
      if (boundedAt(text, at, was)) found.push({ at, was, now })
    }
  }
  return found.sort((one, other) => one.at - other.at || other.was.length - one.was.length)
}

export function repointedText(text: string, moved: ReadonlyMap<string, string>): string {
  let out = ""
  let at = 0
  for (const one of foundIn(text, moved)) {
    if (one.at < at) continue
    out = `${out}${text.slice(at, one.at)}${one.now}`
    at = one.at + one.was.length
  }
  return `${out}${text.slice(at)}`
}

export function namedOutside(
  root: string,
  base: string,
  moved: ReadonlyMap<string, string>
): Found {
  const named = [...moved.keys()].flatMap((one) => ["-e", one])
  const done = ran(
    argvFor(root, ["grep", "-l", "-I", "-z", "-F", ...named, base, "--", `:(exclude)${INSIDE}`])
  )
  if (done.code === FOUND_NOTHING) return { paths: [] }
  if (done.code !== 0) {
    return {
      refusal:
        `git could not say which files outside \`${INSIDE}\` name what moved, so nothing was ` +
        `judged — ${done.err.trim()}`,
    }
  }
  const held = `${base}:`
  const paths = done.out
    .split("\0")
    .flatMap((one) => (one.startsWith(held) ? [one.slice(held.length)] : []))
  return { paths: [...new Set(paths)].sort() }
}

export function outsideIn(
  root: string,
  base: string,
  moved: ReadonlyMap<string, string>
): Outside | { readonly refusal: string } {
  const found = namedOutside(root, base, moved)
  if ("refusal" in found) return found
  const paths: string[] = []
  const changes: FileEdit[] = []
  const carries: Carry[] = []
  for (const path of found.paths) {
    const held = bodyAt(root, base, path)
    if (held === null) continue
    const text = textOf(held)
    if (text === null) continue
    const next = repointedText(text, moved)
    if (next === text) continue
    paths.push(path)
    carries.push({ was: path, now: path, from: blobIdOf(held) })
    changes.push({ path, body: new TextEncoder().encode(next), carried: true })
  }
  return { paths, changes, carries }
}

export function outsideSaid(paths: readonly string[], dry: boolean): readonly string[] {
  if (paths.length === 0) {
    return [`no file outside \`${INSIDE}\` named what moved`, OUTSIDE_SPELLING]
  }
  return [
    `${counted(paths.length, "file")} outside \`${INSIDE}\` naming what moved ` +
      `${dry ? "would be" : "was"} repointed — ${paths.join(", ")}`,
    OUTSIDE_SPELLING,
  ]
}
