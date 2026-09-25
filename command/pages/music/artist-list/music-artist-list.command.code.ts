import { status as statusPage } from "akasha/alan/collection/properties/status.select-property.ts"
import type { Status } from "akasha/alan/collection/properties/status.select-property.types.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { collectionStatus } from "akasha/command/argument/pages/collection-status.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  INPUT,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicArtistList as page } from "akasha/command/pages/music/artist-list/music-artist-list.command.ts"
import { srgbOf } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"
import {
  carriedFor,
  computedInto,
  gatheredFor,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"

const ARTIST = "artist"

const RELEASE = "release"

const COLOR = "color"

const NONE = "none"

const BYTE = 255

const WORN_OFF = "\x1b[39m"

type Held = Record<string, unknown>

type Roll = {
  releases: number
  graded: number
}

type ArtistRow = {
  readonly slug: string
  readonly title: string
  readonly status: Status | null
  readonly grade: Grade | null
  readonly releases: number
  readonly length: number
  readonly progress: number
  readonly graded: number
}

type Rung = {
  readonly grade: Grade | typeof NONE
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
  readonly graded: number
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

function gradeOf(held: Held): Grade | null {
  const graded = firstIn(held, "grade")
  return gradeProperty.values.find((rung) => rung === graded) ?? null
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
    const named = firstIn(one, "partOfCollections")
    if (named === undefined) continue
    const slug = slugOf(named)
    const held = rolled.get(slug) ?? { releases: 0, graded: 0 }
    held.releases += 1
    held.graded += gradeOf(one) === null ? 0 : 1
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
    const roll = rolled.get(slug) ?? { releases: 0, graded: 0 }
    rows.push({
      slug,
      title: firstIn(one, "title") ?? slug,
      status: stated,
      grade: gradeOf(one),
      releases: roll.releases,
      length: count(one, "totalLength"),
      progress: count(one, "totalProgress"),
      graded: roll.graded,
    })
  }
  return rows.sort((a, b) => b.length - a.length || a.title.localeCompare(b.title))
}

export function rungsOf(rows: readonly ArtistRow[]): readonly Rung[] {
  const rungs: Rung[] = []
  for (const rung of [...gradeProperty.values].reverse()) {
    const artists = rows.filter((one) => one.grade === rung).length
    if (artists > 0) rungs.push({ grade: rung, artists })
  }
  const ungraded = rows.filter((one) => one.grade === null).length
  if (ungraded > 0) rungs.push({ grade: NONE, artists: ungraded })
  return rungs
}

export function artistsOf(root: string, wanted: Status | null): Artists {
  const counted = computedInto(root, gatheredFor(root, ARTIST, carriedFor(root, ARTIST)))
  const artists = counted.rows.map((one) => one.value as Held)
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
    graded: rows.reduce((was, one) => was + one.graded, 0),
  }
}

function share(part: number, whole: number): string {
  return whole === 0 ? "-" : `${Math.round((part / whole) * 100)}%`
}

type Wearing = (grade: Grade, said: string) => string

export const bare: Wearing = (_grade, said) => said

function hexesIn(root: string): ReadonlyMap<string, string> {
  const hexes = new Map<string, string>()
  for (const one of valuesOfType(root, COLOR)) {
    const held = one.value as Held
    const slug = firstIn(held, "slug")
    const hex = firstIn(held, "hex")
    if (slug !== undefined && hex !== undefined) hexes.set(slug, hex)
  }
  return hexes
}

function wornOn(hex: string): string {
  const [red, green, blue] = srgbOf(hex)
  const byte = (one: number): number => Math.round(one * BYTE)
  return `\x1b[38;2;${byte(red)};${byte(green)};${byte(blue)}m`
}

export function wearingIn(root: string): Wearing {
  const hexes = hexesIn(root)
  const worn = new Map<string, string>()
  for (const one of gradeProperty.optionColors) {
    const hex = hexes.get(slugOf(one.color))
    if (hex !== undefined) worn.set(one.value, wornOn(hex))
  }
  return (grade, said) => {
    const on = worn.get(grade)
    return on === undefined ? said : `${on}${said}${WORN_OFF}`
  }
}

export function saidOf(data: Artists, wearing: Wearing = bare): readonly string[] {
  const scope = data.status === null ? "" : ` ${data.status}`
  const header = `Artists${scope} — ${data.artists}:`
  if (data.rows.length === 0) return [header, "  (none)"]
  const titles = Math.max(0, ...data.rows.map((one) => one.title.length))
  const lines = [header]
  for (const one of data.rows) {
    const cell = (one.grade ?? "-").padEnd(2)
    const grade = one.grade === null ? cell : wearing(one.grade, cell)
    const runs = `${Math.round(one.length)} min`.padStart(9)
    lines.push(
      `  ${one.title.padEnd(titles)}  ${grade}  ${String(one.releases).padStart(4)} rel ${runs}  ` +
        `${share(one.progress, one.length).padStart(4)} heard  ` +
        `${share(one.graded, one.releases).padStart(4)} graded`
    )
  }
  lines.push(
    "",
    `  ${data.releases} releases · ${Math.round(data.length / 60)} h · ` +
      `${Math.round(data.progress / 60)} h heard (${share(data.progress, data.length)}) · ` +
      `${data.graded} graded (${share(data.graded, data.releases)})`,
    `  ${data.rungs
      .map((one) =>
        one.grade === NONE
          ? `${one.grade} ${one.artists}`
          : `${wearing(one.grade, one.grade)} ${one.artists}`
      )
      .join(" · ")}`
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
  if (read.taken.json) return told([JSON.stringify(data)])
  const wearing = process.stdout.isTTY === true ? wearingIn(given.root) : bare
  return told([...saidOf(data, wearing)])
}
