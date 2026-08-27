import { describe, expect, it } from "bun:test"
import type { PageCondition } from "@shared/pages-core/page-types"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { viewFilterToCondition } from "./view-filter-to-condition"

const calendarDef: PropertyDefinition = {
  id: "dueDate",
  title: "Due Date",
  type: "calendar-date",
}

const instantDef: PropertyDefinition = {
  id: "completedAt",
  title: "Completed At",
  type: "instant",
}

function expectOne(result: readonly PageCondition[] | null): PageCondition {
  if (result === null || result.length !== 1) throw new Error(`expected 1 condition`)
  const [first] = result
  if (!first) throw new Error("expected a condition")
  return first
}

function expectTwo(
  result: readonly PageCondition[] | null
): readonly [PageCondition, PageCondition] {
  if (result === null || result.length !== 2) throw new Error("expected 2 conditions")
  const [first, second] = result
  if (!first || !second) throw new Error("expected two conditions")
  return [first, second]
}

describe("viewFilterToCondition — date-aware operators with sentinel values", () => {
  describe("lte / gte — server-translatable when property type is known", () => {
    it("lte with literal value → access-layer lte", () => {
      expect(viewFilterToCondition("dueDate", "lte", "2026-04-26", calendarDef)).toEqual([
        { key: "dueDate", lte: "2026-04-26" },
      ])
    })

    it("gte with literal value → access-layer gte", () => {
      expect(viewFilterToCondition("dueDate", "gte", "2026-04-26", calendarDef)).toEqual([
        { key: "dueDate", gte: "2026-04-26" },
      ])
    })

    it("lte with {sentinel: 'today'} on calendar-date resolves to a YYYY-MM-DD string", () => {
      const result = viewFilterToCondition("dueDate", "lte", { sentinel: "today" }, calendarDef)
      const cond = expectOne(result)
      if (!("lte" in cond)) throw new Error("expected lte condition")
      expect(cond.key).toBe("dueDate")
      expect(typeof cond.lte).toBe("string")
      expect(cond.lte).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it("lte with {sentinel: 'today'} on instant resolves to an end-of-day ms-epoch number", () => {
      const result = viewFilterToCondition("completedAt", "lte", { sentinel: "today" }, instantDef)
      const cond = expectOne(result)
      if (!("lte" in cond)) throw new Error("expected lte condition")
      expect(typeof cond.lte).toBe("number")
      expect(typeof cond.lte === "number" ? cond.lte : 0).toBeGreaterThan(0)
    })

    it("gte with {sentinel: 'today'} on instant resolves to a start-of-day ms-epoch number", () => {
      const lteEnd = viewFilterToCondition("completedAt", "lte", { sentinel: "today" }, instantDef)
      const gteStart = viewFilterToCondition(
        "completedAt",
        "gte",
        { sentinel: "today" },
        instantDef
      )
      const lteCond = expectOne(lteEnd)
      const gteCond = expectOne(gteStart)
      if (!("lte" in lteCond)) throw new Error("expected lte condition")
      if (!("gte" in gteCond)) throw new Error("expected gte condition")
      const lteVal = typeof lteCond.lte === "number" ? lteCond.lte : 0
      const gteVal = typeof gteCond.gte === "number" ? gteCond.gte : 0
      expect(lteVal - gteVal).toBeGreaterThan(86_000_000)
    })

    it("lte with sentinel and no property definition falls back to client-side", () => {
      expect(viewFilterToCondition("dueDate", "lte", { sentinel: "today" })).toBeNull()
    })

    it("lte with sentinel against an unsupported property type falls back to client-side", () => {
      const textDef: PropertyDefinition = {
        id: "title",
        title: "Title",
        type: "text",
      }
      expect(viewFilterToCondition("title", "lte", { sentinel: "today" }, textDef)).toBeNull()
    })
  })

  describe("gt / lt — sentinel translation parallel to gte/lte", () => {
    it("gt with literal value on calendar-date → access-layer gt", () => {
      expect(viewFilterToCondition("dueDate", "gt", "2026-04-26", calendarDef)).toEqual([
        { key: "dueDate", gt: "2026-04-26" },
      ])
    })

    it("lt with literal value on calendar-date → access-layer lt", () => {
      expect(viewFilterToCondition("dueDate", "lt", "2026-04-26", calendarDef)).toEqual([
        { key: "dueDate", lt: "2026-04-26" },
      ])
    })

    it("gt with {sentinel: 'today'} on calendar-date resolves to a YYYY-MM-DD string", () => {
      const result = viewFilterToCondition("dueDate", "gt", { sentinel: "today" }, calendarDef)
      const cond = expectOne(result)
      if (!("gt" in cond)) throw new Error("expected gt condition")
      expect(cond.key).toBe("dueDate")
      expect(typeof cond.gt).toBe("string")
      expect(cond.gt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it("lt with {sentinel: 'today'} on calendar-date resolves to a YYYY-MM-DD string", () => {
      const result = viewFilterToCondition("dueDate", "lt", { sentinel: "today" }, calendarDef)
      const cond = expectOne(result)
      if (!("lt" in cond)) throw new Error("expected lt condition")
      expect(cond.key).toBe("dueDate")
      expect(typeof cond.lt).toBe("string")
      expect(cond.lt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it("gt with {sentinel: 'today'} on instant resolves to an end-of-day ms-epoch number", () => {
      const gtEnd = viewFilterToCondition("completedAt", "gt", { sentinel: "today" }, instantDef)
      const gteStart = viewFilterToCondition(
        "completedAt",
        "gte",
        { sentinel: "today" },
        instantDef
      )
      const gtCond = expectOne(gtEnd)
      const gteCond = expectOne(gteStart)
      if (!("gt" in gtCond)) throw new Error("expected gt condition")
      if (!("gte" in gteCond)) throw new Error("expected gte condition")
      const gtVal = typeof gtCond.gt === "number" ? gtCond.gt : 0
      const gteVal = typeof gteCond.gte === "number" ? gteCond.gte : 0
      expect(gtVal - gteVal).toBeGreaterThan(86_000_000)
    })

    it("lt with {sentinel: 'today'} on instant resolves to a start-of-day ms-epoch number", () => {
      const ltStart = viewFilterToCondition("completedAt", "lt", { sentinel: "today" }, instantDef)
      const lteEnd = viewFilterToCondition("completedAt", "lte", { sentinel: "today" }, instantDef)
      const ltCond = expectOne(ltStart)
      const lteCond = expectOne(lteEnd)
      if (!("lt" in ltCond)) throw new Error("expected lt condition")
      if (!("lte" in lteCond)) throw new Error("expected lte condition")
      const ltVal = typeof ltCond.lt === "number" ? ltCond.lt : 0
      const lteVal = typeof lteCond.lte === "number" ? lteCond.lte : 0
      expect(lteVal - ltVal).toBeGreaterThan(86_000_000)
    })

    it("gt with sentinel and no property definition falls back to client-side", () => {
      expect(viewFilterToCondition("dueDate", "gt", { sentinel: "today" })).toBeNull()
    })

    it("lt with sentinel and no property definition falls back to client-side", () => {
      expect(viewFilterToCondition("dueDate", "lt", { sentinel: "today" })).toBeNull()
    })

    it("gt with sentinel against an unsupported property type falls back to client-side", () => {
      const textDef: PropertyDefinition = { id: "title", title: "Title", type: "text" }
      expect(viewFilterToCondition("title", "gt", { sentinel: "today" }, textDef)).toBeNull()
    })

    it("regression: original Tasks Round Three filter shape resolves cleanly", () => {
      const result = viewFilterToCondition("dueDate", "gt", { sentinel: "today" }, calendarDef)
      const cond = expectOne(result)
      if (!("gt" in cond)) throw new Error("expected gt condition")
      expect(typeof cond.gt).toBe("string")
      expect(cond.gt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  describe("equals / not_equals — sentinel translation on date types", () => {
    it("equals with {sentinel: 'today'} on calendar-date resolves to a YYYY-MM-DD eq", () => {
      const result = viewFilterToCondition("dueDate", "equals", { sentinel: "today" }, calendarDef)
      const cond = expectOne(result)
      if (!("eq" in cond)) throw new Error("expected eq condition")
      expect(cond.key).toBe("dueDate")
      expect(typeof cond.eq).toBe("string")
      expect(cond.eq).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it("not_equals with {sentinel: 'today'} on calendar-date resolves to a YYYY-MM-DD neq", () => {
      const result = viewFilterToCondition(
        "dueDate",
        "not_equals",
        { sentinel: "today" },
        calendarDef
      )
      const cond = expectOne(result)
      if (!("neq" in cond)) throw new Error("expected neq condition")
      expect(cond.key).toBe("dueDate")
      expect(typeof cond.neq).toBe("string")
      expect(cond.neq).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it("equals with {sentinel: 'today'} on instant expands to a half-open day range", () => {
      const eqRange = viewFilterToCondition(
        "completedAt",
        "equals",
        { sentinel: "today" },
        instantDef
      )
      const gteStart = viewFilterToCondition(
        "completedAt",
        "gte",
        { sentinel: "today" },
        instantDef
      )
      const [eqGte, eqLt] = expectTwo(eqRange)
      const gteCond = expectOne(gteStart)
      if (!("gte" in eqGte) || typeof eqGte.gte !== "number")
        throw new Error("expected gte number for range start")
      if (!("lt" in eqLt) || typeof eqLt.lt !== "number")
        throw new Error("expected lt number for range end")
      if (!("gte" in gteCond) || typeof gteCond.gte !== "number")
        throw new Error("expected gte number")
      expect(eqGte.gte).toBe(gteCond.gte)
      expect(eqLt.lt).toBeGreaterThan(eqGte.gte)
      expect(eqLt.lt - eqGte.gte).toBeGreaterThanOrEqual(23 * 60 * 60 * 1000)
      expect(eqLt.lt - eqGte.gte).toBeLessThanOrEqual(25 * 60 * 60 * 1000)
    })

    it("not_equals with {sentinel: 'today'} on instant expands to an or of [lt startOfDay, gte startOfNextDay]", () => {
      const ne = viewFilterToCondition(
        "completedAt",
        "not_equals",
        { sentinel: "today" },
        instantDef
      )
      const eqRange = viewFilterToCondition(
        "completedAt",
        "equals",
        { sentinel: "today" },
        instantDef
      )
      const cond = expectOne(ne)
      if (!("or" in cond) || cond.or.length !== 2)
        throw new Error("expected an or-condition with two arms")
      const [a, b] = cond.or
      if (!a || !b) throw new Error("expected two or-arms")
      if (!("lt" in a) || typeof a.lt !== "number") throw new Error("expected lt number first")
      if (!("gte" in b) || typeof b.gte !== "number") throw new Error("expected gte number second")
      expect(a.key).toBe("completedAt")
      expect(b.key).toBe("completedAt")
      const [eqGte, eqLt] = expectTwo(eqRange)
      if (!("gte" in eqGte) || typeof eqGte.gte !== "number")
        throw new Error("expected eq.gte number")
      if (!("lt" in eqLt) || typeof eqLt.lt !== "number") throw new Error("expected eq.lt number")
      expect(a.lt).toBe(eqGte.gte)
      expect(b.gte).toBe(eqLt.lt)
    })

    it("equals with sentinel and no property definition falls back to client-side", () => {
      expect(viewFilterToCondition("dueDate", "equals", { sentinel: "today" })).toBeNull()
    })

    it("not_equals with sentinel against an unsupported property type falls back", () => {
      const textDef: PropertyDefinition = { id: "title", title: "Title", type: "text" }
      expect(
        viewFilterToCondition("title", "not_equals", { sentinel: "today" }, textDef)
      ).toBeNull()
    })

    it("equals with literal scalar still translates as before (regression)", () => {
      expect(viewFilterToCondition("dueDate", "equals", "2026-04-26", calendarDef)).toEqual([
        { key: "dueDate", eq: "2026-04-26" },
      ])
    })
  })

  describe("is_relative_to_today / is_between — multi-condition expansion", () => {
    it("is_relative_to_today on calendar-date → 2-element [gte, lt] array of YYYY-MM-DD strings", () => {
      const value = { type: "relative_to_today", direction: "this", unit: "day" }
      const result = viewFilterToCondition("dueDate", "is_relative_to_today", value, calendarDef)
      const [gte, lt] = expectTwo(result)
      if (!("gte" in gte)) throw new Error("expected gte first")
      if (!("lt" in lt)) throw new Error("expected lt second")
      expect(gte.key).toBe("dueDate")
      expect(lt.key).toBe("dueDate")
      expect(typeof gte.gte).toBe("string")
      expect(typeof lt.lt).toBe("string")
      expect(gte.gte).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(lt.lt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it("is_relative_to_today on instant → 2-element [gte, lt] array of ms-epoch numbers", () => {
      const value = { type: "relative_to_today", direction: "this", unit: "day" }
      const result = viewFilterToCondition("completedAt", "is_relative_to_today", value, instantDef)
      const [gte, lt] = expectTwo(result)
      if (!("gte" in gte) || typeof gte.gte !== "number") throw new Error("expected gte num")
      if (!("lt" in lt) || typeof lt.lt !== "number") throw new Error("expected lt num")
      expect(lt.lt - gte.gte).toBe(86_400_000)
    })

    it("is_between on calendar-date → 2-element [gte, lt] array of YYYY-MM-DD strings", () => {
      const value = {
        type: "between",
        start: { sentinel: "yesterday" },
        end: { sentinel: "tomorrow" },
      }
      const result = viewFilterToCondition("dueDate", "is_between", value, calendarDef)
      const [gte, lt] = expectTwo(result)
      if (!("gte" in gte)) throw new Error("expected gte first")
      if (!("lt" in lt)) throw new Error("expected lt second")
      expect(gte.key).toBe("dueDate")
      expect(lt.key).toBe("dueDate")
      expect(typeof gte.gte).toBe("string")
      expect(typeof lt.lt).toBe("string")
    })

    it("is_between on instant → 2-element [gte, lt] array (start-of-day to start-of-next-day)", () => {
      const value = {
        type: "between",
        start: { sentinel: "yesterday" },
        end: { sentinel: "tomorrow" },
      }
      const result = viewFilterToCondition("completedAt", "is_between", value, instantDef)
      const [gte, lt] = expectTwo(result)
      if (!("gte" in gte) || typeof gte.gte !== "number") throw new Error("expected gte num")
      if (!("lt" in lt) || typeof lt.lt !== "number") throw new Error("expected lt num")
      expect(lt.lt - gte.gte).toBe(3 * 86_400_000)
    })

    it("is_relative_to_today with no definition still falls back to null", () => {
      expect(
        viewFilterToCondition("dueDate", "is_relative_to_today", {
          type: "relative_to_today",
          direction: "this",
          unit: "day",
        })
      ).toBeNull()
    })
  })
})
