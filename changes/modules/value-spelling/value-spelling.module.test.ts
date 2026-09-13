import { expect, test } from "bun:test"
import { spelledAs } from "akasha/changes/modules/value-spelling/value-spelling.module.code.ts"

test("a value under a property holding a boolean is spelled bare", () => {
  expect(spelledAs("true", "boolean")).toBe("true")
  expect(spelledAs("false", "boolean")).toBe("false")
})

test("a value under a property holding a number is spelled bare", () => {
  expect(spelledAs("12", "number")).toBe("12")
  expect(spelledAs("-3.5", "number")).toBe("-3.5")
})

test("a value under any other property is spelled as JSON spells it", () => {
  expect(spelledAs("jsonl", "text")).toBe(`"jsonl"`)
})

test("a kind stated as nothing spells the value as JSON spells it", () => {
  expect(spelledAs("jsonl", undefined)).toBe(`"jsonl"`)
})

test("a value the kind stated does not hold is spelled as nothing", () => {
  expect(spelledAs("yes", "boolean")).toBeNull()
  expect(spelledAs("12px", "number")).toBeNull()
  expect(spelledAs("012", "number")).toBeNull()
})
