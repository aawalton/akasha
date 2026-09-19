import { expect, test } from "bun:test"
import type { Filing } from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import { songKey } from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import {
  artistUnder,
  songFiledOn,
  songMatched,
  songNamed,
  valuesLinked,
} from "akasha/command/pages/music/link-songs/music-link-songs.command.code.ts"

const SONGS: ReadonlyMap<string, string> = new Map([
  [songKey("sylvia-daley", "Elf"), "sylvia-daley-elf"],
])

const BY_RELEASE: ReadonlyMap<string, string> = new Map([["sylvia-daley-pixie", "sylvia-daley"]])

const ON_PIXIE = { partOfCollections: ["release/sylvia-daley-pixie"] }

test("a release names the artist the release is filed under", () => {
  expect(artistUnder({ partOfCollections: ["artist/sylvia-daley"] })).toBe("sylvia-daley")
})

test("a release filed under a collection that is no artist names no artist", () => {
  expect(artistUnder({ partOfCollections: ["release-collection/musical-theater"] })).toBeNull()
  expect(artistUnder({})).toBeNull()
})

test("a track is matched under the artist the release carrying it names", () => {
  expect(songMatched(SONGS, BY_RELEASE, { ...ON_PIXIE, title: "Elf" })).toBe("sylvia-daley-elf")
})

test("a live take is matched to the song that take is a recording of", () => {
  expect(songMatched(SONGS, BY_RELEASE, { ...ON_PIXIE, title: "Elf - Live" })).toBe(
    "sylvia-daley-elf"
  )
})

test("a track on no release is matched to no song", () => {
  expect(songMatched(SONGS, BY_RELEASE, { title: "Elf" })).toBeNull()
})

test("a track whose release names an artist with no song is matched to no song", () => {
  const elsewhere = { partOfCollections: ["release/somebody-else-album"], title: "Elf" }
  expect(songMatched(SONGS, BY_RELEASE, elsewhere)).toBeNull()
})

test("a track matching no song has that song filed under the artist the release names", () => {
  const filing: Filing = {
    songs: new Map(SONGS),
    taken: new Set(["sylvia-daley-elf"]),
    artists: new Set(["sylvia-daley"]),
  }
  const filed = songFiledOn(filing, BY_RELEASE, { ...ON_PIXIE, title: "Pixie Dust - Live" })
  expect(filed?.slug).toBe("sylvia-daley-pixie-dust")
  expect(filed?.values?.["artist"]).toBe("artist/sylvia-daley")
  expect(songMatched(filing.songs, BY_RELEASE, { ...ON_PIXIE, title: "Pixie Dust" })).toBe(
    "sylvia-daley-pixie-dust"
  )
})

test("the song a track names is read whether or not it is written as an address", () => {
  expect(songNamed({ song: "song/sylvia-daley-elf" })).toBe("sylvia-daley-elf")
  expect(songNamed({ song: "sylvia-daley-elf" })).toBe("sylvia-daley-elf")
  expect(songNamed({})).toBeNull()
})

test("a track given a song names that song as an address", () => {
  expect(valuesLinked({ title: "Elf" }, "sylvia-daley-elf")).toEqual({
    title: "Elf",
    song: "song/sylvia-daley-elf",
  })
})

test("a track naming a song no longer matched gives that song up", () => {
  expect(valuesLinked({ title: "Elf", song: "song/sylvia-daley-elf" }, null)).toEqual({
    title: "Elf",
  })
})
