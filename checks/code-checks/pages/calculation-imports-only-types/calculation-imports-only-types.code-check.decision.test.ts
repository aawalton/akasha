import { expect, test } from "bun:test"
import {
  foundIn,
  runsFromText,
  valueImportsIn,
} from "./calculation-imports-only-types.code-check.decision.code.ts"

const AT = "akasha/held.computed-property.code.ts"

const SHARED_AT = "akasha/modules/hours/hours.computed-property-module.code.ts"

const SHARED_FROM = "../modules/hours/hours.computed-property-module.code.ts"

const BESIDE = "akasha/held.computed-property.ts"

test("a calculation importing only types is let through", () => {
  const body =
    'import type { Work } from "@akasha/pages/computed-property"\n' +
    'import type { Day } from "../day.page-type.ts"\n\n' +
    "export const work: Work<Day, number> = () => 0\n"
  expect(foundIn(AT, body)).toEqual([])
})

test("a named element marked `type` under a plain clause is let through", () => {
  expect(foundIn(AT, 'import { type A } from "./x.ts"\n')).toEqual([])
})

test("a type-only namespace import is let through", () => {
  expect(foundIn(AT, 'import type * as held from "./x.ts"\n')).toEqual([])
})

test("a named value import is refused, naming the line, the name and the source", () => {
  const said = foundIn(AT, '\nimport { a } from "./x.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`a`")
  expect(said[0]).toContain("`./x.ts`")
})

test("an import carrying no clause is refused, and the reason names the source", () => {
  const said = foundIn(AT, 'import "./x.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("side effect")
  expect(said[0]).toContain("`./x.ts`")
})

test("a default import is refused", () => {
  const said = foundIn(AT, 'import a from "./x.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("a namespace import is refused", () => {
  const said = foundIn(AT, 'import * as a from "./x.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("only the element that is not type-marked is refused", () => {
  const said = foundIn(AT, 'import { type A, b } from "./x.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`b`")
})

test("a default import beside a type-marked element is refused for the default alone", () => {
  const said = foundIn(AT, 'import a, { type B } from "./x.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("every element of one value import is reported, one reason each", () => {
  const said = foundIn(AT, 'import { a, b, c } from "./x.ts"\n')
  expect(said).toHaveLength(3)
  expect(said[2]).toContain("`c`")
})

test("a string saying `import` fools nothing", () => {
  const body = "export const work = () => 'import { a } from \"./x.ts\"'\n"
  expect(foundIn(AT, body)).toEqual([])
})

test("a named import from a computed-property-module is let through", () => {
  expect(foundIn(AT, `import { hoursBetween } from "${SHARED_FROM}"\n`)).toEqual([])
})

test("a default import of a computed-property-module is refused", () => {
  const said = foundIn(AT, `import hours from "${SHARED_FROM}"\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`hours`")
})

test("a namespace import of a computed-property-module is refused", () => {
  const said = foundIn(AT, `import * as hours from "${SHARED_FROM}"\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`hours`")
})

test("a computed-property-module's own code file is judged by the same rule", () => {
  const said = foundIn(SHARED_AT, 'import { a } from "./x.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("a computed-property-module importing another is let through", () => {
  const body = 'import { anHour } from "../millis/millis.computed-property-module.code.ts"\n'
  expect(foundIn(SHARED_AT, body)).toEqual([])
})

test("a file that is no calculation's code file is passed over", () => {
  expect(foundIn("akasha/held.ts", 'import { a } from "./x.ts"\n')).toEqual([])
  expect(foundIn(BESIDE, 'import { a } from "./x.ts"\n')).toEqual([])
})

test("a calculation and the modules that calculation folds in are what runs from text", () => {
  expect(runsFromText(AT)).toBe(true)
  expect(runsFromText(SHARED_AT)).toBe(true)
  expect(runsFromText(BESIDE)).toBe(false)
})

test("what was found carries the line, the name and the source it came from", () => {
  const body = 'import "./x.ts"\nimport a from "./y.ts"\n'
  const found = valueImportsIn(AT, body)
  expect(found).toHaveLength(2)
  expect(found[0]).toEqual({ named: null, line: 1, from: "./x.ts" })
  expect(found[1]).toEqual({ named: "a", line: 2, from: "./y.ts" })
})
