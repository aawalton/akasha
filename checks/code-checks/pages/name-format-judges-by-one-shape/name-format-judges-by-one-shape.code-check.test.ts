import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { idFiled, listedFiled, pathFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  handedIn as handingIn,
  nameFormatJudgesByOneShape,
  reasonsIn as reasoningIn,
} from "./name-format-judges-by-one-shape.code-check.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AT = "akasha/f/lower-kebab-case.name-format.code.ts"

const IMPORTING = 'import { matching } from "../name-matching/name-matching.module.code.ts"\n'

const MATCHING_CODE = "export function matching(shape) {\n  return (name) => shape.test(name)\n}\n"

const MATCHING_AT = "akasha/name-matching/name-matching.module.code.ts"

const MATCHING_PAGE = "akasha/name-matching/name-matching.module.ts"

const MATCHING_ID = "01a0824b-5ca2-752a-9266-90b200862bb4"

const ID = "01a05946-775f-7000-9f76-45d9dcf376ee"

function handedIn(path: string, text: string): ReturnType<typeof handingIn> {
  return handingIn(path, text, MATCHING_AT)
}

function reasonsIn(slug: string, path: string, text: string): readonly string[] {
  return reasoningIn(slug, path, text, MATCHING_AT)
}

test("a name format handing one shape written out to `matching` is answered as that one", () => {
  const said = handedIn(AT, `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/)\n`)
  expect(said).toEqual([{ named: "lowerKebabCase", flags: "" }])
})

test("the flags a shape carries are read off the shape written out", () => {
  const said = handedIn(AT, `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/gi)\n`)
  expect(said[0]?.flags).toBe("gi")
})

test("a shape handed to `matching` under another name is found through the name it was imported as", () => {
  const body =
    'import { matching as judging } from "../name-matching/name-matching.module.code.ts"\n'
  const said = handedIn(AT, `${body}\nexport const lowerKebabCase = judging(/^[a-z]+$/g)\n`)
  expect(said).toEqual([{ named: "lowerKebabCase", flags: "g" }])
})

test("a `matching` built somewhere other than `name-matching` hands over no shape", () => {
  const body = 'import { matching } from "../elsewhere.module.code.ts"\n'
  expect(handedIn(AT, `${body}\nexport const lowerKebabCase = matching(/^[a-z]+$/)\n`)).toEqual([])
})

test("a shape reached through a name is no shape written out", () => {
  const body = `${IMPORTING}\nconst shape = /^[a-z]+$/\nexport const lowerKebabCase = matching(shape)\n`
  expect(handedIn(AT, body)).toEqual([])
})

test("a name bound to `matching` but not exported hands over nothing", () => {
  expect(handedIn(AT, `${IMPORTING}\nconst lowerKebabCase = matching(/^[a-z]+$/)\n`)).toEqual([])
})

test("a shape carrying the `g` flag is refused, because `test` keeps a `lastIndex` under it", () => {
  const said = reasonsIn(
    "lower-kebab-case",
    AT,
    `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/g)\n`
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("carries the flags `g`")
})

test("a shape carrying flags other than `g` is let through", () => {
  const said = reasonsIn(
    "lower-kebab-case",
    AT,
    `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/u)\n`
  )
  expect(said).toEqual([])
})

test("a format exporting two shapes is refused, because its judgement is one shape", () => {
  const body = `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z]+$/)\nexport const other = matching(/^[A-Z]+$/)\n`
  expect(reasonsIn("lower-kebab-case", AT, body)[0]).toContain("exports 2 names")
})

test("a format exporting no shape is refused, because nothing there can judge", () => {
  expect(reasonsIn("lower-kebab-case", AT, "export const held = 1\n")[0]).toContain(
    "exports 0 names"
  )
})

test("a format answering to a name its slug does not make is refused", () => {
  const body = `${IMPORTING}\nexport const somethingElse = matching(/^[a-z]+$/)\n`
  expect(reasonsIn("lower-kebab-case", AT, body)[0]).toContain("`lowerKebabCase`")
})

function rooted(body: string): string {
  const root = scratch.rootFor("akasha-name-format-shape-")
  const page = "akasha/f/lower-kebab-case.name-format.ts"
  writing(root, MATCHING_AT, MATCHING_CODE)
  writing(
    root,
    MATCHING_PAGE,
    `export const nameMatching = { id: "${MATCHING_ID}", slug: "name-matching",` +
      ' pageTypeSlug: "module", code: "ts" }\n'
  )
  writing(
    root,
    page,
    `export const lowerKebabCase = { id: "${ID}", slug: "lower-kebab-case",` +
      ' pageTypeSlug: "name-format", code: "ts" }\n'
  )
  writing(root, AT, body)
  const matching = [{ path: MATCHING_PAGE, id: MATCHING_ID }]
  idFiled(root, MATCHING_ID, matching)
  listedFiled(root, "module", "name-matching", matching)
  pathFiled(root, MATCHING_PAGE, matching)
  const held = [{ path: page, id: ID }]
  idFiled(root, ID, held)
  listedFiled(root, "name-format", "lower-kebab-case", held)
  valueAlsoFiled(root, "name-format", [
    { path: page, value: { id: ID, pageTypeSlug: "name-format", slug: "lower-kebab-case" } },
  ])
  pathFiled(root, page, held)
  pathFiled(root, AT, held)
  return root
}

function judged(root: string): readonly Judged[] {
  const cast = shadowFor(change(root, []))
  if ("refused" in cast) throw new Error(cast.refused)
  return nameFormatJudgesByOneShape(change(root, []), cast.shadow)
}

test("a name format the index files and no property names is judged and let through", () => {
  expect(
    judged(rooted(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/)\n`))
  ).toEqual([])
})

test("a name format the index files is refused for a `g` its shape carries", () => {
  const said = judged(
    rooted(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/g)\n`)
  )
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("carries the flags `g`")
})

test("a name format whose code will not load is refused rather than passed over", () => {
  const said = judged(rooted(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/\n`))
  expect(said.some((one) => one.reason.includes("could not be loaded"))).toBe(true)
})

test("a name format answering to nothing its slug names is refused", () => {
  const said = judged(rooted(`${IMPORTING}\nexport const somethingElse = matching(/^[a-z-]+$/)\n`))
  expect(said.some((one) => one.reason.includes("answers to nothing that can judge"))).toBe(true)
})
