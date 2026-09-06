import { expect, test } from "bun:test"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { restated } from "./restate-value.change-mechanical.code.ts"

const AT = "akasha/held/kept.page-type.ts"

const BODY = `import type { PageType } from "../../pages/types/page-type.page-type.ts"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "page-type",
  slug: "kept",
  pluralSlug: "kepts",
  partSlugs: ["kept/one"],
} as const satisfies PageType
`

function bodyOf(said: Answer): string {
  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
  return said.edits[0]?.body ?? ""
}

test("a key's text is stated anew", () => {
  const said = restated(AT, BODY, "pluralSlug", "change-atomic")
  expect(bodyOf(said)).toContain(`pluralSlug: "change-atomic",`)
})

test("one key is restated and the rest of the body is left as it is", () => {
  const said = restated(AT, BODY, "pluralSlug", "change-atomic")
  expect(bodyOf(said)).toBe(BODY.replace(`"kepts"`, `"change-atomic"`))
})

test("the body is answered under the path it was worked out from", () => {
  const said = restated(AT, BODY, "pluralSlug", "change-atomic")
  expect(said.edits[0]?.path).toBe(AT)
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
})

test("a key the page states no text under is refused", () => {
  const said = restated(AT, BODY, "definition", "x")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no text under \`definition\``)
})

test("a key holding something other than text is refused", () => {
  const said = restated(AT, BODY, "partSlugs", "x")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no text under \`partSlugs\``)
})

test("a key stating what was asked for already is refused", () => {
  const said = restated(AT, BODY, "slug", "kept")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`kept` is what `slug` states already")
})

test("the text is written back quoted", () => {
  const said = restated(AT, BODY, "slug", 'has "quotes"')
  expect(bodyOf(said)).toContain(`slug: "has \\"quotes\\"",`)
})

test("an object above the exported one is not read", () => {
  const held = `const held = { slug: "wrong" }\n${BODY}`
  const said = restated(AT, held, "slug", "change-atomic")
  expect(bodyOf(said)).toContain(`const held = { slug: "wrong" }`)
  expect(bodyOf(said)).toContain(`slug: "change-atomic",`)
})

test("nothing here judges whether that key may be restated", () => {
  expect(restated(AT, BODY, "id", "01a00000-0000-7000-8000-000000000000").refused).toBe(null)
})
