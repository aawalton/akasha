import type { PageAt, Roots } from "../page-at.ts"
import { pageNameOf } from "../page-name.ts"
import { blockOf } from "../text.ts"
import { type Named, type Source, saidNamed, saidSource } from "./entry/entry.ts"
import {
  type Held,
  type Resolve,
  type Stated,
  handlesOf,
  identityOver,
  resolveOver,
  statedOf,
} from "./identity/identity.ts"
import { identityFile } from "./place/place.ts"
import { type Relation, reachedFrom, relationsOver } from "./relation/relation.ts"
import {
  builtFrom,
  emptyIndex,
  keepAt,
  keepBuiltFrom,
  keepNamedIn,
  keepPages,
  keepRelations,
  loadPages,
  loadRelations,
  markFor,
  marksOver,
  namedIn,
  sourcesAt,
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

const PART = "/"

function fileKey(relation: string, to: PageAt): string {
  return `${relation}${PART}${to.stem}${PART}${to.type}`
}

function partsOf(key: string): readonly [string, string, string] {
  const at = key.split(PART)
  return [at[0] ?? "", at[1] ?? "", at[2] ?? ""]
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
  return { repo, key, stem: named.stem, type: named.type, fm }
}

export function buildOver(roots: Roots): Built {
  const identity = identityOver(roots)
  const relations = relationsOver(identity.pages)
  const stated = identity.pages.map(statedOf)
  const under = new Map<string, Source[]>()
  let entries = 0
  for (const at of identity.pages) {
    for (const one of reachedFrom(at, relations, identity.at)) {
      const key = fileKey(one.relation, one.to)
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
  emptyIndex()
  for (const [key, sources] of under) {
    const [relation, stem, type] = partsOf(key)
    keepAt(relation, stem, type, sources)
  }
  for (const [file, held] of buckets) keepNamedIn(file, held)
  keepPages(stated)
  keepRelations(relations)
  keepBuiltFrom(marksOver(roots))
  return { files: under.size, entries, pages: stated.length, buckets: buckets.size, handles }
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
  resolve: Resolve
): ReadonlySet<string> {
  const found = new Set<string>()
  if (at === null) return found
  for (const one of reachedFrom(at, relations, resolve)) found.add(fileKey(one.relation, one.to))
  return found
}

export function updateFor(
  standing: Standing,
  source: Source,
  before: Held | null,
  after: Held | null
): number {
  const was = keysOf(before, standing.relations, standing.resolve)
  const now = keysOf(after, standing.relations, standing.resolve)
  let touched = 0
  for (const key of was) {
    if (now.has(key)) continue
    const [relation, stem, type] = partsOf(key)
    keepAt(relation, stem, type, withoutSource(sourcesAt(relation, stem, type), source))
    touched++
  }
  for (const key of now) {
    if (was.has(key)) continue
    const [relation, stem, type] = partsOf(key)
    keepAt(relation, stem, type, withSource(sourcesAt(relation, stem, type), source))
    touched++
  }
  return touched
}

function updateNamed(landed: readonly Landed[]): number {
  const loaded = new Map<string, Named[]>()
  const changed = new Set<string>()
  const load = (file: string): Named[] => {
    const held = loaded.get(file)
    if (held !== undefined) return held
    const made = [...namedIn(file)]
    loaded.set(file, made)
    return made
  }
  let touched = 0
  for (const one of landed) {
    const was = placedFor(one.before === null ? null : statedOf(one.before))
    const now = placedFor(one.after === null ? null : statedOf(one.after))
    const standing = new Set(now.map(saidPlaced))
    for (const placed of was) {
      if (standing.has(saidPlaced(placed))) continue
      const said = saidNamed(placed.one)
      loaded.set(
        placed.file,
        load(placed.file).filter((held) => saidNamed(held) !== said)
      )
      changed.add(placed.file)
      touched++
    }
    for (const placed of now) {
      const held = load(placed.file)
      const said = saidNamed(placed.one)
      if (held.some((one) => saidNamed(one) === said)) continue
      held.push(placed.one)
      changed.add(placed.file)
      touched++
    }
  }
  for (const file of changed) keepNamedIn(file, loaded.get(file) ?? [])
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

export function landHere(landings: readonly Landing[]): number {
  const pages = loadPages()
  if (pages.length === 0) return 0
  const landed = landedOf(landings)
  if (landed.length === 0) return 0
  const stated = restatedAll(pages, landed)
  const standing: Standing = { resolve: resolveOver(stated), relations: loadRelations() }
  let touched = 0
  for (const one of landed) touched += updateFor(standing, one.source, one.before, one.after)
  touched += updateNamed(landed)
  keepPages(stated)
  return touched
}

export function markLanded(repo: string, root: string): void {
  const marks = { ...(builtFrom() ?? {}) }
  marks[repo] = markFor(root)
  keepBuiltFrom(marks)
}
