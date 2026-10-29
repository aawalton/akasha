import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { episode } from "akasha/alan/collection/watching/episode/episode.page-type.ts"
import { season } from "akasha/alan/collection/watching/season/season.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import {
  type AiredEpisode,
  type AiredSeason,
  airedFor,
  type Calls,
  groupedAiredFor,
  tokenSaid,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"
import { title as titleProperty } from "akasha/page/properties/title.text-property.ts"
import type {
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.computed-property-module.code.ts"

export type HeldShow = {
  readonly slug: string
  readonly title: string
  readonly status: string | null
  readonly identities: readonly Row[]
}

type HeldSeason = {
  readonly slug: string
  readonly position: number
  readonly status: string | null
  readonly ownLength: number
  readonly traktSeason: number | null
}

type HeldEpisode = {
  readonly slug: string
  readonly season: string
  readonly position: number
  readonly status: string | null
  readonly ownLength: number
}

type Planned = { readonly pages: readonly Naming[]; readonly report: readonly string[] }

type Placed = {
  readonly slug: string
  readonly season: number
  readonly position: number
  readonly status: string | null
  readonly ownLength: number
  readonly fresh: Readonly<Record<string, unknown>> | null
}

const TMDB_SITE = "https://www.themoviedb.org/tv"

const TMDB = "tmdb"

const COMPLETED = "completed"

const IN_PROGRESS = "in-progress"

const FOLLOWING = "following"

const NOT_STARTED = "not-started"

const ARCHIVED = "archived"

const DESCRIPTION_CEILING = 1000

const SEASON_NAMED = /^Season \d+$/

const MINUTES = `${unit.slug}/${minutes.slug}`

const TITLE_PROPERTY = `text-property/${titleProperty.slug}`

const CLIPPED = "…"

const textOf = textIn

const numberOf = asNumber

export function tmdbIdOf(shown: HeldShow): string | null {
  const held = shown.identities.find((one) => one.source === TMDB)
  return typeof held?.externalId === "string" ? held.externalId : null
}

function rowsOf(asked: Rows): readonly Row[] | string {
  return "refused" in asked ? asked.refused : asked.rows
}

function traktSeasonIn(said: unknown): number | null {
  if (!Array.isArray(said)) return null
  for (const one of said) {
    if (one === null || typeof one !== "object") continue
    const held = one as Readonly<Record<string, unknown>>
    if (held.source !== "trakt") continue
    const named = asNumber(held.externalId)
    if (named !== null) return named
  }
  return null
}

export async function heldUnder(
  calls: Calls,
  shown: HeldShow
): Promise<
  { readonly seasons: readonly HeldSeason[]; readonly episodes: readonly HeldEpisode[] } | string
> {
  const seasonRows = rowsOf(
    await calls.ask({
      pageTypeSlug: season.slug,
      where: { partOfCollections: { has: `${show.slug}/${shown.slug}` } },
      keys: ["slug", "position", "status", "ownLength", "externalIdentity"],
    })
  )
  if (typeof seasonRows === "string") return seasonRows
  const seasons: HeldSeason[] = []
  const episodes: HeldEpisode[] = []
  for (const row of seasonRows) {
    const slug = textOf(row.slug)
    const position = numberOf(row.position)
    if (slug === null || position === null) continue
    seasons.push({
      slug,
      position,
      status: textOf(row.status),
      ownLength: numberOf(row.ownLength) ?? 0,
      traktSeason: traktSeasonIn(row.externalIdentity),
    })
    const episodeRows = rowsOf(
      await calls.ask({
        pageTypeSlug: episode.slug,
        where: { partOfCollections: { has: `${season.slug}/${slug}` } },
        keys: ["slug", "position", "status", "ownLength"],
      })
    )
    if (typeof episodeRows === "string") return episodeRows
    for (const one of episodeRows) {
      const named = textOf(one.slug)
      const at = numberOf(one.position)
      if (named === null || at === null) continue
      episodes.push({
        slug: named,
        season: slug,
        position: at,
        status: textOf(one.status),
        ownLength: numberOf(one.ownLength) ?? 0,
      })
    }
  }
  return { seasons, episodes }
}

export function seasonsNeedGroups(
  seasons: readonly { readonly traktSeason: number | null }[],
  aired: readonly AiredSeason[]
): boolean {
  const held = new Set(aired.map((one) => one.number))
  return seasons.some(
    (one) => one.traktSeason !== null && one.traktSeason > 0 && !held.has(one.traktSeason)
  )
}

export async function airedUnder(
  calls: Calls,
  token: string,
  tv: string,
  seasons: readonly { readonly traktSeason: number | null }[]
): Promise<readonly AiredSeason[] | string> {
  const aired = await airedFor(calls, token, tv)
  if (aired === null) return `TMDB answered nothing for its show ${tv}`
  if (!seasonsNeedGroups(seasons, aired)) return aired
  const grouped = await groupedAiredFor(calls, token, tv)
  return grouped ?? `TMDB states no season grouping for its show ${tv}`
}

export async function shelvedHeld(
  shown: HeldShow,
  status: string,
  calls: Calls
): Promise<Planned | string> {
  const nothing: Planned = { pages: [], report: [] }
  if (status === COMPLETED) return nothing
  const tv = tmdbIdOf(shown)
  if (tv === null) return nothing
  const token = tokenSaid()
  if (token === null) return nothing
  const under = await heldUnder(calls, shown)
  if (typeof under === "string") return under
  const aired = await airedUnder(calls, token, tv, under.seasons)
  if (typeof aired === "string") return aired
  return shelvedFor(shown, tv, aired, under.seasons, under.episodes)
}

function seasonSlugOf(shown: HeldShow, number: number): string {
  return `${shown.slug}-season-${String(number)}`
}

function episodeSlugOf(shown: HeldShow, number: number, at: number): string {
  return `${shown.slug}-s${padTwo(number)}e${padTwo(at)}`
}

function described(overview: string): Readonly<Record<string, unknown>> {
  return overview === "" ? {} : { description: overview.slice(0, DESCRIPTION_CEILING) }
}

type Titling = {
  readonly properties: readonly { readonly pageProperty: string; readonly maxLength?: number }[]
}

function titleCeilingOf(titling: Titling): number {
  const declared = titling.properties.find((one) => one.pageProperty === TITLE_PROPERTY)
  return declared?.maxLength ?? titleProperty.maxLength
}

export function titledWithin(name: string, titling: Titling): string {
  const ceiling = titleCeilingOf(titling)
  if (name.length <= ceiling) return name
  return `${name.slice(0, ceiling - CLIPPED.length).trimEnd()}${CLIPPED}`
}

function stated(key: string, value: unknown): Readonly<Record<string, unknown>> {
  return value === null ? {} : { [key]: value }
}

function freshSeason(
  shown: HeldShow,
  tv: string,
  aired: AiredSeason
): Readonly<Record<string, unknown>> {
  const title = SEASON_NAMED.test(aired.name) ? `${shown.title} ${aired.name}` : aired.name
  return {
    title: titledWithin(title, season),
    ...described(aired.overview),
    partOfCollections: [`${show.slug}/${shown.slug}`],
    position: aired.number,
    ownLength: 0,
    ownProgress: 0,
    unit: MINUTES,
    status: NOT_STARTED,
    ...stated("publishedAt", aired.airDate),
    ...stated("posterPath", aired.posterPath),
    ...stated("voteAverage", aired.voteAverage),
    externalIdentity: [
      {
        source: TMDB,
        externalId: String(aired.id),
        externalLink: `${TMDB_SITE}/${tv}/season/${String(aired.number)}`,
      },
    ],
  }
}

function freshEpisode(
  seasonSlug: string,
  tv: string,
  aired: AiredEpisode
): Readonly<Record<string, unknown>> {
  return {
    title: titledWithin(aired.name, episode),
    ...described(aired.overview),
    partOfCollections: [`${season.slug}/${seasonSlug}`],
    position: aired.position,
    ownLength: aired.runtime ?? 0,
    ownProgress: 0,
    unit: MINUTES,
    status: NOT_STARTED,
    ...stated("publishedAt", aired.airDate),
    ...stated("episodeType", aired.episodeType),
    ...stated("stillPath", aired.stillPath),
    ...stated("voteAverage", aired.voteAverage),
    externalIdentity: [
      {
        source: TMDB,
        externalId: String(aired.id),
        externalLink: `${TMDB_SITE}/${tv}/season/${String(aired.seasonNumber)}/episode/${String(aired.number)}`,
      },
    ],
  }
}

type Laid = {
  readonly placed: readonly Placed[]
  readonly seasonOf: ReadonlyMap<
    number,
    {
      readonly slug: string
      readonly held: HeldSeason | null
      readonly fresh: Readonly<Record<string, unknown>> | null
    }
  >
}

function laidOut(
  shown: HeldShow,
  tv: string,
  aired: readonly AiredSeason[],
  seasons: readonly HeldSeason[],
  episodes: readonly HeldEpisode[]
): Laid {
  const seasonOf = new Map<
    number,
    { slug: string; held: HeldSeason | null; fresh: Readonly<Record<string, unknown>> | null }
  >()
  for (const one of seasons) seasonOf.set(one.position, { slug: one.slug, held: one, fresh: null })
  for (const one of aired) {
    if (seasonOf.has(one.number)) continue
    seasonOf.set(one.number, {
      slug: seasonSlugOf(shown, one.number),
      held: null,
      fresh: freshSeason(shown, tv, one),
    })
  }
  const placed: Placed[] = []
  for (const [number, at] of seasonOf) {
    const held = episodes.filter((one) => one.season === at.slug)
    for (const one of held) placed.push({ ...one, season: number, fresh: null })
    if (at.held !== null && (at.held.status === COMPLETED || at.held.status === ARCHIVED)) continue
    const airedHere = aired.find((one) => one.number === number)?.episodes ?? []
    for (const one of airedHere) {
      if (held.some((was) => was.position === one.position)) continue
      placed.push({
        slug: episodeSlugOf(shown, number, one.position),
        season: number,
        position: one.position,
        status: NOT_STARTED,
        ownLength: one.runtime ?? 0,
        fresh: freshEpisode(at.slug, tv, one),
      })
    }
  }
  placed.sort((one, two) => one.season - two.season || one.position - two.position)
  return { placed, seasonOf }
}

function seasonValues(
  done: boolean,
  day: string,
  was: string | null
): Readonly<Record<string, unknown>> | null {
  const status = done ? COMPLETED : IN_PROGRESS
  if (was === status) return null
  return { status, ...(done ? { completedAt: day } : {}) }
}

export function tmdbIdentityOf(tv: string): Row {
  return { source: TMDB, externalId: tv, externalLink: `${TMDB_SITE}/${tv}` }
}

function showValues(shown: HeldShow, tv: string): Readonly<Record<string, unknown>> {
  const status =
    shown.status === IN_PROGRESS || shown.status === FOLLOWING ? {} : { status: IN_PROGRESS }
  const identity =
    tmdbIdOf(shown) === null ? { externalIdentity: [...shown.identities, tmdbIdentityOf(tv)] } : {}
  return { ...status, ...identity }
}

export function plannedFor(
  shown: HeldShow,
  tv: string,
  aired: readonly AiredSeason[],
  seasons: readonly HeldSeason[],
  episodes: readonly HeldEpisode[],
  day: string
): Planned | string {
  const laid = laidOut(shown, tv, aired, seasons, episodes)
  const next = laid.placed.find((one) => one.status !== COMPLETED)
  if (next === undefined) return `every episode of ${shown.title} TMDB lists is watched already`
  const watched = { status: COMPLETED, completedAt: day, ownProgress: next.ownLength }
  const pages: Naming[] = []
  const report: string[] = []
  const left = laid.placed.filter(
    (one) => one.season === next.season && one.status !== COMPLETED && one.slug !== next.slug
  )
  for (const [number, at] of laid.seasonOf) {
    const changed =
      number === next.season ? seasonValues(left.length === 0, day, at.held?.status ?? null) : null
    if (at.fresh !== null) {
      pages.push({
        pageTypeSlug: season.slug,
        slug: at.slug,
        fresh: true,
        values: { ...at.fresh, ...(changed ?? {}) },
      })
      report.push(`${season.slug}/${at.slug}  created`)
    } else if (changed !== null) {
      pages.push({ pageTypeSlug: season.slug, slug: at.slug, merge: true, values: changed })
      report.push(`${season.slug}/${at.slug}  ${String(changed.status)}`)
    }
  }
  let created = 0
  for (const one of laid.placed) {
    if (one.fresh === null) continue
    created += 1
    const values = one.slug === next.slug ? { ...one.fresh, ...watched } : one.fresh
    pages.push({ pageTypeSlug: episode.slug, slug: one.slug, fresh: true, values })
  }
  if (next.fresh === null) {
    pages.push({ pageTypeSlug: episode.slug, slug: next.slug, merge: true, values: watched })
  }
  if (created > 0) report.push(`${String(created)} episodes created`)
  const kept = showValues(shown, tv)
  if (Object.keys(kept).length > 0) {
    pages.push({ pageTypeSlug: show.slug, slug: shown.slug, merge: true, values: kept })
  }
  report.push(`${episode.slug}/${next.slug}  ${COMPLETED}`)
  return { pages, report }
}

export function shelvedFor(
  shown: HeldShow,
  tv: string,
  aired: readonly AiredSeason[],
  seasons: readonly HeldSeason[],
  episodes: readonly HeldEpisode[]
): Planned {
  const laid = laidOut(shown, tv, aired, seasons, episodes)
  const pages: Naming[] = []
  const report: string[] = []
  const fed = new Set<number>()
  for (const one of laid.placed) if (one.fresh !== null) fed.add(one.season)
  for (const [number, at] of laid.seasonOf) {
    if (at.fresh !== null) {
      pages.push({ pageTypeSlug: season.slug, slug: at.slug, fresh: true, values: at.fresh })
      report.push(`${season.slug}/${at.slug}  created`)
    } else if (fed.has(number) && (at.held?.ownLength ?? 0) !== 0) {
      pages.push({
        pageTypeSlug: season.slug,
        slug: at.slug,
        merge: true,
        values: { ownLength: 0 },
      })
      report.push(`${season.slug}/${at.slug}  length from its episodes`)
    }
  }
  let created = 0
  for (const one of laid.placed) {
    if (one.fresh === null) continue
    created += 1
    pages.push({ pageTypeSlug: episode.slug, slug: one.slug, fresh: true, values: one.fresh })
  }
  if (created > 0) report.push(`${String(created)} episodes created`)
  return { pages, report }
}
