import { describe, expect, test } from "bun:test"
import { CONSTRAINT_SEED, EQUIPMENT_SEED, MOBILITY_SEED } from "./coaching-seed-data"
import * as opts from "./tracking-options"

const CONSTRAINT_FOCUS_OPTIONS: readonly string[] = opts.CONSTRAINT_FOCUS_OPTIONS
const CONSTRAINT_KIND_OPTIONS: readonly string[] = opts.CONSTRAINT_KIND_OPTIONS
const EQUIPMENT_CATEGORY_OPTIONS: readonly string[] = opts.EQUIPMENT_CATEGORY_OPTIONS
const EQUIPMENT_CONFIG_OPTIONS: readonly string[] = opts.EQUIPMENT_CONFIG_OPTIONS
const MOBILITY_CONTEXT_OPTIONS: readonly string[] = opts.MOBILITY_CONTEXT_OPTIONS
const MOBILITY_METRIC_OPTIONS: readonly string[] = opts.MOBILITY_METRIC_OPTIONS
const MOBILITY_SIDE_OPTIONS: readonly string[] = opts.MOBILITY_SIDE_OPTIONS

describe("EQUIPMENT_SEED", () => {
  test("has the 4 baseline implements", () => {
    expect(EQUIPMENT_SEED).toHaveLength(4)
  })

  test("every category and configuration is a valid select option", () => {
    for (const e of EQUIPMENT_SEED) {
      expect(EQUIPMENT_CATEGORY_OPTIONS).toContain(e.category)
      expect(EQUIPMENT_CONFIG_OPTIONS).toContain(e.configuration)
    }
  })

  test("the weighted vest is the only unavailable item", () => {
    const unavailable = EQUIPMENT_SEED.filter((e) => !e.available).map((e) => e.title)
    expect(unavailable).toEqual(["Weighted Vest"])
  })
})

describe("CONSTRAINT_SEED", () => {
  test("has 12 constraints", () => {
    expect(CONSTRAINT_SEED).toHaveLength(12)
  })

  test("every kind is a valid select option", () => {
    for (const c of CONSTRAINT_SEED) {
      expect(CONSTRAINT_KIND_OPTIONS).toContain(c.kind)
    }
  })

  test("every focus tag is a valid focus option and at least one is present", () => {
    for (const c of CONSTRAINT_SEED) {
      expect(c.focusTags.length).toBeGreaterThan(0)
      for (const tag of c.focusTags) expect(CONSTRAINT_FOCUS_OPTIONS).toContain(tag)
    }
  })

  test("sortOrder is unique and contiguous from 1", () => {
    const orders = [...CONSTRAINT_SEED.map((c) => c.sortOrder)].sort((a, b) => a - b)
    expect(orders).toEqual(Array.from({ length: CONSTRAINT_SEED.length }, (_, i) => i + 1))
  })
})

describe("MOBILITY_SEED", () => {
  test("has 7 readings", () => {
    expect(MOBILITY_SEED).toHaveLength(7)
  })

  test("every metric, side, and context is a valid select option", () => {
    for (const m of MOBILITY_SEED) {
      expect(MOBILITY_METRIC_OPTIONS).toContain(m.metric)
      expect(MOBILITY_SIDE_OPTIONS).toContain(m.side)
      expect(MOBILITY_CONTEXT_OPTIONS).toContain(m.context)
    }
  })

  test("dates are ISO YYYY-MM-DD", () => {
    for (const m of MOBILITY_SEED) expect(m.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
