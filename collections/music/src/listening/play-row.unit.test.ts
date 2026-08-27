import { describe, expect, test } from "bun:test"
import {
  buildPlayRow,
  esoDayOfPlay,
  heardKeyOf,
  isFirstListen,
  minutesOf,
  newMusicMinutesOf,
  playKeyOf,
  resumeCursorMs,
  sumNewMusicMinutes,
} from "./play-row"

describe("minutesOf", () => {
  test("converts milliseconds to minutes", () => {
    expect(minutesOf(60_000)).toBe(1)
    expect(minutesOf(90_000)).toBe(1.5)
  })

  test("reads an unreported duration as nothing rather than guessing one", () => {
    expect(minutesOf(undefined)).toBe(0)
    expect(minutesOf(Number.NaN)).toBe(0)
    expect(minutesOf(-5)).toBe(0)
  })
})

describe("playKeyOf", () => {
  test("the same track at two instants are two plays", () => {
    expect(playKeyOf("abc", "2026-08-10T20:37:55.079Z")).not.toBe(
      playKeyOf("abc", "2026-08-10T21:37:55.079Z")
    )
  })

  test("two tracks at the same instant are two plays", () => {
    expect(playKeyOf("abc", "2026-08-10T20:37:55.079Z")).not.toBe(
      playKeyOf("def", "2026-08-10T20:37:55.079Z")
    )
  })
})

describe("esoDayOfPlay", () => {
  test("a play after the reset belongs to that day", () => {
    expect(esoDayOfPlay("2026-08-10T20:37:55.079Z")).toBe("2026-08-10")
  })

  test("a play before the reset belongs to the day before", () => {
    expect(esoDayOfPlay("2026-08-10T09:59:00.000Z")).toBe("2026-08-09")
  })

  test("the reset instant itself opens the later day", () => {
    expect(esoDayOfPlay("2026-08-10T10:00:00.000Z")).toBe("2026-08-10")
  })
})

describe("newMusicMinutesOf", () => {
  test("a first listen carries its whole length", () => {
    expect(newMusicMinutesOf(3.5, true)).toBe(3.5)
  })

  test("music he had already heard carries nothing", () => {
    expect(newMusicMinutesOf(3.5, false)).toBe(0)
  })
})

describe("buildPlayRow", () => {
  const play = {
    trackId: "7Mts0OfPorF4iwOomvfqn1",
    trackName: "So High School",
    artistName: "Taylor Swift",
    playedAt: "2026-08-10T20:37:55.079Z",
    durationMs: 90_000,
  }

  test("a first listen is credited its minutes", () => {
    const row = buildPlayRow(play, true)
    expect(row.minutes).toBe(1.5)
    expect(row.newMusicMinutes).toBe(1.5)
    expect(row.firstListen).toBe(true)
    expect(row.date).toBe("2026-08-10")
    expect(row.spotifyTrackId).toBe(play.trackId)
  })

  test("a replay is recorded in full but credited nothing", () => {
    const row = buildPlayRow(play, false)
    expect(row.minutes).toBe(1.5)
    expect(row.newMusicMinutes).toBe(0)
    expect(row.firstListen).toBe(false)
  })

  test("a play with no reported duration is recorded and credited nothing", () => {
    const row = buildPlayRow({ ...play, durationMs: undefined }, true)
    expect(row.minutes).toBe(0)
    expect(row.newMusicMinutes).toBe(0)
    expect(row.spotifyTrackId).toBe(play.trackId)
  })
})

describe("resumeCursorMs", () => {
  test("no stored play asks for no cursor", () => {
    expect(resumeCursorMs(null)).toBeUndefined()
  })

  test("resumes past the newest stored play rather than at it", () => {
    const at = "2026-08-10T20:37:55.079Z"
    const cursor = resumeCursorMs(at)
    if (cursor === undefined) throw new Error("expected a cursor for a readable instant")
    expect(cursor).toBeGreaterThan(new Date(at).getTime())
  })

  test("an unreadable stored instant asks for no cursor rather than a wrong one", () => {
    expect(resumeCursorMs("not-a-date")).toBeUndefined()
  })
})

describe("sumNewMusicMinutes", () => {
  test("sums only what was credited", () => {
    expect(
      sumNewMusicMinutes([{ newMusicMinutes: 1.5 }, { newMusicMinutes: 0 }, { newMusicMinutes: 2 }])
    ).toBe(3.5)
  })

  test("a day of replays sums to nothing", () => {
    expect(sumNewMusicMinutes([{ newMusicMinutes: 0 }, { newMusicMinutes: 0 }])).toBe(0)
  })

  test("no rows is no minutes", () => {
    expect(sumNewMusicMinutes([])).toBe(0)
  })
})

describe("isFirstListen", () => {
  test("the priming run credits nothing, whatever the ledger says", () => {
    expect(isFirstListen(true, false)).toBe(false)
    expect(isFirstListen(true, true)).toBe(false)
  })

  test("afterwards, a track absent from the ledger is new", () => {
    expect(isFirstListen(false, false)).toBe(true)
  })

  test("afterwards, a track on the ledger is not new", () => {
    expect(isFirstListen(false, true)).toBe(false)
  })
})

describe("heardKeyOf", () => {
  test("ignores case and punctuation so a rating matches a play", () => {
    expect(heardKeyOf("You\u2019re on Your Own, Kid", "Taylor Swift")).toBe(
      heardKeyOf("youre on your own kid", "taylor swift")
    )
  })

  test("the same title by different artists are different tracks", () => {
    expect(heardKeyOf("Alive", "Sia")).not.toBe(heardKeyOf("Alive", "Pearl Jam"))
  })

  test("an unknown artist falls back to the title alone", () => {
    expect(heardKeyOf("Unstoppable", "")).toBe("unstoppable")
  })
})
