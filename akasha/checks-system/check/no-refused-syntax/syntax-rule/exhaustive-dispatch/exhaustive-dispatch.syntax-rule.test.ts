import { expect, test } from "bun:test"
import { parsedAs } from "../../../../../code-system/code-source/code-source.module.code.ts"
import { PROBE_AT, standing } from "../../no-refused-syntax.check.test-fixtures.ts"
import { ends, exhaustiveDispatch } from "./exhaustive-dispatch.syntax-rule.code.ts"

function switching(body: string): string {
  return `function held(one: string): string {\n  switch (one) {\n    case "a":\n      return "a"\n${body}  }\n  return ""\n}\n`
}

test("a file holding no switch is refused nothing", () => {
  expect(exhaustiveDispatch(standing("export const one = 1\n"))).toEqual([])
})

test("a switch naming no default is refused", () => {
  const said = exhaustiveDispatch(standing(switching("")))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("names no default")
})

test("a default that throws ends the dispatch", () => {
  expect(
    exhaustiveDispatch(standing(switching('    default:\n      throw new Error("no")\n')))
  ).toEqual([])
})

test("a default that returns ends the dispatch", () => {
  expect(exhaustiveDispatch(standing(switching('    default:\n      return ""\n')))).toEqual([])
})

test("a default calling assertNever ends the dispatch", () => {
  expect(exhaustiveDispatch(standing(switching("    default:\n      assertNever(one)\n")))).toEqual(
    []
  )
})

test("a default that only breaks falls out and is refused", () => {
  const said = exhaustiveDispatch(standing(switching("    default:\n      break\n")))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("falls out")
})

test("a default calling something other than assertNever falls out", () => {
  const said = exhaustiveDispatch(standing(switching("    default:\n      report(one)\n")))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("falls out")
})

test("a throw wrapped in a block still ends the dispatch", () => {
  expect(
    exhaustiveDispatch(standing(switching('    default: {\n      throw new Error("no")\n    }\n')))
  ).toEqual([])
})

test("the line named is the line the switch stands on", () => {
  const said = exhaustiveDispatch(standing(switching("")))
  expect(said[0]?.line).toBe(2)
})

test("a switch nested inside another statement is judged too", () => {
  const text = `function held(one: string): string {\n  if (one !== "") {\n    switch (one) {\n      case "a":\n        return "a"\n    }\n  }\n  return ""\n}\n`
  expect(exhaustiveDispatch(standing(text))).toHaveLength(1)
})

test("two switches falling out are refused once each", () => {
  const text = `${switching("")}${switching("")}`
  expect(exhaustiveDispatch(standing(text))).toHaveLength(2)
})

test("a statement ends the dispatch only where it throws, returns, or asserts never", () => {
  const source = parsedAs(PROBE_AT, 'throw new Error("a")\n')
  const first = source.statements[0]
  expect(first === undefined ? false : ends(first)).toBe(true)
})
