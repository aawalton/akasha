import type { PageAt, Roots } from "../page-at.ts"
import { pageNameOf } from "../page-name.ts"
import { blockOf } from "../text.ts"
import { type Source, saidSource } from "./entry.ts"
import {
  type Held,
  type Resolve,
  type Stated,
  identityOver,
  resolveOver,
  statedOf,
} from "./identity.ts"
import { type Relation, reachedFrom, relationsOver } from "./relation.ts"
import {
  builtFrom,
  emptyIndex,
  keepAt,
  keepBuiltFrom,
  keepPages,
  keepRelations,
  loadPages,
  loadRelations,
  markFor,
  marksOver,
  sourcesAt,
} from "./store.ts"

export type Built = {
  readonly files: number
  readonly entries: number
  readonly pages: number
}

export type Standing = {
  readonly resolve: Resolve
  readonly relations: ReadonlyMap<string, readonly Relation[]>
}

const PART = "/"

function fileKey(relation: string, to: PageAt): string {
  return `${relation}${PART}${to.stem}${PART}${to.type}`
}

function partsOf(key: string): readonly [string, string, string] {
  const at = key.split(PART)
  return [at[0] ?? "", at[1] ?? "", at[2] ?? ""]
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
  emptyIndex()
  for (const [key, sources] of under) {
    const [relation, stem, type] = partsOf(key)
    keepAt(relation, stem, type, sources)
  }
  keepPages(identity.pages.map(statedOf))
  keepRelations(relations)
  keepBuiltFrom(marksOver(roots))
  return { files: under.size, entries, pages: identity.pages.length }
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

function restated(held: readonly Stated[], source: Source, after: Held | null): readonly Stated[] {
  const said = saidSource(source)
  const kept = held.filter((one) => saidSource(one) !== said)
  return after === null ? kept : [...kept, statedOf(after)]
}

export function updateHere(
  source: Source,
  root: string,
  beforeText: string | null,
  afterText: string | null
): number {
  const pages = loadPages()
  if (pages.length === 0) return 0
  const before = beforeText === null ? null : heldOf(source.repo, source.key, beforeText)
  const after = afterText === null ? null : heldOf(source.repo, source.key, afterText)
  if (before === null && after === null) return 0
  const standing: Standing = {
    resolve: resolveOver(restated(pages, source, after)),
    relations: loadRelations(),
  }
  const touched = updateFor(standing, source, before, after)
  keepPages(restated(pages, source, after))
  const marks = { ...(builtFrom() ?? {}) }
  marks[source.repo] = markFor(root)
  keepBuiltFrom(marks)
  return touched
}

