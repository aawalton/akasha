import { describe, expect, test } from "bun:test"
import {
  hoursAWallTimeMayName,
  instantsForMountainWall,
  mountainWallAt,
  mountainWallSaid,
  readMountainWallTime,
  windowAround,
} from "./mountain-wall.module.code.ts"
import {
  AT_0200_MST_AUTUMN,
  AT_0330_MDT_SPRING,
  AT_0800_MST,
  AT_0830_MDT_SPRING,
  AT_0930_MST_AUTUMN,
  AT_1002_MST,
  AT_2000_MST,
  denverSaid,
  denverSaidAt,
  halfHoursAcrossTheTurns,
  instantOf,
  JUNK_NO_TIME_READS,
  MS_PER_HOUR,
  refusalOf,
} from "./mountain-wall.module.test-fixtures.ts"

describe("the window a bare wall time is looked for in", () => {
  test("a twelve hour reading reaches eleven hours back and one hour on", () => {
    const window = windowAround(9, AT_0800_MST)
    expect(AT_0800_MST.getTime() - window.oldestMs).toBe(11 * MS_PER_HOUR)
    expect(window.newestMs - AT_0800_MST.getTime()).toBe(MS_PER_HOUR)
  })

  test("a twenty-four hour reading reaches twenty-three hours back and one hour on", () => {
    const window = windowAround(13, AT_0800_MST)
    expect(AT_0800_MST.getTime() - window.oldestMs).toBe(23 * MS_PER_HOUR)
    expect(window.newestMs - AT_0800_MST.getTime()).toBe(MS_PER_HOUR)
  })

  test("hour 1 to 12 names two wall hours and hour 0 or 13 to 23 names one wall hour", () => {
    expect(hoursAWallTimeMayName(7)).toEqual([7, 19])
    expect(hoursAWallTimeMayName(12)).toEqual([12, 0])
    expect(hoursAWallTimeMayName(1)).toEqual([1, 13])
    expect(hoursAWallTimeMayName(0)).toEqual([0])
    expect(hoursAWallTimeMayName(13)).toEqual([13])
    expect(hoursAWallTimeMayName(23)).toEqual([23])
  })
})

describe("the past end of the window is open and the future end is closed", () => {
  test("9:00 typed at exactly 08:00 is this morning rather than last night", () => {
    expect(mountainWallSaid(mountainWallAt(AT_0800_MST))).toBe("2026-01-15 08:00")
    expect(instantOf("9:00", AT_0800_MST)).toBe("2026-01-15T16:00:00.000Z")
    expect(denverSaid(instantOf("9:00", AT_0800_MST))).toBe("2026-01-15 09:00")
  })

  test("the twin it beat sits exactly on the past end, which the window leaves out", () => {
    const window = windowAround(9, AT_0800_MST)
    const lastNight = instantsForMountainWall({
      year: 2026,
      month: 1,
      day: 14,
      hour: 21,
      minute: 0,
      second: 0,
    })
    expect(lastNight).toEqual([window.oldestMs])
    expect(new Date(window.oldestMs).toISOString()).toBe("2026-01-15T04:00:00.000Z")
  })

  test("the closed future end takes 9:00 typed at exactly 20:00 as tonight", () => {
    expect(mountainWallSaid(mountainWallAt(AT_2000_MST))).toBe("2026-01-15 20:00")
    const chosen = instantOf("9:00", AT_2000_MST)
    expect(chosen).toBe("2026-01-16T04:00:00.000Z")
    expect(denverSaid(chosen)).toBe("2026-01-15 21:00")
    expect(new Date(chosen).getTime()).toBe(windowAround(9, AT_2000_MST).newestMs)
  })
})

describe("a bare time near now", () => {
  test("7:20 at 10:02 is this morning rather than last evening", () => {
    expect(mountainWallSaid(mountainWallAt(AT_1002_MST))).toBe("2026-01-15 10:02")
    expect(instantOf("7:20", AT_1002_MST)).toBe("2026-01-15T14:20:00.000Z")
    expect(instantOf("07:20", AT_1002_MST)).toBe("2026-01-15T14:20:00.000Z")
  })

  test("a time more than an hour ahead is read backwards", () => {
    expect(denverSaid(instantOf("23:00", AT_1002_MST))).toBe("2026-01-14 23:00")
    expect(instantOf("23:00", AT_1002_MST)).toBe("2026-01-15T06:00:00.000Z")
  })

  test("12:00 at 10:02 is midnight today, the previous turn of a twelve hour reading", () => {
    expect(instantOf("12:00", AT_1002_MST)).toBe("2026-01-15T07:00:00.000Z")
    expect(denverSaid(instantOf("12:00", AT_1002_MST))).toBe("2026-01-15 00:00")
    expect(denverSaid(instantOf("12:00", AT_1002_MST))).not.toBe("2026-01-14 12:00")
  })

  test("hour 13 takes the twenty-four hour branch and lands yesterday", () => {
    expect(denverSaid(instantOf("13:00", AT_1002_MST))).toBe("2026-01-14 13:00")
    expect(instantOf("13:00", AT_1002_MST)).toBe("2026-01-14T20:00:00.000Z")
  })

  test("hour 0 takes the twenty-four hour branch and lands this morning", () => {
    expect(denverSaid(instantOf("0:00", AT_1002_MST))).toBe("2026-01-15 00:00")
    expect(instantOf("0:00", AT_1002_MST)).toBe("2026-01-15T07:00:00.000Z")
  })

  test("noon itself is reachable an hour before it strikes and not two hours before", () => {
    expect(denverSaid(instantOf("12:00", new Date("2026-01-15T18:01:00Z")))).toBe(
      "2026-01-15 12:00"
    )
    expect(denverSaid(instantOf("12:00", new Date("2026-01-15T17:59:00Z")))).toBe(
      "2026-01-15 00:00"
    )
  })
})

describe("the spring turn, where a wall time is skipped", () => {
  test("the hour the clock skipped is no instant at all", () => {
    expect(
      instantsForMountainWall({ year: 2026, month: 3, day: 8, hour: 2, minute: 30, second: 0 })
    ).toEqual([])
  })

  test("a date and time naming the gap is refused, and the refusal names the gap", () => {
    const refusal = refusalOf("2026-03-08 02:30", AT_0330_MDT_SPRING)
    expect(refusal.because).toBe("skipped")
    expect(refusal.saying).toContain("2026-03-08 02:30")
    expect(refusal.saying).toContain("skipped")
    expect(refusal.saying).toContain("name the date and time you mean")
  })

  test("a bare time falling in the gap is refused the same way", () => {
    const refusal = refusalOf("2:30", AT_0330_MDT_SPRING)
    expect(refusal.because).toBe("skipped")
    expect(refusal.saying).toContain("2026-03-08 02:30")
  })

  test("the hour on either side of the gap still reads", () => {
    expect(instantOf("2026-03-08 01:30", AT_0330_MDT_SPRING)).toBe("2026-03-08T08:30:00.000Z")
    expect(instantOf("2026-03-08 03:30", AT_0330_MDT_SPRING)).toBe("2026-03-08T09:30:00.000Z")
  })
})

describe("the autumn turn, where a wall time is struck twice", () => {
  test("the hour the clock repeated is two instants", () => {
    expect(
      instantsForMountainWall({ year: 2026, month: 11, day: 1, hour: 1, minute: 30, second: 0 })
    ).toEqual([
      new Date("2026-11-01T07:30:00.000Z").getTime(),
      new Date("2026-11-01T08:30:00.000Z").getTime(),
    ])
  })

  test("a date and time naming the repeat is refused, and the refusal names the repeat", () => {
    const refusal = refusalOf("2026-11-01 01:30", AT_0200_MST_AUTUMN)
    expect(refusal.because).toBe("struck-twice")
    expect(refusal.saying).toContain("2026-11-01 01:30")
    expect(refusal.saying).toContain("twice")
    expect(refusal.saying).toContain("name the date and time you mean")
  })

  test("a bare time falling in the repeat is refused the same way", () => {
    const refusal = refusalOf("1:30", AT_0200_MST_AUTUMN)
    expect(refusal.because).toBe("struck-twice")
    expect(refusal.saying).toContain("2026-11-01 01:30")
  })

  test("the hour on either side of the repeat still reads", () => {
    expect(instantOf("2026-11-01 00:30", AT_0200_MST_AUTUMN)).toBe("2026-11-01T06:30:00.000Z")
    expect(instantOf("2026-11-01 02:30", AT_0200_MST_AUTUMN)).toBe("2026-11-01T09:30:00.000Z")
  })
})

describe("what a turn does to a twelve hour window that is not the named hour", () => {
  test("the spring day packs two readings into one window, and both are refused", () => {
    const refusal = refusalOf("9:00", AT_0830_MDT_SPRING)
    expect(refusal.because).toBe("two-readings")
    expect(refusal.saying).toContain("2026-03-07 21:00")
    expect(refusal.saying).toContain("2026-03-08 09:00")
  })

  test("the two the spring day found are eleven hours apart rather than twelve", () => {
    const earlier = new Date("2026-03-08T04:00:00Z").getTime()
    const later = new Date("2026-03-08T15:00:00Z").getTime()
    expect(denverSaidAt(earlier)).toBe("2026-03-07 21:00")
    expect(denverSaidAt(later)).toBe("2026-03-08 09:00")
    expect(later - earlier).toBe(11 * MS_PER_HOUR)
    const window = windowAround(9, AT_0830_MDT_SPRING)
    expect(earlier > window.oldestMs && earlier <= window.newestMs).toBe(true)
    expect(later > window.oldestMs && later <= window.newestMs).toBe(true)
  })

  test("the autumn day leaves a window with no reading, and that is refused too", () => {
    const refusal = refusalOf("11:00", AT_0930_MST_AUTUMN)
    expect(refusal.because).toBe("no-reading")
    expect(refusal.saying).toContain("name the date and time you mean")
  })

  test("the two the autumn day looked for are thirteen hours apart rather than twelve", () => {
    const earlier = new Date("2026-11-01T05:00:00Z").getTime()
    const later = new Date("2026-11-01T18:00:00Z").getTime()
    expect(denverSaidAt(earlier)).toBe("2026-10-31 23:00")
    expect(denverSaidAt(later)).toBe("2026-11-01 11:00")
    expect(later - earlier).toBe(13 * MS_PER_HOUR)
    const window = windowAround(11, AT_0930_MST_AUTUMN)
    expect(earlier > window.oldestMs).toBe(false)
    expect(later <= window.newestMs).toBe(false)
  })
})

describe("a malformed time refuses as a caller's mistake rather than crashing", () => {
  test("99:99 is refused with a sentence naming the ranges", () => {
    const refusal = refusalOf("99:99", AT_1002_MST)
    expect(refusal.because).toBe("range")
    expect(refusal.saying).toContain("an hour runs 0 to 23")
    expect(refusal.saying).toContain("a minute 0 to 59")
  })

  test("24:00, 07:60 and a dated bad hour all refuse the same way", () => {
    expect(refusalOf("24:00", AT_1002_MST).because).toBe("range")
    expect(refusalOf("07:60", AT_1002_MST).because).toBe("range")
    expect(refusalOf("2026-03-05 24:00", AT_1002_MST).because).toBe("range")
    expect(refusalOf("2026-03-05 07:30:99", AT_1002_MST).because).toBe("range")
  })

  test("23:59 is the last time that is a time", () => {
    expect(denverSaid(instantOf("23:59", AT_1002_MST))).toBe("2026-01-14 23:59")
  })

  test("nothing handed in throws, whatever it is", () => {
    for (const said of JUNK_NO_TIME_READS) {
      expect(() => readMountainWallTime(said, AT_1002_MST)).not.toThrow()
      expect(readMountainWallTime(said, AT_1002_MST).read).toBe("refused")
    }
  })
})

describe("a date must be a day the calendar holds", () => {
  test("a thirteenth month is refused rather than rolled forward", () => {
    const refusal = refusalOf("2026-13-45 07:00", AT_1002_MST)
    expect(refusal.because).toBe("no-such-day")
    expect(refusal.saying).toContain("2026-13-45 07:00")
  })

  test("the thirtieth of February is refused rather than becoming the second of March", () => {
    expect(refusalOf("2026-02-30 07:00", AT_1002_MST).because).toBe("no-such-day")
    expect(refusalOf("2026-02-30T07:00", AT_1002_MST).because).toBe("no-such-day")
  })

  test("a leap day that is a day reads, and a leap day that is none is refused", () => {
    expect(instantOf("2024-02-29 07:00", AT_1002_MST)).toBe("2024-02-29T14:00:00.000Z")
    expect(refusalOf("2026-02-29 07:00", AT_1002_MST).because).toBe("no-such-day")
    expect(refusalOf("0000-00-00 00:00", AT_1002_MST).because).toBe("no-such-day")
  })
})

describe("seconds a caller writes are kept", () => {
  test("a dated wall time keeps its seconds rather than dropping them", () => {
    expect(instantOf("2026-03-05 07:30:45", AT_1002_MST)).toBe("2026-03-05T14:30:45.000Z")
    expect(instantOf("2026-03-05T07:30:59", AT_1002_MST)).toBe("2026-03-05T14:30:59.000Z")
  })

  test("a dated wall time with no seconds sits on the minute", () => {
    expect(instantOf("2026-03-05 07:30", AT_1002_MST)).toBe("2026-03-05T14:30:00.000Z")
  })

  test("a full timestamp keeps its seconds too", () => {
    expect(instantOf("2026-03-05T07:30:45Z", AT_1002_MST)).toBe("2026-03-05T07:30:45.000Z")
  })
})

describe("the three shapes a time may be written in", () => {
  test("a dated wall time is Mountain, with a T or with a space", () => {
    expect(instantOf("2026-03-05 07:30", AT_1002_MST)).toBe("2026-03-05T14:30:00.000Z")
    expect(instantOf("2026-03-05T07:30", AT_1002_MST)).toBe("2026-03-05T14:30:00.000Z")
    expect(instantOf("2026-03-05T7:30", AT_1002_MST)).toBe("2026-03-05T14:30:00.000Z")
    expect(instantOf("2026-03-05 07:30", AT_0200_MST_AUTUMN)).toBe("2026-03-05T14:30:00.000Z")
  })

  test("a full timestamp closing in Z or in an offset is the instant it states", () => {
    expect(instantOf("2026-03-05T07:30:00Z", AT_1002_MST)).toBe("2026-03-05T07:30:00.000Z")
    expect(instantOf("2026-03-05T07:30:00-07:00", AT_1002_MST)).toBe("2026-03-05T14:30:00.000Z")
    expect(instantOf("2026-03-05T07:30:00+0100", AT_1002_MST)).toBe("2026-03-05T06:30:00.000Z")
  })

  test("what is said is trimmed before any shape is tried", () => {
    expect(instantOf("  07:20  ", AT_1002_MST)).toBe("2026-01-15T14:20:00.000Z")
  })

  test("a day with no time is none of the three shapes", () => {
    const refusal = refusalOf("2026-03-05", AT_1002_MST)
    expect(refusal.because).toBe("shape")
    expect(refusal.saying).toContain("H:MM")
    expect(refusal.saying).toContain("YYYY-MM-DD HH:MM")
  })

  test("a refusal quotes what was said rather than what was trimmed", () => {
    expect(refusalOf("  later  ", AT_1002_MST).saying).toContain('"  later  "')
  })

  test("something closing like an offset but being no timestamp says so", () => {
    const refusal = refusalOf("nope+01:00", AT_1002_MST)
    expect(refusal.because).toBe("shape")
    expect(refusal.saying).toContain("closes like a timestamp")
  })

  test("one digit of hour is enough and the minutes must be two digits", () => {
    expect(refusalOf("7:3", AT_1002_MST).because).toBe("shape")
  })
})

describe("what the module answers is what a Denver clock reads", () => {
  test("the sample is the size it says, so an empty sample cannot read clean", () => {
    expect(halfHoursAcrossTheTurns().length).toBe(480)
  })

  test("every dated wall time the zone database reads is read back to that instant", () => {
    const missed = halfHoursAcrossTheTurns().filter((ms) => {
      const said = denverSaidAt(ms)
      const reading = readMountainWallTime(said, new Date(ms))
      if (reading.read === "refused") return reading.because !== "struck-twice"
      return denverSaid(reading.iso) !== said
    })
    expect(missed).toEqual([])
  })

  test("a wrong offset would be caught, so a clean run is a measurement", () => {
    const wrong = halfHoursAcrossTheTurns().filter((ms) => {
      const reading = readMountainWallTime(denverSaidAt(ms + MS_PER_HOUR), new Date(ms))
      return reading.read === "instant" && denverSaid(reading.iso) === denverSaidAt(ms)
    })
    expect(wrong).toEqual([])
  })

  test("the wall time read off an instant round-trips through the instant naming it", () => {
    const off = halfHoursAcrossTheTurns().filter(
      (ms) => !instantsForMountainWall(mountainWallAt(new Date(ms))).includes(ms)
    )
    expect(off).toEqual([])
  })
})
