import { expect, test } from "bun:test"
import ts from "typescript"
import { PROBE_AT, standing } from "../../no-refused-syntax.check.test-fixtures.ts"
import { midnightPinned, noLocalMidnightParse } from "./no-local-midnight-parse.syntax-rule.code.ts"

function first(text: string): ts.Expression {
  const source = ts.createSourceFile(PROBE_AT, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const said = source.statements[0]
  if (said === undefined || !ts.isVariableStatement(said)) throw new Error("no declaration")
  const held = said.declarationList.declarations[0]?.initializer
  if (held === undefined) throw new Error("nothing initialised")
  return held
}

test("a file building no date is refused nothing", () => {
  expect(noLocalMidnightParse(standing("export const one = 1\n"))).toEqual([])
})

test("a midnight joined onto a date is refused", () => {
  const said = noLocalMidnightParse(standing('const at = new Date(day + "T00:00")\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("pinning a midnight onto it")
})

test("a midnight carrying seconds is refused", () => {
  expect(noLocalMidnightParse(standing('const at = new Date(day + "T00:00:00")\n'))).toHaveLength(1)
})

test("a midnight carrying a fraction is refused", () => {
  const text = 'const at = new Date(day + "T00:00:00.000")\n'
  expect(noLocalMidnightParse(standing(text))).toHaveLength(1)
})

test("a midnight written into a template is refused", () => {
  expect(noLocalMidnightParse(standing("const at = new Date(`${day}T00:00:00`)\n"))).toHaveLength(1)
})

test("a midnight pinned at the end of a longer sum is refused", () => {
  const text = 'const at = new Date(year + month + day + "T00:00")\n'
  expect(noLocalMidnightParse(standing(text))).toHaveLength(1)
})

test("an hour that is not midnight stands", () => {
  expect(noLocalMidnightParse(standing('const at = new Date(day + "T12:30")\n'))).toEqual([])
})

test("a date built from nothing stands", () => {
  expect(noLocalMidnightParse(standing("const at = new Date()\n"))).toEqual([])
})

test("a date built from milliseconds stands", () => {
  expect(noLocalMidnightParse(standing("const at = new Date(Date.now() - 60000)\n"))).toEqual([])
})

test("a whole-day duration stands, holding no date at all", () => {
  expect(noLocalMidnightParse(standing("const day = 24 * 60 * 60 * 1000\n"))).toEqual([])
})

test("an hour counted in milliseconds stands, this rule not being about arithmetic", () => {
  expect(noLocalMidnightParse(standing("const hour = 60 * 60 * 1000\n"))).toEqual([])
})

test("a midnight named in prose stands, nothing reading it as a date", () => {
  expect(noLocalMidnightParse(standing('const said = "the run starts at T00:00"\n'))).toEqual([])
})

test("a midnight joined onto something no Date reads stands", () => {
  expect(noLocalMidnightParse(standing('const said = day + "T00:00"\n'))).toEqual([])
})

test("a builder other than Date stands", () => {
  expect(noLocalMidnightParse(standing('const at = new Stamp(day + "T00:00")\n'))).toEqual([])
})

test("the line named is the line the date stands on", () => {
  const text = 'const one = 1\nconst at = new Date(day + "T00:00")\n'
  expect(noLocalMidnightParse(standing(text))[0]?.line).toBe(2)
})

test("a date nested inside a call is judged too", () => {
  expect(noLocalMidnightParse(standing('report(new Date(day + "T00:00"))\n'))).toHaveLength(1)
})

test("two pinned dates are refused once each", () => {
  const text = 'const a = new Date(x + "T00:00")\nconst b = new Date(y + "T00:00:00")\n'
  expect(noLocalMidnightParse(standing(text))).toHaveLength(2)
})

test("a pinned midnight is seen apart from what reads it", () => {
  expect(midnightPinned(first('const said = day + "T00:00"\n'))).toBe(true)
  expect(midnightPinned(first('const said = day + "T09:00"\n'))).toBe(false)
  expect(midnightPinned(first("const said = day\n"))).toBe(false)
})
