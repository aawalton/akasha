import { describe, expect, it } from "bun:test"
import type { FilterOperator } from "@shared/pages-core/property-types/types"
import { viewFilterToCondition } from "./view-filter-to-condition"

const KEY = "status"

describe("viewFilterToCondition", () => {
  describe("server-translatable operators", () => {
    it("equals → eq", () => {
      expect(viewFilterToCondition(KEY, "equals", "open")).toEqual([{ key: KEY, eq: "open" }])
    })

    it("gt → gt", () => {
      expect(viewFilterToCondition(KEY, "gt", 5)).toEqual([{ key: KEY, gt: 5 }])
    })

    it("lt → lt", () => {
      expect(viewFilterToCondition(KEY, "lt", 5)).toEqual([{ key: KEY, lt: 5 }])
    })

    it("is_empty → isEmpty: true", () => {
      expect(viewFilterToCondition(KEY, "is_empty", undefined)).toEqual([
        { key: KEY, isEmpty: true },
      ])
    })

    it("contains (string) → contains", () => {
      expect(viewFilterToCondition(KEY, "contains", "abc")).toEqual([{ key: KEY, contains: "abc" }])
    })

    it("contains (non-string) → null (cannot translate)", () => {
      expect(viewFilterToCondition(KEY, "contains", 42)).toBeNull()
    })

    it("includes (array) → in (any-of semantics for scalar select)", () => {
      expect(viewFilterToCondition(KEY, "includes", ["exploration", "plan"])).toEqual([
        {
          key: KEY,
          in: ["exploration", "plan"],
        },
      ])
    })

    it("includes (single value) → in with single-element array", () => {
      expect(viewFilterToCondition(KEY, "includes", "exploration")).toEqual([
        {
          key: KEY,
          in: ["exploration"],
        },
      ])
    })

    it("includes (undefined) → null (no value to match)", () => {
      expect(viewFilterToCondition(KEY, "includes", undefined)).toBeNull()
    })

    it("equals (undefined) → null (no value to match)", () => {
      expect(viewFilterToCondition(KEY, "equals", undefined)).toBeNull()
    })

    it("gt (undefined) → null (no value to match)", () => {
      expect(viewFilterToCondition(KEY, "gt", undefined)).toBeNull()
    })

    it("lt (undefined) → null (no value to match)", () => {
      expect(viewFilterToCondition(KEY, "lt", undefined)).toBeNull()
    })

    it("not_includes (array) → notIn (none-of semantics for scalar select)", () => {
      expect(viewFilterToCondition(KEY, "not_includes", ["done", "duplicate"])).toEqual([
        {
          key: KEY,
          notIn: ["done", "duplicate"],
        },
      ])
    })

    it("not_includes (single value) → notIn with single-element array", () => {
      expect(viewFilterToCondition(KEY, "not_includes", "done")).toEqual([
        {
          key: KEY,
          notIn: ["done"],
        },
      ])
    })

    it("not_includes (undefined) → null (no value to match)", () => {
      expect(viewFilterToCondition(KEY, "not_includes", undefined)).toBeNull()
    })

    it("not_includes (empty array) → null (vacuous, exclude nothing)", () => {
      expect(viewFilterToCondition(KEY, "not_includes", [])).toBeNull()
    })

    it("not_equals → neq (mirror of equals)", () => {
      expect(viewFilterToCondition(KEY, "not_equals", "open")).toEqual([{ key: KEY, neq: "open" }])
    })

    it("not_equals (undefined) → null (no value to mismatch against)", () => {
      expect(viewFilterToCondition(KEY, "not_equals", undefined)).toBeNull()
    })

    it("not_contains (string) → notContains", () => {
      expect(viewFilterToCondition(KEY, "not_contains", "abc")).toEqual([
        {
          key: KEY,
          notContains: "abc",
        },
      ])
    })

    it("not_contains (non-string) → null (mirror of contains)", () => {
      expect(viewFilterToCondition(KEY, "not_contains", 42)).toBeNull()
    })

    it("is_not_empty → isNotEmpty: true", () => {
      expect(viewFilterToCondition(KEY, "is_not_empty", undefined)).toEqual([
        {
          key: KEY,
          isNotEmpty: true,
        },
      ])
    })
  })

  describe("operators handled client-side via applyView (no property type)", () => {
    const clientSide: FilterOperator[] = ["is_between", "is_relative_to_today"]

    for (const operator of clientSide) {
      it(`${operator} → null`, () => {
        expect(viewFilterToCondition(KEY, operator, "anything")).toBeNull()
      })
    }
  })

  describe("unknown operator", () => {
    it("returns null instead of throwing", () => {
      expect(viewFilterToCondition(KEY, "bogus_operator", "x")).toBeNull()
    })
  })

  describe("regression: real view config from project Up Next tab", () => {
    it("is_not_empty on claimedAgent yields isNotEmpty (server-side)", () => {
      expect(viewFilterToCondition("claimedAgent", "is_not_empty", undefined)).toEqual([
        {
          key: "claimedAgent",
          isNotEmpty: true,
        },
      ])
    })

    it("includes:[exploration] on status yields in:[exploration] (server matches scalar)", () => {
      expect(viewFilterToCondition("status", "includes", ["exploration"])).toEqual([
        {
          key: "status",
          in: ["exploration"],
        },
      ])
    })
  })
})
