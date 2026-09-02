import { expect, test } from "bun:test"
import {
  buildPlayRow,
  esoDayOfPlay,
  heardKeyOf,
  isFirstListen,
  minutesOf,
  newMusicMinutesOf,
  type PlayInput,
  playKeyOf,
  resumeCursorMs,
  sumNewMusicMinutes,
} from "./play-row.module.code.ts"

const PLAY: PlayInput = {
  trackId: "4epeNxtHy14CVAP1rePJCs",
  trackName: "Zelda's Lullaby",
  artistName: "Celestial Aeon Ensemble",
  playedAt: "2026-08-21T12:31:13.556Z",
  durationMs: 124_000,
}

test("a play of no length runs no minutes", () => {
  expect(minutesOf(undefined)).toBe(0)
  expect(minutesOf(0)).toBe(0)
  expect(minutesOf(-1)).toBe(0)
  expect(minutesOf(Number.NaN)).toBe(0)
  expect(minutesOf(Number.POSITIVE_INFINITY)).toBe(0)
})

test("minutes are counted to three places", () => {
  expect(minutesOf(124_000)).toBe(2.067)
  expect(minutesOf(60_000)).toBe(1)
  expect(minutesOf(123_999)).toBe(2.067)
})

test("a play key is the track id and then an at sign and then when the play finished", () => {
  expect(playKeyOf("abc", "2026-08-21T12:31:13.556Z")).toBe("abc@2026-08-21T12:31:13.556Z")
})

test("a play lands on the ESO day it finished in", () => {
  expect(esoDayOfPlay("2026-08-21T12:31:13.556Z")).toBe("2026-08-21")
})

test("a play before six in the morning in New York lands on the day before", () => {
  expect(esoDayOfPlay("2026-08-21T09:59:00.000Z")).toBe("2026-08-20")
  expect(esoDayOfPlay("2026-08-21T10:01:00.000Z")).toBe("2026-08-21")
})

test("a title key drops every character that is no lowercase letter and no digit", () => {
  expect(heardKeyOf('Beauty of Dawn (from "The Elder Scrolls Online")', "Brad Derrick")).toBe(
    "beautyofdawnfromtheelderscrollsonline|bradderrick"
  )
})

test("a title key an artist is unknown for is the track name alone", () => {
  expect(heardKeyOf("Zelda's Lullaby", "")).toBe("zeldaslullaby")
  expect(heardKeyOf("Zelda's Lullaby", "!!!")).toBe("zeldaslullaby")
})

test("a priming run scores no first listen, whatever the ledger held", () => {
  expect(isFirstListen(true, false)).toBe(false)
  expect(isFirstListen(true, true)).toBe(false)
})

test("a run that is no priming run scores a first listen only where the ledger had it not", () => {
  expect(isFirstListen(false, false)).toBe(true)
  expect(isFirstListen(false, true)).toBe(false)
})

test("a play that is no first listen scores no new music minutes", () => {
  expect(newMusicMinutesOf(2.067, false)).toBe(0)
  expect(newMusicMinutesOf(2.067, true)).toBe(2.067)
})

test("a row carries the play, its key and its arithmetic", () => {
  expect(buildPlayRow(PLAY, false)).toEqual({
    playedAt: "2026-08-21T12:31:13.556Z",
    playKey: "4epeNxtHy14CVAP1rePJCs@2026-08-21T12:31:13.556Z",
    spotifyTrackId: "4epeNxtHy14CVAP1rePJCs",
    trackName: "Zelda's Lullaby",
    artistName: "Celestial Aeon Ensemble",
    minutes: 2.067,
    firstListen: false,
    newMusicMinutes: 0,
  })
})

test("a row names no day of its own, because the page it lands on names the day", () => {
  expect("date" in buildPlayRow(PLAY, false)).toBe(false)
})

test("a first listen carries its minutes as new music minutes", () => {
  expect(buildPlayRow(PLAY, true).newMusicMinutes).toBe(2.067)
})

test("the resume cursor is one millisecond past the newest play already filed", () => {
  expect(resumeCursorMs("2026-08-21T12:31:13.556Z")).toBe(
    new Date("2026-08-21T12:31:13.556Z").getTime() + 1
  )
})

test("no play filed leaves the cursor unset, so the whole window is asked for", () => {
  expect(resumeCursorMs(null)).toBeUndefined()
})

test("a newest play that will not parse leaves the cursor unset", () => {
  expect(resumeCursorMs("nowhen")).toBeUndefined()
})

test("new music minutes are summed to three places", () => {
  expect(sumNewMusicMinutes([{ newMusicMinutes: 0.1 }, { newMusicMinutes: 0.2 }])).toBe(0.3)
  expect(sumNewMusicMinutes([])).toBe(0)
})
