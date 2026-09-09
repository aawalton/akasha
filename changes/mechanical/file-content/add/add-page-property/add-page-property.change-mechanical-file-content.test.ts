import { expect, test } from "bun:test"
import { pathsIn } from "../../../../modules/answer/change-answer.module.code.ts"
import { bodyOf, worldOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
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

const SECTION_OF = { at: AT, key: "sectionOfSlug", value: '"solar-power"' }

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
  const said = addPageProperty(worldOf(HELD), { at: AT, key: "slug", value: '"other"' })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe('`slug` is stated already, so `"other"` is a restatement')
})

test("a key the page states as a list is refused as well", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, key: "partOfSlugs" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe('`partOfSlugs` is stated already, so `"solar-power"` is a restatement')
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

test("a key spelled as a slug is refused", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, key: "section-of-slug" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`section-of-slug` is no key a page spells, and `sectionOfSlug` is the key that spelling names"
  )
})

test("a key that is no bare word is refused", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, key: "section of slug" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`section of slug` is no key a page spells")
})

test("a key is judged before the body is read", () => {
  const said = addPageProperty(worldOf({}), { ...SECTION_OF, key: "section-of-slug" })

  expect(said.refused).toBe(
    "`section-of-slug` is no key a page spells, and `sectionOfSlug` is the key that spelling names"
  )
})

test("a value is put in as the body spells it rather than as a quoted string", () => {
  const said = addPageProperty(worldOf(HELD), { at: AT, key: "webDirectory", value: "true" })

  expect(bodyOf(said, () => BODY)).toContain("webDirectory: true,")
})

test("a record is put in as the body spells it", () => {
  const said = addPageProperty(worldOf(HELD), {
    at: AT,
    key: "frame",
    value: '{ loadScroll: "end" }',
  })

  expect(bodyOf(said, () => BODY)).toContain('frame: { loadScroll: "end" },')
})

test("the whitespace around a value is dropped before that value is read or written", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, value: '  "solar-power"  ' })

  expect(bodyOf(said, () => BODY)).toBe(GAINED_LAST)
})

test("text that parses as no value is refused before the body is read", () => {
  const said = addPageProperty(worldOf({}), { ...SECTION_OF, value: "solar-power" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`solar-power` parses as no value, so nothing is put in")
})

test("a name is refused rather than written as the value", () => {
  const said = addPageProperty(worldOf(HELD), { ...SECTION_OF, value: "md" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`md` parses as no value, so nothing is put in")
})
