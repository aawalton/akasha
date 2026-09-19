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
