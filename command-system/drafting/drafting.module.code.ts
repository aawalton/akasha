import { existsSync } from "node:fs"
import { join } from "node:path"
import { dropPatch, keptPatch, patchAt, patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import {
  clashing,
  markedAway,
  mergedOnto,
  sameBody,
} from "../body-merging/body-merging.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
import { committed } from "../committing/committing.module.code.ts"
import { holding } from "../holding/holding.module.code.ts"
import {
  blobsIn,
  bodyOf,
  type Change,
  dropBlobs,
  keepBlobs,
  patchOf,
} from "../patching/patching.module.code.ts"

const NO_PAGE = "a path that is no page keeps no patch"

const NOT_HELD = "the patch carries no body at"

const RENAMED = /^R\d+\t(.+)\t(.+)$/

const FOLLOWED_AT_MOST = 32

const TWO_SIDES = "was renamed onto a path this patch already carries a body at:"

const DRAFTED = "is drafted into; the change it draws is not landed"

export const APPLIED = "goes; the patch it held is applied"

export const DROPPED = "goes; the patch it held is dropped"

const MECHANICAL_AT = "Akasha-mechanical: true"

export type Draft = {
  readonly path: string
  readonly was: Uint8Array | null
  readonly body: Uint8Array | null
}

export type Kept = { readonly patch: string | null; readonly clashed: readonly string[] }

export type Drafted = Kept | { readonly why: string }

export type Bodies = ReadonlyMap<
  string,
  { readonly was: Uint8Array | null; readonly body: Uint8Array | null }
>

export type Rebased = {
  readonly held: Bodies
  readonly moved: readonly string[]
  readonly clashed: readonly string[]
}

export type Would = { readonly held: Bodies } | { readonly why: string }

type Held = Map<string, { readonly was: Uint8Array | null; readonly body: Uint8Array | null }>

type Worked = { readonly held: Held } | { readonly why: string }

function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}

function committedPatch(root: string, at: string, why: string): undefined {
  const there = existsSync(join(root, at))
  try {
    holding(root, () => {
      committed(root, there ? [at] : [], there ? [] : [at], `${at} ${why}`, null)
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

function heldIn(root: string, patch: string | null): Held {
  const held: Held = new Map()
  if (patch === null) return held
  for (const [path, blobs] of blobsIn(patch)) {
    held.set(path, { was: bodyOf(root, blobs.base), body: bodyOf(root, blobs.result) })
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

export function rebasedOnto(
  root: string,
  head: string,
  patch: string | null
): Rebased | { readonly why: string } {
  const carried = heldIn(root, patch)
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
      next.set(path, { was: now, body: away })
      continue
    }
    const said = merged(one.was, one.body, now)
    if ("why" in said) return { why: `${path} — ${said.why}` }
    next.set(path, { was: now, body: said.body })
  }
  return { held: next, moved: moved.sort(), clashed: clashedIn(next) }
}

function folded(held: Bodies, drafts: readonly Draft[]): Worked {
  const next: Held = new Map(held)
  for (const one of drafts) {
    const had = next.get(one.path)
    if (had === undefined) {
      next.set(one.path, { was: one.was, body: one.body })
      continue
    }
    const said = merged(one.was, had.body, one.body)
    if ("why" in said) return { why: `${one.path} — ${said.why}` }
    next.set(one.path, { was: one.was, body: said.body })
  }
  return { held: next }
}

export function wouldHold(root: string, page: string, drafts: readonly Draft[]): Would {
  if (patchAt(page) === null) return { why: NO_PAGE }
  const first = rebasedOnto(root, headOf(root), patchIn(root, page))
  if ("why" in first) return first
  const then = folded(first.held, drafts)
  return "why" in then ? then : { held: then.held }
}

function changesOf(held: Held): readonly Change[] {
  return [...held].map(([path, one]) => ({ path, body: one.body }))
}

export function mechanicalIn(patch: string | null): boolean {
  return patch !== null && patch.startsWith(`${MECHANICAL_AT}\n`)
}

function keptFrom(root: string, at: string, head: string, held: Held, mechanical: boolean): Kept {
  const next = patchOf(root, head, changesOf(held))
  const clashed = clashedIn(held)
  if (next === "") {
    dropBlobs(root, at)
    return { patch: null, clashed }
  }
  const text = mechanical ? `${MECHANICAL_AT}\n${next}` : next
  keepBlobs(root, at, text)
  return { patch: text, clashed }
}

export function drafted(
  root: string,
  page: string,
  drafts: readonly Draft[],
  mechanical = false
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
    const then = folded(first.held, drafts)
    if ("why" in then) {
      answer = then
      return patch
    }
    const still = mechanical && (patch === null || mechanicalIn(patch))
    const kept = keptFrom(root, at, head, then.held, still)
    answer = kept
    return kept.patch
  })
  if (!took) return { why: NO_PAGE }
  if (!("why" in answer)) committedPatch(root, at, DRAFTED)
  return answer
}

function draftsOf(held: Bodies): readonly Draft[] {
  return [...held].map(([path, one]) => ({ path, was: one.was, body: one.body }))
}

export function tookIn(root: string, page: string, from: string): Drafted {
  const at = patchAt(from)
  if (at === null) return { why: NO_PAGE }
  const theirs = patchIn(root, from)
  if (theirs === null) return { patch: patchIn(root, page), clashed: [] }
  const said = rebasedOnto(root, headOf(root), theirs)
  if ("why" in said) return said
  const took = drafted(root, page, draftsOf(said.held), mechanicalIn(theirs))
  if ("why" in took) return took
  droppedPatch(root, from, `goes; the patch it held went to ${page}`)
  return took
}

export function resolved(root: string, page: string, path: string, body: Uint8Array): Drafted {
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
    const had = first.held.get(path)
    if (had === undefined) {
      answer = { why: `${NOT_HELD} ${path}` }
      return patch
    }
    const next: Held = new Map(first.held)
    next.set(path, { was: had.was, body })
    const kept = keptFrom(root, at, head, next, false)
    answer = kept
    return kept.patch
  })
  if (!took) return { why: NO_PAGE }
  if (!("why" in answer)) committedPatch(root, at, DRAFTED)
  return answer
}
