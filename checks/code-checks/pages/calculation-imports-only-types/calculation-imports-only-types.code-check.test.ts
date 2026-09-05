import { expect, test } from "bun:test"
import { reasonsIn, valueImportsIn } from "./calculation-imports-only-types.code-check.code.ts"

const ROOT = "/repo"

const AT = "akasha/held.computed-property.code.ts"

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
}

test("a calculation importing only types is let through", () => {
  const body =
    'import type { Work } from "@akasha/pages-system/computed-property"\n' +
    'import type { WakeDay } from "../wake-day.page-type.ts"\n\n' +
    "export const work: Work<WakeDay, number> = () => 0\n"
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a named element marked `type` under a plain clause is let through", () => {
  expect(reasonsIn(given(AT, 'import { type A } from "./x.ts"\n'))).toEqual([])
})

test("a type-only namespace import is let through", () => {
  expect(reasonsIn(given(AT, 'import type * as held from "./x.ts"\n'))).toEqual([])
})

test("a named value import is refused, naming the line, the name and the source", () => {
  const said = reasonsIn(given(AT, '\nimport { a } from "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`a`")
  expect(said[0]).toContain("`./x.ts`")
})

test("an import carrying no clause is refused, and the reason names the source", () => {
  const said = reasonsIn(given(AT, 'import "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("side effect")
  expect(said[0]).toContain("`./x.ts`")
})

test("a default import is refused", () => {
  const said = reasonsIn(given(AT, 'import a from "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("a namespace import is refused", () => {
  const said = reasonsIn(given(AT, 'import * as a from "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("only the element that is not type-marked is refused", () => {
  const said = reasonsIn(given(AT, 'import { type A, b } from "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`b`")
})

test("a default import beside a type-marked element is refused for the default alone", () => {
  const said = reasonsIn(given(AT, 'import a, { type B } from "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`a`")
})

test("every element of one value import is reported, one reason each", () => {
  const said = reasonsIn(given(AT, 'import { a, b, c } from "./x.ts"\n'))
  expect(said).toHaveLength(3)
  expect(said[2]).toContain("`c`")
})

test("a comment or a string saying `import` fools nothing", () => {
  const body = "export const work = () => 'import { a } from \"./x.ts\"'\n"
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a file that is no calculation's code file is passed over", () => {
  expect(reasonsIn(given("akasha/held.ts", 'import { a } from "./x.ts"\n'))).toEqual([])
  const beside = "akasha/held.computed-property.ts"
  expect(reasonsIn(given(beside, 'import { a } from "./x.ts"\n'))).toEqual([])
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", 'import { a } from "./x.ts"\n'))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: AT, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow(AT)
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})

test("what was found carries the line, the name and the source it came from", () => {
  const body = 'import "./x.ts"\nimport a from "./y.ts"\n'
  const found = valueImportsIn(AT, body)
  expect(found).toHaveLength(2)
  expect(found[0]).toEqual({ named: null, line: 1, from: "./x.ts" })
  expect(found[1]).toEqual({ named: "a", line: 2, from: "./y.ts" })
})
