import { describe, expect, it } from "bun:test"
import { filterToCondition } from "./filter-to-condition"

describe("filterToCondition — sentinel resolution requires `type`", () => {
  it("equals with date sentinel and no type → null", () => {
    expect(filterToCondition("dueDate", "equals", { sentinel: "today" })).toBeNull()
  })

  it("equals with date sentinel and type=calendar-date → YYYY-MM-DD eq", () => {
    const result = filterToCondition("dueDate", "equals", { sentinel: "today" }, "calendar-date")
    expect(result).not.toBeNull()
    if (result === null || result.length !== 1) throw new Error("expected one condition")
    const [first] = result
    if (!first || !("eq" in first)) throw new Error("expected eq")
    expect(first.key).toBe("dueDate")
    expect(typeof first.eq).toBe("string")
    expect(first.eq).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it("equals with date sentinel and type=instant → half-open day range (gte+lt)", () => {
    const result = filterToCondition("completedAt", "equals", { sentinel: "today" }, "instant")
    expect(result).not.toBeNull()
    if (result === null || result.length !== 2) throw new Error("expected two conditions")
    const [gte, lt] = result
    if (!gte || !("gte" in gte) || typeof gte.gte !== "number")
      throw new Error("expected gte number")
    if (!lt || !("lt" in lt) || typeof lt.lt !== "number") throw new Error("expected lt number")
    expect(gte.key).toBe("completedAt")
    expect(lt.key).toBe("completedAt")
    expect(lt.lt).toBeGreaterThan(gte.gte)
    const span = lt.lt - gte.gte
    expect(span).toBeGreaterThanOrEqual(23 * 3600 * 1000)
    expect(span).toBeLessThanOrEqual(25 * 3600 * 1000)
  })

  it("gt with date sentinel and type=instant → end-of-day ms-epoch number gt", () => {
    const gtRes = filterToCondition("completedAt", "gt", { sentinel: "today" }, "instant")
    const gteRes = filterToCondition("completedAt", "gte", { sentinel: "today" }, "instant")
    const [gt] = gtRes ?? []
    const [gte] = gteRes ?? []
    if (!gt || !("gt" in gt) || typeof gt.gt !== "number") throw new Error("expected gt num")
    if (!gte || !("gte" in gte) || typeof gte.gte !== "number") throw new Error("expected gte num")
    expect(gt.gt - gte.gte).toBeGreaterThan(86_000_000)
  })

  it("lt with date sentinel and type=instant → start-of-day boundary", () => {
    const ltRes = filterToCondition("completedAt", "lt", { sentinel: "today" }, "instant")
    const lteRes = filterToCondition("completedAt", "lte", { sentinel: "today" }, "instant")
    const [lt] = ltRes ?? []
    const [lte] = lteRes ?? []
    if (!lt || !("lt" in lt) || typeof lt.lt !== "number") throw new Error("expected lt num")
    if (!lte || !("lte" in lte) || typeof lte.lte !== "number") throw new Error("expected lte num")
    expect(lte.lte - lt.lt).toBeGreaterThan(86_000_000)
  })

  it("equals with literal value still passes through when type is set", () => {
    expect(filterToCondition("status", "equals", "open", "select")).toEqual([
      { key: "status", eq: "open" },
    ])
  })

  it("equals with literal calendar-date string passes through", () => {
    expect(filterToCondition("dueDate", "equals", "2026-04-26", "calendar-date")).toEqual([
      { key: "dueDate", eq: "2026-04-26" },
    ])
  })
})

describe("filterToCondition — is_between server-side expansion", () => {
  it("calendar-date is_between → gte+lt pair on YYYY-MM-DD literals (half-open)", () => {
    const value = {
      type: "between",
      start: { sentinel: "yesterday" },
      end: { sentinel: "tomorrow" },
    }
    const result = filterToCondition("dueDate", "is_between", value, "calendar-date")
    expect(result).not.toBeNull()
    if (!result || result.length !== 2) throw new Error("expected two conditions")
    const [gte, lt] = result
    if (!gte || !("gte" in gte)) throw new Error("expected gte first")
    if (!lt || !("lt" in lt)) throw new Error("expected lt second")
    expect(gte.key).toBe("dueDate")
    expect(lt.key).toBe("dueDate")
    expect(typeof gte.gte).toBe("string")
    expect(typeof lt.lt).toBe("string")
    expect(gte.gte).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(lt.lt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it("instant is_between → gte (start-of-day) + lt (start-of-next-day) pair", () => {
    const value = {
      type: "between",
      start: { sentinel: "yesterday" },
      end: { sentinel: "tomorrow" },
    }
    const result = filterToCondition("completedAt", "is_between", value, "instant")
    if (!result || result.length !== 2) throw new Error("expected two conditions")
    const [gte, lt] = result
    if (!gte || !("gte" in gte) || typeof gte.gte !== "number") throw new Error("expected gte num")
    if (!lt || !("lt" in lt) || typeof lt.lt !== "number") throw new Error("expected lt num")
    expect(lt.lt - gte.gte).toBe(3 * 86_400_000)
  })

  it("is_between with no type → null (cannot resolve)", () => {
    expect(
      filterToCondition("dueDate", "is_between", {
        type: "between",
        start: { sentinel: "today" },
        end: { sentinel: "tomorrow" },
      })
    ).toBeNull()
  })
})

describe("filterToCondition — is_relative_to_today server-side expansion", () => {
  it("calendar-date is_relative_to_today → gte+lt YYYY-MM-DD pair (half-open)", () => {
    const value = { type: "relative_to_today", direction: "next", unit: "week" }
    const result = filterToCondition("dueDate", "is_relative_to_today", value, "calendar-date")
    if (!result || result.length !== 2) throw new Error("expected two conditions")
    const [gte, lt] = result
    if (!gte || !("gte" in gte)) throw new Error("expected gte first")
    if (!lt || !("lt" in lt)) throw new Error("expected lt second")
    expect(gte.key).toBe("dueDate")
    expect(typeof gte.gte).toBe("string")
    expect(gte.gte).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(typeof lt.lt).toBe("string")
    expect(lt.lt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it("instant is_relative_to_today → gte (start) + lt (start-of-next-day) ms-epoch pair", () => {
    const value = { type: "relative_to_today", direction: "this", unit: "day" }
    const result = filterToCondition("completedAt", "is_relative_to_today", value, "instant")
    if (!result || result.length !== 2) throw new Error("expected two conditions")
    const [gte, lt] = result
    if (!gte || !("gte" in gte) || typeof gte.gte !== "number") throw new Error("expected gte num")
    if (!lt || !("lt" in lt) || typeof lt.lt !== "number") throw new Error("expected lt num")
    expect(lt.lt - gte.gte).toBe(86_400_000)
  })

  it("calendar-date is_relative_to_today this-day → end is the day *after* start", () => {
    const value = { type: "relative_to_today", direction: "this", unit: "day" }
    const result = filterToCondition("dueDate", "is_relative_to_today", value, "calendar-date")
    if (!result || result.length !== 2) throw new Error("expected two conditions")
    const [gte, lt] = result
    if (!gte || !("gte" in gte) || typeof gte.gte !== "string") throw new Error("expected gte str")
    if (!lt || !("lt" in lt) || typeof lt.lt !== "string") throw new Error("expected lt str")
    const [gy, gm, gd] = gte.gte.split("-").map(Number)
    const [ly, lm, ld] = lt.lt.split("-").map(Number)
    if (
      gy === undefined ||
      gm === undefined ||
      gd === undefined ||
      ly === undefined ||
      lm === undefined ||
      ld === undefined
    ) {
      throw new Error("malformed date strings")
    }
    const gMs = Date.UTC(gy, gm - 1, gd)
    const lMs = Date.UTC(ly, lm - 1, ld)
    expect(lMs - gMs).toBe(86_400_000)
  })

  it("is_relative_to_today with no type → null", () => {
    expect(
      filterToCondition("dueDate", "is_relative_to_today", {
        type: "relative_to_today",
        direction: "next",
        unit: "week",
      })
    ).toBeNull()
  })
})
