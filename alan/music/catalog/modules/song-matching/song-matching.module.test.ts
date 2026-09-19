import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
import {
  artistOf,
  artistUnder,
  compositionTitle,
  songKey,
  songNamed,
  songSlugFor,
  valuesLinked,
} from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import { musicalTheaterWickedTheSoundtrack } from "akasha/alan/music/catalog/release/pages/musical-theater-wicked-the-soundtrack/musical-theater-wicked-the-soundtrack.release.ts"
import { release } from "akasha/alan/music/catalog/release/release.page-type.ts"
import { musicalTheater } from "akasha/alan/music/catalog/release-collection/pages/musical-theater.release-collection.ts"
import { releaseCollection } from "akasha/alan/music/catalog/release-collection/release-collection.page-type.ts"
import { auroraRunaway } from "akasha/alan/music/catalog/song/pages/aurora-runaway/aurora-runaway.song.ts"
import { song } from "akasha/alan/music/catalog/song/song.page-type.ts"

const ORDINARY = "ariana-grande-ordinary-things"

const JASON = "ariana-grande-jasons-song-gave-it-away"

const RUNAWAY = auroraRunaway.slug

const RUNAWAY_AT = `${song.slug}/${auroraRunaway.slug}` as const

const SONGS: ReadonlyMap<string, string> = new Map([
  [songKey("ariana-grande", "ordinary things"), ORDINARY],
  [songKey("ariana-grande", "Jason's Song (Gave It Away)"), JASON],
  [songKey("aurora", "Runaway"), RUNAWAY],
])

const BY_RELEASE: ReadonlyMap<string, string> = new Map([["sylvia-daley-pixie", "sylvia-daley"]])

const ON_PIXIE = { partOfCollections: ["release/sylvia-daley-pixie"] }

test("a release names the artist the release is filed under", () => {
  expect(artistUnder({ partOfCollections: [`${artist.slug}/${sylviaDaley.slug}`] })).toBe(
    sylviaDaley.slug
  )
})

test("a release filed under a collection that is no artist names no artist", () => {
  const under = `${releaseCollection.slug}/${musicalTheater.slug}`
  expect(artistUnder({ partOfCollections: [under] })).toBeNull()
  expect(artistUnder({})).toBeNull()
})

test("a track whose release names no artist takes the artist Spotify credits on it", () => {
  const onWicked = {
    partOfCollections: [`${release.slug}/${musicalTheaterWickedTheSoundtrack.slug}`],
    trackArtist: [{ artistName: "Cynthia Erivo" }, { artistName: "Ariana Grande" }],
  }
  expect(artistOf(BY_RELEASE, onWicked)).toBe("cynthia-erivo")
})

test("a release naming an artist outranks the artist Spotify credits on a track", () => {
  const onPixie = { ...ON_PIXIE, trackArtist: [{ artistName: "Somebody Else" }] }
  expect(artistOf(BY_RELEASE, onPixie)).toBe(sylviaDaley.slug)
})

test("a track no release and no credit names takes no artist", () => {
  expect(artistOf(BY_RELEASE, { title: "Elf" })).toBeNull()
})

test("a title a song holds whole is matched whole", () => {
  expect(songSlugFor(SONGS, "ariana-grande", "ordinary things")).toBe(ORDINARY)
})

test("a bracketed credit is no part of the composition", () => {
  expect(songSlugFor(SONGS, "ariana-grande", "ordinary things (feat. Nonna)")).toBe(ORDINARY)
  expect(songSlugFor(SONGS, "aurora", "Runaway (with Someone)")).toBe(RUNAWAY)
})

test("a remix is a recording of the song remixed", () => {
  expect(songSlugFor(SONGS, "ariana-grande", "ordinary things (feat. Nonna) - Remix")).toBe(
    ORDINARY
  )
})

test("a live take and an acoustic cut are recordings of the one song", () => {
  expect(songSlugFor(SONGS, "aurora", "Runaway - Live")).toBe(RUNAWAY)
  expect(songSlugFor(SONGS, "aurora", "Runaway - Acoustic")).toBe(RUNAWAY)
  expect(songSlugFor(SONGS, "aurora", "Runaway - a cappella")).toBe(RUNAWAY)
})

test("an aside naming neither a credit nor a version is part of the title", () => {
  expect(compositionTitle("Jason's Song (Gave It Away)")).toBe("Jason's Song (Gave It Away)")
  expect(songSlugFor(SONGS, "ariana-grande", "Jason's Song (Gave It Away)")).toBe(JASON)
})

test("an aside is dropped where a version tail is dropped beside it", () => {
  expect(compositionTitle("yes, and? (with Mariah Carey) - Remix")).toBe("yes, and?")
})

test("a tail holding a version word anywhere in it is dropped whole", () => {
  expect(compositionTitle("A Junkie's Lament - 2019 Remaster")).toBe("A Junkie's Lament")
  expect(compositionTitle("Blossom - Live At The Troubadour / 2007")).toBe("Blossom")
  expect(compositionTitle("Elf - Sped Up Nightcore")).toBe("Elf")
})

test("an aside holding a version word anywhere in it is dropped whole", () => {
  expect(compositionTitle("Elf (2019 Remaster)")).toBe("Elf")
  expect(compositionTitle("Murder Song (5, 4, 3, 2, 1) - Acoustic")).toBe(
    "Murder Song (5, 4, 3, 2, 1)"
  )
})

test("a tail is dropped whether it opens on a hyphen, an en dash or an em dash", () => {
  expect(compositionTitle("the boy is mine – a cappella")).toBe("the boy is mine")
  expect(compositionTitle("the boy is mine — instrumental")).toBe("the boy is mine")
  expect(compositionTitle("we can't be friends (wait for your love) – string version")).toBe(
    "we can't be friends (wait for your love)"
  )
})

test("a tail naming neither a credit nor a version is part of the title", () => {
  expect(compositionTitle("Crush - Girls Trip")).toBe("Crush - Girls Trip")
})

test("a version word outside an aside and outside a tail is part of the title", () => {
  expect(compositionTitle("Long Live")).toBe("Long Live")
  expect(compositionTitle("Every Breath You Take")).toBe("Every Breath You Take")
  expect(compositionTitle("34+35 Remix (feat. Doja Cat) - Remix")).toBe("34+35 Remix")
})

test("two titles are one title where they hold the same letters and digits", () => {
  expect(songKey("aurora", "Run-Away!")).toBe(songKey("aurora", "runaway"))
})

test("a title left with nothing by what was dropped keeps itself instead", () => {
  expect(compositionTitle("(Live)")).toBe("(Live)")
})

test("the song a track names is read whether or not it is written as an address", () => {
  expect(songNamed({ song: RUNAWAY_AT })).toBe(RUNAWAY)
  expect(songNamed({ song: RUNAWAY })).toBe(RUNAWAY)
  expect(songNamed({})).toBeNull()
})

test("a track given a song names that song as an address", () => {
  expect(valuesLinked({ title: "Runaway" }, RUNAWAY)).toEqual({
    title: "Runaway",
    song: RUNAWAY_AT,
  })
})

test("a track naming a song no longer matched gives that song up", () => {
  expect(valuesLinked({ title: "Runaway", song: RUNAWAY_AT }, null)).toEqual({
    title: "Runaway",
  })
})

test("no title is matched to a song of another artist", () => {
  expect(songSlugFor(SONGS, "aurora", "ordinary things")).toBeNull()
})

test("a title no song holds is matched to nothing", () => {
  expect(songSlugFor(SONGS, "aurora", "Your Blood")).toBeNull()
})

test("a title holding no letter and no digit is keyed by the title itself", () => {
  const starred: ReadonlyMap<string, string> = new Map([
    [songKey("girl-in-red", "."), "dot"],
    [songKey("girl-in-red", "★★★★★"), "stars"],
  ])
  expect(songSlugFor(starred, "girl-in-red", ".")).toBe("dot")
  expect(songSlugFor(starred, "girl-in-red", "★★★★★")).toBe("stars")
  expect(songSlugFor(starred, "girl-in-red", "★★★")).toBeNull()
})
