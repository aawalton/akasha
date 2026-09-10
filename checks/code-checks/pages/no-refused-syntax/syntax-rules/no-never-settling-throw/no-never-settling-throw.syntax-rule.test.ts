import { expect, test } from "bun:test"
import { parsed } from "../../no-refused-syntax.code-check.decision.test-fixtures.ts"
import { noNeverSettlingThrow } from "./no-never-settling-throw.syntax-rule.code.ts"

test("a file throwing nothing is refused nothing", () => {
  expect(noNeverSettlingThrow(parsed("export const one = 1\n"))).toEqual([])
})

test("an executor taking no parameter is refused", () => {
  const said = noNeverSettlingThrow(parsed("throw new Promise(() => {})\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("can never settle")
  expect(said[0]?.reason).toContain("suspends the subtree for good")
})

test("an executor calling resolve is left", () => {
  const text = "throw new Promise((resolve) => {\n  resolve(1)\n})\n"
  expect(noNeverSettlingThrow(parsed(text))).toEqual([])
})

test("an executor handing resolve on is left", () => {
  const text = "throw new Promise((resolve) => {\n  later(resolve)\n})\n"
  expect(noNeverSettlingThrow(parsed(text))).toEqual([])
})

test("an executor naming a parameter it never reads is refused", () => {
  const text = "throw new Promise((resolve) => {\n  later(1)\n})\n"
  expect(noNeverSettlingThrow(parsed(text))).toHaveLength(1)
})

test("an executor written as a function expression is read too", () => {
  const text = "throw new Promise(function () {\n  later(1)\n})\n"
  const said = noNeverSettlingThrow(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("function ()")
})

test("an executor whose parameter is destructured is left", () => {
  const text = "throw new Promise(([resolve]) => {\n  later(1)\n})\n"
  expect(noNeverSettlingThrow(parsed(text))).toEqual([])
})

test("a promise built and not thrown is left", () => {
  expect(noNeverSettlingThrow(parsed("const held = new Promise(() => {})\n"))).toEqual([])
})

test("a throw of anything but a promise is left", () => {
  expect(noNeverSettlingThrow(parsed("throw new Error('no')\n"))).toEqual([])
})

test("a Promise reached through an object is read as a promise", () => {
  expect(noNeverSettlingThrow(parsed("throw new global.Promise(() => {})\n"))).toHaveLength(1)
})

test("a throw of a promise built elsewhere is left", () => {
  expect(noNeverSettlingThrow(parsed("throw held\n"))).toEqual([])
})

test("the line named is the line the throw is on", () => {
  const text = "const one = 1\nthrow new Promise(() => {})\n"
  expect(noNeverSettlingThrow(parsed(text))[0]?.line).toBe(2)
})

test("the executor is drawn in the reason", () => {
  const text = "throw new Promise((resolve) => {\n  later(1)\n})\n"
  expect(noNeverSettlingThrow(parsed(text))[0]?.reason).toContain("(resolve) =>")
})

test("a throw inside a function is judged too", () => {
  const text = "function read(): number {\n  throw new Promise(() => {})\n}\n"
  expect(noNeverSettlingThrow(parsed(text))).toHaveLength(1)
})

test("two throws are refused once each", () => {
  const text = "throw new Promise(() => {})\nthrow new Promise(() => {})\n"
  expect(noNeverSettlingThrow(parsed(text))).toHaveLength(2)
})
