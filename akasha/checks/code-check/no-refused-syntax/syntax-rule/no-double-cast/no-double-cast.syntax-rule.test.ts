import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import { PROBE_AT, parsed } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { noDoubleCast, withoutParens } from "./no-double-cast.syntax-rule.code.ts"

test("a file asserting nothing is refused nothing", () => {
  expect(noDoubleCast(parsed("export const one = 1\n"))).toEqual([])
})

test("an assertion reaching through unknown is refused", () => {
  const said = noDoubleCast(parsed("const one = held as unknown as Held\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`unknown`")
})

test("an assertion reaching through any is refused", () => {
  const said = noDoubleCast(parsed("const one = held as any as Held\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`any`")
})

test("one assertion on its own stands", () => {
  expect(noDoubleCast(parsed("const one = held as Held\n"))).toEqual([])
})

test("a widening standing alone is left", () => {
  expect(noDoubleCast(parsed("const one = held as unknown\n"))).toEqual([])
})

test("a const assertion is no widening", () => {
  expect(noDoubleCast(parsed("const one = [1, 2] as const\n"))).toEqual([])
})

test("satisfies is not an assertion", () => {
  expect(noDoubleCast(parsed("const one = held satisfies Held\n"))).toEqual([])
})

test("a parenthesis between the two changes nothing", () => {
  expect(noDoubleCast(parsed("const one = (held as unknown) as Held\n"))).toHaveLength(1)
})

test("the angle-bracket spelling is read as `as` is", () => {
  expect(noDoubleCast(parsed("const one = <Held><unknown>held\n"))).toHaveLength(1)
})

test("the line named is the line the assertion stands on", () => {
  const said = noDoubleCast(parsed("const one = 1\nconst two = held as unknown as Held\n"))
  expect(said[0]?.line).toBe(2)
})

test("an assertion nested inside a call is judged too", () => {
  expect(noDoubleCast(parsed("report(held as unknown as Held)\n"))).toHaveLength(1)
})

test("two double casts are refused once each", () => {
  const text = "const one = a as unknown as A\nconst two = b as any as B\n"
  expect(noDoubleCast(parsed(text))).toHaveLength(2)
})

test("parentheses are taken off an expression until none are left", () => {
  const source = parsedAs(PROBE_AT, "const one = ((held))\n")
  const said = source.statements[0]
  const first =
    said !== undefined && ts.isVariableStatement(said)
      ? said.declarationList.declarations[0]?.initializer
      : undefined
  expect(
    first === undefined ? "" : ts.isIdentifier(withoutParens(first)) ? "bare" : "wrapped"
  ).toBe("bare")
})
