import { describe, expect, test } from "bun:test"
import { decideKeepActions, utcMidnightOf } from "./decide-keeps"
import type { DecideLongtailInput, LongtailBackup } from "./decide-longtail"
import {
  decideLongtailUnits,
  decidePrunes,
  isHistoryFile,
  walFilesInRange,
  walPrefixDirsInRange,
} from "./decide-longtail"

const MS_PER_DAY = 86_400_000
const SEGMENTS_PER_DAY = 16

function walSegment(n: number): string {
  return `00000007${n.toString(16).toUpperCase().padStart(16, "0")}`
}

function daily(date: string, status = "DONE"): LongtailBackup {
  const dayIndex = Math.round((utcMidnightOf(date).getTime() - Date.UTC(2025, 0, 1)) / MS_PER_DAY)
  return {
    backupId: `${date.replaceAll("-", "")}T030000`,
    beginTimeIso: `${date}T03:00:00.000000+00:00`,
    status,
    beginWal: walSegment(dayIndex * SEGMENTS_PER_DAY),
    endWal: walSegment(dayIndex * SEGMENTS_PER_DAY + SEGMENTS_PER_DAY - 1),
  }
}

function dailyRange(from: string, to: string): readonly LongtailBackup[] {
  const out: LongtailBackup[] = []
  const cursor = utcMidnightOf(from)
  const end = utcMidnightOf(to)
  while (cursor.getTime() <= end.getTime()) {
    out.push(daily(cursor.toISOString().slice(0, 10)))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return out
}

function input(overrides: Partial<DecideLongtailInput>): DecideLongtailInput {
  return { backups: [], todayUtc: "2026-07-02", monthlyKeepCount: 12, ...overrides }
}

describe("decideLongtailUnits — anchors and windows", () => {
  test("empty listing → no units", () => {
    expect(decideLongtailUnits(input({}))).toEqual([])
  })

  test("caps completed-month anchors at monthlyKeepCount and adds the provisional", () => {
    const backups = dailyRange("2025-05-01", "2026-07-02")
    const units = decideLongtailUnits(input({ backups }))
    const ids = units.map((unit) => unit.backupId)

    expect(units).toHaveLength(13)
    expect(ids).toContain(daily("2025-07-01").backupId)
    expect(ids).toContain(daily("2026-06-01").backupId)
    expect(ids).toContain(daily("2026-07-01").backupId)
    expect(ids).not.toContain(daily("2025-05-01").backupId)
    expect(ids).not.toContain(daily("2025-06-01").backupId)

    const june = units.find((unit) => unit.backupId === daily("2026-06-01").backupId)
    expect(june?.reason).toBe("monthly anchor 2026-06")
    const provisional = units.find((unit) => unit.backupId === daily("2026-07-01").backupId)
    expect(provisional?.reason).toBe("provisional anchor 2026-07")
    expect(provisional?.beginWal).toBe(daily("2026-07-01").beginWal)
    expect(provisional?.endWal).toBe(daily("2026-07-01").endWal)
  })

  test("no provisional when the current month has no backups yet", () => {
    const backups = dailyRange("2026-04-01", "2026-06-30")
    const units = decideLongtailUnits(input({ backups }))
    expect(units.map((unit) => unit.reason)).toEqual(
      expect.arrayContaining(["monthly anchor 2026-06"])
    )
    expect(units.some((unit) => unit.reason.startsWith("provisional"))).toBe(false)
  })

  test("anchor is the earliest DONE backup of its month, ondemand included", () => {
    const ondemand: LongtailBackup = {
      backupId: "20260601T011500",
      beginTimeIso: "2026-06-01T01:15:00.000000+00:00",
      status: "DONE",
      beginWal: walSegment(8_000),
      endWal: walSegment(8_003),
    }
    const backups = [...dailyRange("2026-06-01", "2026-06-30"), ondemand]
    const units = decideLongtailUnits(input({ backups }))
    const june = units.find((unit) => unit.reason === "monthly anchor 2026-06")
    expect(june?.backupId).toBe(ondemand.backupId)
  })

  test("non-DONE backups never anchor", () => {
    const backups = [
      daily("2026-06-01", "FAILED"),
      daily("2026-06-02"),
      daily("2026-06-03"),
      daily("2026-07-01", "WAITING_FOR_WALS"),
      daily("2026-07-02"),
    ]
    const units = decideLongtailUnits(input({ backups }))
    const june = units.find((unit) => unit.reason === "monthly anchor 2026-06")
    expect(june?.backupId).toBe(daily("2026-06-02").backupId)
    const provisional = units.find((unit) => unit.reason === "provisional anchor 2026-07")
    expect(provisional?.backupId).toBe(daily("2026-07-02").backupId)
  })

  test("converges with decideKeepActions on the completed-month anchor set", () => {
    const backups = dailyRange("2025-05-01", "2026-07-02")
    const units = decideLongtailUnits(input({ backups }))
    const completedIds = units
      .filter((unit) => unit.reason.startsWith("monthly anchor"))
      .map((unit) => unit.backupId)
    const keeps = decideKeepActions({
      backups,
      keepStates: {},
      todayUtc: "2026-07-02",
      weeklyKeepCount: 0,
      monthlyKeepCount: 12,
    })
    expect(new Set(completedIds)).toEqual(new Set(keeps.monthlyAnchors))
  })
})

describe("walPrefixDirsInRange", () => {
  const beginWal = "000000070000015E0000002B"
  const endWal = "0000000700000160000000A0"

  test("keeps 16-hex dirs between the begin and end prefixes inclusive", () => {
    const dirs = [
      "000000070000015D",
      "000000070000015E",
      "000000070000015F",
      "0000000700000160",
      "0000000700000161",
    ]
    expect([...walPrefixDirsInRange(dirs, beginWal, endWal)].sort()).toEqual([
      "000000070000015E",
      "000000070000015F",
      "0000000700000160",
    ])
  })

  test("excludes names that are not 16 uppercase hex chars", () => {
    const dirs = [
      "base",
      "backup.info",
      "00000007",
      "000000070000015e",
      "000000070000015E0000002B",
      "000000070000015E",
    ]
    expect(walPrefixDirsInRange(dirs, beginWal, endWal)).toEqual(["000000070000015E"])
  })

  test("single-prefix range keeps only that dir", () => {
    const dirs = ["000000070000015D", "000000070000015E", "000000070000015F"]
    const result = walPrefixDirsInRange(
      dirs,
      "000000070000015E0000002B",
      "000000070000015E00000040"
    )
    expect(result).toEqual(["000000070000015E"])
  })
})

describe("walFilesInRange", () => {
  const beginWal = "000000070000015E0000002B"
  const endWal = "000000070000015E00000040"

  test("inclusive on both ends, across compression suffixes", () => {
    const files = [
      "000000070000015E0000002A.gz",
      "000000070000015E0000002B.gz",
      "000000070000015E00000030",
      "000000070000015E00000031.zst",
      "000000070000015E00000032.bz2",
      "000000070000015E00000040",
      "000000070000015E00000041.gz",
    ]
    expect([...walFilesInRange(files, beginWal, endWal)].sort()).toEqual([
      "000000070000015E0000002B.gz",
      "000000070000015E00000030",
      "000000070000015E00000031.zst",
      "000000070000015E00000032.bz2",
      "000000070000015E00000040",
    ])
  })

  test("excludes .partial in-flight residue even when the segment is in range", () => {
    const files = ["000000070000015E00000040.gz.partial", "000000070000015E00000040.partial"]
    expect(walFilesInRange(files, beginWal, endWal)).toEqual([])
  })

  test("excludes history files and names whose first 24 chars are not hex", () => {
    const files = ["00000007.history.gz", "00000007.history", "garbage.txt", "backup.info"]
    expect(walFilesInRange(files, beginWal, endWal)).toEqual([])
  })
})

describe("isHistoryFile", () => {
  test("history files, compressed or not", () => {
    expect(isHistoryFile("00000007.history")).toBe(true)
    expect(isHistoryFile("00000007.history.gz")).toBe(true)
    expect(isHistoryFile("0000000A.history")).toBe(true)
  })

  test("segment files are not history files", () => {
    expect(isHistoryFile("000000070000015E0000002B")).toBe(false)
    expect(isHistoryFile("000000070000015E0000002B.gz")).toBe(false)
    expect(isHistoryFile("backup.info")).toBe(false)
  })
})

describe("decidePrunes", () => {
  test("existing minus desired, sorted ascending", () => {
    expect(decidePrunes(["c", "a", "b"], ["b"])).toEqual(["a", "c"])
  })

  test("desired ids absent from existing are ignored", () => {
    expect(decidePrunes(["a"], ["a", "z"])).toEqual([])
  })

  test("identical sets → nothing to prune", () => {
    expect(decidePrunes(["a", "b"], ["b", "a"])).toEqual([])
  })

  test("empty desired prunes everything", () => {
    expect(decidePrunes(["b", "a"], [])).toEqual(["a", "b"])
  })
})
