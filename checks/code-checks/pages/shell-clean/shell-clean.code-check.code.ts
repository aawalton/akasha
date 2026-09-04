import { worldOf } from "@akasha/code-system/code-tests"
import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import { ran } from "@akasha/utils-run/running"
import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  everyFileOf,
  FILES,
  input,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const SH = ".sh"

export const TOOL = "shellcheck"

const ARGV: readonly string[] = ["-x", "--source-path=SCRIPTDIR", "--format=json1"]

const JUDGED: ReadonlySet<number> = new Set([0, 1])

const COMMENTS = "comments"

const WORLD = "the world this change was stood up in"

const UNLOOKED = "A linter that could not look has verified nothing, so this change is not judged."

const SAID_AT_MOST = 240

export type Found = {
  readonly path: string
  readonly line: number
  readonly column: number
  readonly code: number
  readonly level: string
  readonly said: string
}

export type Looked = {
  readonly found: readonly Found[]
  readonly failed: string | null
}

const SHELLS: Selector<Body> = {
  named: "shell scripts",
  isInput: (path) => path.endsWith(SH),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => one.path.endsWith(SH)),
}

export function carriedIn(change: Change): readonly string[] {
  const held = change.changed.filter((one) => one.endsWith(SH) && change.after(one) !== null)
  return [...new Set(held)].sort()
}

export function besideIn(change: Change, shadow: Shadow): readonly string[] {
  const every = everyFileOf(shadow.index).filter((one) => one.endsWith(SH))
  return [...new Set([...every, ...carriedIn(change)])].sort()
}

export function foundOf(held: unknown): Found | null {
  if (typeof held !== "object" || held === null) return null
  const said = held as Record<string, unknown>
  const path = said.file
  const level = said.level
  const message = said.message
  const line = said.line
  const column = said.column
  const code = said.code
  if (typeof path !== "string" || typeof level !== "string" || typeof message !== "string") {
    return null
  }
  if (typeof line !== "number" || typeof column !== "number" || typeof code !== "number") {
    return null
  }
  return { path, line, column, code, level, said: message }
}

export function foundIn(output: string): readonly Found[] | null {
  let held: unknown
  try {
    held = JSON.parse(output)
  } catch {
    return null
  }
  if (typeof held !== "object" || held === null) return null
  const said = (held as Record<string, unknown>)[COMMENTS]
  if (!Array.isArray(said)) return null
  const every: Found[] = []
  for (const one of said) {
    const each = foundOf(one)
    if (each === null) return null
    every.push(each)
  }
  return every
}

export function lookedOver(root: string, named: readonly string[], at: string | null): Looked {
  if (at === null) {
    return { found: [], failed: `no \`${TOOL}\` stands on PATH, so nothing was looked at` }
  }
  const done = ran([at, ...ARGV, ...named], { cwd: root })
  if (!JUDGED.has(done.code)) {
    const why = done.err.trim().slice(0, SAID_AT_MOST)
    return {
      found: [],
      failed: `\`${TOOL}\` exited ${done.code} and looked at nothing — ${why}`,
    }
  }
  const found = foundIn(done.out)
  if (found === null) {
    return { found: [], failed: `the \`json1\` answer \`${TOOL}\` gave could not be read` }
  }
  return { found, failed: null }
}

export function reasonOf(one: Found): string {
  return `SC${one.code} (${one.level}) at line ${one.line}, column ${one.column} — ${one.said}`
}

function earlier(one: Found, two: Found): number {
  if (one.path !== two.path) return one.path < two.path ? -1 : 1
  if (one.line !== two.line) return one.line - two.line
  return one.column - two.column
}

export function judgedOf(looked: Looked, first: string, root: string): readonly Judged[] {
  if (looked.failed === null) {
    const held = [...looked.found].sort(earlier)
    return held.map((one) => ({ path: one.path, reason: reasonOf(one) }))
  }
  const why = looked.failed.replaceAll(`${root}/`, "").replaceAll(root, WORLD)
  return [{ path: first, reason: `${why}. ${UNLOOKED}` }]
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedIn(change)
  const first = carried[0]
  if (first === undefined) return []
  const world = worldOf(change.root, besideIn(change, shadow), change.after, null)
  try {
    return judgedOf(lookedOver(world.root, carried, Bun.which(TOOL)), first, world.root)
  } finally {
    world.sweep()
  }
}

export const shellClean = input(SHELLS, refusalsIn)
