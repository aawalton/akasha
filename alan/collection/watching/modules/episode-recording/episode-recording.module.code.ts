import { episode } from "akasha/alan/collection/watching/episode/episode.page-type.ts"
import { movie } from "akasha/alan/collection/watching/movie/movie.page-type.ts"
import { season } from "akasha/alan/collection/watching/season/season.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

export type Row = Readonly<Record<string, unknown>>

export type Sighting = {
  readonly service: string
  readonly show: string
  readonly season: number | null
  readonly episode: number | null
  readonly name: string | null
  readonly film: boolean
  readonly minutes: number | null
  readonly link: string
}

export type Patch = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly set: Readonly<Record<string, unknown>>
}

export type Recording = {
  readonly patches: readonly Patch[]
  readonly said: string
}

export type Held = {
  readonly shows: readonly Row[]
  readonly films: readonly Row[]
  readonly seasons: readonly Row[]
  readonly episodes: readonly Row[]
}

const COMPLETED = "completed"

const IN_PROGRESS = "in-progress"

const FOLLOWING = "following"

const MARKS = /[̀-ͯ]/g

const SHORTEST_KEY = 2

export function titleKey(title: string): string {
  return title
    .normalize("NFKD")
    .replace(MARKS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
}

function keyed(title: string | null): string | null {
  if (title === null) return null
  const key = titleKey(title)
  return key.length < SHORTEST_KEY ? null : key
}

export function titled(rows: readonly Row[], title: string): Row | null {
  const key = keyed(title)
  if (key === null) return null
  return rows.find((one) => keyed(textIn(one.title)) === key) ?? null
}

export function seasonRowOf(one: Row, seasons: readonly Row[]): Row | null {
  const held = stringsIn(one.partOfCollections).find((at) => at.startsWith(`${season.slug}/`))
  if (held === undefined) return null
  const slug = held.slice(season.slug.length + 1)
  return seasons.find((at) => textIn(at.slug) === slug) ?? null
}

function numberIn(one: Row | null): number | null {
  return one === null ? null : asNumber(one.position)
}

export function episodeIn(
  episodes: readonly Row[],
  seasons: readonly Row[],
  sighting: Sighting
): Row | string {
  const at = sighting.episode
  if (at === null) return `the page names no episode number`
  const named = sighting.season === null ? "" : ` season ${String(sighting.season)}`
  const numbered = episodes.filter((one) => asNumber(one.position) === at)
  const held =
    sighting.season === null
      ? numbered
      : numbered.filter((one) => numberIn(seasonRowOf(one, seasons)) === sighting.season)
  if (held.length === 0) return `akasha holds no episode ${String(at)}${named} of ${sighting.show}`
  const key = keyed(sighting.name)
  if (key !== null) {
    const matching = held.filter((one) => keyed(textIn(one.title)) === key)
    const only = matching[0]
    if (matching.length === 1 && only !== undefined) return only
  }
  const first = held[0]
  if (held.length === 1 && first !== undefined) return first
  return `akasha holds more than one episode ${String(at)}${named} of ${sighting.show}, so nothing was recorded`
}

function nothing(said: string): Recording {
  return { patches: [], said }
}

function marked(
  day: string,
  length: number,
  minutes: number | null
): Readonly<Record<string, unknown>> {
  if (length > 0) return { status: COMPLETED, completedAt: day, ownProgress: length }
  const runs = Math.round(minutes ?? 0)
  if (runs <= 0) return { status: COMPLETED, completedAt: day }
  return { status: COMPLETED, completedAt: day, ownLength: runs, ownProgress: runs }
}

function filmRecorded(sighting: Sighting, films: readonly Row[], day: string): Recording {
  const film = titled(films, sighting.show)
  if (film === null) return nothing(`akasha holds no film titled ${sighting.show}`)
  const slug = textIn(film.slug)
  if (slug === null) return nothing(`akasha holds no film titled ${sighting.show}`)
  if (textIn(film.status) === COMPLETED) return nothing(`${sighting.show} is recorded already.`)
  const set = marked(day, asNumber(film.ownLength) ?? 0, sighting.minutes)
  return {
    patches: [{ pageTypeSlug: movie.slug, slug, set }],
    said: `${sighting.show} is recorded.`,
  }
}

export function recordingFor(sighting: Sighting, held: Held, day: string): Recording {
  if (sighting.film) return filmRecorded(sighting, held.films, day)
  const shown = titled(held.shows, sighting.show)
  if (shown === null) return nothing(`akasha holds no show titled ${sighting.show}`)
  const showSlug = textIn(shown.slug)
  if (showSlug === null) return nothing(`akasha holds no show titled ${sighting.show}`)
  const found = episodeIn(held.episodes, held.seasons, sighting)
  if (typeof found === "string") return nothing(found)
  const slug = textIn(found.slug)
  if (slug === null) return nothing(`akasha holds no page for that episode of ${sighting.show}`)
  const atSeason = numberIn(seasonRowOf(found, held.seasons)) ?? sighting.season
  const at = `S${String(atSeason ?? 1)} E${String(asNumber(found.position) ?? sighting.episode)} of ${sighting.show}`
  if (textIn(found.status) === COMPLETED) return nothing(`${at} is recorded already.`)
  const patches: Patch[] = [
    {
      pageTypeSlug: episode.slug,
      slug,
      set: marked(day, asNumber(found.ownLength) ?? 0, sighting.minutes),
    },
  ]
  let finishing = ""
  const seasonRow = seasonRowOf(found, held.seasons)
  const seasonSlug = seasonRow === null ? null : textIn(seasonRow.slug)
  if (seasonRow !== null && seasonSlug !== null) {
    const left = held.episodes.filter(
      (one) =>
        one !== found &&
        textIn(one.slug) !== slug &&
        seasonRowOf(one, held.seasons) === seasonRow &&
        textIn(one.status) !== COMPLETED
    )
    if (left.length === 0 && textIn(seasonRow.status) !== COMPLETED) {
      patches.push({
        pageTypeSlug: season.slug,
        slug: seasonSlug,
        set: { status: COMPLETED, completedAt: day },
      })
      finishing = ` Season ${String(atSeason ?? 1)} is done.`
    } else if (left.length > 0 && textIn(seasonRow.status) !== IN_PROGRESS) {
      patches.push({ pageTypeSlug: season.slug, slug: seasonSlug, set: { status: IN_PROGRESS } })
    }
  }
  const showStatus = textIn(shown.status)
  if (showStatus !== IN_PROGRESS && showStatus !== FOLLOWING) {
    patches.push({ pageTypeSlug: show.slug, slug: showSlug, set: { status: IN_PROGRESS } })
  }
  return { patches, said: `${at} is recorded.${finishing}` }
}
