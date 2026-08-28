import { describe, expect, test } from "bun:test"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import { getEsoDayStr } from "@shared/recurrence/reset-times"
import type { EvaluationContext } from "./types"
import { resolveRecord, resolveValueExpr } from "./value-resolve"

const ctx = (
  source: Record<string, ReadonlyJSONValue>,
  previous: Record<string, ReadonlyJSONValue> = {}
): EvaluationContext => ({ source: { ...source, previous } })

describe("resolveValueExpr", () => {
  test("returns non-string literals as-is", () => {
    const c = ctx({ x: 1 })
    expect(resolveValueExpr(42, c)).toBe(42)
    expect(resolveValueExpr(null, c)).toBeNull()
    expect(resolveValueExpr(true, c)).toBe(true)
    expect(resolveValueExpr({ a: 1 }, c)).toEqual({ a: 1 })
    expect(resolveValueExpr([1, 2], c)).toEqual([1, 2])
  })

  test("returns plain strings as literals", () => {
    expect(resolveValueExpr("hello", ctx({}))).toBe("hello")
    expect(resolveValueExpr("not a formula", ctx({}))).toBe("not a formula")
  })

  test("strips `=` prefix and parses formula", () => {
    expect(resolveValueExpr("=1 + 2", ctx({}))).toBe(3)
    expect(resolveValueExpr("='hi'", ctx({}))).toBe("hi")
  })

  test("resolves source.<id> to the source page's value", () => {
    const c = ctx({ title: "buy milk" })
    expect(resolveValueExpr("=source.title", c)).toBe("buy milk")
  })

  test("resolves source.id (the row's primary key)", () => {
    const c = ctx({ id: "abc-123", title: "x" })
    expect(resolveValueExpr("=source.id", c)).toBe("abc-123")
  })

  test("resolves source.previous.<id> to oldValues", () => {
    const c = ctx({ completedAt: 123 }, { completedAt: null })
    expect(resolveValueExpr("=source.previous.completedAt", c)).toBeNull()
  })

  test("missing nested ref returns null", () => {
    const c = ctx({})
    expect(resolveValueExpr("=source.previous.missing", c)).toBeNull()
    expect(resolveValueExpr("=source.title", c)).toBeNull()
  })

  test("now() evaluates against the wall clock", () => {
    const before = Date.now()
    const result = resolveValueExpr("=now()", ctx({}))
    const after = Date.now()
    if (typeof result !== "number") throw new Error(`expected number, got ${typeof result}`)
    expect(result).toBeGreaterThanOrEqual(before)
    expect(result).toBeLessThanOrEqual(after)
  })

  test("recurrence(timestampMs, rrule) lands on a strictly future logical day", () => {
    const start = Date.UTC(2024, 0, 1)
    const c = ctx({ dueAt: start, rrule: "FREQ=DAILY" })
    const next = resolveValueExpr("=recurrence(source.dueAt, source.rrule)", c)
    if (typeof next !== "number") throw new Error(`expected number, got ${typeof next}`)

    const utcDate = (d: Date) =>
      `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`
    const todayStr = getEsoDayStr(new Date())
    const resultStr = utcDate(new Date(next))
    expect(resultStr > todayStr).toBe(true)
  })

  describe("completion automation dueDate roll-forward", () => {
    const FIXED_EXPR =
      "=toCalendarDate(recurrence(source.rrule.anchorFromCompletion && parseCalendarDate(toEsoDay(parseInstant(source.completedAt))) || parseCalendarDate(source.dueDate), source.rrule.rule))"
    const BUGGY_EXPR =
      "=toCalendarDate(recurrence(source.rrule.anchorFromCompletion && source.completedAt || parseCalendarDate(source.dueDate), source.rrule.rule))"

    const isFutureDay = (value: ReadonlyJSONValue): boolean => {
      if (typeof value !== "string") return false
      return value > getEsoDayStr(new Date())
    }

    test("anchorFromCompletion FREQ=DAILY rolls dueDate to a strictly future day", () => {
      const c = ctx({
        rrule: { rule: "FREQ=DAILY", anchorFromCompletion: true },
        completedAt: "2024-01-01T08:00:00.000Z",
        dueDate: "2024-01-01",
      })
      expect(isFutureDay(resolveValueExpr(FIXED_EXPR, c))).toBe(true)
    })

    test("the pre-fix expression silently wiped dueDate to null (regression guard)", () => {
      const c = ctx({
        rrule: { rule: "FREQ=DAILY", anchorFromCompletion: true },
        completedAt: "2024-01-01T08:00:00.000Z",
        dueDate: "2024-01-01",
      })
      expect(resolveValueExpr(BUGGY_EXPR, c)).toBeNull()
    })

    test("calendar-anchored (anchorFromCompletion:false) still rolls forward", () => {
      const c = ctx({
        rrule: { rule: "FREQ=DAILY", anchorFromCompletion: false },
        completedAt: "2024-01-01T08:00:00.000Z",
        dueDate: "2024-01-01",
      })
      expect(isFutureDay(resolveValueExpr(FIXED_EXPR, c))).toBe(true)
    })
  })

  test("malformed formula collapses to null", () => {
    expect(resolveValueExpr("=this is not a valid expression", ctx({}))).toBeNull()
  })

  test("unknown function name surfaces as null (parse error)", () => {
    expect(resolveValueExpr("=bogus(1)", ctx({}))).toBeNull()
  })

  test("string concatenation works through formula", () => {
    const c = ctx({ title: "Task" })
    expect(resolveValueExpr("='Done: ' + source.title", c)).toBe("Done: Task")
  })

  test("comparison + boolean operators work", () => {
    const c = ctx({ a: 5, b: 10 })
    expect(resolveValueExpr("=source.a < source.b", c)).toBe(true)
    expect(resolveValueExpr("=source.a == 5 && source.b == 10", c)).toBe(true)
  })
})

describe("resolveRecord", () => {
  test("resolves every slot independently", () => {
    const c = ctx({ title: "x", count: 3 })
    const out = resolveRecord(
      {
        title: "=source.title",
        count: "=source.count + 1",
        literal: "constant",
        nilSlot: "=source.missing",
      },
      c
    )
    expect(out).toEqual({
      title: "x",
      count: 4,
      literal: "constant",
      nilSlot: null,
    })
  })

  test("empty record resolves to empty object", () => {
    expect(resolveRecord({}, ctx({}))).toEqual({})
  })
})

describe("formulaValues override", () => {
  test("resolveValueExpr reads the override instead of ctx.source", () => {
    const c = ctx({ rel: "page-id-string" })
    const formulaValues = { source: { rel: { name: "Alice" } } }
    expect(resolveValueExpr("=source.rel.name", c, formulaValues)).toBe("Alice")
  })

  test("resolveValueExpr falls back to ctx.source when override is omitted", () => {
    const c = ctx({ title: "buy milk" })
    expect(resolveValueExpr("=source.title", c)).toBe("buy milk")
  })

  test("resolveRecord forwards the override to every slot", () => {
    const c = ctx({ rel: "page-id-string", literal: "x" })
    const formulaValues = { source: { rel: { name: "Alice" }, literal: "from-bag" } }
    const out = resolveRecord(
      {
        derivedName: "=source.rel.name",
        derivedLiteral: "=source.literal",
      },
      c,
      formulaValues
    )
    expect(out).toEqual({ derivedName: "Alice", derivedLiteral: "from-bag" })
  })

  test("override of `null` for a relation collapses nested ref to null", () => {
    const c = ctx({ rel: "missing-id" })
    const formulaValues = { source: { rel: null } }
    expect(resolveValueExpr("=source.rel.name", c, formulaValues)).toBeNull()
  })
})
