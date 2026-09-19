import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
import type { Filing } from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import { songKey } from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import {
  songFiledOn,
  songMatched,
} from "akasha/command/pages/music/link-songs/music-link-songs.command.code.ts"

const ARTIST_AT = `${artist.slug}/${sylviaDaley.slug}` as const

const SONGS: ReadonlyMap<string, string> = new Map([
  [songKey("sylvia-daley", "Elf"), "sylvia-daley-elf"],
])

const BY_RELEASE: ReadonlyMap<string, string> = new Map([["sylvia-daley-pixie", "sylvia-daley"]])

const ON_PIXIE = { partOfCollections: ["release/sylvia-daley-pixie"] }

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
  expect(filed?.values?.["artist"]).toBe(ARTIST_AT)
  expect(songMatched(filing.songs, BY_RELEASE, { ...ON_PIXIE, title: "Pixie Dust" })).toBe(
    "sylvia-daley-pixie-dust"
  )
})
