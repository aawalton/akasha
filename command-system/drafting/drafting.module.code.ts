import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { dropPatch, keepPatch, keptPatch, patchAt, patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import {
  clashing,
  markedAway,
  mergedOnto,
  sameBody,
} from "../../commands/modules/body-merging/body-merging.module.code.ts"
import { bodyAt } from "../../commands/modules/commit-reading/commit-reading.module.code.ts"
import { committed } from "../../commands/modules/committing/committing.module.code.ts"
import { holding } from "../../commands/modules/holding/holding.module.code.ts"
import {
  blobsIn,
  bodyOf,
  type Change,
  dropBlobs,
  keepBlobs,
  patchOf,
} from "../../commands/modules/patching/patching.module.code.ts"
import type { Kind } from "../calling/calling.module.code.ts"

const NO_PAGE = "a path that is no page keeps no patch"

const NOT_HELD = "the patch carries no body at"

const RENAMED = /^R\d+\t(.+)\t(.+)$/

const FOLLOWED_AT_MOST = 32

const TWO_SIDES = "was renamed onto a path this patch already carries a body at:"

const DRAFTED = "is drafted into; the change it draws is not landed"

export const APPLIED = "goes; the patch it held is applied"

export const DROPPED = "goes; the patch it held is dropped"

export const UNFOLDED = "is put back; the fold the apply made is undone"

const NO_CHECKS_AT = "runsChecks: false"

const NOT_OWED_AT = "writerOwesReading: false"

const NOT_OWED_WAS = "runsWarrants: false"

const NOT_STALED_AT = "readersOweReading: false"

const NOT_STALED_ONE = `${NOT_STALED_AT} `

const DIFF_AT = "diff --git "

export type Running = {
  readonly checks: boolean
  readonly writerOwesReading: boolean
  readonly readersOweReading: boolean
}

export const AUTHORED: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

const RUNS_NOTHING: Running = { checks: false, writerOwesReading: false, readersOweReading: false }

export function runningOf(kind: Kind | undefined): Running {
  if (kind === undefined) return AUTHORED
  const { runsChecks, writerOwesReading, readersOweReading } = kind
  return { checks: runsChecks, writerOwesReading, readersOweReading }
}

export type Draft = {
  readonly path: string
  readonly was: Uint8Array | null
  readonly body: Uint8Array | null
  readonly readersOweReading?: boolean
}

export type Kept = {
  readonly patch: string | null
  readonly clashed: readonly string[]
  readonly held: Bodies
  readonly running: Running
}

export type Drafted = Kept | { readonly why: string }

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

export type Would = { readonly held: Bodies } | { readonly why: string }

type Held = Map<string, Body>

type Worked = { readonly held: Held } | { readonly why: string }

export function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}

function committedPatch(root: string, at: string, why: string): undefined {
  const body = existsSync(join(root, at)) ? readFileSync(join(root, at)) : null
  const wrote = new Map<string, Uint8Array>(body === null ? [] : [[at, body]])
  try {
    holding(root, () => {
      committed(root, wrote, body === null ? [at] : [], `${at} ${why}`, null)
    })
  } catch {}
}

export function droppedPatch(root: string, page: string, why: string): boolean {
  const at = patchAt(page)
  if (at === null) return false
  dropPatch(root, page)
  dropBlobs(root, at)
  committedPatch(root, at, why)
  return true
}

export function putBack(root: string, page: string, patch: string | null): boolean {
  const at = patchAt(page)
  if (at === null) return false
  if (patch === null) {
    dropPatch(root, page)
    dropBlobs(root, at)
  } else {
    keepBlobs(root, at, patch)
    keepPatch(root, page, patch)
  }
  committedPatch(root, at, UNFOLDED)
  return true
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

function linesIn(patch: string): readonly string[] {
  const at = patch.indexOf(DIFF_AT)
  return (at < 0 ? patch : patch.slice(0, at)).split("\n")
}

function carriedIn(patch: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const line of linesIn(patch)) {
    if (line.startsWith(NOT_STALED_ONE)) held.add(line.slice(NOT_STALED_ONE.length))
  }
  return held
}

export function heldIn(root: string, patch: string | null): Held {
  const held: Held = new Map()
  if (patch === null) return held
  const whole = linesIn(patch).includes(NOT_STALED_AT)
  const carried = carriedIn(patch)
  for (const [path, blobs] of blobsIn(patch)) {
    held.set(path, {
      was: bodyOf(root, blobs.base),
      body: bodyOf(root, blobs.result),
      readersOweReading: !whole && !carried.has(path),
    })
  }
  return held
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

export function rebasedOnto(
  root: string,
  head: string,
  patch: string | null
): Rebased | { readonly why: string } {
  return rebasedHeld(root, head, heldIn(root, patch))
}

function folded(held: Bodies, drafts: readonly Draft[], running: Running): Worked {
  const next: Held = new Map(held)
  for (const one of drafts) {
    const owed = one.readersOweReading ?? running.readersOweReading
    const had = next.get(one.path)
    if (had === undefined) {
      next.set(one.path, { was: one.was, body: one.body, readersOweReading: owed })
      continue
    }
    const said = merged(one.was, had.body, one.body)
    if ("why" in said) return { why: `${one.path} — ${said.why}` }
    next.set(one.path, {
      was: had.was,
      body: said.body,
      readersOweReading: (had.readersOweReading ?? true) || owed,
    })
  }
  return { held: next }
}

export function wouldHold(
  root: string,
  page: string,
  drafts: readonly Draft[],
  running: Running = AUTHORED
): Would {
  if (patchAt(page) === null) return { why: NO_PAGE }
  const first = rebasedOnto(root, headOf(root), patchIn(root, page))
  if ("why" in first) return first
  const then = folded(first.held, drafts, running)
  return "why" in then ? then : { held: then.held }
}

function changesOf(held: Held): readonly Change[] {
  return [...held].map(([path, one]) => ({ path, body: one.body }))
}

export function runningIn(patch: string | null): Running {
  if (patch === null) return RUNS_NOTHING
  const lines = linesIn(patch)
  return {
    checks: !lines.includes(NO_CHECKS_AT),
    writerOwesReading: !lines.includes(NOT_OWED_AT) && !lines.includes(NOT_OWED_WAS),
    readersOweReading: !lines.includes(NOT_STALED_AT),
  }
}

function eitherOf(one: Running, two: Running): Running {
  return {
    checks: one.checks || two.checks,
    writerOwesReading: one.writerOwesReading || two.writerOwesReading,
    readersOweReading: one.readersOweReading || two.readersOweReading,
  }
}

function staledIn(held: Bodies): readonly string[] {
  const carried = [...held]
    .filter(([, one]) => one.readersOweReading === false)
    .map(([path]) => path)
  if (carried.length === 0) return []
  if (carried.length === held.size) return [NOT_STALED_AT]
  return carried.sort().map((path) => `${NOT_STALED_ONE}${path}`)
}

function preambleOf(running: Running, held: Bodies): string {
  const said = [
    ...(running.checks ? [] : [NO_CHECKS_AT]),
    ...(running.writerOwesReading ? [] : [NOT_OWED_AT]),
    ...staledIn(held),
  ]
  return said.length === 0 ? "" : `${said.join("\n")}\n`
}

function keptFrom(root: string, at: string, head: string, held: Held, running: Running): Kept {
  const next = patchOf(root, head, changesOf(held))
  const clashed = clashedIn(held)
  if (next === "") {
    dropBlobs(root, at)
    return { patch: null, clashed, held, running }
  }
  const text = `${preambleOf(running, held)}${next}`
  keepBlobs(root, at, text)
  return { patch: text, clashed, held, running }
}

export function drafted(
  root: string,
  page: string,
  drafts: readonly Draft[],
  running: Running = AUTHORED
): Drafted {
  const at = patchAt(page)
  if (at === null) return { why: NO_PAGE }
  const head = headOf(root)
  let answer: Drafted = { why: NO_PAGE }
  const took = keptPatch(root, page, (patch) => {
    const first = rebasedOnto(root, head, patch)
    if ("why" in first) {
      answer = first
      return patch
    }
    const then = folded(first.held, drafts, running)
    if ("why" in then) {
      answer = then
      return patch
    }
    const still = eitherOf(running, runningIn(patch))
    const kept = keptFrom(root, at, head, then.held, still)
    answer = kept
    return kept.patch
  })
  if (!took) return { why: NO_PAGE }
  if (!("why" in answer)) committedPatch(root, at, DRAFTED)
  return answer
}

function draftsOf(held: Bodies): readonly Draft[] {
  return [...held].map(([path, one]) => ({
    path,
    was: one.was,
    body: one.body,
    readersOweReading: one.readersOweReading,
  }))
}

export function tookIn(root: string, page: string, from: string): Drafted {
  const at = patchAt(from)
  if (at === null) return { why: NO_PAGE }
  const theirs = patchIn(root, from)
  if (theirs === null) {
    const mine = patchIn(root, page)
    return { patch: mine, clashed: [], held: heldIn(root, mine), running: runningIn(mine) }
  }
  const said = rebasedOnto(root, headOf(root), theirs)
  if ("why" in said) return said
  const took = drafted(root, page, draftsOf(said.held), runningIn(theirs))
  if ("why" in took) return took
  droppedPatch(root, from, `goes; the patch it held went to ${page}`)
  return took
}

type Reworking = (held: Bodies) => Held | { readonly why: string }

function reworked(root: string, page: string, running: Running, over: Reworking): Drafted {
  const at = patchAt(page)
  if (at === null) return { why: NO_PAGE }
  const head = headOf(root)
  let answer: Drafted = { why: NO_PAGE }
  const took = keptPatch(root, page, (patch) => {
    const first = rebasedOnto(root, head, patch)
    if ("why" in first) {
      answer = first
      return patch
    }
    const next = over(first.held)
    if ("why" in next) {
      answer = next
      return patch
    }
    const still = eitherOf(running, runningIn(patch))
    const kept = keptFrom(root, at, head, next, still)
    answer = kept
    return kept.patch
  })
  if (!took) return { why: NO_PAGE }
  if (!("why" in answer)) committedPatch(root, at, DRAFTED)
  return answer
}

export function resolved(root: string, page: string, path: string, body: Uint8Array): Drafted {
  return reworked(root, page, AUTHORED, (held) => {
    const had = held.get(path)
    if (had === undefined) return { why: `${NOT_HELD} ${path}` }
    const next: Held = new Map(held)
    next.set(path, { was: had.was, body, readersOweReading: true })
    return next
  })
}

export function droppedAt(root: string, page: string, path: string): Drafted {
  return reworked(root, page, RUNS_NOTHING, (held) => {
    if (!held.has(path)) return { why: `${NOT_HELD} ${path}` }
    const next: Held = new Map(held)
    next.delete(path)
    return next
  })
}
