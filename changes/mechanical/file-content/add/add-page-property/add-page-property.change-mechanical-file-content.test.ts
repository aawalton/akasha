import { expect, test } from "bun:test"
import { pathsIn } from "../../../../modules/change-answer/change-answer.module.code.ts"
import {
  bodyOf,
  worldOf,
} from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { addPageProperty } from "./add-page-property.change-mechanical-file-content.code.ts"

const AT = "akasha/held/kept.book-section.ts"

const OPENING = `import type { BookSection } from "../../book-section.page-type.ts"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "book-section",
  slug: "kept",
`

const BODY = `${OPENING}  partOfSlugs: ["solar-power"],
} as const satisfies BookSection
`

const GAINED_AFTER_SLUG = `${OPENING}  sectionOfSlug: "solar-power",
  partOfSlugs: ["solar-power"],
} as const satisfies BookSection
`

const GAINED_LAST = `${OPENING}  partOfSlugs: ["solar-power"],
  sectionOfSlug: "solar-power",
} as const satisfies BookSection
`

const HELD = { [AT]: BODY }

const SECTION_OF = { at: AT, key: "sectionOfSlug", value: "solar-power" }

test("the value is written as one value rather than as a list of one", () => {
  const said = addPageProperty(worldOf(HELD), SECTION_OF)

  expect(bodyOf(said, () => BODY)).toContain(`sectionOfSlug: "solar-power",`)
})

test("the key is written after the property `after` names", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, after: "slug" })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_AFTER_SLUG)
})

test("the key is written last where `after` names no such property", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, after: "definition" })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_LAST)
})

test("the key is written last where no `after` is stated", () => {
  const said = addPageProperty(worldOf(HELD), SECTION_OF)

  expect(bodyOf(said, () => BODY)).toBe(GAINED_LAST)
})

test("the body is answered under the path the body was worked out from", () => {
  const said = addPageProperty(worldOf(HELD), SECTION_OF)

  expect(pathsIn(said)).toEqual([AT])
})

test("a key the page states already is refused rather than stated anew", () => {
  const said = addPageProperty(worldOf(HELD), { at: AT, key: "slug", value: "other" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`slug` is stated already, so `other` is a restatement")
})

test("a key the page states as a list is refused as well", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, key: "partOfSlugs" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`partOfSlugs` is stated already, so `solar-power` is a restatement")
})

test("a body exporting no object is refused rather than gaining a key", () => {
  const said = addPageProperty(worldOf({ [AT]: "const kept = 1\n" }), SECTION_OF)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` exports no object`)
})

test("a path holding no body is refused", () => {
  const said = addPageProperty(worldOf({}), SECTION_OF)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` could not be read`)
})
