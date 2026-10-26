import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.ts"
import { showCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.ts"
import type {
  Matched,
  Titled,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-matching/hallmark-matching.module.code.ts"
import { squashed } from "akasha/command/pages/watching/hallmark/modules/hallmark-matching/hallmark-matching.module.code.ts"
import {
  type Gone,
  goneWith,
  misfiledShow,
  recordsOf,
  textsOf,
  tmdbIdOf,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-misfiling/hallmark-misfiling.module.code.ts"
import {
  placed,
  positionsOf,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-placing/hallmark-placing.module.code.ts"
import {
  articleOf,
  CATEGORIES,
  type Category,
  type Entry,
  entriesOf,
  type Gathering,
  grouped,
  SERIES_ARTICLE,
  type Series,
  seriesCategory,
  seriesFor,
  summaryOf,
  yearOf,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-series/hallmark-series.module.code.ts"
import { slugOf } from "akasha/command/pages/watching/modules/title-knowing/title-knowing.module.code.ts"
import { nameFaultIn } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

export type Held = {
  readonly movie: readonly Row[]
  readonly show: readonly Row[]
  readonly franchise: readonly Row[]
  readonly "show-collection": readonly Row[]
  readonly season: readonly Row[]
  readonly episode: readonly Row[]
}

type Plan = {
  readonly listed: readonly Matched[]
  readonly shows: readonly Titled[]
  readonly held: Held
  readonly day: string
}

type Shelved = {
  readonly pages: readonly Naming[]
  readonly removes: readonly Gone[]
  readonly report: readonly string[]
}

type Said = Readonly<Record<string, unknown>>

const SHELF = "hallmark"

export const SHELVES: Readonly<
  Record<Category, { readonly slug: string; readonly title: string }>
> = {
  romance: { slug: "hallmark-romance", title: "Hallmark Romance" },
  mystery: { slug: "hallmark-mystery", title: "Hallmark Mystery" },
  christmas: { slug: "hallmark-christmas", title: "Hallmark Christmas" },
}

const SHOW_COLLECTION = showCollection.slug

const FRANCHISE = franchise.slug

const MINUTES = `${unit.slug}/${minutes.slug}`

const NOT_STARTED = "not-started"

const NOT_APPLICABLE = "not-applicable"

const STREAMING_ON = "streamingOn"

const PROVIDED: readonly string[] = ["posterPath", "genres", "imdbId", "voteAverage", STREAMING_ON]

const TMDB_SITE = "https://www.themoviedb.org"

const WIKIPEDIA_SITE = "https://en.wikipedia.org/wiki/"

const SUFFIXES: readonly number[] = [2, 3, 4, 5, 6, 7, 8, 9]

type Taken = { readonly row: Row | null; readonly slug: string }

type Taking = (title: string, tmdbId: string | null, year: number | null) => Taken

function takingFrom(rows: readonly Row[], kind: string): Taking {
  const taken = new Set(rows.flatMap((row) => (typeof row.slug === "string" ? [row.slug] : [])))
  const byTmdb = new Map<string, Row>()
  const byTitle = new Map<string, Row[]>()
  for (const row of rows) {
    const id = tmdbIdOf(row)
    if (id !== null) byTmdb.set(id, row)
    if (typeof row.title !== "string") continue
    const key = squashed(row.title)
    byTitle.set(key, [...(byTitle.get(key) ?? []), row])
  }
  const claimed = new Set<Row>()
  const fitting = (tmdbId: string | null, year: number | null) => (row: Row) => {
    if (claimed.has(row) || (tmdbId !== null && tmdbIdOf(row) !== null)) return false
    const was = yearOf(row.publishedAt)
    return was === null || year === null || Math.abs(was - year) <= 1
  }
  return (title, tmdbId, year) => {
    const byId = tmdbId === null ? undefined : byTmdb.get(tmdbId)
    const row = byId ?? (byTitle.get(squashed(title)) ?? []).find(fitting(tmdbId, year)) ?? null
    if (row !== null && typeof row.slug === "string" && !claimed.has(row)) {
      claimed.add(row)
      return { row, slug: row.slug }
    }
    const plain = slugOf(title)
    const dated = year === null ? plain : `${plain}-${String(year)}`
    const numbered = SUFFIXES.map((n) => `${dated}-${String(n)}`)
    const tries = [plain, dated, ...numbered].flatMap((one) => [one, `${kind}-${one}`])
    const free = (one: string): boolean =>
      one !== "" && !taken.has(one) && nameFaultIn(one) === null
    const slug = tries.find(free) ?? `${kind}-${dated}-${String(taken.size)}`
    taken.add(slug)
    return { row: null, slug }
  }
}

function unioned(was: unknown, more: readonly string[]): readonly string[] {
  const held = textsOf(was)
  return [...held, ...more.filter((one) => !held.includes(one))]
}

function sameList(one: readonly string[], other: readonly string[]): boolean {
  return JSON.stringify(one) === JSON.stringify(other)
}

function tmdbOf(path: string, id: number, day: string): Said {
  const externalId = String(id)
  const externalLink = `${TMDB_SITE}/${path}/${externalId}`
  return { source: "tmdb", externalId, externalLink, lastSyncedAt: day }
}

function wikipediaOf(entry: Entry, single: ReadonlySet<string>): Said | null {
  const article = articleOf(entry.listed)
  if (article === null || !single.has(article)) return null
  const path = encodeURI(article.replace(/ /g, "_"))
  return { source: "wikipedia", externalLink: `${WIKIPEDIA_SITE}${path}` }
}

function sourcesMerged(was: unknown, titled: Titled, day: string): readonly Said[] {
  const held = recordsOf(was)
  const fresh = tmdbOf(titled.kind, titled.id, day)
  const at = held.findIndex(
    (one) =>
      one.source === "tmdb" && (one.externalId === fresh.externalId || one.externalId === undefined)
  )
  if (at < 0) return [...held, fresh]
  return held.map((one, index) => (index === at ? { ...one, ...fresh } : one))
}

function providedOf(titled: Titled): Said {
  return {
    ...(titled.genres.length === 0 ? {} : { genres: titled.genres }),
    ...(titled.imdbId === null ? {} : { imdbId: titled.imdbId }),
    ...(titled.posterPath === null ? {} : { posterPath: titled.posterPath }),
    ...(titled.voteAverage === null ? {} : { voteAverage: titled.voteAverage }),
    ...(titled.services.length === 0 ? {} : { [STREAMING_ON]: titled.services }),
  }
}

function shelfOf(category: Category): string {
  return `${SHOW_COLLECTION}/${SHELVES[category].slug}`
}

function shelfPages(held: readonly Row[]): readonly Naming[] {
  const slugs = new Set(held.map((row) => row.slug))
  const empty = { ownLength: 0, ownProgress: 0, unit: MINUTES, status: NOT_APPLICABLE }
  const shelf = { slug: SHELF, values: { title: "Hallmark", ...empty } }
  const under = [`${SHOW_COLLECTION}/${SHELF}`]
  const categories = CATEGORIES.map((one, position) => ({
    slug: SHELVES[one].slug,
    values: { title: SHELVES[one].title, partOfCollections: under, position, ...empty },
  }))
  return [shelf, ...categories]
    .filter((one) => !slugs.has(one.slug))
    .map((one) => ({
      pageTypeSlug: SHOW_COLLECTION,
      slug: one.slug,
      fresh: true,
      values: one.values,
    }))
}

type Franchised = {
  readonly pages: readonly Naming[]
  readonly slugOf: ReadonlyMap<string, string>
  readonly categoryOf: ReadonlyMap<string, Category>
  readonly report: readonly string[]
}

function franchisePage(
  held: Series,
  under: readonly string[],
  taken: Taken,
  day: string
): Naming | null {
  if (taken.row === null) {
    const gathering: Gathering | null = held.gathering
    const sources = gathering === null ? [] : [tmdbOf("collection", gathering.id, day)]
    const values = {
      title: held.title,
      partOfCollections: under,
      ...(sources.length === 0 ? {} : { externalIdentity: sources }),
    }
    return { pageTypeSlug: FRANCHISE, slug: taken.slug, fresh: true, values }
  }
  const merged = unioned(taken.row.partOfCollections, under)
  if (sameList(merged, textsOf(taken.row.partOfCollections))) return null
  const values = { partOfCollections: merged }
  return { pageTypeSlug: FRANCHISE, slug: taken.slug, merge: true, values }
}

function franchised(series: ReadonlyMap<string, Series>, plan: Plan): Franchised {
  const take = takingFrom(plan.held.franchise, FRANCHISE)
  const pages: Naming[] = []
  const slugs = new Map<string, string>()
  const categories = new Map<string, Category>()
  const report: string[] = []
  for (const [key, held] of series) {
    const category = seriesCategory(held)
    categories.set(key, category)
    const taken = take(held.title, null, null)
    slugs.set(key, taken.slug)
    const size = `${String(held.entries.length)} titles`
    report.push(`series  ${category}  ${FRANCHISE}/${taken.slug}  ${size}`)
    const page = franchisePage(held, [shelfOf(category)], taken, plan.day)
    if (page !== null) pages.push(page)
  }
  return { pages, slugOf: slugs, categoryOf: categories, report }
}

function shelvesFor(one: Entry, franchises: Franchised): readonly string[] {
  if (one.series !== null) {
    const under = [`${FRANCHISE}/${franchises.slugOf.get(one.series) ?? ""}`]
    const category = franchises.categoryOf.get(one.series)
    return one.christmas && category !== "christmas" ? [...under, shelfOf("christmas")] : under
  }
  if (!one.christmas) return [shelfOf(one.base)]
  const mystery = one.kind === "show" && one.base === "mystery"
  return mystery ? [shelfOf("christmas"), shelfOf("mystery")] : [shelfOf("christmas")]
}

function singlesOf(entries: readonly Entry[]): ReadonlySet<string> {
  const counted = grouped(entries, (one) => articleOf(one.listed))
  const single = [...counted].filter(
    ([article, group]) => group.length === 1 && !SERIES_ARTICLE.test(article)
  )
  return new Set(single.map(([article]) => article))
}

function freshValues(one: Entry, under: readonly string[], extra: Said): Said {
  const dated = one.listed?.aired ?? one.titled?.publishedAt ?? null
  return {
    title: one.title,
    partOfCollections: under,
    ...extra,
    ownLength: one.kind === "movie" ? (one.titled?.minutes ?? 0) : 0,
    ownProgress: 0,
    unit: MINUTES,
    status: NOT_STARTED,
    ...(dated === null ? {} : { publishedAt: dated }),
    ...(one.titled === null ? {} : providedOf(one.titled)),
  }
}

function undonePage(one: Entry, under: readonly string[], row: Row): Naming | null {
  const refused = one.refused
  if (one.titled !== null || refused === null) return null
  const wrong = String(refused.id)
  if (tmdbIdOf(row) !== wrong) return null
  const sources = recordsOf(row.externalIdentity).filter(
    (said) => !(said.source === "tmdb" && said.externalId === wrong)
  )
  const values: Record<string, unknown> = {
    ownLength: 0,
    partOfCollections: unioned(row.partOfCollections, under),
    ...(sources.length === 0 ? {} : { externalIdentity: sources }),
  }
  const clears = [...PROVIDED, ...(sources.length === 0 ? ["externalIdentity"] : [])]
  const slug = typeof row.slug === "string" ? row.slug : ""
  return { pageTypeSlug: one.kind, slug, merge: true, values, clears }
}

function keptPage(one: Entry, under: readonly string[], row: Row, day: string): Naming | null {
  const undone = undonePage(one, under, row)
  if (undone !== null) return undone
  const values: Record<string, unknown> = {}
  const merged = unioned(row.partOfCollections, under)
  if (!sameList(merged, textsOf(row.partOfCollections))) values.partOfCollections = merged
  if (one.titled !== null)
    values.externalIdentity = sourcesMerged(row.externalIdentity, one.titled, day)
  const services = one.titled?.services ?? []
  const was = textsOf(row[STREAMING_ON])
  if (services.length > 0 && !sameList(services, was)) values[STREAMING_ON] = services
  const clears = services.length === 0 && was.length > 0 && one.titled !== null
  if (Object.keys(values).length === 0 && !clears) return null
  const slug = typeof row.slug === "string" ? row.slug : ""
  const cleared = clears ? { clears: [STREAMING_ON] } : {}
  return { pageTypeSlug: one.kind, slug, merge: true, values, ...cleared }
}

export function shelved(plan: Plan): Shelved {
  const entries = entriesOf(plan.listed, plan.shows)
  const series = seriesFor(entries)
  const franchises = franchised(series, plan)
  const positions = positionsOf(series)
  const single = singlesOf(entries)
  const takes = {
    movie: takingFrom(plan.held.movie, "movie"),
    show: takingFrom(plan.held.show, "show"),
  }
  const pages: Naming[] = [...shelfPages(plan.held[SHOW_COLLECTION]), ...franchises.pages]
  const removes: Gone[] = []
  const shelving = new Set([
    ...CATEGORIES.map(shelfOf),
    ...[...franchises.slugOf.values()].map((slug) => `${FRANCHISE}/${slug}`),
  ])
  for (const one of entries) {
    const misfiled = misfiledShow(one, plan.held.show, shelving)
    const own = shelvesFor(one, franchises)
    const under = misfiled === null ? own : unioned(misfiled.partOfCollections, own)
    if (misfiled !== null) {
      removes.push(...goneWith(misfiled, plan.held.season, plan.held.episode))
    }
    const year = yearOf(one.listed?.aired ?? one.titled?.publishedAt) ?? one.listed?.year ?? null
    const tmdbId = one.titled === null ? null : String(one.titled.id)
    const taken = takes[one.kind](one.title, tmdbId, year)
    if (taken.row !== null) {
      const kept = keptPage(one, under, taken.row, plan.day)
      const position = positions.get(one)
      const page = placed(kept, taken.row, one.kind, position, shelving)
      if (page !== null) pages.push(page)
      continue
    }
    const wikipedia = wikipediaOf(one, single)
    const sources = [
      ...(one.titled === null ? [] : [tmdbOf(one.titled.kind, one.titled.id, plan.day)]),
      ...(wikipedia === null ? [] : [wikipedia]),
    ]
    const position = positions.get(one)
    const extra = {
      ...(position === undefined ? {} : { position }),
      ...(sources.length === 0 ? {} : { externalIdentity: sources }),
    }
    const values = freshValues(one, under, extra)
    pages.push({ pageTypeSlug: one.kind, slug: taken.slug, fresh: true, values })
  }
  const report = [...franchises.report, ...summaryOf(entries, franchises.categoryOf)]
  const taken = removes.map((one) => `taken  ${one.pageTypeSlug}/${one.slug}`)
  return { pages, removes, report: [...report, ...taken] }
}
