import { expect, test } from "bun:test"
import { configChecksum } from "./config-checksum.module.code.ts"

test("the order the keys are written in leaves the hash the same hash", () => {
  expect(configChecksum({ one: "a", two: "b" })).toBe(configChecksum({ two: "b", one: "a" }))
})

test("a config whose value changed sums to another hash", () => {
  expect(configChecksum({ one: "a" })).not.toBe(configChecksum({ one: "b" }))
})

test("a key moving its text into the next key sums to another hash", () => {
  expect(configChecksum({ a: "b c", d: "e" })).not.toBe(configChecksum({ a: "b", "c d": "e" }))
})

test("a config carrying no key is refused", () => {
  expect(() => configChecksum({})).toThrow("never rolls the workload again")
})
