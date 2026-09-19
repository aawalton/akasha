import { expect, test } from "bun:test"
import { addPropertyValue } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.code.ts"
import { OPENING } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.test-fixtures.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { bodyOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const AT = "akasha/held/kept.page-type.ts"
const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const BODY = `${OPENING}  partSlugs: ["kept/one", "kept/two"],
} as const satisfies PageType
`

const EMPTY = `${OPENING}  partSlugs: [],
} as const satisfies PageType
`

const GAINED_AFTER_SLUG = `${OPENING}  extendsSlug: ["${PAGE_AT}"],
  partSlugs: ["kept/one", "kept/two"],
} as const satisfies PageType
`

const GAINED_LAST = `${OPENING}  partSlugs: ["kept/one", "kept/two"],
  extendsSlug: ["${PAGE_AT}"],
} as const satisfies PageType
`

function worldOf(text: string | null): World {
  return {
    root: "/nowhere",
    index: {} as never,
    textOf: () => text,
    bodyOf: () => text,
    under: () => [],
    base: () => text,
    over: NOTHING_OVER,
  }
}

test("a value is put after the values the property already holds", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "partSlugs",
    value: "kept/three",
  })

  expect(bodyOf(said, () => BODY)).toContain(`["kept/one", "kept/two", "kept/three"]`)
})

test("a value sorting before the values the property holds is still put after them", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "partSlugs",
    value: "kept/eight",
  })

  expect(bodyOf(said, () => BODY)).toContain(`["kept/one", "kept/two", "kept/eight"]`)
})

test("a value sorting between the values the property holds is still put after them", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "partSlugs",
    value: "kept/three",
  })

  expect(bodyOf(said, () => BODY)).toContain(`["kept/one", "kept/two", "kept/three"]`)
})

test("the rest of the body is left as the body was", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "partSlugs", value: "kept/three" })

  expect(bodyOf(said, () => BODY)).toBe(BODY.replace(`"kept/two"`, `"kept/two", "kept/three"`))
})

test("a property holding no value yet takes the first value", () => {
  const said = addPropertyValue(worldOf(EMPTY), { at: AT, key: "partSlugs", value: "kept/one" })

  expect(bodyOf(said, () => EMPTY)).toContain(`partSlugs: ["kept/one"],`)
})

test("a key the caller says carries one value gains that value alone", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "manifest",
    value: "json",
    single: true,
  })

  expect(bodyOf(said, () => BODY)).toContain(`manifest: "json",`)
})

test("the body is answered under the path the body was worked out from", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "partSlugs", value: "kept/three" })

  expect(pathsIn(said)).toEqual([AT])
})

test("a value the property holds already is refused", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "partSlugs", value: "kept/two" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`partSlugs` holds `kept/two` already")
})

test("a property holding one value is refused as a restatement", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "slug", value: "other" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`slug` holds one value, so `other` is a restatement")
})

test("a page stating no such key gains that key after the property `after` names", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "extendsSlug",
    value: PAGE_AT,
    after: "slug",
  })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_AFTER_SLUG)
})

test("an `after` naming no property the page states is refused rather than dropped", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "extendsSlug",
    value: PAGE_AT,
    after: "definition",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`definition` is stated nowhere, so `after` names no place")
})

test("a key the page gains is written last where no `after` is stated", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "extendsSlug",
    value: PAGE_AT,
  })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_LAST)
})

test("an `after` stated where the page states the key already is refused rather than dropped", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "partSlugs",
    value: "kept/three",
    after: "slug",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`partSlugs` is written already, and `after` places a key rather than a value"
  )
})

test("a body exporting no object is refused", () => {
  const said = addPropertyValue(worldOf("const kept = 1\n"), {
    at: AT,
    key: "extendsSlug",
    value: PAGE_AT,
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` exports no object`)
})

test("a path holding no body is refused", () => {
  const said = addPropertyValue(worldOf(null), { at: AT, key: "partSlugs", value: "kept/three" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` could not be read`)
})

test("a key spelled as a slug is refused", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "part-slugs", value: "kept/three" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`part-slugs` is no key a page spells, and `partSlugs` is the key that spelling names"
  )
})

test("a key that is no bare word is refused", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "part slugs", value: "kept/three" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`part slugs` is no key a page spells")
})

test("a value under a property holding a boolean is written bare", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "worked",
    value: "true",
    single: true,
    holds: "boolean",
  })

  expect(bodyOf(said, () => BODY)).toContain("worked: true,")
})

test("a value under a property holding a number is written bare", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "maxCpuSeconds",
    value: "12",
    single: true,
    holds: "number",
  })

  expect(bodyOf(said, () => BODY)).toContain("maxCpuSeconds: 12,")
})

test("a value under any other property is written as JSON spells it", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "manifest",
    value: "json",
    single: true,
  })

  expect(bodyOf(said, () => BODY)).toContain(`manifest: "json",`)
})

test("a value that is no boolean is refused", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "worked",
    value: "yes",
    single: true,
    holds: "boolean",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`yes` is no boolean, so nothing is put in")
})

test("a value that is no number is refused", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "maxCpuSeconds",
    value: "12px",
    single: true,
    holds: "number",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`12px` is no number, so nothing is put in")
})

test("a value is judged before the body is read", () => {
  const said = addPropertyValue(worldOf(null), {
    at: AT,
    key: "worked",
    value: "yes",
    holds: "boolean",
  })

  expect(said.refused).toBe("`yes` is no boolean, so nothing is put in")
})

test("a key is judged before the body is read", () => {
  const said = addPropertyValue(worldOf(null), { at: AT, key: "part-slugs", value: "kept/three" })

  expect(said.refused).toBe(
    "`part-slugs` is no key a page spells, and `partSlugs` is the key that spelling names"
  )
})
