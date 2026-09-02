import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { valuesOfType } from "@akasha/indexes"
import type {
  Catalog,
  CatalogArtist,
  CatalogSong,
  Exploration,
} from "@akasha/music-choosing/music-exploration"
import { selectNextExploration } from "@akasha/music-choosing/music-exploration"
import type { MusicRating } from "@akasha/music-choosing/rating-ladder"
import { MUSIC_RATINGS } from "@akasha/music-choosing/rating-ladder"

const INPUT = 1

const JSON_SAID = "--json"

const ARTIST = "artist"

const SONG = "song"

const SONG_TYPES = ["original", "derivative"] as const

type Held = Record<string, unknown>

type Named = {
  readonly slug: string
  readonly title: string
}

export type Selection = {
  readonly kind: Exploration["kind"]
  readonly artist?: Named
  readonly song?: Named
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

function rating(held: Held): MusicRating | undefined {
  const said = text(held, "rating")
  return MUSIC_RATINGS.find((step) => step === said)
}

function oneOf<T extends string>(held: Held, key: string, admitted: readonly T[]): T | undefined {
  const said = text(held, key)
  return admitted.find((one) => one === said)
}

function artistIn(held: Held): CatalogArtist {
  const graded = rating(held)
  return {
    slug: text(held, "slug") ?? "",
    title: text(held, "title") ?? "",
    genre: list(held, "genre"),
    ...(graded === undefined ? {} : { rating: graded }),
  }
}

function songIn(held: Held): CatalogSong {
  const graded = rating(held)
  return {
    slug: text(held, "slug") ?? "",
    title: text(held, "title") ?? "",
    artistSlug: text(held, "artistSlug") ?? "",
    songType: oneOf(held, "songType", SONG_TYPES) ?? "derivative",
    performed: held["performed"] === true,
    ...(graded === undefined ? {} : { rating: graded }),
  }
}

export function catalogIn(root: string): Catalog {
  return {
    artists: valuesOfType(root, ARTIST).map((one) => artistIn(one.value)),
    songs: valuesOfType(root, SONG).map((one) => songIn(one.value)),
  }
}

export function selectionOf(exploration: Exploration): Selection {
  if (exploration.kind === "exhausted") return { kind: "exhausted" }
  const song =
    exploration.kind === "song-in-liked-artist" ? exploration.song : exploration.firstSong
  const artist = exploration.artist
  return {
    kind: exploration.kind,
    artist: { slug: artist.slug, title: artist.title },
    song: { slug: song.slug, title: song.title },
    playQuery: `${artist.title} ${song.title}`,
  }
}

export function saidOf(selection: Selection): readonly string[] {
  if (selection.kind === "exhausted") {
    return ["Catalog exhausted — nothing new to surface right now."]
  }
  const artist = selection.artist?.title ?? "?"
  const song = selection.song?.title ?? "?"
  const label =
    selection.kind === "song-in-liked-artist" ? "more from a loved artist" : "a new artist"
  return [
    `${label}: ${song} — ${artist}`,
    `  artist slug ${selection.artist?.slug ?? "?"}`,
    `  song slug   ${selection.song?.slug ?? "?"}`,
  ]
}

export function musicNext(argv: readonly string[], given: Given): Answer {
  for (const one of argv) {
    if (one !== JSON_SAID) {
      return refused(`\`${one}\` is nothing \`akasha music-next\` takes`, INPUT)
    }
  }
  const selection = selectionOf(selectNextExploration(catalogIn(given.root)))
  const report = argv.includes(JSON_SAID) ? [JSON.stringify(selection)] : saidOf(selection)
  return { report: [...report], refusals: [], code: 0 }
}
