import { expect, test } from "bun:test"
import { declaringUnder } from "./declaring.module.code.ts"

test("each page is named for the slug and the page type it states", () => {
  expect(Object.keys(declaringUnder("akasha")).toSorted()).toEqual([
    "akasha/generator-kind.page-type.ts",
    "akasha/id.text-property.ts",
    "akasha/slug.text-property.ts",
    "akasha/text-property.page-type.ts",
    "akasha/uuid-v7.generator-kind.ts",
  ])
})

test("what is carried is the corpus's own declaration of what an identity is filed by", () => {
  const held = declaringUnder("held")
  expect(held["held/id.text-property.ts"]).toContain('"unique":"always"')
  expect(held["held/slug.text-property.ts"]).toContain('"unique":"page-type"')
})

test("the kind a carried property names is carried, and says when it works its value out", () => {
  const held = declaringUnder("held")
  expect(held["held/id.text-property.ts"]).toContain('"generator":"uuid-v7"')
  expect(held["held/uuid-v7.generator-kind.ts"]).toContain('"afterChecks":false')
})

test("the page type a carried kind states is carried, so a world can name it a page at all", () => {
  expect(declaringUnder("held")["held/generator-kind.page-type.ts"]).toContain(
    '"slug":"generator-kind"'
  )
})
