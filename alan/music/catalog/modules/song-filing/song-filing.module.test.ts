import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
import {
  songFiledFor,
  songForTrack,
  songValuesFor,
} from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import { filingOf as filing } from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.test-fixtures.ts"
import { song } from "akasha/alan/music/catalog/song/song.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const SONG_AT = `${pageType.slug}/${song.slug}` as const

const ARTIST_AT = `${artist.slug}/${sylviaDaley.slug}` as const

test("a title matching no song is filed as a song of the artist the release names", () => {
  const held = filing()
  const filed = songFiledFor(held, "sylvia-daley", "Pixie Dust")
  expect(filed?.slug).toBe("sylvia-daley-pixie-dust")
  expect(filed?.values).toEqual({
    type: SONG_AT,
    slug: "sylvia-daley-pixie-dust",
    title: "Pixie Dust",
    artist: ARTIST_AT,
    performed: true,
  })
})

test("a song filed this way is titled the composition rather than the release title", () => {
  const filed = songFiledFor(filing(), "sylvia-daley", "Pixie Dust - Live At The Grove")
  expect(filed?.slug).toBe("sylvia-daley-pixie-dust")
  expect(filed?.values?.["title"]).toBe("Pixie Dust")
})

test("two titles reducing to one composition are filed as one song", () => {
  const held = filing()
  const one = songFiledFor(held, "sylvia-daley", "Pixie Dust")
  const two = songFiledFor(held, "sylvia-daley", "Pixie Dust (Acoustic)")
  expect(two?.slug).toBe(one?.slug)
  expect(two?.values).toBeNull()
})

test("nothing here writes over a song already filed", () => {
  const filed = songFiledFor(filing(), "sylvia-daley", "Elf - 2019 Remaster")
  expect(filed?.slug).toBe("sylvia-daley-elf")
  expect(filed?.values).toBeNull()
})

test("no song is filed under an artist who has no page", () => {
  expect(songFiledFor(filing(), "musical-theater", "Defying Gravity")).toBeNull()
})

test("a title holding no letter and no digit is filed as a song of its own", () => {
  const held = filing()
  expect(songFiledFor(held, "sylvia-daley", "★★★")?.values?.["title"]).toBe("★★★")
  expect(songFiledFor(held, "sylvia-daley", "!!!")?.values?.["title"]).toBe("!!!")
})

test("a song filed this way states no external record and no song type", () => {
  const values = songValuesFor("sylvia-daley", "sylvia-daley-elf", "Elf")
  expect(values["externalIdentity"]).toBeUndefined()
  expect(values["songType"]).toBeUndefined()
})

test("a title a song is filed under already names that song rather than filing another", () => {
  const found = songForTrack(filing(), "sylvia-daley", "Elf")
  expect(found?.slug).toBe("sylvia-daley-elf")
  expect(found?.values).toBeNull()
})

test("a title matching no song is filed as one and then named", () => {
  const held = filing()
  expect(songForTrack(held, "sylvia-daley", "Pixie Dust")?.values).not.toBeNull()
  expect(songForTrack(held, "sylvia-daley", "Pixie Dust")?.values).toBeNull()
})
