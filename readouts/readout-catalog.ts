import { realpathSync } from "node:fs"
import { resolve } from "node:path"
import type { Roots } from "../page/page-at.ts"
import { type PageFile, pagesIn } from "../page/pages.ts"
import { listField } from "../page/frontmatter.ts"
import { blockOf, NONE, stringAt, textAt } from "../page/text.ts"
import type { ReadoutScale } from "./readout-scale-shape.ts"

export const READOUT_PAGE_TYPE_SLUG = "readout"
export const READOUT_SCALE_PAGE_TYPE_SLUG = "readout-scale"
export const READOUT_GROUP_PAGE_TYPE_SLUG = "readout-group"
export const PAGE_QUERY_PAGE_TYPE_SLUG = "page-query"

const PAGE_TYPE = "page-type"
const SLUG = "slug"
const EXTENDS_SLUG = "extends-slug"
const FILES = "files"

let held: Roots | null = null

function akashaRoot(): string {
  const stated = process.env.AKASHA_ROOT
  if (stated !== undefined && stated !== "") return stated
  const self: string | undefined = import.meta.dir
  if (self === undefined || self === "") {
    throw new Error(
      "readoutCatalog: this build reads no `import.meta.dir`, so nothing in it says where akasha " +
        "stands — a bundle states the akasha root in `AKASHA_ROOT`"
    )
  }
  return resolve(self, "..")
}

export function rootsHere(): Roots {
  if (held === null) {
    const here = realpathSync(akashaRoot())
    held = {
      akasha: here,
      instructions: process.env.INSTRUCTIONS_ROOT ?? resolve(here, "..", "instructions"),
    }
  }
  return held
}

export type ReadoutSortOrder = "label" | "place"

const SORT_ORDER_UNSTATED: ReadoutSortOrder = "label"

export interface ReadoutQuery {
  readonly slug: string
  readonly takes: Readonly<Record<string, string>>
  readonly reducesToOneNumber: boolean
}

export interface ReadoutRow {
  readonly slug: string
  readonly title: string | null
  readonly label: string | null
  readonly unit: string | null
  readonly place: number | null
  readonly scaleSlug: string | null
  readonly querySlug: string | null
  readonly queryKey: string | null
  readonly queryArgument: string | null
  readonly earnedKey: string | null
  readonly wireKey: string | null
  readonly groupSlugs: readonly string[]
}

export interface ReadoutRows {
  readonly readouts: ReadonlyMap<string, ReadoutRow>
  readonly unreadableReadouts: ReadonlyMap<string, string>
}

export interface ReadoutCatalog extends ReadoutRows {
  readonly groups: ReadonlyMap<string, ReadoutSortOrder>
  readonly scales: ReadonlyMap<string, ReadoutScale>
  readonly unreadableScales: ReadonlyMap<string, string>
  readonly queries: ReadonlyMap<string, ReadoutQuery>
  readonly readoutTypeSlugs: readonly string[]
}

type PageType = {
  readonly slug: string
  readonly extends: string | null
  readonly repo: string | null
  readonly pattern: string | null
}

type Found = {
  readonly root: string
  readonly relPath: string
}

function numberIn(text: string | null): number | null {
  if (text === null) return null
  const read = Number(text)
  return Number.isFinite(read) ? read : null
}

export function pageTypesIn(instructions: string): readonly PageType[] {
  const found: PageType[] = []
  for (const { key: relPath } of pagesIn(instructions).filter((one) => one.type === PAGE_TYPE)) {
    const text = textAt(instructions, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const slug = stringAt(fm, SLUG)
    if (slug === null) continue
    const files = stringAt(fm, FILES)
    const at = files === null || files === NONE ? -1 : files.indexOf(":")
    found.push({
      slug,
      extends: stringAt(fm, EXTENDS_SLUG),
      repo: at === -1 ? null : (files as string).slice(0, at),
      pattern: at === -1 ? null : (files as string).slice(at + 1),
    })
  }
  return found
}

export function descendantsOf(base: string, types: readonly PageType[]): readonly string[] {
  const kept = new Set<string>([base])
  for (let grew = true; grew; ) {
    grew = false
    for (const one of types) {
      if (one.extends === null || !kept.has(one.extends) || kept.has(one.slug)) continue
      kept.add(one.slug)
      grew = true
    }
  }
  return [...kept]
}

type Listing = Map<string, readonly PageFile[]>

function listedIn(root: string, listing: Listing): readonly PageFile[] {
  const held = listing.get(root)
  if (held !== undefined) return held
  const read = pagesIn(root)
  listing.set(root, read)
  return read
}

function pagesOf(
  slugs: readonly string[],
  types: readonly PageType[],
  roots: Roots,
  listing: Listing
): Found[] {
  const named = new Set(slugs)
  const wanted = new Map<string, Set<string>>()
  for (const one of types) {
    if (!named.has(one.slug) || one.repo === null || one.pattern === null) continue
    const root = roots[one.repo]
    if (root === undefined) continue
    const held = wanted.get(root)
    if (held === undefined) wanted.set(root, new Set([one.slug]))
    else held.add(one.slug)
  }
  const found: Found[] = []
  for (const [root, here] of wanted) {
    for (const page of listedIn(root, listing)) {
      if (here.has(page.type)) found.push({ root, relPath: page.key })
    }
  }
  return found
}

function rowOf(slug: string, fm: ReturnType<typeof blockOf>["fm"]): ReadoutRow {
  return {
    slug,
    title: stringAt(fm, "title"),
    label: stringAt(fm, "label"),
    unit: stringAt(fm, "unit"),
    place: numberIn(stringAt(fm, "place")),
    scaleSlug: stringAt(fm, "scale-slug"),
    querySlug: stringAt(fm, "query-slug"),
    queryKey: stringAt(fm, "query-key"),
    queryArgument: stringAt(fm, "query-argument"),
    earnedKey: stringAt(fm, "earned-key"),
    wireKey: stringAt(fm, "wire-key"),
    groupSlugs: listField(fm, "group-slugs"),
  }
}

function scaleOf(slug: string, fm: ReturnType<typeof blockOf>["fm"]): ReadoutScale {
  const at = (key: string): number | undefined => numberIn(stringAt(fm, key)) ?? undefined
  const earned = stringAt(fm, "earned-color-slug")
  return {
    slug,
    blackAt: at("black-at"),
    redAt: at("red-at"),
    orangeAt: at("orange-at"),
    yellowAt: at("yellow-at"),
    greenAt: at("green-at"),
    blueAt: at("blue-at"),
    earnedColorSlug: earned ?? undefined,
  }
}

function takesIn(fm: ReturnType<typeof blockOf>["fm"]): Readonly<Record<string, string>> {
  const held = fm.fields.get("takes")
  if (held === null || typeof held !== "object" || Array.isArray(held)) return {}
  const takes: Record<string, string> = {}
  for (const [name, type] of Object.entries(held as Record<string, unknown>)) {
    if (typeof type === "string") takes[name] = type.trim()
  }
  return takes
}

export function readoutCatalog(roots: Roots = rootsHere()): ReadoutCatalog {
  const instructions = roots.instructions
  if (instructions === undefined) {
    throw new Error(
      "readoutCatalog: no `instructions` root, and the page types stating where every readout, " +
        "scale, group and query stands are read from it"
    )
  }
  const listing: Listing = new Map()
  const types = pageTypesIn(instructions)
  const readoutTypeSlugs = descendantsOf(READOUT_PAGE_TYPE_SLUG, types)

  const readouts = new Map<string, ReadoutRow>()
  const unreadableReadouts = new Map<string, string>()
  for (const { root, relPath } of pagesOf(readoutTypeSlugs, types, roots, listing)) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    const slug = why === null ? stringAt(fm, SLUG) : null
    if (slug === null) continue
    if (why !== null) unreadableReadouts.set(slug, why)
    else readouts.set(slug, rowOf(slug, fm))
  }

  const scales = new Map<string, ReadoutScale>()
  const unreadableScales = new Map<string, string>()
  for (const { root, relPath } of pagesOf(
    descendantsOf(READOUT_SCALE_PAGE_TYPE_SLUG, types),
    types,
    roots,
    listing
  )) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    const slug = stringAt(fm, SLUG)
    if (slug === null) continue
    if (why !== null) unreadableScales.set(slug, why)
    else scales.set(slug, scaleOf(slug, fm))
  }

  const groups = new Map<string, ReadoutSortOrder>()
  for (const { root, relPath } of pagesOf(
    descendantsOf(READOUT_GROUP_PAGE_TYPE_SLUG, types),
    types,
    roots,
    listing
  )) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    const slug = why === null ? stringAt(fm, SLUG) : null
    if (slug === null) continue
    const stated = stringAt(fm, "sort-order")
    groups.set(slug, stated === "place" ? "place" : SORT_ORDER_UNSTATED)
  }

  const queries = new Map<string, ReadoutQuery>()
  for (const { root, relPath } of pagesOf(
    descendantsOf(PAGE_QUERY_PAGE_TYPE_SLUG, types),
    types,
    roots,
    listing
  )) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const slug = stringAt(fm, SLUG) ?? relPath.slice(relPath.lastIndexOf("/") + 1).split(".")[0]
    if (slug === undefined || slug === "") continue
    queries.set(slug, {
      slug,
      takes: takesIn(fm),
      reducesToOneNumber: stringAt(fm, "function") !== null,
    })
  }

  return { readouts, unreadableReadouts, groups, scales, unreadableScales, queries, readoutTypeSlugs }
}
