import { describe, expect, test } from "bun:test"
import { decideKeepActions, isoWeekKeyOf, monthKeyOf, utcMidnightOf } from "./decide-keeps"
import type { DecideKeepInput, KeepState } from "./types"

function daily(date: string, status = "DONE") {
  const backupId = `${date.replaceAll("-", "")}T030000`
  return { backupId, beginTimeIso: `${date}T03:00:00.000000+00:00`, status }
}

function input(overrides: Partial<DecideKeepInput>): DecideKeepInput {
  return {
    backups: [],
    keepStates: {},
    todayUtc: "2026-07-02",
    weeklyKeepCount: 4,
    monthlyKeepCount: 12,
    ...overrides,
  }
}

function dailyRange(from: string, to: string) {
  const out = []
  const cursor = utcMidnightOf(from)
  const end = utcMidnightOf(to)
  while (cursor.getTime() <= end.getTime()) {
    out.push(daily(cursor.toISOString().slice(0, 10)))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return out
}

describe("isoWeekKeyOf / monthKeyOf", () => {
  test("ISO week attribution incl. year boundary", () => {
    expect(isoWeekKeyOf("2026-06-24")).toBe("2026-W26")
    expect(isoWeekKeyOf("2026-06-29")).toBe("2026-W27")
    expect(isoWeekKeyOf("2026-01-01")).toBe("2026-W01")
    expect(isoWeekKeyOf("2027-01-01")).toBe("2026-W53")
    expect(isoWeekKeyOf("2024-12-30")).toBe("2025-W01")
  })

  test("month key", () => {
    expect(monthKeyOf("2026-07-02")).toBe("2026-07")
  })
})

describe("decideKeepActions — anchors and boundaries", () => {
  test("empty listing → no actions, no anchors", () => {
    const result = decideKeepActions(input({}))
    expect(result.actions).toEqual([])
    expect(result.weeklyAnchors).toEqual([])
    expect(result.monthlyAnchors).toEqual([])
    expect(result.disagreements).toEqual([])
  })

  test("current (incomplete) week and month anchors are never marked", () => {
    const result = decideKeepActions(input({ backups: [daily("2026-07-01"), daily("2026-07-02")] }))
    expect(result.actions).toEqual([])
    expect(result.weeklyAnchors).toEqual([])
    expect(result.monthlyAnchors).toEqual([])
  })

  test("crossing a week boundary promotes the prior week's first backup", () => {
    const backups = [daily("2026-06-24"), daily("2026-06-25"), daily("2026-06-29")]
    const result = decideKeepActions(input({ backups, todayUtc: "2026-06-30" }))
    expect(result.weeklyAnchors).toEqual([daily("2026-06-24").backupId])
    expect(result.actions).toEqual([
      {
        kind: "mark-standalone",
        backupId: daily("2026-06-24").backupId,
        reason: expect.stringContaining("2026-W26"),
      },
    ])
  })

  test("crossing a month boundary promotes the prior month's first backup", () => {
    const backups = [daily("2026-06-24"), daily("2026-06-25"), daily("2026-07-01")]
    const result = decideKeepActions(input({ backups }))
    expect(result.monthlyAnchors).toEqual([daily("2026-06-24").backupId])
    expect(result.actions).toEqual([
      {
        kind: "mark-standalone",
        backupId: daily("2026-06-24").backupId,
        reason: expect.any(String),
      },
    ])
  })

  test("anchor is the earliest backup of its period, ondemand included", () => {
    const ondemand = {
      backupId: "20260624T141500",
      beginTimeIso: "2026-06-24T14:15:00.000000+00:00",
      status: "DONE",
    }
    const result = decideKeepActions(
      input({
        backups: [ondemand, daily("2026-06-24"), daily("2026-06-26")],
        todayUtc: "2026-06-30",
      })
    )
    expect(result.weeklyAnchors).toEqual([daily("2026-06-24").backupId])
  })

  test("non-DONE backups are excluded from anchoring", () => {
    const result = decideKeepActions(
      input({
        backups: [daily("2026-06-23", "FAILED"), daily("2026-06-24"), daily("2026-06-29")],
        todayUtc: "2026-06-30",
      })
    )
    expect(result.weeklyAnchors).toEqual([daily("2026-06-24").backupId])
  })
})

describe("decideKeepActions — sliding windows", () => {
  test("weekly window keeps the 4 most recent completed-week anchors and releases older ones", () => {
    const backups = dailyRange("2026-06-01", "2026-07-19")
    const w23 = daily("2026-06-01").backupId
    const w24 = daily("2026-06-08").backupId
    const w25 = daily("2026-06-15").backupId
    const w26 = daily("2026-06-22").backupId
    const w27 = daily("2026-06-29").backupId
    const w28 = daily("2026-07-06").backupId
    const w29 = daily("2026-07-13").backupId
    const keepStates: Record<string, KeepState> = {
      [w23]: "standalone",
      [w24]: "standalone",
      [w25]: "standalone",
      [w26]: "standalone",
      [w27]: "standalone",
    }
    const result = decideKeepActions(input({ backups, keepStates, todayUtc: "2026-07-20" }))
    expect(result.weeklyAnchors).toEqual([w29, w28, w27, w26])
    expect(result.monthlyAnchors).toEqual([w23])
    expect(result.actions).toEqual([
      { kind: "mark-standalone", backupId: w29, reason: expect.any(String) },
      { kind: "mark-standalone", backupId: w28, reason: expect.any(String) },
      { kind: "release", backupId: w24, reason: expect.any(String) },
      { kind: "release", backupId: w25, reason: expect.any(String) },
    ])
  })

  test("monthly window slides at monthlyKeepCount", () => {
    const backups = [daily("2026-04-06"), daily("2026-05-04"), daily("2026-06-01")]
    const keepStates: Record<string, KeepState> = {
      [daily("2026-04-06").backupId]: "standalone",
      [daily("2026-05-04").backupId]: "standalone",
      [daily("2026-06-01").backupId]: "standalone",
    }
    const result = decideKeepActions(
      input({
        backups,
        keepStates,
        todayUtc: "2026-07-20",
        weeklyKeepCount: 0,
        monthlyKeepCount: 2,
      })
    )
    expect(result.monthlyAnchors).toEqual([
      daily("2026-06-01").backupId,
      daily("2026-05-04").backupId,
    ])
    expect(result.actions).toEqual([
      { kind: "release", backupId: daily("2026-04-06").backupId, reason: expect.any(String) },
    ])
  })

  test("a backup leaving the weekly window but inside the monthly window stays marked", () => {
    const backups = dailyRange("2026-07-01", "2026-08-31")
    const julyAnchor = daily("2026-07-01").backupId
    const keepStates: Record<string, KeepState> = { [julyAnchor]: "standalone" }
    const result = decideKeepActions(input({ backups, keepStates, todayUtc: "2026-09-01" }))
    expect(result.weeklyAnchors).not.toContain(julyAnchor)
    expect(result.monthlyAnchors).toContain(julyAnchor)
    expect(result.actions.filter((a) => a.backupId === julyAnchor)).toEqual([])
  })

  test("marks precede releases (add-before-remove)", () => {
    const backups = dailyRange("2026-05-01", "2026-07-19")
    const keepStates: Record<string, KeepState> = {
      [daily("2026-05-04").backupId]: "standalone",
    }
    const result = decideKeepActions(input({ backups, keepStates, todayUtc: "2026-07-20" }))
    const kinds = result.actions.map((a) => a.kind)
    const lastMark = kinds.lastIndexOf("mark-standalone")
    const firstRelease = kinds.indexOf("release")
    expect(lastMark).toBeGreaterThanOrEqual(0)
    expect(firstRelease).toBeGreaterThan(lastMark)
  })
})

describe("decideKeepActions — idempotency and disagreements", () => {
  test("applying the decided actions then re-deciding yields zero actions", () => {
    const backups = dailyRange("2026-05-01", "2026-07-19")
    const first = decideKeepActions(input({ backups, todayUtc: "2026-07-20" }))
    const applied: Record<string, KeepState> = {}
    for (const action of first.actions) {
      applied[action.backupId] = action.kind === "mark-standalone" ? "standalone" : "nokeep"
    }
    const second = decideKeepActions(
      input({ backups, keepStates: applied, todayUtc: "2026-07-20" })
    )
    expect(second.actions).toEqual([])
    expect(second.disagreements).toEqual([])
  })

  test("a foreign full keep is a disagreement and never acted on", () => {
    const backups = [daily("2026-06-24"), daily("2026-06-29")]
    const keepStates: Record<string, KeepState> = { [daily("2026-06-24").backupId]: "full" }
    const result = decideKeepActions(input({ backups, keepStates, todayUtc: "2026-06-30" }))
    expect(result.disagreements).toEqual([
      {
        kind: "backup",
        backupId: daily("2026-06-24").backupId,
        found: "full",
        message: expect.stringContaining("full"),
      },
    ])
    expect(result.actions.filter((a) => a.backupId === daily("2026-06-24").backupId)).toEqual([])
  })

  function missingKeys(result: ReturnType<typeof decideKeepActions>, periodKind: string) {
    return result.disagreements.flatMap((d) =>
      d.kind === "missing-anchor" && d.periodKind === periodKind ? [d.periodKey] : []
    )
  }

  test("a completed week with no surviving anchor (multi-day outage across a week boundary) is a missing-anchor disagreement", () => {
    const backups = dailyRange("2026-06-01", "2026-07-19").filter((b) => {
      const date = b.beginTimeIso.slice(0, 10)
      return date < "2026-06-29" || date > "2026-07-05"
    })
    const result = decideKeepActions(input({ backups, todayUtc: "2026-07-20" }))
    expect(result.disagreements).toContainEqual({
      kind: "missing-anchor",
      periodKind: "weekly",
      periodKey: "2026-W27",
      message: expect.stringContaining("2026-W27"),
    })
    expect(missingKeys(result, "weekly")).toEqual(["2026-W27"])
    expect(result.weeklyAnchors).toContain(daily("2026-06-22").backupId)
  })

  test("a partial-week gap (anchor drifts later but survives) is NOT a missing-anchor", () => {
    const backups = dailyRange("2026-06-01", "2026-07-19").filter((b) => {
      const date = b.beginTimeIso.slice(0, 10)
      return date < "2026-06-29" || date > "2026-07-01"
    })
    const result = decideKeepActions(input({ backups, todayUtc: "2026-07-20" }))
    expect(missingKeys(result, "weekly")).toEqual([])
  })

  test("periods before the earliest backup are not missing-anchor (promoter startup)", () => {
    const backups = dailyRange("2026-06-24", "2026-07-19")
    const result = decideKeepActions(input({ backups, todayUtc: "2026-07-20" }))
    expect(missingKeys(result, "weekly")).toEqual([])
    expect(missingKeys(result, "monthly")).toEqual([])
  })

  test("a completed month with no surviving anchor is a missing-anchor disagreement", () => {
    const backups = [
      ...dailyRange("2026-04-01", "2026-04-30"),
      ...dailyRange("2026-06-01", "2026-06-30"),
    ]
    const result = decideKeepActions(
      input({ backups, todayUtc: "2026-07-20", weeklyKeepCount: 0, monthlyKeepCount: 12 })
    )
    expect(result.disagreements).toContainEqual({
      kind: "missing-anchor",
      periodKind: "monthly",
      periodKey: "2026-05",
      message: expect.stringContaining("2026-05"),
    })
    expect(missingKeys(result, "monthly")).toEqual(["2026-05"])
  })

  test("a fully-covered calendar produces no missing-anchor disagreements", () => {
    const backups = dailyRange("2026-05-01", "2026-07-19")
    const result = decideKeepActions(input({ backups, todayUtc: "2026-07-20" }))
    expect(result.disagreements).toEqual([])
  })

  test("a desired anchor is never released", () => {
    const backups = dailyRange("2026-05-01", "2026-07-19")
    const result = decideKeepActions(input({ backups, todayUtc: "2026-07-20" }))
    const desired = new Set([...result.weeklyAnchors, ...result.monthlyAnchors])
    for (const action of result.actions) {
      if (action.kind === "release") expect(desired.has(action.backupId)).toBe(false)
      if (action.kind === "mark-standalone") expect(desired.has(action.backupId)).toBe(true)
    }
  })
})
