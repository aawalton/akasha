import { listField, textField, type Frontmatter } from "../frontmatter.ts"
import type { FileTree } from "../file-tree.ts"
import { compiledPageTypeFor } from "../property/frontmatter.ts"
import type { Property } from "../property/property.ts"
import { type PageType } from "../page-types.ts"
import { NONE, blockOf, stringAt } from "../text/text.ts"
import { pageStemOf } from "../name/name.ts"
import { addressOf } from "../page-address.ts"

const POINTS = /\brelation(-(?:slug|seq|id|name|address))?\b/

const SEQ = "seq"

export type Points = "id" | "seq" | "name" | "address"

export interface Relation {
  readonly key: string
  readonly on: string
  readonly at: string
  readonly target: string | null
  readonly points: Points
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
}

export interface Want {
  readonly relation: Relation
  readonly value: string
}

export function pointsBy(type: string): Points | null {
  const found = POINTS.exec(type)
  if (found === null) return null
  const suffix = found[1]
  if (suffix === "-id") return "id"
  if (suffix === "-seq") return "seq"
  if (suffix === "-address") return "address"
  return "name"
}

function relationOf(one: Property): Relation | null {
  const points = pointsBy(one.type)
  if (points === null) return null
  if (one.target === null && points !== "address") return null
  return {
    key: one.name,
    on: one.on,
    at: one.at,
    target: one.target,
    points,
    slugProperty: points === "name" ? one.slugProperty : null,
    mayBeGone: one.mayBeGone,
  }
}

export function relationsOn(
  type: PageType,
  tree: FileTree
): { relations: readonly Relation[]; why: string | null } {
  const { properties, why } = compiledPageTypeFor(type, tree)
  if (properties === null) return { relations: [], why }
  const relations: Relation[] = []
  const seen = new Set<string>()
  for (const one of properties) {
    const made = relationOf(one)
    if (made === null) continue
    const at = `${made.key}\n${made.target ?? ""}\n${made.points}\n${made.slugProperty ?? ""}`
    if (seen.has(at)) continue
    seen.add(at)
    relations.push(made)
  }
  return { relations, why: null }
}

export function carriedBy(fm: Frontmatter, key: string): readonly string[] {
  const one = textField(fm, key)
  const values = one === null ? listField(fm, key) : [one]
  return values.map((value) => value.trim()).filter((value) => value !== "" && value !== NONE)
}

export function borneBy(
  fm: Frontmatter,
  relPath: string,
  points: Points,
  slugProperty: string | null,
  type: PageType
): string | null {
  if (points === "id") return stringAt(fm, "id")
  if (points === "seq") return stringAt(fm, SEQ)
  if (points === "address") return addressOf(type.slug, stringAt(fm, "slug") ?? pageStemOf(relPath))
  if (slugProperty !== null) return stringAt(fm, slugProperty)
  return stringAt(fm, "slug") ?? pageStemOf(relPath)
}

export function wantsOf(
  relations: readonly Relation[],
  fm: Frontmatter
): { asked: readonly Want[]; spared: number } {
  const asked: Want[] = []
  let spared = 0
  for (const relation of relations)
    for (const value of carriedBy(fm, relation.key)) {
      if (relation.mayBeGone) spared += 1
      else asked.push({ relation, value })
    }
  return { asked, spared }
}

export function unresolvable(want: Want): string {
  const { relation, value } = want
  if (relation.points === "address") {
    const under = relation.target === null ? "no page" : `no page under \`${relation.target}\``
    return `\`${relation.key}\` names \`${value}\` — ${under} carries that page type and slug`
  }
  const by =
    relation.points === "id" ? "id" : relation.points === "seq" ? SEQ : relation.slugProperty ?? "slug"
  return `\`${relation.key}\` names \`${value}\` — no \`${relation.target}\` page carries that ${by}`
}

export interface Reading {
  readonly types: readonly PageType[]
  readonly chainOf: (type: PageType) => readonly string[]
  readonly listing: (type: PageType) => readonly string[]
  readonly open: (type: PageType, relPath: string) => string | null
}

export interface Bearers {
  readonly holds: (want: Want) => boolean
  readonly looked: number
  readonly missed: ReadonlySet<string>
}

interface Sweep {
  readonly seen: Set<string>
  readonly step: () => boolean
}

function sweepFor(
  reading: Reading,
  relation: Relation,
  missed: Set<string>,
  tally: { looked: number }
): Sweep {
  const seen = new Set<string>()
  const ordered = reading.types
    .filter((type) => relation.target === null || reading.chainOf(type).includes(relation.target))
    .map((type) => ({ type, relPaths: reading.listing(type) }))
    .sort((a, b) => a.relPaths.length - b.relPaths.length)
  let atType = 0
  let atPage = 0
  const step = (): boolean => {
    for (;;) {
      const standing = ordered[atType]
      if (standing === undefined) return false
      const relPath = standing.relPaths[atPage]
      if (relPath === undefined) {
        atType += 1
        atPage = 0
        continue
      }
      atPage += 1
      const text = reading.open(standing.type, relPath)
      if (text === null) return true
      tally.looked += 1
      const { fm, why } = blockOf(text)
      if (why !== null) {
        if (fm.present) missed.add(relPath)
        return true
      }
      const one = borneBy(fm, relPath, relation.points, relation.slugProperty, standing.type)
      if (one !== null) seen.add(one)
      return true
    }
  }
  return { seen, step }
}

export function bearersFor(reading: Reading): Bearers {
  const held = new Map<string, Sweep>()
  const missed = new Set<string>()
  const tally = { looked: 0 }
  return {
    holds: (want) => {
      const at = `${want.relation.target ?? ""}\n${want.relation.points}\n${want.relation.slugProperty ?? ""}`
      let sweep = held.get(at)
      if (sweep === undefined) {
        sweep = sweepFor(reading, want.relation, missed, tally)
        held.set(at, sweep)
      }
      if (sweep.seen.has(want.value)) return true
      while (sweep.step()) if (sweep.seen.has(want.value)) return true
      return false
    },
    get looked() {
      return tally.looked
    },
    get missed() {
      return missed
    },
  }
}

const NAMED_AT_MOST = 10

export function unread(paths: ReadonlySet<string>): readonly string[] {
  const all = [...paths].sort()
  const named = all.slice(0, NAMED_AT_MOST)
  const rest = all.length - named.length
  return [
    `${all.length} page(s) under this relation could not be read, so what they carry was never ` +
      `compared and no relation here is certified: ${named.map((one) => `\`${one}\``).join(", ")}` +
      `${rest === 0 ? "" : `, and ${rest} more`}`,
  ]
}
