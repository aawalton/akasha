import { expect, test } from "bun:test"
import { lines } from "./yaml-lines.module.code.ts"

test("a body is parted at each newline", () => {
  expect(lines("one\ntwo\n")).toEqual(["one", "two"])
})

test("a blank line at the end of a body is dropped", () => {
  expect(lines("one\n\n")).toEqual(["one"])
})

test("a blank line inside a body is kept", () => {
  expect(lines("one\n\ntwo\n")).toEqual(["one", "", "two"])
})

test("a body holding nothing holds no line", () => {
  expect(lines("")).toEqual([])
})
