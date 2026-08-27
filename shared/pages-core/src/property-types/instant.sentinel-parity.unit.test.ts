import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { resolveInstantSentinel, resolveInstantSentinelEndOfDay } from "./date-sentinels"
import { instantOps } from "./instant"

const def: PropertyDefinition = { id: "ts", title: "Timestamp", type: "instant" }

describe("instantOps.getFilterPredicate — sentinel-on-instant matches server expansion", () => {
  describe("equals with sentinel", () => {
    test("named sentinel: rows in today's logical day match", () => {
      const pred = instantOps.getFilterPredicate(
        { operator: "equals", value: { sentinel: "today" } },
        def
      )
      const start = resolveInstantSentinel("today")
      const end = resolveInstantSentinelEndOfDay("today")
      expect(pred(start)).toBe(true)
      expect(pred(start + 1)).toBe(true)
      expect(pred(end)).toBe(true)
      expect(pred(start - 1)).toBe(false)
      expect(pred(end + 1)).toBe(false)
    })

    test("custom_date sentinel: row at the customInstant moment falls in its day", () => {
      const customInstant = resolveInstantSentinel("today") + 5 * 60 * 60 * 1000
      const pred = instantOps.getFilterPredicate(
        { operator: "equals", value: { sentinel: "custom_date", customInstant } },
        def
      )
      expect(pred(customInstant)).toBe(true)
      expect(pred(customInstant - 1)).toBe(true)
      expect(pred(customInstant + 1)).toBe(true)
    })

    test("non-number row value rejected against sentinel", () => {
      const pred = instantOps.getFilterPredicate(
        { operator: "equals", value: { sentinel: "today" } },
        def
      )
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
      expect(pred("2026-04-10")).toBe(false)
    })

    test("plain-number filter value preserves scalar equality", () => {
      const pred = instantOps.getFilterPredicate({ operator: "equals", value: 1000 }, def)
      expect(pred(1000)).toBe(true)
      expect(pred(1001)).toBe(false)
    })
  })

  describe("gt with sentinel", () => {
    test("named sentinel: only rows strictly after end-of-today match", () => {
      const pred = instantOps.getFilterPredicate(
        { operator: "gt", value: { sentinel: "today" } },
        def
      )
      const start = resolveInstantSentinel("today")
      const end = resolveInstantSentinelEndOfDay("today")
      expect(pred(end + 1)).toBe(true)
      expect(pred(end)).toBe(false)
      expect(pred(start)).toBe(false)
      expect(pred(start - 1)).toBe(false)
    })
  })

  describe("lte with sentinel", () => {
    test("named sentinel: rows up to end-of-today included", () => {
      const pred = instantOps.getFilterPredicate(
        { operator: "lte", value: { sentinel: "today" } },
        def
      )
      const start = resolveInstantSentinel("today")
      const end = resolveInstantSentinelEndOfDay("today")
      expect(pred(end)).toBe(true)
      expect(pred(end + 1)).toBe(false)
      expect(pred(start)).toBe(true)
      expect(pred(start - 1)).toBe(true)
    })
  })

  describe("gte/lt with sentinel — already correct, regression guard", () => {
    test("gte: rows on or after start-of-today match", () => {
      const pred = instantOps.getFilterPredicate(
        { operator: "gte", value: { sentinel: "today" } },
        def
      )
      const start = resolveInstantSentinel("today")
      expect(pred(start)).toBe(true)
      expect(pred(start + 1)).toBe(true)
      expect(pred(start - 1)).toBe(false)
    })

    test("lt: rows strictly before start-of-today match", () => {
      const pred = instantOps.getFilterPredicate(
        { operator: "lt", value: { sentinel: "today" } },
        def
      )
      const start = resolveInstantSentinel("today")
      expect(pred(start - 1)).toBe(true)
      expect(pred(start)).toBe(false)
      expect(pred(start + 1)).toBe(false)
    })
  })
})
