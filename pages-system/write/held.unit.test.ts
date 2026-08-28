import { describe, expect, it } from "bun:test"
import type { DeclaredType, Value } from "../formula/formula.ts"
import { valuedAs } from "../read/held.ts"
import { type Kept, type Raw, rawAs } from "./held.ts"

const TEXT: DeclaredType = { kind: "text" }
const NUMBER: DeclaredType = { kind: "number" }
const BOOLEAN: DeclaredType = { kind: "boolean" }
const INSTANT: DeclaredType = { kind: "instant" }
const DATE: DeclaredType = { kind: "date" }
const TEXTS: DeclaredType = { kind: "list", of: "text" }
const NUMBERS: DeclaredType = { kind: "list", of: "number" }
const BOOLEANS: DeclaredType = { kind: "list", of: "boolean" }
const INSTANTS: DeclaredType = { kind: "list", of: "instant" }

const EVERY: readonly DeclaredType[] = [
  TEXT,
  NUMBER,
  BOOLEAN,
  INSTANT,
  DATE,
  TEXTS,
  NUMBERS,
  BOOLEANS,
  INSTANTS,
]

const DAY = 1787875200000

const DAY_WRITTEN = "2026-08-28T00:00:00.000Z"

const EPOCH_WRITTEN = "1970-01-01T00:00:00.000Z"

const ABSENT: Value = { kind: "absent" }
const ALPHA: Value = { kind: "text", text: "alpha" }
const BETA: Value = { kind: "text", text: "beta" }
const ONE: Value = { kind: "number", number: 1 }
const TWO: Value = { kind: "number", number: 2 }
const YES: Value = { kind: "boolean", boolean: true }
const NO: Value = { kind: "boolean", boolean: false }
const THEN: Value = { kind: "instant", instant: DAY }
const EPOCH: Value = { kind: "instant", instant: 0 }
const TODAY: Value = { kind: "date", date: "2026-08-28" }
const PAIR: Value = { kind: "list", of: "text", items: [ALPHA, BETA] }
const EMPTY: Value = { kind: "list", of: "text", items: [] }
const EMPTY_NUMBERS: Value = { kind: "list", of: "number", items: [] }

const valued = (raw: Raw | readonly Raw[]): Kept => ({ kind: "value", raw })

const rawOf = (kept: Kept): Raw | readonly Raw[] | null => (kept.kind === "value" ? kept.raw : null)

const whyOf = (kept: Kept): string => (kept.kind === "refused" ? kept.why : "")

describe("an absent value", () => {
  it("clears the key, whatever the page type declared it holds", () => {
    for (const type of EVERY) {
      expect(rawAs("settled", ABSENT, type)).toEqual({ kind: "cleared" })
    }
  })
})

describe("a list with nothing in it", () => {
  it("is a value holding no items, never a cleared key", () => {
    expect(rawAs("tags", EMPTY, TEXTS)).toEqual(valued([]))
    expect(rawAs("counts", EMPTY_NUMBERS, NUMBERS)).toEqual(valued([]))
  })

  it("is not the same fact as an absent value", () => {
    expect(rawAs("tags", EMPTY, TEXTS)).not.toEqual({ kind: "cleared" })
    expect(rawAs("tags", ABSENT, TEXTS)).toEqual({ kind: "cleared" })
  })

  it("reads back as a list with nothing in it rather than as nothing", () => {
    expect(valuedAs(rawOf(rawAs("tags", EMPTY, TEXTS)), TEXTS)).toEqual(EMPTY)
  })
})

describe("a scalar", () => {
  it("writes text as the characters themselves", () => {
    expect(rawAs("title", { kind: "text", text: "Alpha" }, TEXT)).toEqual(valued("Alpha"))
  })

  it("writes a number as the number itself", () => {
    expect(rawAs("count", { kind: "number", number: 42 }, NUMBER)).toEqual(valued(42))
    expect(rawAs("count", { kind: "number", number: -1.5 }, NUMBER)).toEqual(valued(-1.5))
  })

  it("writes a boolean as the boolean itself", () => {
    expect(rawAs("settled", YES, BOOLEAN)).toEqual(valued(true))
    expect(rawAs("settled", NO, BOOLEAN)).toEqual(valued(false))
  })

  it("writes an instant as the moment spelled out to the millisecond in UTC", () => {
    expect(rawAs("at", THEN, INSTANT)).toEqual(valued(DAY_WRITTEN))
    expect(rawAs("at", EPOCH, INSTANT)).toEqual(valued(EPOCH_WRITTEN))
  })

  it("writes a calendar date as the day it names", () => {
    expect(rawAs("on", TODAY, DATE)).toEqual(valued("2026-08-28"))
  })

  it("keeps a value that reads as nothing, emptiness being a value and not an absence", () => {
    expect(rawAs("title", { kind: "text", text: "" }, TEXT)).toEqual(valued(""))
    expect(rawAs("count", { kind: "number", number: 0 }, NUMBER)).toEqual(valued(0))
    expect(rawAs("settled", NO, BOOLEAN)).toEqual(valued(false))
  })
})

describe("a value the declared type does not admit", () => {
  const mismatched: readonly (readonly [string, Value, DeclaredType])[] = [
    ["published", ALPHA, NUMBER],
    ["count", ONE, TEXT],
    ["settled", { kind: "text", text: "true" }, BOOLEAN],
    ["at", TODAY, INSTANT],
    ["on", THEN, DATE],
    ["tags", ALPHA, TEXTS],
    ["tags", { kind: "list", of: "number", items: [ONE] }, TEXTS],
    ["counts", PAIR, NUMBERS],
  ]

  it("is refused, and the refusal names the key", () => {
    for (const [key, value, type] of mismatched) {
      const kept = rawAs(key, value, type)
      expect(kept.kind).toBe("refused")
      expect(whyOf(kept)).toContain(key)
    }
  })

  it("carries no raw, so nothing the declared type rejects can reach the file", () => {
    for (const [key, value, type] of mismatched) {
      expect(rawOf(rawAs(key, value, type))).toBeNull()
    }
  })
})

describe("a list holding an absent item", () => {
  const holed: Value = { kind: "list", of: "text", items: [ALPHA, ABSENT, BETA] }
  const hole: Value = { kind: "list", of: "text", items: [ABSENT] }

  it("is refused, and the refusal names the key", () => {
    const kept = rawAs("tags", holed, TEXTS)
    expect(kept.kind).toBe("refused")
    expect(whyOf(kept)).toContain("tags")
  })

  it("is refused rather than written as the items standing around the hole", () => {
    expect(rawOf(rawAs("tags", holed, TEXTS))).toBeNull()
    expect(rawOf(rawAs("tags", hole, TEXTS))).toBeNull()
  })

  it("stands against the read side, which drops a hole out of a list it reads", () => {
    expect(valuedAs(["alpha", null, "beta"], TEXTS)).toEqual(PAIR)
  })
})

describe("a value written and read back", () => {
  const both: readonly (readonly [DeclaredType, Value])[] = [
    [TEXT, ALPHA],
    [TEXT, { kind: "text", text: "" }],
    [NUMBER, ONE],
    [NUMBER, { kind: "number", number: -1.5 }],
    [NUMBER, { kind: "number", number: 0 }],
    [BOOLEAN, YES],
    [BOOLEAN, NO],
    [INSTANT, THEN],
    [INSTANT, EPOCH],
    [DATE, TODAY],
    [TEXTS, PAIR],
    [TEXTS, EMPTY],
    [NUMBERS, { kind: "list", of: "number", items: [ONE, TWO] }],
    [BOOLEANS, { kind: "list", of: "boolean", items: [YES, NO] }],
    [INSTANTS, { kind: "list", of: "instant", items: [THEN, EPOCH] }],
  ]

  it("is the value it started as, for every declared type", () => {
    for (const [type, value] of both) {
      const kept = rawAs("field", value, type)
      expect(kept.kind).toBe("value")
      expect(valuedAs(rawOf(kept), type)).toEqual(value)
    }
  })
})
