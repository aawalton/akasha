import { existsSync } from "node:fs"
import { join } from "node:path"
import { dropPatch, keptPatch, patchAt, patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import { clashing, mergedOnto } from "../body-merging/body-merging.module.code.ts"
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

const TEXT = new TextDecoder()

const BYTES = new TextEncoder()

const NO_PAGE = "a path that is no page keeps no patch"

const NOT_HELD = "the patch carries no body at"

const DRAFTED = "is drafted into; the change it draws is not landed"

export const APPLIED = "goes; the patch it held is applied"

export const DROPPED = "goes; the patch it held is dropped"

export type Draft = {
  readonly path: string
  readonly was: string | null
  readonly body: string | null
}

export type Kept = { readonly patch: string | null; readonly clashed: readonly string[] }

export type Drafted = Kept | { readonly why: string }

export type Bodies = ReadonlyMap<
  string,
  { readonly was: string | null; readonly body: string | null }
>

export type Rebased = {
  readonly held: Bodies
  readonly moved: readonly string[]
  readonly clashed: readonly string[]
}

export type Would = { readonly held: Bodies } | { readonly why: string }

type Held = Map<string, { readonly was: string | null; readonly body: string | null }>

type Worked = { readonly held: Held } | { readonly why: string }

function textOf(held: Uint8Array | null): string | null {
  return held === null ? null : TEXT.decode(held)
}

function bytesOf(held: string | null): Uint8Array | null {
  return held === null ? null : BYTES.encode(held)
}

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
  base: string | null,
  mine: string | null,
  theirs: string | null
): { readonly body: string | null } | { readonly why: string } {
  const said = mergedOnto(bytesOf(base), bytesOf(mine), bytesOf(theirs))
  if (!("why" in said)) return { body: textOf(said.body) }
  const marked = textOf(said.marked ?? null)
  return marked === null ? { why: said.why } : { body: marked }
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

export function rebasedOnto(
  root: string,
  head: string,
  patch: string | null
): Rebased | { readonly why: string } {
  const next: Held = new Map()
  const moved: string[] = []
  for (const [path, one] of heldIn(root, patch)) {
    const now = textOf(bodyAt(root, head, path))
    if (now !== one.was) moved.push(path)
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

function keptFrom(root: string, at: string, head: string, held: Held): Kept {
  const next = patchOf(root, head, changesOf(held))
  const clashed = clashedIn(held)
  if (next === "") {
    dropBlobs(root, at)
    return { patch: null, clashed }
  }
  keepBlobs(root, at, next)
  return { patch: next, clashed }
}

export function drafted(root: string, page: string, drafts: readonly Draft[]): Drafted {
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
    const kept = keptFrom(root, at, head, then.held)
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
  const took = drafted(root, page, draftsOf(said.held))
  if ("why" in took) return took
  droppedPatch(root, from, `goes; the patch it held went to ${page}`)
  return took
}

export function resolved(root: string, page: string, path: string, body: string): Drafted {
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
    const kept = keptFrom(root, at, head, next)
    answer = kept
    return kept.patch
  })
  if (!took) return { why: NO_PAGE }
  if (!("why" in answer)) committedPatch(root, at, DRAFTED)
  return answer
}
