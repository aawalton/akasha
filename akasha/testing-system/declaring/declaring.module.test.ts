import { expect, test } from "bun:test"
import { declaringUnder } from "./declaring.module.code.ts"

test("each page is named for the slug and the page type it states", () => {
  expect(Object.keys(declaringUnder("akasha")).sort()).toEqual([
    "akasha/id.text-property.ts",
    "akasha/slug.text-property.ts",
    "akasha/text-property.page-type.ts",
  ])
})

test("what is carried is the corpus's own declaration of what an identity is filed by", () => {
  const held = declaringUnder("held")
  expect(held["held/id.text-property.ts"]).toContain('"unique":"always"')
  expect(held["held/slug.text-property.ts"]).toContain('"unique":"page-type"')
})
