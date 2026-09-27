import { expect, test } from "bun:test"
import {
  PICKED_AT_ONCE,
  pickedFrom,
  pickedSlugFor,
  pickerQueries,
  TITLE_PROPERTY,
  titledFor,
} from "akasha/page/ui/supabase/modules/relation-picker/relation-picker.module.code.ts"

const TITLED = { pageProperty: TITLE_PROPERTY, required: false, many: false }

function under(slug: string): readonly string[] {
  return [`page-type/${slug}`]
}

const TYPES = [
  { _id: "type-top", properties: { slug: "top", properties: [TITLED] } },
  { _id: "type-middle", properties: { slug: "middle", extends: under("top") } },
  { _id: "type-role", properties: { slug: "role", extends: under("middle") } },
  { _id: "type-bare", properties: { slug: "bare" } },
  { _id: "type-bare-below", properties: { slug: "bare-below", extends: under("bare") } },
  {
    _id: "type-titled-below",
    properties: { slug: "titled-below", extends: under("bare"), properties: [TITLED] },
  },
]

test("a search asks the store for the title and the slug holding it, whatever the case", () => {
  const asked = pickerQueries("role", true, "Def", PICKED_AT_ONCE)
  expect(asked.map((one) => one.where)).toEqual([
    { title: { "contains-ignoring-case": "Def" } },
    { slug: { "contains-ignoring-case": "Def" } },
  ])
  for (const one of asked) {
    expect(one["page-type"]).toBe("role")
    expect(one.limit).toBe(50)
  }
})

test("a type declaring no title is searched by slug alone and asked for no title", () => {
  const asked = pickerQueries("bare", false, "a", PICKED_AT_ONCE)
  expect(asked.map((one) => one.where)).toEqual([{ slug: { "contains-ignoring-case": "a" } }])
  expect(asked[0]?.keys).toEqual(["id", "slug"])
})

test("no search asks once for the first pages of the type", () => {
  const asked = pickerQueries("role", true, "", PICKED_AT_ONCE)
  expect(asked).toHaveLength(1)
  expect(asked[0]?.where).toBeUndefined()
  expect(asked[0]?.limit).toBe(PICKED_AT_ONCE)
})

test("a page is named by its title, else by its slug", () => {
  const picked = pickedFrom([
    {
      rows: [
        { values: { id: "1", slug: "definer", title: "Definer" } },
        { values: { id: "2", slug: "worker" } },
      ],
      n: 2,
    },
  ])
  expect(picked.pages).toEqual([
    { id: "1", title: "Definer" },
    { id: "2", title: "worker" },
  ])
  expect(picked.more).toBe(false)
})

test("a page matched by title and by slug is picked once", () => {
  const row = { values: { id: "1", slug: "definer", title: "Definer" } }
  const picked = pickedFrom([
    { rows: [row], n: 1 },
    { rows: [row, { values: { id: "2", slug: "undefined-one" } }], n: 2 },
  ])
  expect(picked.pages.map((one) => one.id)).toEqual(["1", "2"])
})

test("more is there to load where the store matched more than it answered", () => {
  expect(pickedFrom([{ rows: [{ values: { id: "1", slug: "a" } }], n: 70 }]).more).toBe(true)
})

test("a type is titled where a type above it declares a title", () => {
  expect(titledFor(TYPES, "role", new Set(["type-role"]))).toBe(true)
})

test("a type is titled where a type below it declares a title", () => {
  const below = new Set(["type-bare", "type-bare-below", "type-titled-below"])
  expect(titledFor(TYPES, "bare", below)).toBe(true)
})

test("a type nothing above or below titles is not titled", () => {
  expect(titledFor(TYPES, "bare-below", new Set(["type-bare-below"]))).toBe(false)
})

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
