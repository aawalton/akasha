import { describe, expect, test } from "bun:test"
import type { PageDataJSON, PropertyDefinition } from "../types.ts"
import { isLiveFormulaConfig, resolveComputedProperties } from "./resolve.ts"

function formulaDef(id: string, expression: string): PropertyDefinition {
  return { id, title: id, type: "formula", config: { expression } } satisfies PropertyDefinition
}

function textDef(id: string): PropertyDefinition {
  return { id, title: id, type: "text" } satisfies PropertyDefinition
}

function isFormulaError(value: unknown): boolean {
  return value !== null && typeof value === "object" && "__formulaError" in value
}

function formulaErrorMessage(value: unknown): string {
  if (value !== null && typeof value === "object" && "__formulaError" in value) {
    const msg = value.__formulaError
    if (typeof msg === "string") return msg
  }
  throw new Error("expected FormulaError sentinel")
}

function formulaErrorCode(value: unknown): string {
  if (value !== null && typeof value === "object" && "code" in value) {
    const code = value.code
    if (typeof code === "string") return code
  }
  throw new Error("expected FormulaError sentinel with string `code`")
}

describe("resolveComputedProperties", () => {
  test("no formula defs returns data unchanged", () => {
    const data = { x: 1, y: "hello" } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [textDef("x"), textDef("y")]
    const result = resolveComputedProperties(data, defs)
    expect(result).toBe(data)
  })

  test("single formula: prop(a) + prop(b)", () => {
    const data = { a: 3, b: 7 } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [
      textDef("a"),
      textDef("b"),
      formulaDef("sum", "prop(a) + prop(b)"),
    ]
    const result = resolveComputedProperties(data, defs)
    expect(result.sum).toBe(10)
  })

  test("cross-formula refs: formula A references formula B", () => {
    const data = { raw: 5 } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [
      textDef("raw"),
      formulaDef("double", "prop(raw) * 2"),
      formulaDef("quad", "prop(double) * 2"),
    ]
    const result = resolveComputedProperties(data, defs)
    expect(result.double).toBe(10)
    expect(result.quad).toBe(20)
  })

  test("cycle detection: A refs B, B refs A returns null", () => {
    const data = {} satisfies PageDataJSON
    const defs: PropertyDefinition[] = [formulaDef("a", "prop(b)"), formulaDef("b", "prop(a)")]
    const result = resolveComputedProperties(data, defs)
    expect(result.a).toBeNull()
    expect(result.b).toBeNull()
  })

  test("invalid expression produces FormulaError sentinel with code parse_error", () => {
    const data = {} satisfies PageDataJSON
    const defs: PropertyDefinition[] = [formulaDef("f", "@@@")]
    const result = resolveComputedProperties(data, defs)
    expect(isFormulaError(result.f)).toBe(true)
    expect(formulaErrorMessage(result.f)).toMatch(/Unexpected character/)
    expect(formulaErrorCode(result.f)).toBe("parse_error")
  })

  test("arithmetic type error produces FormulaError sentinel with code arithmetic_nan", () => {
    const data = { o: { x: 1 } } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [textDef("o"), formulaDef("f", "prop(o) + 1")]
    const result = resolveComputedProperties(data, defs)
    expect(isFormulaError(result.f)).toBe(true)
    expect(formulaErrorCode(result.f)).toBe("arithmetic_nan")
  })

  test("comparison type error produces FormulaError sentinel with code comparison_type_mismatch", () => {
    const data = { s: "abc" } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [textDef("s"), formulaDef("f", "prop(s) < 1")]
    const result = resolveComputedProperties(data, defs)
    expect(isFormulaError(result.f)).toBe(true)
    expect(formulaErrorCode(result.f)).toBe("comparison_type_mismatch")
  })

  test("divide by zero produces FormulaError sentinel with code divide_by_zero", () => {
    const data = {} satisfies PageDataJSON
    const defs: PropertyDefinition[] = [formulaDef("f", "1 / 0")]
    const result = resolveComputedProperties(data, defs)
    expect(isFormulaError(result.f)).toBe(true)
    expect(formulaErrorCode(result.f)).toBe("divide_by_zero")
  })

  test("equality non-scalar produces FormulaError sentinel with code equality_non_scalar", () => {
    const data = { a: [1, 2] } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [textDef("a"), formulaDef("f", "prop(a) == prop(a)")]
    const result = resolveComputedProperties(data, defs)
    expect(isFormulaError(result.f)).toBe(true)
    expect(formulaErrorCode(result.f)).toBe("equality_non_scalar")
  })

  test("null operand to comparison propagates as null (not an error)", () => {
    const data = {} satisfies PageDataJSON
    const defs: PropertyDefinition[] = [formulaDef("f", "prop(missing) < 1")]
    const result = resolveComputedProperties(data, defs)
    expect(isFormulaError(result.f)).toBe(false)
    expect(result.f).toBeNull()
  })

  test("non-formula properties pass through unchanged", () => {
    const data = { name: "Alice", age: 30 } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [
      textDef("name"),
      textDef("age"),
      formulaDef("greeting", "'Hello'"),
    ]
    const result = resolveComputedProperties(data, defs)
    expect(result.name).toBe("Alice")
    expect(result.age).toBe(30)
  })

  test("enriched data contains both raw values and computed formulas", () => {
    const data = { price: 100, qty: 3 } satisfies PageDataJSON
    const defs: PropertyDefinition[] = [
      textDef("price"),
      textDef("qty"),
      formulaDef("total", "prop(price) * prop(qty)"),
    ]
    const result = resolveComputedProperties(data, defs)
    expect(result.price).toBe(100)
    expect(result.qty).toBe(3)
    expect(result.total).toBe(300)
  })
})

describe("now input injection", () => {
  test("bare `now` ref resolves to the injected opts.now", () => {
    const defs = [formulaDef("f", "now + 5")]
    expect(resolveComputedProperties({}, defs, { now: 100 }).f).toBe(105)
  })

  test("now defaults to 0 (SSR guard) when opts is omitted", () => {
    expect(resolveComputedProperties({}, [formulaDef("f", "now")]).f).toBe(0)
  })

  test("now defaults to 0 when opts.now is omitted", () => {
    expect(resolveComputedProperties({}, [formulaDef("f", "now")], {}).f).toBe(0)
  })

  test("injected now overrides a data key literally named `now`", () => {
    const data = { now: 999 } satisfies PageDataJSON
    expect(resolveComputedProperties(data, [formulaDef("f", "now")], { now: 42 }).f).toBe(42)
  })

  test("countdown guard: now===0 yields the anchor remaining; now>0 extrapolates", () => {
    const defs = [formulaDef("c", "if(now == 0, deadlineAt - anchorAt, deadlineAt - now)")]
    const data = { anchorAt: 1000, deadlineAt: 5000 } satisfies PageDataJSON
    expect(resolveComputedProperties(data, defs, { now: 0 }).c).toBe(4000)
    expect(resolveComputedProperties(data, defs, { now: 2000 }).c).toBe(3000)
  })

  test("smooth counter clamp: max(0, now - anchorAt) yields anchor at now===0", () => {
    const defs = [formulaDef("v", "banked + rate * max(0, now - anchorAt) / 1000")]
    const data = { banked: 10, rate: 2, anchorAt: 1000 } satisfies PageDataJSON
    expect(resolveComputedProperties(data, defs, { now: 0 }).v).toBe(10)
    expect(resolveComputedProperties(data, defs, { now: 2000 }).v).toBe(12)
  })
})

describe("isLiveFormulaConfig", () => {
  test("true when config.live === true", () => {
    expect(isLiveFormulaConfig({ expression: "now", live: true })).toBe(true)
  })

  test("false when live is absent", () => {
    expect(isLiveFormulaConfig({ expression: "now" })).toBe(false)
  })

  test("false when live is not exactly true", () => {
    expect(isLiveFormulaConfig({ expression: "now", live: false })).toBe(false)
  })

  test("false for null / undefined / non-object config", () => {
    expect(isLiveFormulaConfig(undefined)).toBe(false)
    expect(isLiveFormulaConfig(null)).toBe(false)
  })
})
