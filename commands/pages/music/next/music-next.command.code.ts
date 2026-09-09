import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { valuesOfType } from "@akasha/indexes"
import { propertiesIfNamedOf } from "@akasha/pages/page-type-properties"
import { valueAt } from "@akasha/pages/page-value"
import type {
  Catalog,
  CatalogArtist,
  CatalogSong,
  Exploration,
} from "akasha/alan/music/choosing/music-exploration/music-exploration.module.code.ts"
import { selectNextExploration } from "akasha/alan/music/choosing/music-exploration/music-exploration.module.code.ts"
import type { MusicRating } from "akasha/alan/music/choosing/rating-ladder/rating-ladder.module.code.ts"
import { MUSIC_RATINGS } from "akasha/alan/music/choosing/rating-ladder/rating-ladder.module.code.ts"

const INPUT = 1

const DATA = 2

const JSON_SAID = "--json"

const ARTIST = "artist"

const SONG = "song"

const RANK = "rank"

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

function rank(held: Held): MusicRating | undefined {
  const said = text(held, RANK)
  return MUSIC_RATINGS.find((step) => step === said)
}

function oneOf<T extends string>(held: Held, key: string, admitted: readonly T[]): T | undefined {
  const said = text(held, key)
  return admitted.find((one) => one === said)
}

export function undeclaredIn(root: string, pageTypeSlug: string): string | null {
  const declared = propertiesIfNamedOf(pageTypeSlug, root, (path) => valueAt(path, root))
  if (declared === null) {
    return `\`${pageTypeSlug}\` names no page type here, so whether it carries \`${RANK}\` cannot be read`
  }
  if (declared.some((one) => one.key === RANK)) return null
  return `the \`${pageTypeSlug}\` page type declares no \`${RANK}\`, so every grade would read as none`
}

export function gradeAmiss(root: string): string | null {
  return undeclaredIn(root, ARTIST) ?? undeclaredIn(root, SONG)
}

function artistIn(held: Held): CatalogArtist {
  const graded = rank(held)
  return {
    slug: text(held, "slug") ?? "",
    title: text(held, "title") ?? "",
    genre: list(held, "genre"),
    ...(graded === undefined ? {} : { rank: graded }),
  }
}

function songIn(held: Held): CatalogSong {
  const graded = rank(held)
  return {
    slug: text(held, "slug") ?? "",
    title: text(held, "title") ?? "",
    artist: text(held, "artist") ?? "",
    songType: oneOf(held, "songType", SONG_TYPES) ?? "derivative",
    performed: held["performed"] === true,
    ...(graded === undefined ? {} : { rank: graded }),
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
  const amiss = gradeAmiss(given.root)
  if (amiss !== null) return refused(amiss, DATA)
  const selection = selectionOf(selectNextExploration(catalogIn(given.root)))
  const report = argv.includes(JSON_SAID) ? [JSON.stringify(selection)] : saidOf(selection)
  return { report: [...report], refusals: [], code: 0 }
}
