import { keptPatch, patchAt } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import { clashing, mergedOnto } from "../body-merging/body-merging.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
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

export type Draft = {
  readonly path: string
  readonly was: string | null
  readonly body: string | null
}

export type Drafted =
  | { readonly patch: string | null; readonly clashed: readonly string[] }
  | { readonly why: string }

export type Bodies = ReadonlyMap<
  string,
  { readonly was: string | null; readonly body: string | null }
>

export type Rebased = {
  readonly held: Bodies
  readonly moved: readonly string[]
  readonly clashed: readonly string[]
}

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

function changesOf(held: Held): readonly Change[] {
  return [...held].map(([path, one]) => ({ path, body: one.body }))
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
    const next = patchOf(root, head, changesOf(then.held))
    const clashed = clashedIn(then.held)
    if (next === "") {
      dropBlobs(root, at)
      answer = { patch: null, clashed }
      return null
    }
    keepBlobs(root, at, next)
    answer = { patch: next, clashed }
    return next
  })
  return took ? answer : { why: NO_PAGE }
}
