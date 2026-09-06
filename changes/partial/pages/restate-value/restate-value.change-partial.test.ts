import { expect, test } from "bun:test"
import { restated } from "./restate-value.change-partial.code.ts"

const AT = "changes/atomic-changes/atomic-change.page-type.ts"

const BODY = `import type { PageType } from "../../pages/types/page-type.page-type.ts"

export const atomicChange = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "page-type",
  slug: "atomic-change",
  pluralSlug: "atomic-changes",
  partSlugs: ["atomic-change/rename-export"],
} as const satisfies PageType
`

test("a key's text is stated anew", () => {
  const said = restated(AT, BODY, "pluralSlug", "change-atomic")
  expect(said.refused).toBe(null)
  expect(said.body).toContain(`pluralSlug: "change-atomic",`)
})

test("one key is restated and the rest of the body is left as it is", () => {
  const said = restated(AT, BODY, "pluralSlug", "change-atomic")
  expect(said.body).toBe(BODY.replace(`"atomic-changes"`, `"change-atomic"`))
})

test("a key the page states no text under is refused", () => {
  expect(restated(AT, BODY, "definition", "x").refused).toBe(
    `\`${AT}\` states no text under \`definition\``
  )
})

test("a key holding something other than text is refused", () => {
  expect(restated(AT, BODY, "partSlugs", "x").refused).toBe(
    `\`${AT}\` states no text under \`partSlugs\``
  )
})

test("a key stating what was asked for already is refused", () => {
  expect(restated(AT, BODY, "slug", "atomic-change").refused).toBe(
    "`atomic-change` is what `slug` states already"
  )
})

test("the text is written back quoted", () => {
  const said = restated(AT, BODY, "slug", 'has "quotes"')
  expect(said.body).toContain(`slug: "has \\"quotes\\"",`)
})

test("an object above the exported one is not read", () => {
  const held = `const held = { slug: "wrong" }\n${BODY}`
  const said = restated(AT, held, "slug", "change-atomic")
  expect(said.body).toContain(`const held = { slug: "wrong" }`)
  expect(said.body).toContain(`slug: "change-atomic",`)
})

test("nothing here judges whether that key may be restated", () => {
  expect(restated(AT, BODY, "id", "01a00000-0000-7000-8000-000000000000").refused).toBe(null)
})
