import type { PageAt, Roots } from "../page-at.ts"
import { type Source, saidSource } from "./entry.ts"
import { type Held, type Identity, identityOver } from "./identity.ts"
import { type Relation, reachedFrom, relationsOver } from "./relation.ts"
import { emptyIndex, keepAt, keepBuiltFrom, marksOver, sourcesAt } from "./store.ts"

export type Built = {
  readonly files: number
  readonly entries: number
  readonly pages: number
}

export type Standing = {
  readonly identity: Identity
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

export function standingOver(roots: Roots): Standing {
  const identity = identityOver(roots)
  return { identity, relations: relationsOver(identity.pages) }
}

export function buildOver(roots: Roots): Built {
  const standing = standingOver(roots)
  const under = new Map<string, Source[]>()
  let entries = 0
  for (const at of standing.identity.pages) {
    for (const one of reachedFrom(at, standing.relations, standing.identity)) {
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
  keepBuiltFrom(marksOver(roots))
  return { files: under.size, entries, pages: standing.identity.pages.length }
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

export function updateFor(
  standing: Standing,
  source: Source,
  before: Held | null,
  after: Held | null
): number {
  const was = new Set<string>()
  const now = new Set<string>()
  if (before !== null) {
    for (const one of reachedFrom(before, standing.relations, standing.identity)) {
      was.add(fileKey(one.relation, one.to))
    }
  }
  if (after !== null) {
    for (const one of reachedFrom(after, standing.relations, standing.identity)) {
      now.add(fileKey(one.relation, one.to))
    }
  }
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
