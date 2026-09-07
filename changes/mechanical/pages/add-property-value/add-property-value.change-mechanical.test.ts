import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { bodyOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { addPropertyValue } from "./add-property-value.change-mechanical.code.ts"

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

function worldOf(text: string | null): World {
  return { root: "/nowhere", index: null as never, textOf: () => text, over: NOTHING_OVER }
}

test("a value is put after the values the property already holds", () => {
  const said = addPropertyValue(worldOf(BODY), {
    at: AT,
    key: "partSlugs",
    value: "kept/three",
  })

  expect(bodyOf(said)).toContain(`["kept/one", "kept/two", "kept/three"]`)
})

test("the rest of the body is left as the body was", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "partSlugs", value: "kept/three" })

  expect(bodyOf(said)).toBe(BODY.replace(`"kept/two"`, `"kept/two", "kept/three"`))
})

test("a property holding no value yet takes the first value", () => {
  const said = addPropertyValue(worldOf(EMPTY), { at: AT, key: "partSlugs", value: "kept/one" })

  expect(bodyOf(said)).toContain(`partSlugs: ["kept/one"],`)
})

test("the body is answered under the path the body was worked out from", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "partSlugs", value: "kept/three" })

  expect(said.edits[0]?.path).toBe(AT)
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
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

test("a key the page states no value under is refused", () => {
  const said = addPropertyValue(worldOf(BODY), { at: AT, key: "definition", value: "x" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no \`definition\``)
})

test("a path holding no body is refused", () => {
  const said = addPropertyValue(worldOf(null), { at: AT, key: "partSlugs", value: "kept/three" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` could not be read`)
})
