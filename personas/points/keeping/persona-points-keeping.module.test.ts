import { expect, test } from "bun:test"
import { existsSync, mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  keepPoints,
  keepPointsBeforeToday,
  keepPointsToday,
  pointsBeforeTodayKept,
  pointsIn,
  pointsTodayKept,
  pointsTotalKept,
} from "./persona-points-keeping.module.code.ts"

const HOLD = "/var/tmp"

const PROBE = { path: "personas/pages/probe/probe.persona.ts" }

const rootMade = () => mkdtempSync(join(HOLD, "persona-points-"))

const over = (run: (root: string) => undefined): undefined => {
  const root = rootMade()
  try {
    run(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
  return undefined
}

test("a hundred messages is one point", () => {
  expect(pointsIn(100)).toBe(1)
})

test("a count short of a hundred earns the fraction it reaches", () => {
  expect(pointsIn(25)).toBe(0.25)
})

test("a persona carrying nothing reads back as unread rather than as a zero", () => {
  over((root) => {
    expect(pointsTotalKept(root, PROBE)).toBeNull()
    return undefined
  })
})

test("today's points read back the way they were kept", () => {
  over((root) => {
    keepPointsToday(root, PROBE, 2.5)
    expect(pointsTodayKept(root, PROBE)).toBe(2.5)
    return undefined
  })
})

test("a persona carrying nothing before today totals today's points alone", () => {
  over((root) => {
    keepPointsToday(root, PROBE, 2.5)
    expect(pointsTotalKept(root, PROBE)).toBe(2.5)
    return undefined
  })
})

test("a persona whose today is unread totals the points before today alone", () => {
  over((root) => {
    keepPointsBeforeToday(root, PROBE, 7)
    expect(pointsBeforeTodayKept(root, PROBE)).toBe(7)
    expect(pointsTotalKept(root, PROBE)).toBe(7)
    return undefined
  })
})

test("the total is the points before today and today's points together", () => {
  over((root) => {
    keepPointsBeforeToday(root, PROBE, 7)
    keepPointsToday(root, PROBE, 1.5)
    expect(pointsTotalKept(root, PROBE)).toBe(8.5)
    return undefined
  })
})

test("keeping the points before today counts today's points into the total", () => {
  over((root) => {
    keepPointsToday(root, PROBE, 1.5)
    keepPointsBeforeToday(root, PROBE, 7)
    expect(pointsTotalKept(root, PROBE)).toBe(8.5)
    return undefined
  })
})

test("keeping today's points again replaces the total rather than adding to it", () => {
  over((root) => {
    keepPointsToday(root, PROBE, 1.5)
    keepPointsToday(root, PROBE, 2)
    expect(pointsTotalKept(root, PROBE)).toBe(2)
    return undefined
  })
})

test("both halves kept at once total together", () => {
  over((root) => {
    keepPoints(root, PROBE, 7, 1.5)
    expect(pointsBeforeTodayKept(root, PROBE)).toBe(7)
    expect(pointsTodayKept(root, PROBE)).toBe(1.5)
    expect(pointsTotalKept(root, PROBE)).toBe(8.5)
    return undefined
  })
})

test("both halves kept at once read back neither half from before", () => {
  over((root) => {
    keepPoints(root, PROBE, 7, 1.5)
    keepPoints(root, PROBE, 2, 0)
    expect(pointsTotalKept(root, PROBE)).toBe(2)
    return undefined
  })
})

test("the points land in the file beside her page", () => {
  over((root) => {
    keepPointsToday(root, PROBE, 1)
    expect(existsSync(join(root, "personas/pages/probe/probe.persona.uncommitted.ts"))).toBe(true)
    return undefined
  })
})
