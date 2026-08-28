import type { Roots } from "../page.ts"
import { pageNameOf } from "../name/name.ts"
import { blockOf } from "../text/text.ts"
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
import { linkTargetsFrom } from "./link/link.ts"
import { identityFile } from "./place/place.ts"
import { type Holds, type Relation, reachedFrom, relationsOver } from "./relation/relation.ts"
import { trackedIn } from "../tracked/tracked.ts"
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

export function buildOver(roots: Roots): Built {
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
  emptyIndex()
  for (const [key, sources] of under) {
    const [relation, target] = partsOf(key)
    keepAt(relation, target, sources)
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

/**
 * What each identity file gains and loses, worked out without opening one.
 *
 * THE FILES ARE NOT READ HERE. Every landing's effect on a file is settled from the landing alone,
 * so the read, the change and the write can then happen together under that file's lock; reading
 * here would put the read outside the lock, which is the fault this is arranged to avoid.
 */
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

/**
 * Every landed page's entries written into the index, or a refusal.
 *
 * AN INDEX HOLDING NO PAGE REFUSES RATHER THAN ANSWERING 0. A landing works out what to change
 * from what the index already says, so against an empty one it has nothing to change, and a 0
 * reads exactly like a landing that carried no page at all. That is what a rebuild looks like
 * from here for as long as it runs, and what an index nothing ever wrote looks like for good:
 * the commit lands in git, the index goes on describing a tree that has moved, and the only
 * sign of it is a row that is wrong until something else happens to land on the same page.
 *
 * THE ROWS ARE READ AND WRITTEN BACK UNDER ONE LOCK. Everything from `loadPages` to
 * `keepPages` is a read-modify-write over every row there is, and two landings doing it at
 * once lose one of the two. Which pages a landing carries makes no difference: the file is
 * written whole either way, so landings that touch nothing in common still collide.
 */
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
    const stated = restatedAll(pages, landed)
    const standing: Standing = { resolve: resolveOver(stated), relations: loadRelations() }
    let touched = 0
    for (const one of landed) {
      touched += updateFor(standing, one.source, one.before, one.after, holds)
    }
    touched += updateNamed(landed)
    keepPages(stated)
    return touched
  })
}

/**
 * One repository's rows marked as standing for the tree there now.
 *
 * A LANDING UPDATES THE RECORD OF WHAT THE INDEX WAS BUILT OVER, AND NEVER CREATES IT. `builtFrom`
 * answering null says the index was never written, or was taken away; a landing carries a handful
 * of pages and has walked no repository, so a record written here claims coverage no build ever
 * gave — and claims it for the landing's own repository alone. Scans there then read an index
 * holding no page and answer nothing, which reads exactly like a repository with no page in it and
 * passes every check over it, while every other repository is refused for a record that never
 * named it. Left null, the refusal stands over every repository until the index is written again.
 */
export function markLanded(repo: string, root: string): void {
  const held = builtFrom()
  if (held === null) return
  keepBuiltFrom({ ...held, [repo]: markFor(root) })
}
