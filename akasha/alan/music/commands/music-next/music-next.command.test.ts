import { expect, test } from "bun:test"
import type { Given } from "@akasha/command-system/calling"
import { indexThere } from "@akasha/indexes"
import type { Catalog } from "@akasha/music-choosing/music-exploration"
import { selectNextExploration } from "@akasha/music-choosing/music-exploration"
import { MUSIC_RATINGS } from "@akasha/music-choosing/rating-ladder"
import { codeRoot } from "@akasha/pages-system/code-root"
import {
  catalogIn,
  gradeAmiss,
  musicNext,
  saidOf,
  selectionOf,
  undeclaredIn,
} from "./music-next.command.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha music-next",
  from: ROOT,
  writer: null,
  agentId: null,
}

const CATALOG: Catalog = {
  artists: [
    { slug: "loved-one", title: "Loved One", genre: ["pop"], rank: "A" },
    { slug: "unknown-one", title: "Unknown One", genre: ["pop"] },
  ],
  songs: [
    {
      slug: "loved-one-heard",
      title: "Heard",
      artistSlug: "loved-one",
      songType: "original",
      performed: true,
      rank: "A",
    },
    {
      slug: "loved-one-unheard",
      title: "Unheard",
      artistSlug: "loved-one",
      songType: "original",
      performed: true,
    },
    {
      slug: "unknown-one-first",
      title: "First",
      artistSlug: "unknown-one",
      songType: "original",
      performed: true,
    },
  ],
}

test("a loved artist with a song left ungraded is offered first", () => {
  const selection = selectionOf(selectNextExploration(CATALOG))
  expect(selection.kind).toBe("song-in-liked-artist")
  expect(selection.artist?.slug).toBe("loved-one")
  expect(selection.song?.slug).toBe("loved-one-unheard")
  expect(selection.playQuery).toBe("Loved One Unheard")
})

test("an exhausted catalogue is said rather than refused", () => {
  const selection = selectionOf(selectNextExploration({ artists: [], songs: [] }))
  expect(selection.kind).toBe("exhausted")
  expect(saidOf(selection)).toEqual(["Catalog exhausted — nothing new to surface right now."])
})

test("the human answer names the artist and the song", () => {
  const said = saidOf(selectionOf(selectNextExploration(CATALOG))).join("\n")
  expect(said).toContain("more from a loved artist: Unheard — Loved One")
  expect(said).toContain("artist slug loved-one")
  expect(said).toContain("song slug   loved-one-unheard")
})

test("anything other than --json is refused by name", () => {
  const said = musicNext(["--window"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("`--window` is nothing")
  expect(said.report).toEqual([])
})

test("the catalogue is read from the song pages and the artist pages", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  expect(catalog.artists.length).toBeGreaterThan(0)
  expect(catalog.songs.length).toBeGreaterThan(0)
  expect(catalog.artists.every((one) => one.slug !== "")).toBe(true)
  expect(catalog.songs.every((one) => one.artistSlug !== "")).toBe(true)
})

// THE TEST THE `rating` BUG WALKED PAST. Every test above this one either hands
// `selectNextExploration` a catalogue built by hand — already carrying `rank`, so the reader is
// never asked — or checks only that rows came back and their slugs are not empty. A reader
// dropping every grade satisfies all of them. This asks whether a grade survived the read.
test("the grades standing on the pages reach the catalogue", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  expect(catalog.artists.some((one) => one.rank !== undefined)).toBe(true)
  expect(catalog.songs.some((one) => one.rank !== undefined)).toBe(true)
})

test("every grade read off a page is a rung of the ladder", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  const graded = [...catalog.artists, ...catalog.songs].flatMap((one) =>
    one.rank === undefined ? [] : [one.rank]
  )
  expect(graded.length).toBeGreaterThan(0)
  expect(graded.every((one) => MUSIC_RATINGS.includes(one))).toBe(true)
})

// THE GUARD PROVED AGAINST A FAULT RATHER THAN AGAINST ITS OWN PASSING. `artist` and `song`
// answer null because they reach `rank` through `collection`, which is the case that matters and
// the one a check against a page type's own declarations alone would get wrong. `seat` is a real
// page type that declares no grade, and a name no page type carries is the other way this fails.
test("a page type that declares no grade is named rather than read as ungraded", () => {
  if (!indexThere(ROOT)) return
  expect(undeclaredIn(ROOT, "artist")).toBeNull()
  expect(undeclaredIn(ROOT, "song")).toBeNull()
  expect(gradeAmiss(ROOT)).toBeNull()
  expect(undeclaredIn(ROOT, "seat")).toContain("declares no `rank`")
  expect(undeclaredIn(ROOT, "no-such-page-type")).toContain("names no page type")
})

test("the json answer parses and carries the kind chosen", () => {
  if (!indexThere(ROOT)) return
  const said = musicNext(["--json"], GIVEN)
  expect(said.code).toBe(0)
  const parsed = JSON.parse(said.report.join("\n")) as { readonly kind: string }
  expect(["song-in-liked-artist", "new-artist", "exhausted"]).toContain(parsed.kind)
})
