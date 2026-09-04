import { expect, test } from "bun:test"
import { array, bool, num, object, optional, str } from "./monarch-shape.module.code.ts"

test("an object is told apart from null and from an array", () => {
  expect(object({ a: 1 }, "at")).toEqual({ a: 1 })
  expect(() => object(null, "at")).toThrow("at: expected an object, got null")
  expect(() => object([1], "at")).toThrow("at: expected an object, got an array")
})

test("a refusal names the path the value stands at", () => {
  expect(() => str(7, "reply.data.name")).toThrow("reply.data.name: expected a string, got number")
})

test("a number that is not finite is no number", () => {
  expect(num(1.5, "at")).toBe(1.5)
  expect(() => num(Number.NaN, "at")).toThrow("at: expected a number")
  expect(() => num(Number.POSITIVE_INFINITY, "at")).toThrow("at: expected a number")
})

test("an array and a boolean are read as themselves", () => {
  expect(array([1, 2], "at")).toEqual([1, 2])
  expect(bool(false, "at")).toBe(false)
  expect(() => array({}, "at")).toThrow("at: expected an array")
  expect(() => bool("true", "at")).toThrow("at: expected a boolean")
})

test("an absent value and a null value are the same absence", () => {
  expect(optional(undefined, "at", str)).toBeNull()
  expect(optional(null, "at", str)).toBeNull()
  expect(optional("here", "at", str)).toBe("here")
})

test("an optional value that stands is read by the reader it was given", () => {
  expect(() => optional(7, "at", str)).toThrow("at: expected a string")
})
