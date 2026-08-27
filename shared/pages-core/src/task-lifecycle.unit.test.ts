import { describe, expect, it } from "bun:test"
import {
  computeRescheduleDate,
  decideCompletion,
  dueSelectorCondition,
  dueSelectorConditionForNow,
  parseDueSelector,
  SNAPSHOT_SLUG_BY_TASK_SLUG,
} from "./task-lifecycle"

describe("SNAPSHOT_SLUG_BY_TASK_SLUG", () => {
  it("maps each task family to its completed-snapshot page type", () => {
    expect(SNAPSHOT_SLUG_BY_TASK_SLUG.task).toBe("completed-task")
    expect(SNAPSHOT_SLUG_BY_TASK_SLUG["temper-task"]).toBe("temper-completed-task")
  })
})

describe("decideCompletion", () => {
  const completedAtMs = 1_700_000_000_000

  it("one-off (no rrule) ⇒ stamp completedAt and soft-delete the source", () => {
    expect(decideCompletion({ rrule: null, completedAtMs })).toEqual({
      completedAt: completedAtMs,
      softDeleteSource: true,
    })
    expect(decideCompletion({ rrule: undefined, completedAtMs }).softDeleteSource).toBe(true)
    expect(
      decideCompletion({ rrule: { rule: "", anchorFromCompletion: false }, completedAtMs })
        .softDeleteSource
    ).toBe(true)
  })

  it("recurring (rrule set) ⇒ stamp completedAt and leave the source live", () => {
    expect(
      decideCompletion({
        rrule: { rule: "FREQ=DAILY", anchorFromCompletion: false },
        completedAtMs,
      })
    ).toEqual({ completedAt: completedAtMs, softDeleteSource: false })
    expect(decideCompletion({ rrule: "FREQ=WEEKLY", completedAtMs }).softDeleteSource).toBe(false)
  })
})

describe("computeRescheduleDate", () => {
  const nowMs = Date.parse("2026-06-15T18:00:00Z")

  it("--to today resolves to the ESO-NA reset day", () => {
    expect(computeRescheduleDate({ to: "today", nowMs })).toBe("2026-06-15")
  })

  it("--to tomorrow resolves to the next ESO-NA day", () => {
    expect(computeRescheduleDate({ to: "tomorrow", nowMs })).toBe("2026-06-16")
  })

  it("--to <YYYY-MM-DD> passes an explicit date through", () => {
    expect(computeRescheduleDate({ to: "2026-12-25", nowMs })).toBe("2026-12-25")
  })

  it("--by N rolls to ESO today + N days (snooze-from-now)", () => {
    expect(computeRescheduleDate({ byDays: 3, nowMs })).toBe("2026-06-18")
  })

  it("rejects when neither --to nor --by is given", () => {
    expect(() => computeRescheduleDate({ nowMs })).toThrow()
  })

  it("rejects when both --to and --by are given", () => {
    expect(() => computeRescheduleDate({ to: "today", byDays: 1, nowMs })).toThrow()
  })

  it("rejects a malformed --to date", () => {
    expect(() => computeRescheduleDate({ to: "june 5", nowMs })).toThrow()
  })
})

describe("dueSelectorCondition", () => {
  const today = "2026-06-15"

  it("today ⇒ dueDate == today, excluding completed rows", () => {
    expect(dueSelectorCondition("today", today)).toEqual([
      { key: "dueDate", eq: today },
      { key: "completedAt", isNull: true },
    ])
  })

  it("overdue ⇒ dueDate < today", () => {
    expect(dueSelectorCondition("overdue", today)).toEqual([
      { key: "dueDate", lt: today },
      { key: "completedAt", isNull: true },
    ])
  })

  it("due-or-overdue ⇒ dueDate <= today", () => {
    expect(dueSelectorCondition("due-or-overdue", today)).toEqual([
      { key: "dueDate", lte: today },
      { key: "completedAt", isNull: true },
    ])
  })

  it("upcoming ⇒ dueDate > today", () => {
    expect(dueSelectorCondition("upcoming", today)).toEqual([
      { key: "dueDate", gt: today },
      { key: "completedAt", isNull: true },
    ])
  })
})

describe("dueSelectorConditionForNow", () => {
  const nowMs = Date.parse("2026-06-15T18:00:00Z")

  it("resolves today from nowMs against the ESO-NA reset boundary", () => {
    expect(dueSelectorConditionForNow("due-or-overdue", nowMs)).toEqual([
      { key: "dueDate", lte: "2026-06-15" },
      { key: "completedAt", isNull: true },
    ])
  })
})

describe("parseDueSelector", () => {
  it("narrows a valid selector string", () => {
    expect(parseDueSelector("overdue")).toBe("overdue")
    expect(parseDueSelector("due-or-overdue")).toBe("due-or-overdue")
  })

  it("returns undefined for a non-selector string", () => {
    expect(parseDueSelector("whenever")).toBeUndefined()
    expect(parseDueSelector("")).toBeUndefined()
  })
})
