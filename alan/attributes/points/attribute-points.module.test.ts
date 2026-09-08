import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  attributePage,
  keepPointsBeforeToday,
  keepPointsToday,
  pointsTodayKept,
  pointsTotalKept,
} from "./attribute-points.module.code.ts"

const HOLD = "/var/tmp"

function rooted(): string {
  return mkdtempSync(join(HOLD, "attribute-points-"))
}

test("an attribute's page is found from that attribute's slug", () => {
  expect(attributePage("strength")).toBe("alan/attributes/pages/strength.attribute.ts")
})

test("the points kept are the points read back", () => {
  const root = rooted()
  try {
    keepPointsToday(root, "strength", 1.5)
    expect(pointsTodayKept(root, "strength")).toBe(1.5)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("an attribute with nothing before today totals today's points alone", () => {
  const root = rooted()
  try {
    keepPointsToday(root, "strength", 1.5)
    expect(pointsTotalKept(root, "strength")).toBe(1.5)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("keeping today's points again replaces the total rather than adding to it", () => {
  const root = rooted()
  try {
    keepPointsToday(root, "strength", 1.5)
    keepPointsToday(root, "strength", 2)
    expect(pointsTotalKept(root, "strength")).toBe(2)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("an attribute nothing was kept for carries no points today", () => {
  const root = rooted()
  try {
    expect(pointsTodayKept(root, "strength")).toBeNull()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("keeping points again replaces the points kept before", () => {
  const root = rooted()
  try {
    keepPointsToday(root, "wisdom", 0.5)
    keepPointsToday(root, "wisdom", 0.9)
    expect(pointsTodayKept(root, "wisdom")).toBe(0.9)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the points before today are a total on their own where today is unread", () => {
  const root = rooted()
  try {
    keepPointsBeforeToday(root, "endurance", 0.34871)
    expect(pointsTotalKept(root, "endurance")).toBe(0.34871)
    expect(pointsTodayKept(root, "endurance")).toBeNull()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("keeping the points before today counts today's points into the total", () => {
  const root = rooted()
  try {
    keepPointsToday(root, "endurance", 0.5)
    keepPointsBeforeToday(root, "endurance", 2)
    expect(pointsTotalKept(root, "endurance")).toBe(2.5)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the points are kept beside the attribute's own page", () => {
  const root = rooted()
  try {
    keepPointsToday(root, "charisma", 2)
    const beside = join(root, "alan/attributes/pages/charisma.attribute.uncommitted.ts")
    expect(readFileSync(beside, "utf8")).toContain("pointsToday")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
