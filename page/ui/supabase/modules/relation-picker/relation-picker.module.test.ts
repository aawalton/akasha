import { expect, test } from "bun:test"
import { pickedSlugFor } from "akasha/page/ui/supabase/modules/relation-picker/relation-picker.module.code.ts"

const SLUGS: ReadonlyMap<string, string> = new Map([
  ["type-person", "person"],
  ["type-page", "page"],
])

test("a picker asks for pages of the type its relation points at", () => {
  expect(pickedSlugFor(SLUGS, "type-person", "page")).toBe("person")
})

test("a picker asks for the relation's type rather than the listing's own", () => {
  expect(pickedSlugFor(SLUGS, "type-person", "story")).toBe("person")
})

test("a target type no page type names is asked for under the provider's own type", () => {
  expect(pickedSlugFor(SLUGS, "type-gone", "story")).toBe("story")
  expect(pickedSlugFor(SLUGS, undefined, "story")).toBe("story")
})
