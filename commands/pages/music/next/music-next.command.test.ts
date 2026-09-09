import { expect, test } from "bun:test"
import { indexThere } from "@akasha/indexes"
import { codeRoot } from "@akasha/pages/code-root"
import type { Catalog } from "akasha/alan/music/choosing/music-exploration/music-exploration.module.code.ts"
import { selectNextExploration } from "akasha/alan/music/choosing/music-exploration/music-exploration.module.code.ts"
import { MUSIC_RATINGS } from "akasha/alan/music/choosing/rating-ladder/rating-ladder.module.code.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
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
      artist: "loved-one",
      songType: "original",
      performed: true,
      rank: "A",
    },
    {
      slug: "loved-one-unheard",
      title: "Unheard",
      artist: "loved-one",
      songType: "original",
      performed: true,
    },
    {
      slug: "unknown-one-first",
      title: "First",
      artist: "unknown-one",
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
  expect(catalog.songs.every((one) => one.artist !== "")).toBe(true)
})

test("the grades on the pages reach the catalogue", () => {
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
