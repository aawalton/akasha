import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
import { filingOf } from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.test-fixtures.ts"
import { songOn } from "akasha/command/pages/music/link-songs/music-link-songs.command.code.ts"

const ARTIST_AT = `${artist.slug}/${sylviaDaley.slug}` as const

const BY_RELEASE: ReadonlyMap<string, string> = new Map([["sylvia-daley-pixie", "sylvia-daley"]])

const ON_PIXIE = { partOfCollections: ["release/sylvia-daley-pixie"] }

test("a track is matched under the artist the release carrying it names", () => {
  const found = songOn(filingOf(), BY_RELEASE, { ...ON_PIXIE, title: "Elf" })
  expect(found?.slug).toBe("sylvia-daley-elf")
  expect(found?.values).toBeNull()
})

test("a live take is matched to the song that take is a recording of", () => {
  expect(songOn(filingOf(), BY_RELEASE, { ...ON_PIXIE, title: "Elf - Live" })?.slug).toBe(
    "sylvia-daley-elf"
  )
})

test("a track on no release is matched to no song", () => {
  expect(songOn(filingOf(), BY_RELEASE, { title: "Elf" })).toBeNull()
})

test("a track whose release names an artist with no page is matched to no song", () => {
  const elsewhere = { partOfCollections: ["release/somebody-else-album"], title: "Elf" }
  expect(songOn(filingOf(), BY_RELEASE, elsewhere)).toBeNull()
})

test("a track matching no song has that song filed under the artist the release names", () => {
  const filing = filingOf()
  const filed = songOn(filing, BY_RELEASE, { ...ON_PIXIE, title: "Pixie Dust - Live" })
  expect(filed?.slug).toBe("sylvia-daley-pixie-dust")
  expect(filed?.values?.["artist"]).toBe(ARTIST_AT)
  const again = songOn(filing, BY_RELEASE, { ...ON_PIXIE, title: "Pixie Dust" })
  expect(again?.slug).toBe("sylvia-daley-pixie-dust")
  expect(again?.values).toBeNull()
})
