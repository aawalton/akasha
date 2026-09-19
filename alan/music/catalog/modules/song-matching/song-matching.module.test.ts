import { expect, test } from "bun:test"
import {
  compositionTitle,
  songKey,
  songSlugFor,
} from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"

const ORDINARY = "ariana-grande-ordinary-things"

const JASON = "ariana-grande-jasons-song-gave-it-away"

const RUNAWAY = "aurora-runaway"

const SONGS: ReadonlyMap<string, string> = new Map([
  [songKey("ariana-grande", "ordinary things"), ORDINARY],
  [songKey("ariana-grande", "Jason's Song (Gave It Away)"), JASON],
  [songKey("aurora", "Runaway"), RUNAWAY],
])

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

test("two titles are one title where they hold the same letters and digits", () => {
  expect(songKey("aurora", "Run-Away!")).toBe(songKey("aurora", "runaway"))
})

test("a title left with nothing by what was dropped keeps itself instead", () => {
  expect(compositionTitle("(Live)")).toBe("(Live)")
})

test("no title is matched to a song of another artist", () => {
  expect(songSlugFor(SONGS, "aurora", "ordinary things")).toBeNull()
})

test("a title no song holds is matched to nothing", () => {
  expect(songSlugFor(SONGS, "aurora", "Your Blood")).toBeNull()
})

test("a title holding no letter and no digit is matched to nothing", () => {
  const starred: ReadonlyMap<string, string> = new Map([[songKey("girl-in-red", "."), "dot"]])
  expect(songSlugFor(starred, "girl-in-red", "★★★")).toBeNull()
  expect(songSlugFor(starred, "girl-in-red", ".")).toBeNull()
})
