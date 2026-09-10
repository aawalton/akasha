import { said as gitSaid } from "../../../git/running/git-running.module.code.ts"
import {
  clashing,
  markedAway,
  mergedOnto,
  sameBody,
} from "../body-merging/body-merging.module.code.ts"
import type { Kind } from "../calling/calling.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"

const RENAMED = /^R\d+\t(.+)\t(.+)$/

const FOLLOWED_AT_MOST = 32

const TWO_SIDES = "was renamed onto a path these bodies already carry:"

export type Running = {
  readonly checks: boolean
  readonly writerOwesReading: boolean
  readonly readersOweReading: boolean
}

const AUTHORED: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

export function runningOf(kind: Kind | undefined): Running {
  if (kind === undefined) return AUTHORED
  const { runsChecks, writerOwesReading, readersOweReading } = kind
  return { checks: runsChecks, writerOwesReading, readersOweReading }
}

export type Body = {
  readonly was: Uint8Array | null
  readonly body: Uint8Array | null
  readonly readersOweReading?: boolean
}

export type Bodies = ReadonlyMap<string, Body>

export function owedOf(held: Bodies): ReadonlyMap<string, boolean> {
  const owed = new Map<string, boolean>()
  for (const [path, one] of held) {
    if (one.readersOweReading === undefined) continue
    owed.set(path, one.readersOweReading)
  }
  return owed
}

export type Rebased = {
  readonly held: Bodies
  readonly moved: readonly string[]
  readonly clashed: readonly string[]
}

type Held = Map<string, Body>

export function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}

function merged(
  base: Uint8Array | null,
  mine: Uint8Array | null,
  theirs: Uint8Array | null
): { readonly body: Uint8Array | null } | { readonly why: string } {
  const said = mergedOnto(base, mine, theirs)
  if (!("why" in said)) return { body: said.body }
  return said.marked === undefined ? { why: said.why } : { body: said.marked }
}

function clashedIn(held: Bodies): readonly string[] {
  return [...held]
    .filter(([, one]) => clashing(one.body))
    .map(([path]) => path)
    .sort()
}

function wentTo(root: string, head: string, path: string): string | null {
  const at = gitSaid(root, ["log", "--format=%H", "--diff-filter=D", "-1", head, "--", path]).trim()
  if (at === "") return null
  const said = gitSaid(root, ["diff-tree", "-r", "-M", "--no-commit-id", "--name-status", at])
  for (const line of said.split("\n")) {
    const found = RENAMED.exec(line)
    if (found?.[1] === path) return found[2] ?? null
  }
  return null
}

function followed(root: string, head: string, path: string): string {
  let at = path
  for (let spun = 0; spun < FOLLOWED_AT_MOST; spun++) {
    const next = wentTo(root, head, at)
    if (next === null) return at
    at = next
    if (bodyAt(root, head, at) !== null) return at
  }
  return at
}

export function rebasedHeld(
  root: string,
  head: string,
  carried: Bodies
): Rebased | { readonly why: string } {
  const next: Held = new Map()
  const moved: string[] = []
  for (const [where, one] of carried) {
    let path = where
    let now = bodyAt(root, head, where)
    if (now === null && one.was !== null) {
      path = followed(root, head, where)
      if (path !== where) {
        if (carried.has(path)) return { why: `${where} ${TWO_SIDES} ${path}` }
        now = bodyAt(root, head, path)
      }
    }
    if (!sameBody(now, one.was)) moved.push(path)
    const held = one.body
    const away = now === null && one.was !== null && held !== null ? markedAway(held) : null
    if (away !== null) {
      next.set(path, { was: now, body: away, readersOweReading: one.readersOweReading })
      continue
    }
    const said = merged(one.was, one.body, now)
    if ("why" in said) return { why: `${path} — ${said.why}` }
    next.set(path, { was: now, body: said.body, readersOweReading: one.readersOweReading })
  }
  return { held: next, moved: moved.sort(), clashed: clashedIn(next) }
}
