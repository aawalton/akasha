import { status as statusPage } from "akasha/alan/collections/properties/status.select-property.ts"
import type { Status } from "akasha/alan/collections/properties/status.select-property.types.ts"
import type { MusicRating } from "akasha/alan/music/choosing/modules/rating-ladder/rating-ladder.module.code.ts"
import { MUSIC_RATINGS } from "akasha/alan/music/choosing/modules/rating-ladder/rating-ladder.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { collectionStatus } from "akasha/commands/arguments/pages/collection-status.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  INPUT,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { musicArtistList as page } from "akasha/commands/pages/music/artist-list/music-artist-list.command.ts"
import { valuesOfType } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"

const ARTIST = "artist"

const RELEASE = "release"

const NONE = "none"

type Held = Record<string, unknown>

type Roll = {
  releases: number
  length: number
  progress: number
  ranked: number
}

export type ArtistRow = {
  readonly slug: string
  readonly title: string
  readonly status: Status | null
  readonly rank: MusicRating | null
  readonly releases: number
  readonly length: number
  readonly progress: number
  readonly ranked: number
}

export type Rung = {
  readonly rank: MusicRating | typeof NONE
  readonly artists: number
}

export type Artists = {
  readonly status: Status | null
  readonly artists: number
  readonly rows: readonly ArtistRow[]
  readonly rungs: readonly Rung[]
  readonly releases: number
  readonly length: number
  readonly progress: number
  readonly ranked: number
}

function count(held: Held, key: string): number {
  const said = held[key]
  return typeof said === "number" && Number.isFinite(said) ? said : 0
}

function firstIn(held: Held, key: string): string | undefined {
  const said = held[key]
  if (Array.isArray(said)) {
    const one = said[0]
    return typeof one === "string" && one !== "" ? one : undefined
  }
  return typeof said === "string" && said !== "" ? said : undefined
}

function rankOf(held: Held): MusicRating | null {
  const graded = firstIn(held, "rank")
  return MUSIC_RATINGS.find((rung) => rung === graded) ?? null
}

function statusOf(held: Held): Status | null {
  const stated = firstIn(held, "status")
  return statusPage.values.find((one) => one === stated) ?? null
}

export function statusSaid(said: string | undefined): Status | null {
  return statusPage.values.find((one) => one === said) ?? null
}

function rolledBySlug(releases: readonly Held[]): ReadonlyMap<string, Roll> {
  const rolled = new Map<string, Roll>()
  for (const one of releases) {
    const slug = firstIn(one, "partOfCollections")
    if (slug === undefined) continue
    const held = rolled.get(slug) ?? { releases: 0, length: 0, progress: 0, ranked: 0 }
    held.releases += 1
    held.length += count(one, "ownLength")
    held.progress += count(one, "ownProgress")
    held.ranked += rankOf(one) === null ? 0 : 1
    rolled.set(slug, held)
  }
  return rolled
}

export function rowsOf(
  artists: readonly Held[],
  releases: readonly Held[],
  wanted: Status | null
): readonly ArtistRow[] {
  const rolled = rolledBySlug(releases)
  const rows: ArtistRow[] = []
  for (const one of artists) {
    const slug = firstIn(one, "slug")
    if (slug === undefined) continue
    const stated = statusOf(one)
    if (wanted !== null && stated !== wanted) continue
    const roll = rolled.get(slug) ?? { releases: 0, length: 0, progress: 0, ranked: 0 }
    rows.push({
      slug,
      title: firstIn(one, "title") ?? slug,
      status: stated,
      rank: rankOf(one),
      releases: roll.releases,
      length: roll.length,
      progress: roll.progress,
      ranked: roll.ranked,
    })
  }
  return rows.sort((a, b) => b.length - a.length || a.title.localeCompare(b.title))
}

export function rungsOf(rows: readonly ArtistRow[]): readonly Rung[] {
  const rungs: Rung[] = []
  for (const rung of [...MUSIC_RATINGS].reverse()) {
    const artists = rows.filter((one) => one.rank === rung).length
    if (artists > 0) rungs.push({ rank: rung, artists })
  }
  const ungraded = rows.filter((one) => one.rank === null).length
  if (ungraded > 0) rungs.push({ rank: NONE, artists: ungraded })
  return rungs
}

export function artistsOf(root: string, wanted: Status | null): Artists {
  const artists = valuesOfType(root, ARTIST).map((one) => one.value as Held)
  const releases = valuesOfType(root, RELEASE).map((one) => one.value as Held)
  const rows = rowsOf(artists, releases, wanted)
  return {
    status: wanted,
    artists: rows.length,
    rows,
    rungs: rungsOf(rows),
    releases: rows.reduce((was, one) => was + one.releases, 0),
    length: rows.reduce((was, one) => was + one.length, 0),
    progress: rows.reduce((was, one) => was + one.progress, 0),
    ranked: rows.reduce((was, one) => was + one.ranked, 0),
  }
}

function share(part: number, whole: number): string {
  return whole === 0 ? "-" : `${Math.round((part / whole) * 100)}%`
}

export function saidOf(data: Artists): readonly string[] {
  const scope = data.status === null ? "" : ` ${data.status}`
  const header = `Artists${scope} — ${data.artists}:`
  if (data.rows.length === 0) return [header, "  (none)"]
  const titles = Math.max(0, ...data.rows.map((one) => one.title.length))
  const lines = [header]
  for (const one of data.rows) {
    const rung = (one.rank ?? "-").padEnd(2)
    const runs = `${Math.round(one.length)} min`.padStart(9)
    lines.push(
      `  ${one.title.padEnd(titles)}  ${rung}  ${String(one.releases).padStart(4)} rel ${runs}  ` +
        `${share(one.progress, one.length).padStart(4)} heard  ` +
        `${share(one.ranked, one.releases).padStart(4)} graded`
    )
  }
  lines.push(
    "",
    `  ${data.releases} releases · ${Math.round(data.length / 60)} h · ` +
      `${Math.round(data.progress / 60)} h heard (${share(data.progress, data.length)}) · ` +
      `${data.ranked} graded (${share(data.ranked, data.releases)})`,
    `  ${data.rungs.map((one) => `${one.rank} ${one.artists}`).join(" · ")}`
  )
  return lines
}

export function musicArtistList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json, collectionStatus])
  if ("refused" in read) return refusedBy(read.refused)
  const said = read.taken.collectionStatus
  const wanted = said === undefined ? null : statusSaid(said)
  if (said !== undefined && wanted === null) {
    return refused(
      `\`${collectionStatus.said}\` takes one of ${statusPage.values.join(", ")}, and \`${said}\` is none of them`,
      INPUT
    )
  }
  const data = artistsOf(given.root, wanted)
  return told(read.taken.json ? [JSON.stringify(data)] : [...saidOf(data)])
}
