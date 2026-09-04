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
import { propertiesIfNamedOf } from "@akasha/pages-system/page-type-properties"
import { valueAt } from "@akasha/pages-system/page-value"

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

// THE KEY A PAGE CARRIES IS `rank`, AND THIS ASKED FOR `rating`. Measured 2026-09-03: 0 of 83
// artist pages and 0 of 1656 song pages carry a `rating` key, while 74 artists and 30 songs
// carry `rank`. So this answered `undefined` for every row and every grade was dropped —
// AURORA, graded `A+`, was offered as `a new artist`.
//
// `rating` and `rank` are ONE value space, not two, so the key is the whole of the fault.
// `MusicRating` is `Rung` from `@akasha/pages-system/rank-property`, and `rank.rank-property.ts`
// states those same sixteen rungs as its values; every grade standing on a page — `S`, `S-`,
// `A+`, `A`, `B+`, `B`, `C`, `D` — is one of them.
//
// The two spellings come from the two layers. `--rating` is the flag `music-rate` takes the
// grade under; `rank` is the key it writes (`music-rate.command.code.ts:155`), because
// `collection` declares `rank` two types above `artist`. A reader reads the key.
function rank(held: Held): MusicRating | undefined {
  const said = text(held, RANK)
  return MUSIC_RATINGS.find((step) => step === said)
}

function oneOf<T extends string>(held: Held, key: string, admitted: readonly T[]): T | undefined {
  const said = text(held, key)
  return admitted.find((one) => one === said)
}

// A KEY NO PAGE TYPE DECLARES IS A FAULT, NOT AN UNGRADED CATALOGUE. Reading a grade off a key
// that is not there answers `undefined` for every row, which reads exactly like a catalogue
// nobody has graded — and that is how the `rating` bug survived: all six tests over this command
// passed while every grade was being dropped, because none of them asked whether a grade had
// survived the read.
//
// A PAGE carrying no grade is ordinary and stays ordinary: 9 artists and 1626 songs carry none,
// and each is simply ungraded. A page TYPE carrying no grade is the reader and the declaration
// having drifted apart, and that is refused by name rather than answered as nothing.
//
// The chain is walked rather than the type read alone, because `artist` declares no `rank` of
// its own — it reaches it through `collection-external` and then `collection`. Judging against a
// page type's own declarations alone would call `rank` undeclared here and refuse every run.
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
    artistSlug: text(held, "artistSlug") ?? "",
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
