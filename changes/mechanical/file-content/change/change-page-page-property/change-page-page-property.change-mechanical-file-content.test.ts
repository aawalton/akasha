import { expect, test } from "bun:test"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { bodyOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { restated } from "./change-page-page-property.change-mechanical-file-content.code.ts"

function ranOn(path: string, text: string, key: string, to: string): Answer {
  return restated(path, text, key, to)
}

function textOn(path: string, text: string, key: string, to: string): string {
  return bodyOf(ranOn(path, text, key, to), (asked) => (asked === path ? text : null))
}

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

test("a key's text is stated anew", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic")
  expect(said).toContain(`pluralSlug: "change-atomic",`)
})

test("one key is restated and the rest of the body is left as it is", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic")
  expect(said).toBe(BODY.replace(`"kepts"`, `"change-atomic"`))
})

test("the passage stated each side is the line the key's value sits on", () => {
  const said = restated(AT, BODY, "pluralSlug", "change-atomic")
  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: AT,
      contentFrom: `  pluralSlug: "kepts",`,
      contentTo: `  pluralSlug: "change-atomic",`,
    },
  ])
})

test("a key the page states no text under is refused", () => {
  const said = ranOn(AT, BODY, "definition", "x")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no text under \`definition\``)
})

test("a key holding something other than text is refused", () => {
  const said = ranOn(AT, BODY, "partSlugs", "x")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no text under \`partSlugs\``)
})

test("a key stating what was asked for already is refused", () => {
  const said = ranOn(AT, BODY, "slug", "kept")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`kept` is what `slug` states already")
})

test("the text is written back quoted", () => {
  const said = textOn(AT, BODY, "slug", 'has "quotes"')
  expect(said).toContain(`slug: "has \\"quotes\\"",`)
})

test("an object above the exported one is not read", () => {
  const held = `const held = { slug: "wrong" }\n${BODY}`
  const said = textOn(AT, held, "slug", "change-atomic")
  expect(said).toContain(`const held = { slug: "wrong" }`)
  expect(said).toContain(`slug: "change-atomic",`)
})

test("a newline ending what was asked for is dropped", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic\n")
  expect(said).toContain(`pluralSlug: "change-atomic",`)
})

test("every newline ending what was asked for is dropped", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic\n\n")
  expect(said).toBe(BODY.replace(`"kepts"`, `"change-atomic"`))
})

test("a newline inside what was asked for is left as it is", () => {
  const said = textOn(AT, BODY, "pluralSlug", "one\ntwo")
  expect(said).toContain(`pluralSlug: "one\\ntwo",`)
})

test("what a key states already is refused though a newline ends what was asked for", () => {
  const said = ranOn(AT, BODY, "slug", "kept\n")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`kept` is what `slug` states already")
})

test("nothing here judges whether that key may be restated", () => {
  expect(ranOn(AT, BODY, "id", "01a00000-0000-7000-8000-000000000000").refused).toBe(null)
})
