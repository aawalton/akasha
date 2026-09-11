import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  keepPointsBeforeToday,
  keepPointsToday,
  pointsTodayKept,
  pointsTotalKept,
} from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"

const HOLD = "/var/tmp"

const ATTRIBUTE = "attribute"

const KEPT = "held/attribute-pages"

function pageOf(slug: string): string {
  return `${KEPT}/${slug}.attribute.ts`
}

function besideOf(slug: string): string {
  return `${KEPT}/${slug}.attribute.uncommitted.ts`
}

function rooted(...slugs: readonly string[]): string {
  const root = mkdtempSync(join(HOLD, "attribute-points-"))
  for (const slug of slugs) {
    listedFiled(root, ATTRIBUTE, slug, [{ path: pageOf(slug), id: `held-${slug}` }])
  }
  return root
}

test("an attribute the index names no page for is refused rather than given a path", () => {
  const root = rooted("strength")
  try {
    expect(() => keepPointsToday(root, "luck", 1)).toThrow()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("an attribute the index names no page for carries no points rather than refusing", () => {
  const root = rooted("strength")
  try {
    expect(pointsTodayKept(root, "luck")).toBeNull()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the points kept are the points read back", () => {
  const root = rooted("strength")
  try {
    keepPointsToday(root, "strength", 1.5)
    expect(pointsTodayKept(root, "strength")).toBe(1.5)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("an attribute with nothing before today totals today's points alone", () => {
  const root = rooted("strength")
  try {
    keepPointsToday(root, "strength", 1.5)
    expect(pointsTotalKept(root, "strength")).toBe(1.5)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("keeping today's points again replaces the total rather than adding to it", () => {
  const root = rooted("strength")
  try {
    keepPointsToday(root, "strength", 1.5)
    keepPointsToday(root, "strength", 2)
    expect(pointsTotalKept(root, "strength")).toBe(2)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("an attribute nothing was kept for carries no points today", () => {
  const root = rooted("strength")
  try {
    expect(pointsTodayKept(root, "strength")).toBeNull()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("keeping points again replaces the points kept before", () => {
  const root = rooted("wisdom")
  try {
    keepPointsToday(root, "wisdom", 0.5)
    keepPointsToday(root, "wisdom", 0.9)
    expect(pointsTodayKept(root, "wisdom")).toBe(0.9)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the points before today are a total on their own where today is unread", () => {
  const root = rooted("endurance")
  try {
    keepPointsBeforeToday(root, "endurance", 0.34871)
    expect(pointsTotalKept(root, "endurance")).toBe(0.34871)
    expect(pointsTodayKept(root, "endurance")).toBeNull()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("keeping the points before today counts today's points into the total", () => {
  const root = rooted("endurance")
  try {
    keepPointsToday(root, "endurance", 0.5)
    keepPointsBeforeToday(root, "endurance", 2)
    expect(pointsTotalKept(root, "endurance")).toBe(2.5)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the points are kept beside the page the index names for that attribute", () => {
  const root = rooted("charisma")
  try {
    keepPointsToday(root, "charisma", 2)
    expect(readFileSync(join(root, besideOf("charisma")), "utf8")).toContain("pointsToday")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
