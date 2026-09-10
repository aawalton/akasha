import { afterAll, expect, test } from "bun:test"
import {
  AT,
  handing,
  IMPORTING,
  judgedBy,
  reasoning,
  rooted,
  SLUG,
  scratch,
} from "./name-format-judges-by-one-shape.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a name format handing one shape written out to `matching` is answered as that one", () => {
  const said = handing(AT, `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/)\n`)
  expect(said).toEqual([{ named: "lowerKebabCase", flags: "" }])
})

test("the flags a shape carries are read off the shape written out", () => {
  const said = handing(AT, `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/gi)\n`)
  expect(said[0]?.flags).toBe("gi")
})

test("a shape handed to `matching` under another name is found through the name it came in as", () => {
  const body =
    'import { matching as judging } from "../name-matching/name-matching.module.code.ts"\n'
  const said = handing(AT, `${body}\nexport const lowerKebabCase = judging(/^[a-z]+$/g)\n`)
  expect(said).toEqual([{ named: "lowerKebabCase", flags: "g" }])
})

test("a `matching` built somewhere other than `name-matching` hands over no shape", () => {
  const body = 'import { matching } from "../elsewhere.module.code.ts"\n'
  expect(handing(AT, `${body}\nexport const lowerKebabCase = matching(/^[a-z]+$/)\n`)).toEqual([])
})

test("a shape reached through a name is no shape written out", () => {
  const body = `${IMPORTING}\nconst shape = /^[a-z]+$/\nexport const lowerKebabCase = matching(shape)\n`
  expect(handing(AT, body)).toEqual([])
})

test("a name bound to `matching` but not exported hands over nothing", () => {
  expect(handing(AT, `${IMPORTING}\nconst lowerKebabCase = matching(/^[a-z]+$/)\n`)).toEqual([])
})

test("a shape carrying the `g` flag is refused, because `test` keeps a `lastIndex` under it", () => {
  const said = reasoning(
    SLUG,
    AT,
    `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/g)\n`
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("carries the flags `g`")
})

test("a shape carrying flags other than `g` is let through", () => {
  const said = reasoning(
    SLUG,
    AT,
    `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/u)\n`
  )
  expect(said).toEqual([])
})

test("a format exporting two shapes is refused, because its judgement is one shape", () => {
  const body = `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/)\nexport const other = matching(/^[A-Z]+$/)\n`
  expect(reasoning(SLUG, AT, body)[0]).toContain("exports 2 names")
})

test("a format exporting no shape is refused, because nothing there can judge", () => {
  expect(reasoning(SLUG, AT, "export const held = 1\n")[0]).toContain("exports 0 names")
})

test("a format answering to a name its slug does not make is refused", () => {
  const body = `${IMPORTING}\nexport const somethingElse = matching(/^[a-z]+$/)\n`
  expect(reasoning(SLUG, AT, body)[0]).toContain("`lowerKebabCase`")
})

test("a name format whose code will not load is refused rather than passed over", () => {
  const said = judgedBy(
    rooted(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/\n`)
  )
  expect(said.some((one) => one.reason.includes("could not be loaded"))).toBe(true)
})

test("a name format answering to nothing its slug names is refused", () => {
  const said = judgedBy(
    rooted(`${IMPORTING}\nexport const somethingElse = matching(/^[a-z-]+$/)\n`)
  )
  expect(said.some((one) => one.reason.includes("answers to nothing that can judge"))).toBe(true)
})
