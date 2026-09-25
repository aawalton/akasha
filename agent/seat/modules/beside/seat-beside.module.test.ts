import { expect, test } from "bun:test"
import { bare, clearedNamesOf } from "akasha/agent/seat/modules/beside/seat-beside.module.code.ts"

test("a key cleared is cleared under the name akasha carries it by", () => {
  expect(clearedNamesOf(["bridge-session-id"])).toEqual(["bridgeSessionId"])
})

test("a key akasha has nothing for is refused rather than cleared", () => {
  expect(() => clearedNamesOf(["no-such-key"])).toThrow("no-such-key")
})

test("a key carried inside a record is refused rather than cleared alone", () => {
  expect(() => clearedNamesOf(["proxy-port"])).toThrow("proxy")
})

test("a record carrying a value and a stamp is written as the value", () => {
  expect(bare({ value: true, at: 1 })).toBe(true)
  expect(bare({ value: false, at: 1 })).toBe(false)
})

test("a record carrying a value alone is written as the value", () => {
  expect(bare({ value: true })).toBe(true)
  expect(bare({ value: false })).toBe(false)
})

test("a record carrying more than a value and a stamp is written whole", () => {
  const proxy = { process: "1-2", port: 39631, version: "abc" }
  expect(bare(proxy)).toBe(proxy)
  const named = { value: true, why: "no" }
  expect(bare(named)).toBe(named)
})

test("a record carrying no value at all is written whole", () => {
  const held = { at: 1 }
  expect(bare(held)).toBe(held)
})

test("what is not a record is written as it came", () => {
  expect(bare(true)).toBe(true)
  expect(bare("said")).toBe("said")
  expect(bare(null)).toBeNull()
  const many = [1, 2]
  expect(bare(many)).toBe(many)
})
