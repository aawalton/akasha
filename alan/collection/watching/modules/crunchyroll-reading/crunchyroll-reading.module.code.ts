import type { Sighting } from "akasha/alan/collection/watching/modules/episode-recording/episode-recording.module.code.ts"
import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

type Said = Readonly<Record<string, unknown>>

export type Reading = {
  readonly show: string
  readonly season: number | null
  readonly episode: number | null
  readonly name: string | null
  readonly film: boolean
}

const SERVICE = "crunchyroll"

const EPISODE =
  /^(?<series>.*?)\s*\|\s*(?:S(?<season>\d+)\s+)?E(?<episode>\d+)\s*[-–—:]\s*(?<name>.+)$/

const SEASON_TAIL = /\s*[-–—:]?\s*\(?\s*(?:Season\s+(?<long>\d+)|S(?<short>\d+))\s*\)?\s*$/i

const DUB = /\s*\([^)]*\bDub\b[^)]*\)\s*$/i

const SEASON_NAMED = /\bSeason\s+(\d+)\b/i

const WATCH = "/watch/"

function isSaid(value: unknown): value is Said {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function saidIn(value: unknown): Said {
  return isSaid(value) ? value : {}
}

function walks(value: unknown, into: Said[]): readonly Said[] {
  if (Array.isArray(value)) {
    for (const one of value) walks(one, into)
    return into
  }
  if (!isSaid(value)) return into
  into.push(value)
  walks(value["@graph"], into)
  return into
}

function kindsOf(one: Said): readonly string[] {
  const said = one["@type"]
  const kinds = typeof said === "string" ? [said] : stringsIn(said)
  return kinds.map((kind) => kind.toLowerCase())
}

function entryOf(one: Said): string | null {
  const named = textIn(one.name) ?? textIn(one.headline)
  return named
}

function seriesOf(value: unknown): string | null {
  if (typeof value === "string") return textIn(value)
  return textIn(saidIn(value).name)
}

function seasonNumberOf(value: unknown): number | null {
  if (typeof value === "number") return value
  if (typeof value === "string") return asNumber(value)
  const said = saidIn(value)
  const stated = asNumber(said.seasonNumber)
  if (stated !== null) return stated
  const named = SEASON_NAMED.exec(textIn(said.name) ?? "")
  return named === null ? null : Number(named[1])
}

function divided(series: string): { readonly show: string; readonly season: number | null } {
  const plain = series.replace(DUB, "").trim()
  const named = SEASON_TAIL.exec(plain)
  const numbered = named?.groups?.long ?? named?.groups?.short
  if (named === null || numbered === undefined) return { show: plain, season: null }
  return { show: plain.slice(0, named.index).trim(), season: Number(numbered) }
}

export function readTitle(title: string): Reading | null {
  const named = EPISODE.exec(title)
  if (named?.groups === undefined) return null
  const { show, season } = divided(named.groups.series ?? "")
  if (show === "") return null
  const episode = Number(named.groups.episode)
  return {
    show,
    season: named.groups.season === undefined ? season : Number(named.groups.season),
    episode: Number.isFinite(episode) ? episode : null,
    name: (named.groups.name ?? "").trim() || null,
    film: false,
  }
}

export function readData(scripts: readonly string[]): Reading | null {
  const every: Said[] = []
  for (const one of scripts) {
    try {
      walks(JSON.parse(one), every)
    } catch {}
  }
  const series =
    every
      .filter((one) => kindsOf(one).some((kind) => kind.includes("tvseries")))
      .map((one) => entryOf(one))
      .find((one) => one !== null) ?? null
  const film = every.find((one) => kindsOf(one).some((kind) => kind === "movie"))
  if (film !== undefined) {
    const named = entryOf(film)
    if (named !== null) return { show: named, season: null, episode: null, name: null, film: true }
  }
  const episode = every.find((one) => kindsOf(one).some((kind) => kind.includes("episode")))
  if (episode === undefined) return null
  const shown = seriesOf(episode.partOfSeries) ?? series
  const at = asNumber(episode.episodeNumber)
  if (shown === null || at === null) return null
  const { show, season: tailed } = divided(shown)
  if (show === "") return null
  return {
    show,
    season: seasonNumberOf(episode.partOfSeason) ?? tailed,
    episode: at,
    name: entryOf(episode),
    film: false,
  }
}

export function readCrunchyroll(title: string, scripts: readonly string[]): Reading | null {
  return readTitle(title) ?? readData(scripts)
}

function watchedFilm(title: string, link: string): Reading | null {
  if (!new URL(link).pathname.startsWith(WATCH)) return null
  if (EPISODE.test(title)) return null
  const show = (title.split("|")[0] ?? "").trim()
  return show === "" ? null : { show, season: null, episode: null, name: null, film: true }
}

export function crunchyrollSighted(): Sighting | null {
  return sightedOnCrunchyroll(document, location.href)
}

export function sightedOnCrunchyroll(doc: Document, link: string): Sighting | null {
  const scripts = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(
    (one) => one.textContent ?? ""
  )
  const reading = readCrunchyroll(doc.title, scripts) ?? watchedFilm(doc.title, link)
  if (reading === null) return null
  return {
    service: SERVICE,
    show: reading.show,
    season: reading.season,
    episode: reading.episode,
    name: reading.name,
    film: reading.film,
    minutes: null,
    link,
  }
}
