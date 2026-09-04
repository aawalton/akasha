import { expect, test } from "bun:test"
import { parsed } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { noAngleBracketCast } from "./no-angle-bracket-cast.syntax-rule.code.ts"

test("a file asserting nothing is refused nothing", () => {
  expect(noAngleBracketCast(parsed("export const one = 1\n"))).toEqual([])
})

test("an assertion written that way is refused", () => {
  const said = noAngleBracketCast(parsed("const one = <Held>held\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`as`")
})

test("the same assertion written with `as` stands", () => {
  expect(noAngleBracketCast(parsed("const one = held as Held\n"))).toEqual([])
})

test("a const assertion stands", () => {
  expect(noAngleBracketCast(parsed("const one = [1, 2] as const\n"))).toEqual([])
})

test("satisfies is not an assertion", () => {
  expect(noAngleBracketCast(parsed("const one = held satisfies Held\n"))).toEqual([])
})

test("one wrapping another is refused once for each", () => {
  expect(noAngleBracketCast(parsed("const one = <Held><unknown>held\n"))).toHaveLength(2)
})

test("a type argument written on a call is untouched", () => {
  expect(noAngleBracketCast(parsed("const one = read<Held>(two)\n"))).toEqual([])
})

test("a less-than comparison is no assertion", () => {
  expect(noAngleBracketCast(parsed("const one = two < three\n"))).toEqual([])
})

test("the characters inside a string literal are not an assertion", () => {
  expect(noAngleBracketCast(parsed('const one = "<Held>held"\n'))).toEqual([])
})

test("one nested inside a call is judged too", () => {
  expect(noAngleBracketCast(parsed("report(<Held>held)\n"))).toHaveLength(1)
})

test("the line named is the line the assertion stands on", () => {
  const said = noAngleBracketCast(parsed("const one = 1\nconst two = <Held>held\n"))
  expect(said[0]?.line).toBe(2)
})

test("two of them are refused once each", () => {
  expect(noAngleBracketCast(parsed("const one = <A>a\nconst two = <B>b\n"))).toHaveLength(2)
})
