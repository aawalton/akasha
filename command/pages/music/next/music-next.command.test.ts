import { expect, test } from "bun:test"
import type { Catalog } from "akasha/alan/music/choosing/modules/music-exploration/music-exploration.module.code.ts"
import { selectNextExploration } from "akasha/alan/music/choosing/modules/music-exploration/music-exploration.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  catalogIn,
  gradeAmiss,
  idIn,
  musicNext,
  saidOf,
  selectionOf,
  undeclaredIn,
} from "akasha/command/pages/music/next/music-next.command.code.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import { indexThere } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha music next",
  from: ROOT,
  writer: null,
  agentId: null,
}

const CATALOG: Catalog = {
  artists: [
    { slug: "loved-one", title: "Loved One", genre: ["pop"], grade: "A" },
    { slug: "unknown-one", title: "Unknown One", genre: ["pop"] },
  ],
  songs: [],
  tracks: [
    {
      slug: "loved-one-heard",
      title: "Heard",
      artist: "loved-one",
      song: "heard",
      spotifyId: "1heard",
      grade: "A",
    },
    {
      slug: "loved-one-unheard",
      title: "Unheard",
      artist: "loved-one",
      song: "unheard",
      spotifyId: "2unheard",
    },
    {
      slug: "unknown-one-first",
      title: "First",
      artist: "unknown-one",
      song: "first",
      spotifyId: "3first",
    },
  ],
}

test("a loved artist with a track left ungraded is offered first", () => {
  const selection = selectionOf(selectNextExploration(CATALOG))
  expect(selection.kind).toBe("track-in-liked-artist")
  expect(selection.artist?.slug).toBe("loved-one")
  expect(selection.track?.slug).toBe("loved-one-unheard")
  expect(selection.playQuery).toBe("Loved One Unheard")
})

test("the track chosen answers its Spotify id and a uri `music play` takes", () => {
  const selection = selectionOf(selectNextExploration(CATALOG))
  expect(selection.spotifyId).toBe("2unheard")
  expect(selection.uri).toBe("spotify:track:2unheard")
})

test("an exhausted catalogue is said rather than refused", () => {
  const selection = selectionOf(selectNextExploration({ artists: [], songs: [], tracks: [] }))
  expect(selection.kind).toBe("exhausted")
  expect(saidOf(selection)).toEqual(["Catalog exhausted — nothing new to surface right now."])
})

test("the human answer names the artist, the track and the uri", () => {
  const said = saidOf(selectionOf(selectNextExploration(CATALOG))).join("\n")
  expect(said).toContain("more from a loved artist: Unheard — Loved One")
  expect(said).toContain("artist slug loved-one")
  expect(said).toContain("track slug  loved-one-unheard")
  expect(said).toContain("uri         spotify:track:2unheard")
})

test("anything other than --json is refused by name", () => {
  const said = musicNext(["--window"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("`--window` is no argument")
  expect(said.report).toEqual([])
})

test("the catalogue is read from the track pages, the song pages and the artist pages", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  expect(catalog.artists.length).toBeGreaterThan(0)
  expect(catalog.songs.length).toBeGreaterThan(0)
  expect(catalog.tracks.length).toBeGreaterThan(0)
  expect(catalog.artists.every((one) => one.slug !== "")).toBe(true)
  expect(catalog.songs.every((one) => one.artist !== "")).toBe(true)
})

test("a song reaches its artist whether or not it names that artist's page type", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  expect(catalog.songs.every((one) => !one.artist.includes("/"))).toBe(true)
  const slugs = new Set(catalog.artists.map((one) => one.slug))
  expect(catalog.songs.some((one) => slugs.has(one.artist))).toBe(true)
})

test("every track in the catalogue names an artist and a Spotify id", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  expect(catalog.tracks.every((one) => one.artist !== "" && one.spotifyId !== "")).toBe(true)
  expect(catalog.tracks.every((one) => !one.artist.includes("/"))).toBe(true)
  expect(catalog.tracks.every((one) => !one.song.includes("/"))).toBe(true)
})

test("the id answered is the one on the first release by slug carrying the track", () => {
  expect(
    idIn({
      carriedBy: [
        { release: "release/zed", externalId: "zed-id" },
        { release: "release/abe", externalId: "abe-id" },
      ],
    })
  ).toBe("abe-id")
  expect(idIn({})).toBeUndefined()
})

test("the grades on the pages reach the catalogue", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  expect(catalog.artists.some((one) => one.grade !== undefined)).toBe(true)
  expect(catalog.songs.some((one) => one.grade !== undefined)).toBe(true)
  expect(catalog.tracks.some((one) => one.grade !== undefined)).toBe(true)
})

test("every grade read off a page is a rung of the ladder", () => {
  if (!indexThere(ROOT)) return
  const catalog = catalogIn(ROOT)
  const graded = [...catalog.artists, ...catalog.songs, ...catalog.tracks].flatMap((one) =>
    one.grade === undefined ? [] : [one.grade]
  )
  expect(graded.length).toBeGreaterThan(0)
  expect(graded.every((one) => gradeProperty.values.includes(one))).toBe(true)
})

test("a page type nothing is filed under is named rather than read as ungraded", () => {
  if (!indexThere(ROOT)) return
  expect(undeclaredIn(ROOT, "artist")).toBeNull()
  expect(undeclaredIn(ROOT, "song")).toBeNull()
  expect(undeclaredIn(ROOT, "track")).toBeNull()
  expect(gradeAmiss(ROOT)).toBeNull()
  expect(undeclaredIn(ROOT, "seat")).toBeNull()
  expect(undeclaredIn(ROOT, "no-such-page-type")).toContain("names no page type")
})

test("the json answer parses and carries the kind chosen", () => {
  if (!indexThere(ROOT)) return
  const said = musicNext(["--json"], GIVEN)
  expect(said.code).toBe(0)
  const parsed = JSON.parse(said.report.join("\n")) as { readonly kind: string }
  expect(["track-in-liked-artist", "new-artist", "exhausted"]).toContain(parsed.kind)
})
