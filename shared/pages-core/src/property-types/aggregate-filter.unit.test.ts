import { describe, expect, test } from "bun:test"
import type { AggregateFilter } from "../schema/property-config-schemas"
import type { PageDataJSON } from "../types"
import { matchesAggregateFilter } from "./aggregate-filter"

describe("matchesAggregateFilter", () => {
  describe("eq", () => {
    const filter: AggregateFilter = { op: "eq", property: "status", value: "done" }
    test("matches equal value", () => {
      expect(matchesAggregateFilter({ status: "done" }, filter)).toBe(true)
    })
    test("rejects unequal value", () => {
      expect(matchesAggregateFilter({ status: "plan" }, filter)).toBe(false)
    })
    test("rejects absent value", () => {
      expect(matchesAggregateFilter({}, filter)).toBe(false)
    })
  })

  describe("in (set-membership)", () => {
    const filter: AggregateFilter = {
      op: "in",
      property: "status",
      values: ["documentation", "testing", "implementation", "checks"],
    }
    test("matches a member", () => {
      expect(matchesAggregateFilter({ status: "testing" }, filter)).toBe(true)
    })
    test("rejects a non-member", () => {
      expect(matchesAggregateFilter({ status: "done" }, filter)).toBe(false)
    })
    test("rejects a non-string value", () => {
      expect(matchesAggregateFilter({ status: 3 }, filter)).toBe(false)
    })
  })

  describe("is_null / is_not_null (presence)", () => {
    const isNull: AggregateFilter = { op: "is_null", property: "claimedAgent" }
    const isNotNull: AggregateFilter = { op: "is_not_null", property: "claimedAgent" }

    test("absent reads as null", () => {
      expect(matchesAggregateFilter({}, isNull)).toBe(true)
      expect(matchesAggregateFilter({}, isNotNull)).toBe(false)
    })
    test("explicit null reads as null", () => {
      expect(matchesAggregateFilter({ claimedAgent: null }, isNull)).toBe(true)
    })
    test("empty string reads as null", () => {
      expect(matchesAggregateFilter({ claimedAgent: "" }, isNull)).toBe(true)
    })
    test("empty array reads as null", () => {
      expect(matchesAggregateFilter({ claimedAgent: [] }, isNull)).toBe(true)
    })
    test("a present id reads as not-null", () => {
      const data: PageDataJSON = { claimedAgent: "agent-1" }
      expect(matchesAggregateFilter(data, isNull)).toBe(false)
      expect(matchesAggregateFilter(data, isNotNull)).toBe(true)
    })
    test("a non-empty array reads as not-null", () => {
      expect(matchesAggregateFilter({ claimedAgent: ["agent-1"] }, isNotNull)).toBe(true)
    })
  })

  describe("and / or (boolean tree)", () => {
    const blue: AggregateFilter = {
      op: "and",
      filters: [
        { op: "eq", property: "status", value: "exploration" },
        { op: "is_null", property: "claimedAgent" },
      ],
    }
    test("and — all children must match", () => {
      expect(matchesAggregateFilter({ status: "exploration" }, blue)).toBe(true)
      expect(matchesAggregateFilter({ status: "exploration", claimedAgent: "a" }, blue)).toBe(false)
      expect(matchesAggregateFilter({ status: "plan" }, blue)).toBe(false)
    })

    const yellow: AggregateFilter = {
      op: "or",
      filters: [
        {
          op: "and",
          filters: [
            { op: "eq", property: "status", value: "exploration" },
            { op: "is_not_null", property: "claimedAgent" },
          ],
        },
        { op: "in", property: "status", values: ["problem", "intent", "principles", "plan"] },
      ],
    }
    test("or — claimed exploration matches the first arm", () => {
      expect(matchesAggregateFilter({ status: "exploration", claimedAgent: "a" }, yellow)).toBe(
        true
      )
    })
    test("or — a prep status matches the second arm", () => {
      expect(matchesAggregateFilter({ status: "intent" }, yellow)).toBe(true)
    })
    test("or — unclaimed exploration matches neither arm", () => {
      expect(matchesAggregateFilter({ status: "exploration" }, yellow)).toBe(false)
    })

    test("and — vacuously true on no children; or — vacuously false", () => {
      expect(matchesAggregateFilter({}, { op: "and", filters: [] })).toBe(true)
      expect(matchesAggregateFilter({}, { op: "or", filters: [] })).toBe(false)
    })
  })
})
