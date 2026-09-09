import { expect, test } from "bun:test"
import { pathsIn } from "../../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { bodyOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { addPropertyValue } from "./add-property-value.change-mechanical-file-content.code.ts"

const AT = "akasha/held/kept.page-type.ts"

const OPENING = `import type { PageType } from "../../pages/types/page-type.page-type.ts"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "page-type",
  slug: "kept",
`

const BODY = `${OPENING}  partSlugs: ["kept/one", "kept/two"],
} as const satisfies PageType
`

const EMPTY = `${OPENING}  partSlugs: [],
} as const satisfies PageType
`

const GAINED_AFTER_SLUG = `${OPENING}  extendsSlug: ["page-type/page"],
  partSlugs: ["kept/one", "kept/two"],
} as const satisfies PageType
`

const GAINED_LAST = `${OPENING}  partSlugs: ["kept/one", "kept/two"],
  extendsSlug: ["page-type/page"],
} as const satisfies PageType
`

function worldOf(text: string | null): World {
  return {
    root: "/nowhere",
    index: null as never,
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
    value: "page-type/page",
    after: "slug",
  })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_AFTER_SLUG)
})

test("a key the page gains is written last where `after` names no such property", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "extendsSlug",
    value: "page-type/page",
    after: "definition",
  })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_LAST)
})

test("a key the page gains is written last where no `after` is stated", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "extendsSlug",
    value: "page-type/page",
  })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_LAST)
})

test("a body exporting no object is refused", () => {
  const said = addPropertyValue(worldOf("const kept = 1\n"), {
    at: AT,
    key: "extendsSlug",
    value: "page-type/page",
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

test("a key is judged before the body is read", () => {
  const said = addPropertyValue(worldOf(null), { at: AT, key: "part-slugs", value: "kept/three" })

  expect(said.refused).toBe(
    "`part-slugs` is no key a page spells, and `partSlugs` is the key that spelling names"
  )
})
