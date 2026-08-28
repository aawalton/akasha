import type { Roots } from "../page.ts"
import { pageNameOf } from "../name/name.ts"
import { blockOf } from "../text/text.ts"
import { type Named, type Source, saidNamed, saidSource } from "./entry/entry.ts"
import {
  type Held,
  type Resolve,
  type Stated,
  handlesOf,
  heldAt,
  identityOver,
  resolveOver,
  statedOf,
} from "./identity/identity.ts"
import { linkTargetsFrom } from "./link/link.ts"
import { identityFile, relationFileFor } from "./place/place.ts"
import { type Holds, type Relation, reachedFrom, relationsOver } from "./relation/relation.ts"
import { trackedIn } from "../tracked/tracked.ts"
import { REPOS } from "../../repo/roots/roots.ts"
import {
  identityBodies,
  keepBuiltFrom,
  keepPages,
  keepRelations,
  loadPages,
  loadRelations,
  marksFrom,
  pageOidsIn,
  relationBodies,
  settleIdentityFiles,
  settleRelationFiles,
  underIndexLock,
  updateAt,
  updateNamedIn,
} from "./store/store.ts"

export type Built = {
  readonly files: number
  readonly entries: number
  readonly pages: number
  readonly buckets: number
  readonly handles: number
}

export type Standing = {
  readonly resolve: Resolve
  readonly relations: ReadonlyMap<string, readonly Relation[]>
}

export type Landing = {
  readonly source: Source
  readonly before: string | null
  readonly after: string | null
}

type Landed = {
  readonly source: Source
  readonly before: Held | null
  readonly after: Held | null
}

type Placed = {
  readonly file: string
  readonly one: Named
}

type Placing = {
  readonly gone: boolean
  readonly one: Named
}

const PART = "\t"

function fileKey(relation: string, target: string): string {
  return `${relation}${PART}${target}`
}

function partsOf(key: string): readonly [string, string] {
  const at = key.indexOf(PART)
  return at === -1 ? [key, ""] : [key.slice(0, at), key.slice(at + 1)]
}

function placedFor(one: Stated | null): readonly Placed[] {
  if (one === null) return []
  return handlesOf(one).map((handle) => ({
    file: identityFile(handle.word, handle.at),
    one: { at: handle.at, repo: one.repo, key: one.key },
  }))
}

function saidPlaced(placed: Placed): string {
  return `${placed.file}\t${saidNamed(placed.one)}`
}

export function heldOf(repo: string, key: string, text: string): Held | null {
  const named = pageNameOf(key)
  if (named === null) return null
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return { repo, key, stem: named.stem, type: named.type, fm, links: linkTargetsFrom(repo, key, text) }
}

function holdsOver(roots: Roots): Holds {
  const held = new Map<string, ReadonlySet<string>>()
  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    held.set(repo, new Set(trackedIn(root)))
  }
  return (repo, key) => held.get(repo)?.has(key) ?? false
}

function oidsOver(roots: Roots): ReadonlyMap<string, ReadonlyMap<string, string>> {
  const made = new Map<string, ReadonlyMap<string, string>>()
  for (const repo of REPOS) {
    const root = roots[repo]
    if (root === undefined) continue
    made.set(repo, pageOidsIn(root))
  }
  return made
}

function missedDuring(
  roots: Roots,
  was: ReadonlyMap<string, ReadonlyMap<string, string>>,
  standing: ReadonlyMap<string, ReadonlyMap<string, string>>,
  walked: readonly Held[]
): readonly Landed[] {
  const seen = new Map<string, Held>()
  for (const one of walked) seen.set(fileKey(one.repo, one.key), one)
  const found: Landed[] = []
  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    const before = was.get(repo) ?? new Map<string, string>()
    const now = standing.get(repo) ?? new Map<string, string>()
    for (const key of new Set([...before.keys(), ...now.keys()])) {
      if (before.get(key) === now.get(key)) continue
      const named = pageNameOf(key)
      if (named === null) continue
      const had = seen.get(fileKey(repo, key)) ?? null
      const nowHeld = now.has(key) ? heldAt(repo, root, key, named.stem, named.type) : null
      if (had === null && nowHeld === null) continue
      found.push({ source: { repo, key }, before: had, after: nowHeld })
    }
  }
  return found
}

export function buildOver(roots: Roots): Built {
  const was = oidsOver(roots)
  const identity = identityOver(roots)
  const relations = relationsOver(identity.pages)
  const holds = holdsOver(roots)
  const stated = identity.pages.map(statedOf)
  const under = new Map<string, Source[]>()
  let entries = 0
  for (const at of identity.pages) {
    for (const one of reachedFrom(at, relations, identity.at, holds)) {
      const key = fileKey(one.relation, one.target)
      const held = under.get(key) ?? []
      held.push({ repo: at.repo, key: at.key })
      under.set(key, held)
      entries++
    }
  }
  const buckets = new Map<string, Named[]>()
  let handles = 0
  for (const one of stated) {
    for (const placed of placedFor(one)) {
      const held = buckets.get(placed.file) ?? []
      held.push(placed.one)
      buckets.set(placed.file, held)
      handles++
    }
  }
  const wanted = new Map<string, readonly Source[]>()
  for (const [key, sources] of under) {
    const [relation, target] = partsOf(key)
    wanted.set(relationFileFor(relation, target), sources)
  }
  const relationText = relationBodies(wanted)
  const identityText = identityBodies(buckets)
  return underIndexLock(() => {
    settleRelationFiles(relationText)
    settleIdentityFiles(identityText)
    keepPages(stated)
    keepRelations(relations)
    const standing = oidsOver(roots)
    const missed = missedDuring(roots, was, standing, identity.pages)
    if (missed.length > 0) appliedInto(stated, missed, holds)
    keepBuiltFrom(marksFrom(standing))
    return { files: under.size, entries, pages: stated.length, buckets: buckets.size, handles }
  })
}

export function standingHere(): Standing {
  return { resolve: resolveOver(loadPages()), relations: loadRelations() }
}

function withoutSource(sources: readonly Source[], source: Source): readonly Source[] {
  const said = saidSource(source)
  return sources.filter((one) => saidSource(one) !== said)
}

function withSource(sources: readonly Source[], source: Source): readonly Source[] {
  const said = saidSource(source)
  for (const one of sources) {
    if (saidSource(one) === said) return sources
  }
  return [...sources, source]
}

function keysOf(
  at: Held | null,
  relations: ReadonlyMap<string, readonly Relation[]>,
  resolve: Resolve,
  holds: Holds
): ReadonlySet<string> {
  const found = new Set<string>()
  if (at === null) return found
  for (const one of reachedFrom(at, relations, resolve, holds)) {
    found.add(fileKey(one.relation, one.target))
  }
  return found
}

export function updateFor(
  standing: Standing,
  source: Source,
  before: Held | null,
  after: Held | null,
  holds: Holds
): number {
  const was = keysOf(before, standing.relations, standing.resolve, holds)
  const now = keysOf(after, standing.relations, standing.resolve, holds)
  let touched = 0
  for (const key of was) {
    if (now.has(key)) continue
    const [relation, target] = partsOf(key)
    updateAt(relation, target, (sources) => withoutSource(sources, source))
    touched++
  }
  for (const key of now) {
    if (was.has(key)) continue
    const [relation, target] = partsOf(key)
    updateAt(relation, target, (sources) => withSource(sources, source))
    touched++
  }
  return touched
}

function placingsBy(landed: readonly Landed[]): ReadonlyMap<string, readonly Placing[]> {
  const byFile = new Map<string, Placing[]>()
  const at = (file: string): Placing[] => {
    const held = byFile.get(file)
    if (held !== undefined) return held
    const made: Placing[] = []
    byFile.set(file, made)
    return made
  }
  for (const one of landed) {
    const was = placedFor(one.before === null ? null : statedOf(one.before))
    const now = placedFor(one.after === null ? null : statedOf(one.after))
    const standing = new Set(now.map(saidPlaced))
    for (const placed of was) {
      if (standing.has(saidPlaced(placed))) continue
      at(placed.file).push({ gone: true, one: placed.one })
    }
    for (const placed of now) at(placed.file).push({ gone: false, one: placed.one })
  }
  return byFile
}

function updateNamed(landed: readonly Landed[]): number {
  let touched = 0
  for (const [file, placings] of placingsBy(landed)) {
    updateNamedIn(file, (held) => {
      let made = [...held]
      let changed = false
      for (const placing of placings) {
        const said = saidNamed(placing.one)
        if (placing.gone) {
          made = made.filter((one) => saidNamed(one) !== said)
          changed = true
          touched++
          continue
        }
        if (made.some((one) => saidNamed(one) === said)) continue
        made.push(placing.one)
        changed = true
        touched++
      }
      return changed ? made : null
    })
  }
  return touched
}

function restatedAll(held: readonly Stated[], landed: readonly Landed[]): readonly Stated[] {
  const said = new Set(landed.map((one) => saidSource(one.source)))
  const kept = held.filter((one) => !said.has(saidSource(one)))
  const added: Stated[] = []
  for (const one of landed) {
    if (one.after !== null) added.push(statedOf(one.after))
  }
  return [...kept, ...added]
}

function landedOf(landings: readonly Landing[]): readonly Landed[] {
  const found: Landed[] = []
  for (const one of landings) {
    const before = one.before === null ? null : heldOf(one.source.repo, one.source.key, one.before)
    const after = one.after === null ? null : heldOf(one.source.repo, one.source.key, one.after)
    if (before === null && after === null) continue
    found.push({ source: one.source, before, after })
  }
  return found
}

function appliedInto(
  pages: readonly Stated[],
  landed: readonly Landed[],
  holds: Holds
): number {
  const stated = restatedAll(pages, landed)
  const standing: Standing = { resolve: resolveOver(stated), relations: loadRelations() }
  let touched = 0
  for (const one of landed) {
    touched += updateFor(standing, one.source, one.before, one.after, holds)
  }
  touched += updateNamed(landed)
  keepPages(stated)
  return touched
}

export function landHere(landings: readonly Landing[], holds: Holds): number {
  const landed = landedOf(landings)
  if (landed.length === 0) return 0
  return underIndexLock(() => {
    const pages = loadPages()
    if (pages.length === 0) {
      throw new Error(
        "the page index holds no page at all, so nothing here can be updated and this " +
          "landing would otherwise be taken as done"
      )
    }
    return appliedInto(pages, landed, holds)
  })
}
