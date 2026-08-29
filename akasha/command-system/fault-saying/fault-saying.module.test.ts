import { expect, test } from "bun:test"
import { saidBy, whyOf } from "./fault-saying.module.code.ts"

test("an Error says its message and nothing about its kind", () => {
  expect(saidBy(new Error("it would not load"))).toBe("it would not load")
  expect(saidBy(new TypeError("held is not a function"))).toBe("held is not a function")
})

test("a thrown thing that is no Error is still made to speak", () => {
  expect(saidBy("held")).toBe("held")
  expect(saidBy(404)).toBe("404")
  expect(saidBy(null)).toBe("null")
  expect(saidBy(undefined)).toBe("undefined")
})

test("an Error carrying no message says nothing rather than its name", () => {
  expect(saidBy(new Error(""))).toBe("")
})

test("what is said in one line is the whole of it with its breaks closed up", () => {
  expect(whyOf(new Error("  Expected identifier\n  but found end of file  "))).toBe(
    "Expected identifier but found end of file"
  )
})

test("a fault too long to carry is cut, and says it was cut", () => {
  const said = whyOf(new Error("held ".repeat(200)))
  expect(said).toEndWith("...")
  expect(said.length).toBe(240)
})
