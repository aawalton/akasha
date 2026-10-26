import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { asRecordOrEmpty } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { Listed } from "akasha/command/pages/watching/hallmark/modules/hallmark-listing/hallmark-listing.module.code.ts"
import {
  type Calls,
  listOf,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"

type Kind = "movie" | "tv"

export type Titled = {
  readonly kind: Kind
  readonly id: number
  readonly title: string
  readonly publishedAt: string | null
  readonly minutes: number | null
  readonly gathering: { readonly id: number; readonly name: string } | null
  readonly posterPath: string | null
  readonly imdbId: string | null
  readonly genres: readonly string[]
  readonly voteAverage: number | null
  readonly services: readonly string[]
  readonly episodes: number | null
  readonly loose: boolean
}

export type Refused = { readonly kind: Kind; readonly id: number; readonly title: string }

export type Matched = {
  readonly listed: Listed
  readonly titled: Titled | null
  readonly refused: Refused | null
}

const PASSING: ReadonlySet<string> = new Set(["the", "a", "an", "and", "of"])

const OWNER = /^(?:[A-Z][\w.]*\s+){0,2}[A-Z][\w.]*(?:'s|')\s+/

const TMDB_AT = "https://api.themoviedb.org/3"

const AGENT = "alanwalton.com collection (aawalton@gmail.com)"

const ATTEMPTS = 5

const BUSY = 429

const FAULTED = 500

const BACKOFF_MS = 500

const CEILING_MS = 15000

const AT_ONCE = 8

const NETWORKS = "384|7635"

const FIRST_YEAR = 2001

const DETAIL = "append_to_response=watch/providers,external_ids"

const STREAMED: readonly string[] = ["flatrate", "ads"]

const pause = (waited: number): Promise<void> =>
  new Promise((settle) => {
    setTimeout(settle, waited)
  })

async function answeredBy(calls: Calls, token: string, path: string): Promise<Response | null> {
  try {
    return await calls.fetch(`${TMDB_AT}${path}`, {
      headers: {
        "user-agent": AGENT,
        authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      signal: AbortSignal.timeout(CEILING_MS),
    })
  } catch {
    return null
  }
}

async function tmdbJson(calls: Calls, token: string, path: string): Promise<unknown> {
  for (let taken = 1; taken <= ATTEMPTS; taken += 1) {
    const answered = await answeredBy(calls, token, path)
    if (answered?.ok === true) return await answered.json()
    if (answered !== null && answered.status !== BUSY && answered.status < FAULTED) return null
    await pause(BACKOFF_MS * taken)
  }
  return null
}

export function squashed(said: string): string {
  return said
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "")
}

function wordsOf(said: string): ReadonlySet<string> {
  return new Set(
    said
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/'s\b/g, "")
      .replace(/mysteries/g, "mystery")
      .split(/[^a-z0-9]+/)
      .filter((one) => one !== "")
  )
}

function overlap(one: string, other: string): number {
  const these = wordsOf(one)
  const those = wordsOf(other)
  let shared = 0
  for (const word of these) if (those.has(word)) shared += 1
  return shared / (these.size + those.size - shared || 1)
}

export function alike(one: string, other: string): boolean {
  const these = squashed(one)
  const those = squashed(other)
  if (these === those || overlap(one, other) >= 0.6) return true
  const [short, long] = these.length < those.length ? [these, those] : [those, these]
  return short.length >= 6 && long.includes(short) && overlap(one, other) >= 0.5
}

function countedWords(said: string): readonly string[] {
  return said
    .replace(OWNER, "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/'s\b/g, "")
    .replace(/mysteries/g, "mystery")
    .split(/[^a-z0-9]+/)
    .filter((one) => one !== "" && !PASSING.has(one))
}

function leftOver(these: readonly string[], those: readonly string[]): readonly string[] {
  const rest = [...those]
  const over: string[] = []
  for (const word of these) {
    const at = rest.indexOf(word)
    if (at < 0) over.push(word)
    else rest.splice(at, 1)
  }
  return [...over, ...rest]
}

function readings(title: string): readonly string[] {
  const colon = title.indexOf(": ")
  return colon < 0 ? [title] : [title, title.slice(colon + 2)]
}

export function distinguishing(one: string, other: string): readonly string[] {
  let fewest: readonly string[] | null = null
  for (const these of readings(one)) {
    for (const those of readings(other)) {
      const over = leftOver(countedWords(these), countedWords(those))
      if (fewest === null || over.length < fewest.length) fewest = over
    }
  }
  return fewest ?? []
}

function yearNear(said: unknown, year: number): boolean {
  const dated = Number((textIn(said) ?? "").slice(0, 4))
  return Number.isFinite(dated) && dated > 0 && Math.abs(dated - year) <= 1
}

export function servicesIn(said: unknown): readonly string[] {
  const us = asRecordOrEmpty(asRecordOrEmpty(asRecordOrEmpty(said).results).US)
  const named = STREAMED.flatMap((kind) =>
    listOf(us[kind]).flatMap((one) => textIn(asRecordOrEmpty(one).provider_name) ?? [])
  )
  return [...new Set(named)].sort()
}

function titledFrom(kind: Kind, said: unknown, loose: boolean): Titled | null {
  const held = asRecordOrEmpty(said)
  const id = asNumber(held.id)
  const title = textIn(held.title) ?? textIn(held.name)
  if (id === null || title === null) return null
  const gathered = asRecordOrEmpty(held.belongs_to_collection)
  const gatheringId = asNumber(gathered.id)
  const gatheringName = textIn(gathered.name)
  const minutes = asNumber(held.runtime)
  return {
    kind,
    id,
    title,
    publishedAt: textIn(held.release_date) ?? textIn(held.first_air_date),
    minutes: minutes !== null && minutes > 0 ? minutes : null,
    gathering:
      gatheringId === null || gatheringName === null
        ? null
        : { id: gatheringId, name: gatheringName },
    posterPath: textIn(held.poster_path),
    imdbId: textIn(held.imdb_id) ?? textIn(asRecordOrEmpty(held.external_ids).imdb_id),
    genres: listOf(held.genres).flatMap((one) => textIn(asRecordOrEmpty(one).name) ?? []),
    voteAverage: asNumber(held.vote_average),
    services: servicesIn(held["watch/providers"]),
    episodes: asNumber(held.number_of_episodes),
    loose,
  }
}

type Found = { readonly kind: Kind; readonly id: number; readonly loose: boolean }

type Searched = { readonly found: Found | null; readonly refused: Refused | null }

type Candidate = { readonly id: number; readonly name: string; readonly exact: boolean }

function namesOf(one: Readonly<Record<string, unknown>>): readonly string[] {
  return [textIn(one.title), textIn(one.original_title)].flatMap((said) => said ?? [])
}

function judged(kind: Kind, candidates: readonly Candidate[], title: string): Searched {
  const exact = candidates.find((one) => one.exact)
  if (exact !== undefined) return { found: { kind, id: exact.id, loose: false }, refused: null }
  let refused: Refused | null = null
  for (const one of candidates) {
    if (distinguishing(one.name, title).length === 0) {
      return { found: { kind, id: one.id, loose: true }, refused: null }
    }
    refused ??= { kind, id: one.id, title: one.name }
  }
  return { found: null, refused }
}

async function filmSearched(
  calls: Calls,
  token: string,
  title: string,
  year: number,
  exactOnly: boolean
): Promise<Searched> {
  const asked = encodeURIComponent(title)
  const exactly = squashed(title)
  const paths = [
    `/search/movie?query=${asked}&primary_release_year=${String(year)}`,
    `/search/movie?query=${asked}`,
  ]
  let refused: Refused | null = null
  for (const path of paths) {
    const said = asRecordOrEmpty(await tmdbJson(calls, token, path))
    const candidates = listOf(said.results)
      .map(asRecordOrEmpty)
      .filter((one) => yearNear(one.release_date, year))
      .flatMap((one): Candidate[] => {
        const id = asNumber(one.id)
        const names = namesOf(one)
        const exact = names.some((other) => squashed(other) === exactly)
        const name = names.find((other) => alike(other, title))
        if (id === null || (!exact && (exactOnly || name === undefined))) return []
        return [{ id, name: name ?? title, exact }]
      })
    const searched = judged("movie", candidates, title)
    if (searched.found !== null) return searched
    refused ??= searched.refused
  }
  return { found: null, refused }
}

async function showSearched(
  calls: Calls,
  token: string,
  title: string,
  year: number,
  exactOnly: boolean
): Promise<Searched> {
  const exactly = squashed(title)
  const path = `/search/tv?query=${encodeURIComponent(title)}`
  const said = asRecordOrEmpty(await tmdbJson(calls, token, path))
  const candidates = listOf(said.results)
    .map(asRecordOrEmpty)
    .filter((one) => yearNear(one.first_air_date, year))
    .flatMap((one): Candidate[] => {
      const name = textIn(one.name) ?? ""
      const id = asNumber(one.id)
      const exact = squashed(name) === exactly
      const near = !exactOnly && overlap(name, title) >= 0.75
      return id !== null && (exact || near) ? [{ id, name, exact }] : []
    })
  return judged("tv", candidates, title)
}

async function searchedAs(
  calls: Calls,
  token: string,
  title: string,
  year: number,
  exactOnly = false
): Promise<Searched> {
  const film = await filmSearched(calls, token, title, year, exactOnly)
  if (film.found !== null) return film
  const show = await showSearched(calls, token, title, year, exactOnly)
  return show.found !== null ? show : { found: null, refused: film.refused ?? show.refused }
}

async function detailFor(
  calls: Calls,
  token: string,
  kind: Kind,
  id: number,
  loose = false
): Promise<Titled | null> {
  return titledFrom(kind, await tmdbJson(calls, token, `/${kind}/${String(id)}?${DETAIL}`), loose)
}

async function oneMatched(calls: Calls, token: string, listed: Listed): Promise<Matched> {
  const year = listed.aired === null ? listed.year : Number(listed.aired.slice(0, 4))
  const also = listed.alsoTitled
  const first = await searchedAs(calls, token, listed.title, year)
  const second =
    first.found !== null || also === null ? null : await searchedAs(calls, token, also, year, true)
  const found = first.found ?? second?.found ?? null
  const refused = found === null ? first.refused : null
  const titled =
    found === null ? null : await detailFor(calls, token, found.kind, found.id, found.loose)
  return { listed, titled, refused }
}

async function eachAtOnce<Given, Got>(
  given: readonly Given[],
  work: (one: Given) => Promise<Got>
): Promise<Got[]> {
  const got: Got[] = []
  let next = 0
  const worker = async (): Promise<void> => {
    while (next < given.length) {
      const at = next
      next += 1
      const one = given[at]
      if (one !== undefined) got[at] = await work(one)
    }
  }
  await Promise.all(Array.from({ length: AT_ONCE }, worker))
  return got
}

export async function matchedAll(
  calls: Calls,
  token: string,
  listed: readonly Listed[]
): Promise<Matched[]> {
  return await eachAtOnce(listed, (one) => oneMatched(calls, token, one))
}

export async function airedShows(calls: Calls, token: string): Promise<Titled[]> {
  const ids: number[] = []
  for (let page = 1; ; page += 1) {
    const path = `/discover/tv?with_networks=${NETWORKS}&sort_by=first_air_date.asc&page=${String(page)}`
    const said = asRecordOrEmpty(await tmdbJson(calls, token, path))
    for (const one of listOf(said.results).map(asRecordOrEmpty)) {
      const id = asNumber(one.id)
      const year = Number((textIn(one.first_air_date) ?? "").slice(0, 4))
      if (id !== null && year >= FIRST_YEAR) ids.push(id)
    }
    if (page >= (asNumber(said.total_pages) ?? 0)) break
  }
  const shows = await eachAtOnce(ids, (id) => detailFor(calls, token, "tv", id))
  return shows.flatMap((one) => one ?? [])
}
