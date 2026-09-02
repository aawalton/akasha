import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { onceInCall } from "@akasha/command-system/during-call"
import { rootsHere } from "@akasha/pages-system/checkout-roots"
import { type PageFile, pagesIn } from "../page/tracked/tracked.ts"
import { listField } from "../page/frontmatter.ts"
import { blockOf, NONE, stringAt, textAt } from "../page/text/text.ts"
import type { ReadoutScale } from "./readout-scale-shape.ts"

export const READOUT_PAGE_TYPE_SLUG = "readout"
export const READOUT_SCALE_PAGE_TYPE_SLUG = "readout-scale"
export const READOUT_GROUP_PAGE_TYPE_SLUG = "readout-group"
export const PAGE_QUERY_PAGE_TYPE_SLUG = "page-query"

const PAGE_TYPE = "page-type"
const SLUG = "slug"
const EXTENDS_SLUG = "extends-slug"
const FILES = "files"

export type ReadoutSortOrder = "label" | "place"

const SORT_ORDER_UNSTATED: ReadoutSortOrder = "label"

export interface ReadoutQuery {
  readonly slug: string
  readonly takes: Readonly<Record<string, string>>
  readonly reducesToOneNumber: boolean
  /**
   * The page type the query stands over, as its `page-type:` field names it.
   *
   * Which store answers a query is decided by this, so a caller that has to choose between the
   * checkout and the page service reads it rather than guessing from the query's name.
   */
  readonly pageTypeSlug: string | null
  /** The keys the query names, spelled as the query page spells them. */
  readonly keys: readonly string[]
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
  readonly enabled: boolean
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

function placesIn(fm: ReturnType<typeof blockOf>["fm"]): readonly (readonly [string, string])[] {
  const one = stringAt(fm, FILES)
  const stated = one === null ? listField(fm, FILES) : one === NONE ? [] : [one]
  const places: (readonly [string, string])[] = []
  for (const said of stated) {
    const at = said.indexOf(":")
    if (at !== -1) places.push([said.slice(0, at), said.slice(at + 1)])
  }
  return places
}

export function pageTypesIn(root: string, listing: Listing = new Map()): readonly PageType[] {
  const found: PageType[] = []
  for (const { key: relPath } of listedIn(root, listing).filter((one) => one.type === PAGE_TYPE)) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const slug = stringAt(fm, SLUG)
    if (slug === null) continue
    const base = stringAt(fm, EXTENDS_SLUG)
    const places = placesIn(fm)
    if (places.length === 0) found.push({ slug, extends: base, repo: null, pattern: null })
    for (const [repo, pattern] of places) found.push({ slug, extends: base, repo, pattern })
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
    enabled: stringAt(fm, "enabled") !== "false",
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

/**
 * The catalog every readout is resolved against, held for the length of one call.
 *
 * Building it lists both checkouts and names every tracked path in them — 104,593 of them here —
 * to reach the 518 pages it actually opens. A group resolves one readout at a time and each
 * reads the catalog, so a group of six built it seven times and a status-bar refresh of three
 * groups built it twenty. The pages cannot change while one call is in flight, so the second
 * build through the twentieth answered what the first already had.
 *
 * The key names the roots, because the catalog is a different catalog when the roots are
 * different, and a memo that ignored them would answer for the wrong tree.
 *
 * This is the lifetime `trackedIn` already holds `git ls-files` at one layer down, and it is the
 * reason to prefer it over a memo living as long as the process: a call is short enough that
 * nothing edits a readout page inside one, so nothing here can go stale. Outside a call — which
 * is every service, since none of them opens one — `onceInCall` builds each time, exactly as
 * before.
 */
export function readoutCatalog(roots: Roots = rootsHere()): ReadoutCatalog {
  const dirs = [...new Set(Object.values(roots).filter((one): one is string => one !== undefined))]
  return onceInCall(`readout-catalog:${[...dirs].sort().join(" ")}`, () => catalogOf(roots, dirs))
}

function catalogOf(roots: Roots, dirs: readonly string[]): ReadoutCatalog {
  if (dirs.length === 0) {
    throw new Error(
      "readoutCatalog: no repository root, and the page types stating where every readout, " +
        "scale, group and query stands are read from the repositories themselves"
    )
  }
  const listing: Listing = new Map()
  const types = dirs.flatMap((root) => pageTypesIn(root, listing))
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
      pageTypeSlug: stringAt(fm, PAGE_TYPE),
      keys: listField(fm, "keys"),
    })
  }

  return { readouts, unreadableReadouts, groups, scales, unreadableScales, queries, readoutTypeSlugs }
}
