import type {
  Catalog,
  CatalogArtist,
  CatalogSong,
  CatalogTrack,
  Exploration,
} from "akasha/alan/music/choosing/modules/music-exploration/music-exploration.module.code.ts"
import { selectNextExploration } from "akasha/alan/music/choosing/modules/music-exploration/music-exploration.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  DATA,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicNext as page } from "akasha/command/pages/music/next/music-next.command.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  recordsIn,
  slugOf,
  textIn,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"
import { propertiesIfNamedOf } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const ARTIST = "artist"

const SONG = "song"

const TRACK = "track"

const GRADE = "grade"

const CARRIED_BY = "carriedBy"

const RELEASE = "release"

const EXTERNAL_ID = "externalId"

const PART_OF = "partOfCollections"

const ARTIST_UNDER = "artist/"

const URI_FROM = "spotify:track:"

type Held = Record<string, unknown>

type Named = {
  readonly slug: string
  readonly title: string
}

type Selection = {
  readonly kind: Exploration["kind"]
  readonly artist?: Named
  readonly track?: Named
  readonly spotifyId?: string
  readonly uri?: string
  readonly playQuery?: string
}

function text(held: Held, key: string): string | undefined {
  const said = held[key]
  return typeof said === "string" && said !== "" ? said : undefined
}

function list(held: Held, key: string): readonly string[] {
  const said = held[key]
  if (Array.isArray(said)) return said.filter((one): one is string => typeof one === "string")
  return typeof said === "string" && said !== "" ? [said] : []
}

function gradeOf(held: Held): Grade | undefined {
  const said = text(held, GRADE)
  return gradeProperty.values.find((step) => step === said)
}

export function undeclaredIn(root: string, pageTypeSlug: string): string | null {
  const declared = propertiesIfNamedOf(pageTypeSlug, root, (path) => valueAt(path, root))
  if (declared === null) {
    return `\`${pageTypeSlug}\` names no page type here, so whether it carries \`${GRADE}\` cannot be read`
  }
  if (declared.some((one) => one.key === GRADE)) return null
  return `the \`${pageTypeSlug}\` page type declares no \`${GRADE}\`, so every grade would read as none`
}

export function gradeAmiss(root: string): string | null {
  return undeclaredIn(root, ARTIST) ?? undeclaredIn(root, TRACK)
}

function artistIn(held: Held): CatalogArtist {
  const graded = gradeOf(held)
  return {
    slug: text(held, "slug") ?? "",
    title: text(held, "title") ?? "",
    genre: list(held, "genre"),
    ...(graded === undefined ? {} : { grade: graded }),
  }
}

function songIn(held: Held): CatalogSong {
  const named = text(held, ARTIST)
  return {
    slug: text(held, "slug") ?? "",
    artist: named === undefined ? "" : slugOf(named),
  }
}

type Carriage = {
  readonly artist: string
  readonly spotifyId: string
}

function artistOfRelease(held: Held): string | undefined {
  for (const one of list(held, PART_OF)) {
    if (one.startsWith(ARTIST_UNDER)) return one.slice(ARTIST_UNDER.length)
  }
  return undefined
}

export function releasesIn(root: string): ReadonlyMap<string, string> {
  const artistOf = new Map<string, string>()
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = text(one.value, "slug")
    const artist = artistOfRelease(one.value)
    if (slug !== undefined && artist !== undefined) artistOf.set(slug, artist)
  }
  return artistOf
}

export function carriageIn(held: Held, artistOf: ReadonlyMap<string, string>): Carriage | null {
  let earliest: string | undefined
  let found: Carriage | null = null
  for (const one of recordsIn(held[CARRIED_BY])) {
    const named = textIn(one, RELEASE)
    const spotifyId = textIn(one, EXTERNAL_ID)
    if (named === null || spotifyId === null) continue
    const release = slugOf(named)
    const artist = artistOf.get(release)
    if (artist === undefined) continue
    if (earliest === undefined || release < earliest) {
      earliest = release
      found = { artist, spotifyId }
    }
  }
  return found
}

function trackIn(held: Held, artistOf: ReadonlyMap<string, string>): readonly CatalogTrack[] {
  const carried = carriageIn(held, artistOf)
  if (carried === null) return []
  const named = text(held, SONG)
  const graded = gradeOf(held)
  return [
    {
      slug: text(held, "slug") ?? "",
      title: text(held, "title") ?? "",
      artist: carried.artist,
      song: named === undefined ? "" : slugOf(named),
      spotifyId: carried.spotifyId,
      ...(graded === undefined ? {} : { grade: graded }),
    },
  ]
}

export function catalogIn(root: string): Catalog {
  const artistOf = releasesIn(root)
  return {
    artists: valuesOfType(root, ARTIST).map((one) => artistIn(one.value)),
    songs: valuesOfType(root, SONG).map((one) => songIn(one.value)),
    tracks: valuesOfType(root, TRACK).flatMap((one) => trackIn(one.value, artistOf)),
  }
}

export function selectionOf(exploration: Exploration): Selection {
  if (exploration.kind === "exhausted") return { kind: "exhausted" }
  const track =
    exploration.kind === "track-in-liked-artist" ? exploration.track : exploration.firstTrack
  const artist = exploration.artist
  return {
    kind: exploration.kind,
    artist: { slug: artist.slug, title: artist.title },
    track: { slug: track.slug, title: track.title },
    spotifyId: track.spotifyId,
    uri: `${URI_FROM}${track.spotifyId}`,
    playQuery: `${artist.title} ${track.title}`,
  }
}

export function saidOf(selection: Selection): readonly string[] {
  if (selection.kind === "exhausted") {
    return ["Catalog exhausted — nothing new to surface right now."]
  }
  const artist = selection.artist?.title ?? "?"
  const track = selection.track?.title ?? "?"
  const label =
    selection.kind === "track-in-liked-artist" ? "more from a loved artist" : "a new artist"
  return [
    `${label}: ${track} — ${artist}`,
    `  artist slug ${selection.artist?.slug ?? "?"}`,
    `  track slug  ${selection.track?.slug ?? "?"}`,
    `  uri         ${selection.uri ?? "?"}`,
  ]
}

export function musicNext(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return refusedBy(read.refused)
  const amiss = gradeAmiss(given.root)
  if (amiss !== null) return refused(amiss, DATA)
  const selection = selectionOf(selectNextExploration(catalogIn(given.root)))
  return told(read.taken.json ? [JSON.stringify(selection)] : [...saidOf(selection)])
}
