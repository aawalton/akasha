import { expect, test } from "bun:test"
import { standing } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { noNonNullAssertion } from "./no-non-null-assertion.syntax-rule.code.ts"

test("a file asserting no absence away is refused nothing", () => {
  expect(noNonNullAssertion(standing("export const one = 1\n"))).toEqual([])
})

test("the operator before a property read is refused", () => {
  const said = noNonNullAssertion(standing("const one = foo!.bar\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`!`")
})

test("the operator on an index read is refused", () => {
  expect(noNonNullAssertion(standing("const one = xs[0]!\n"))).toHaveLength(1)
})

test("the operator on a call is refused", () => {
  expect(noNonNullAssertion(standing("const one = f()!\n"))).toHaveLength(1)
})

test("one reached through an optional chain is refused as a bare one is", () => {
  expect(noNonNullAssertion(standing("const one = foo?.bar!\n"))).toHaveLength(1)
})

test("one standing on another is refused once for each", () => {
  expect(noNonNullAssertion(standing("const one = a!!\n"))).toHaveLength(2)
})

test("a definite assignment written on a declaration is not the operator", () => {
  expect(noNonNullAssertion(standing("let one!: number\n"))).toEqual([])
})

test("logical negation shares the character and is untouched", () => {
  expect(noNonNullAssertion(standing("const one = !foo\n"))).toEqual([])
})

test("a comparison against null is no assertion", () => {
  expect(noNonNullAssertion(standing("const one = foo !== null\n"))).toEqual([])
})

test("the characters inside a string literal are not the operator", () => {
  expect(noNonNullAssertion(standing('const one = "foo!.bar"\n'))).toEqual([])
})

test("one nested inside a call is judged too", () => {
  expect(noNonNullAssertion(standing("report(foo!)\n"))).toHaveLength(1)
})

test("the line named is the line the operator stands on", () => {
  const said = noNonNullAssertion(standing("const one = 1\nconst two = foo!.bar\n"))
  expect(said[0]?.line).toBe(2)
})

test("two of them are refused once each", () => {
  expect(noNonNullAssertion(standing("const one = a!\nconst two = b!\n"))).toHaveLength(2)
})
