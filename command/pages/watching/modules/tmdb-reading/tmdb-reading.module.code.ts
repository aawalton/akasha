import { episodeType } from "akasha/alan/collection/watching/episode/properties/episode-type.select-property.ts"
import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { asRecordOrEmpty } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type {
  Query,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

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

const AGENT = "alanwalton.com collection (aawalton@gmail.com)"

const FETCH_CEILING_MS = 15000

const TOKEN = "TMDB_READ_ACCESS_TOKEN"

const TMDB_AT = "https://api.themoviedb.org/3"

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

export function listOf(said: unknown): readonly unknown[] {
  return Array.isArray(said) ? (said as readonly unknown[]) : []
}

export function episodeTypeOf(said: unknown): string | null {
  const read = textIn(said)?.replace(/_/g, "-") ?? null
  return read !== null && (episodeType.values as readonly string[]).includes(read) ? read : null
}

function airedEpisodeIn(said: unknown): AiredEpisode | null {
  const held = asRecordOrEmpty(said)
  const number = asNumber(held.episode_number)
  const id = asNumber(held.id)
  if (number === null || id === null) return null
  return {
    number,
    id,
    name: textIn(held.name) ?? `Episode ${String(number)}`,
    overview: textIn(held.overview) ?? "",
    runtime: asNumber(held.runtime),
    airDate: textIn(held.air_date),
    episodeType: episodeTypeOf(held.episode_type),
    stillPath: textIn(held.still_path),
    voteAverage: asNumber(held.vote_average),
  }
}

export function airedSeasonIn(said: unknown): AiredSeason | null {
  const held = asRecordOrEmpty(said)
  const number = asNumber(held.season_number)
  const id = asNumber(held.id)
  if (number === null || id === null) return null
  return {
    number,
    id,
    name: textIn(held.name) ?? `Season ${String(number)}`,
    overview: textIn(held.overview) ?? "",
    airDate: textIn(held.air_date),
    posterPath: textIn(held.poster_path),
    voteAverage: asNumber(held.vote_average),
    episodes: listOf(held.episodes).flatMap((one) => airedEpisodeIn(one) ?? []),
  }
}

export function seasonNumbersIn(said: unknown): readonly number[] {
  return listOf(asRecordOrEmpty(said).seasons)
    .flatMap((one) => asNumber(asRecordOrEmpty(one).season_number) ?? [])
    .filter((one) => one > 0)
}

export async function tmdbAnswer(calls: Calls, token: string, path: string): Promise<unknown> {
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
  const first = listOf(asRecordOrEmpty(said).results)[0]
  const id = asNumber(asRecordOrEmpty(first).id)
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
