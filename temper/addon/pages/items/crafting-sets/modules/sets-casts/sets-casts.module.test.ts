import { beforeAll, describe, expect, test } from "bun:test"

function luaError(message: unknown): never {
  throw new Error(String(message))
}

function luaType(value: unknown): string {
  if (value === undefined || value === null) return "nil"
  if (typeof value === "object") return "table"
  return typeof value
}

beforeAll(() => {
  Object.assign(globalThis, { error: luaError, type: luaType })
})

async function casts() {
  return import(
    "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
  )
}

describe("sets-casts", () => {
  test("a narrowing hands back the value it was handed where the value has the shape named", async () => {
    const c = await casts()
    const record = { a: 1 }
    expect(c.asNumber(3)).toBe(3)
    expect(c.asString("x")).toBe("x")
    expect(c.asBoolean(false)).toBe(false)
    expect(c.asStrRecord(record)).toBe(record)
    expect(c.asNumberArray([1, 2])).toEqual([1, 2])
    expect(c.asStringArray(["a"])).toEqual(["a"])
    expect(c.asPresent(0)).toBe(0)
  })

  test("a narrowing fails naming what it expected and what it found", async () => {
    const c = await casts()
    expect(() => c.asNumber("3")).toThrow("expected a number, found string")
    expect(() => c.asString(3)).toThrow("expected a string, found number")
    expect(() => c.asBoolean(undefined)).toThrow("expected a boolean, found nil")
    expect(() => c.asStrRecord("x")).toThrow("expected a table, found string")
    expect(() => c.asUnknownArray(4)).toThrow("expected a list, found number")
    expect(() => c.asPresent(undefined)).toThrow("expected a value, found nil")
  })

  test("an optional narrowing answers undefined for nil alone", async () => {
    const c = await casts()
    expect(c.asNumberOpt(undefined)).toBeUndefined()
    expect(c.asStringOpt(undefined)).toBeUndefined()
    expect(c.asBooleanOpt(undefined)).toBeUndefined()
    expect(c.asStrRecordOpt(undefined)).toBeUndefined()
    expect(c.asNumRecordOpt(undefined)).toBeUndefined()
    expect(c.asNumberArrayOpt(undefined)).toBeUndefined()
    expect(() => c.asNumberOpt("1")).toThrow("expected a number or nil, found string")
    expect(() => c.asStringOpt(false)).toThrow("expected a string or nil, found boolean")
    expect(() => c.asStrRecordOpt(1)).toThrow("expected a table or nil, found number")
  })

  test("a list narrowing checks every element it holds", async () => {
    const c = await casts()
    expect(() => c.asNumberArray([1, "2"])).toThrow("expected a list of numbers, found string")
    expect(() => c.asStringArray(["a", 2])).toThrow("expected a list of strings, found number")
    expect(() => c.asNumberArrayOpt([true])).toThrow("expected a list of numbers, found boolean")
  })
})
