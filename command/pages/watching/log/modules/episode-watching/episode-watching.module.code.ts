import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { episode } from "akasha/alan/collection/watching/episode/episode.page-type.ts"
import { season } from "akasha/alan/collection/watching/season/season.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { asRecordOrEmpty } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type {
  Query,
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.module.code.ts"

export type Calls = {
  readonly ask: (query: Query) => Promise<Rows>
  readonly write: (asked: Writing) => Promise<Wrote>
  readonly fetch: (url: string, init: RequestInit) => Promise<Response>
}

export type AiredEpisode = {
  readonly number: number
  readonly id: number
  readonly name: string
  readonly overview: string
  readonly runtime: number | null
  readonly airDate: string | null
  readonly episodeType: string | null
  readonly stillPath: string | null
  readonly voteAverage: number | null
}

export type AiredSeason = {
  readonly number: number
  readonly id: number
  readonly name: string
  readonly overview: string
  readonly airDate: string | null
  readonly posterPath: string | null
  readonly voteAverage: number | null
  readonly episodes: readonly AiredEpisode[]
}

export type HeldShow = {
  readonly slug: string
  readonly title: string
  readonly status: string | null
  readonly identities: readonly Row[]
}

export type HeldSeason = {
  readonly slug: string
  readonly position: number
  readonly status: string | null
}

export type HeldEpisode = {
  readonly slug: string
  readonly season: string
  readonly position: number
  readonly status: string | null
  readonly ownLength: number
}

export type Planned = { readonly pages: readonly Naming[]; readonly report: readonly string[] }

type Placed = {
  readonly slug: string
  readonly season: number
  readonly position: number
  readonly status: string | null
  readonly ownLength: number
  readonly fresh: Readonly<Record<string, unknown>> | null
}

const AGENT = "alanwalton.com collection (aawalton@gmail.com)"

const FETCH_CEILING_MS = 15000

const TOKEN = "TMDB_READ_ACCESS_TOKEN"

const TMDB_AT = "https://api.themoviedb.org/3"

const TMDB_SITE = "https://www.themoviedb.org/tv"

const TMDB = "tmdb"

const COMPLETED = "completed"

const IN_PROGRESS = "in-progress"

const FOLLOWING = "following"

const NOT_STARTED = "not-started"

const DESCRIPTION_CEILING = 1000

const SEASON_NAMED = /^Season \d+$/

const MINUTES = `${unit.slug}/${minutes.slug}`

export function tokenSaid(): string | null {
  return optionalEnv(TOKEN) ?? null
}

export const TOKEN_UNSET = `${TOKEN} is unset, so TMDB lists no episode until it is in ~/.secrets.env`

export async function fetched(
  calls: Calls,
  url: string,
  headers: Readonly<Record<string, string>>
): Promise<Response | null> {
  try {
    const answered = await calls.fetch(url, {
      headers: { "user-agent": AGENT, ...headers },
      signal: AbortSignal.timeout(FETCH_CEILING_MS),
    })
    return answered.ok ? answered : null
  } catch {
    return null
  }
}

const fieldsOf = asRecordOrEmpty

const textOf = textIn

const numberOf = asNumber

function listOf(said: unknown): readonly unknown[] {
  return Array.isArray(said) ? (said as readonly unknown[]) : []
}

function airedEpisodeIn(said: unknown): AiredEpisode | null {
  const held = fieldsOf(said)
  const number = numberOf(held.episode_number)
  const id = numberOf(held.id)
  if (number === null || id === null) return null
  return {
    number,
    id,
    name: textOf(held.name) ?? `Episode ${String(number)}`,
    overview: textOf(held.overview) ?? "",
    runtime: numberOf(held.runtime),
    airDate: textOf(held.air_date),
    episodeType: textOf(held.episode_type),
    stillPath: textOf(held.still_path),
    voteAverage: numberOf(held.vote_average),
  }
}

export function airedSeasonIn(said: unknown): AiredSeason | null {
  const held = fieldsOf(said)
  const number = numberOf(held.season_number)
  const id = numberOf(held.id)
  if (number === null || id === null) return null
  return {
    number,
    id,
    name: textOf(held.name) ?? `Season ${String(number)}`,
    overview: textOf(held.overview) ?? "",
    airDate: textOf(held.air_date),
    posterPath: textOf(held.poster_path),
    voteAverage: numberOf(held.vote_average),
    episodes: listOf(held.episodes).flatMap((one) => airedEpisodeIn(one) ?? []),
  }
}

export function seasonNumbersIn(said: unknown): readonly number[] {
  return listOf(fieldsOf(said).seasons)
    .flatMap((one) => numberOf(fieldsOf(one).season_number) ?? [])
    .filter((one) => one > 0)
}

async function tmdbAnswer(calls: Calls, token: string, path: string): Promise<unknown> {
  const answered = await fetched(calls, `${TMDB_AT}${path}`, {
    authorization: `Bearer ${token}`,
    accept: "application/json",
  })
  return answered === null ? null : await answered.json()
}

export async function tmdbSearched(
  calls: Calls,
  token: string,
  title: string
): Promise<string | null> {
  const said = await tmdbAnswer(calls, token, `/search/tv?query=${encodeURIComponent(title)}`)
  const first = listOf(fieldsOf(said).results)[0]
  const id = numberOf(fieldsOf(first).id)
  return id === null ? null : String(id)
}

export async function airedFor(
  calls: Calls,
  token: string,
  tv: string
): Promise<readonly AiredSeason[] | null> {
  const said = await tmdbAnswer(calls, token, `/tv/${tv}`)
  if (said === null) return null
  const seasons: AiredSeason[] = []
  for (const number of seasonNumbersIn(said)) {
    const one = airedSeasonIn(await tmdbAnswer(calls, token, `/tv/${tv}/season/${String(number)}`))
    if (one !== null) seasons.push(one)
  }
  return seasons
}

export function tmdbIdOf(shown: HeldShow): string | null {
  const held = shown.identities.find((one) => one.source === TMDB)
  return typeof held?.externalId === "string" ? held.externalId : null
}

function rowsOf(asked: Rows): readonly Row[] | string {
  return "refused" in asked ? asked.refused : asked.rows
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
      keys: ["slug", "position", "status"],
    })
  )
  if (typeof seasonRows === "string") return seasonRows
  const seasons: HeldSeason[] = []
  const episodes: HeldEpisode[] = []
  for (const row of seasonRows) {
    const slug = textOf(row.slug)
    const position = numberOf(row.position)
    if (slug === null || position === null) continue
    seasons.push({ slug, position, status: textOf(row.status) })
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

function seasonSlugOf(shown: HeldShow, number: number): string {
  return `${shown.slug}-season-${String(number)}`
}

function episodeSlugOf(shown: HeldShow, number: number, at: number): string {
  return `${shown.slug}-s${padTwo(number)}e${padTwo(at)}`
}

function described(overview: string): Readonly<Record<string, unknown>> {
  return overview === "" ? {} : { description: overview.slice(0, DESCRIPTION_CEILING) }
}

function stated(key: string, value: unknown): Readonly<Record<string, unknown>> {
  return value === null ? {} : { [key]: value }
}

export function freshSeason(
  shown: HeldShow,
  tv: string,
  aired: AiredSeason
): Readonly<Record<string, unknown>> {
  const title = SEASON_NAMED.test(aired.name) ? `${shown.title} ${aired.name}` : aired.name
  return {
    title,
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

export function freshEpisode(
  seasonSlug: string,
  tv: string,
  number: number,
  aired: AiredEpisode
): Readonly<Record<string, unknown>> {
  return {
    title: aired.name,
    ...described(aired.overview),
    partOfCollections: [`${season.slug}/${seasonSlug}`],
    position: aired.number,
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
        externalLink: `${TMDB_SITE}/${tv}/season/${String(number)}/episode/${String(aired.number)}`,
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
    const airedHere = aired.find((one) => one.number === number)?.episodes ?? []
    for (const one of airedHere) {
      if (held.some((was) => was.position === one.number)) continue
      placed.push({
        slug: episodeSlugOf(shown, number, one.number),
        season: number,
        position: one.number,
        status: NOT_STARTED,
        ownLength: one.runtime ?? 0,
        fresh: freshEpisode(at.slug, tv, number, one),
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
