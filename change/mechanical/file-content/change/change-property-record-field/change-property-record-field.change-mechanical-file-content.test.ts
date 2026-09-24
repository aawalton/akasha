import { expect, test } from "bun:test"
import {
  fieldRestated,
  type Named,
} from "akasha/change/mechanical/file-content/change/change-property-record-field/change-property-record-field.change-mechanical-file-content.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodyOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "akasha/held/kept.module.ts"

const BODY = `import type { Module } from "@akasha/code/module"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  type: "page-type/module",
  slug: "kept",
  code: "ts",
  partSlugs: ["module/one"],
  decisions: [
    {
      decisionKind: "departure",
      statement: "the first",
      workingMemory: "what the first held",
    },
    {
      decisionKind: "gap",
      statement: "the second",
    },
    {
      decisionKind: "gap",
      statement: "the second",
    },
  ],
} as const satisfies Module
`

function named(where: string, is: string, field: string): Named {
  return { key: "decisions", where, is, field }
}

function ranOn(one: Named, to: string): Answer {
  return fieldRestated(AT, BODY, one, to, false)
}

function addedOn(one: Named, to: string): Answer {
  return fieldRestated(AT, BODY, one, to, true)
}

function textOn(one: Named, to: string): string {
  return bodyOf(ranOn(one, to), (asked) => (asked === AT ? BODY : null))
}

test("one field of the record a match names is stated anew", () => {
  const said = textOn(named("statement", "the first", "workingMemory"), "what it holds now")

  expect(said).toContain(`workingMemory: "what it holds now",`)
})

test("the rest of the body is left as it is", () => {
  const said = textOn(named("statement", "the first", "workingMemory"), "what it holds now")

  expect(said).toBe(BODY.replace(`"what the first held"`, `"what it holds now"`))
})

test("the passage stated each side is the line the field's value sits on", () => {
  const said = ranOn(named("statement", "the first", "workingMemory"), "what it holds now")

  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: AT,
      contentFrom: `      workingMemory: "what the first held",`,
      contentTo: `      workingMemory: "what it holds now",`,
    },
  ])
})

test("a record is named by any field of its own", () => {
  const said = textOn(named("decisionKind", "departure", "statement"), "stated anew")

  expect(said).toContain(`statement: "stated anew",`)
})

test("a key holding no record is refused", () => {
  const said = fieldRestated(AT, BODY, { ...named("a", "b", "c"), key: "partSlugs" }, "x", true)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no records under \`partSlugs\``)
})

test("a key the page states nothing under is refused", () => {
  const said = fieldRestated(AT, BODY, { ...named("a", "b", "c"), key: "directives" }, "x", true)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no records under \`directives\``)
})

test("text no record states is refused", () => {
  const said = ranOn(named("statement", "the third", "workingMemory"), "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no record under `decisions` states that text under `statement`")
})

test("text more than one record states is refused, and the refusal says how many", () => {
  const said = ranOn(named("statement", "the second", "decisionKind"), "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "2 records under `decisions` state that text under `statement`, and one change works one"
  )
})

test("a record stating nothing under a field its record property does not declare is refused", () => {
  const said = ranOn(named("statement", "the first", "definition"), "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("that record states nothing under `definition`")
})

test("a declared field a record does not state is added after that record's last field", () => {
  const said = bodyOf(
    addedOn(named("statement", "the first", "definition"), "what it is"),
    (asked) => (asked === AT ? BODY : null)
  )

  expect(said).toBe(
    BODY.replace(
      `      workingMemory: "what the first held",\n`,
      `      workingMemory: "what the first held",\n      definition: "what it is",\n`
    )
  )
})

test("a field holding a boolean is not restated as text", () => {
  const body = BODY.replace(`statement: "the first",`, `statement: "the first",\n      held: true,`)

  const said = fieldRestated(AT, body, named("statement", "the first", "held"), "x", true)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`held` holds a boolean, and `x` is spelled as text, so nothing is restated"
  )
})

test("a field holding a list is refused", () => {
  const body = BODY.replace(
    `statement: "the first",`,
    `statement: "the first",\n      aids: ["a"],`
  )

  const said = fieldRestated(AT, body, named("statement", "the first", "aids"), "x", true)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`aids` in that record holds no text, boolean, number or null, so nothing is restated"
  )
})

test("a declared field a record states already is restated rather than added", () => {
  const said = bodyOf(addedOn(named("statement", "the first", "workingMemory"), "now"), (asked) =>
    asked === AT ? BODY : null
  )

  expect(said).toBe(BODY.replace(`"what the first held"`, `"now"`))
})

test("a field stating what was asked for already is refused", () => {
  const said = ranOn(named("statement", "the first", "workingMemory"), "what the first held")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`what the first held` is what `workingMemory` states already")
})

test("the text is written back quoted", () => {
  const said = textOn(named("statement", "the first", "workingMemory"), 'has "quotes"')

  expect(said).toContain(`workingMemory: "has \\"quotes\\"",`)
})

const TYPE_AT = "akasha/held/kept.page-type.ts"

const TYPE_BODY = `import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b05a",
  type: "page-type/page-type",
  slug: "kept",
  properties: [
    { pageProperty: "text-property/kept-titles", required: false, many: false },
    { pageProperty: "multi-relation-property/kept-parts", required: false, many: true, maxCount: 3 },
    { pageProperty: "multi-relation-property/kept-links", required: false, many: true, maxCount: null },
  ],
} as const satisfies PageType
`

const TITLES = "text-property/kept-titles"

const PARTS = "multi-relation-property/kept-parts"

const LINKS = "multi-relation-property/kept-links"

function declaration(is: string, field: string): Named {
  return { key: "properties", where: "pageProperty", is, field }
}

function typeRestated(one: Named, to: string, holds?: string): Answer {
  return fieldRestated(TYPE_AT, TYPE_BODY, one, to, true, holds)
}

function typeTextOn(one: Named, to: string, holds?: string): string {
  return bodyOf(typeRestated(one, to, holds), (asked) => (asked === TYPE_AT ? TYPE_BODY : null))
}

test("a boolean in a page type's declaration is restated as a boolean", () => {
  const said = typeTextOn(declaration(TITLES, "required"), "true", "boolean")

  expect(said).toBe(
    TYPE_BODY.replace(`"${TITLES}", required: false,`, `"${TITLES}", required: true,`)
  )
})

test("a number in a declaration is restated as a number", () => {
  const said = typeTextOn(declaration(PARTS, "maxCount"), "12", "number")

  expect(said).toBe(TYPE_BODY.replace(`maxCount: 3 }`, `maxCount: 12 }`))
})

test("a field holding null is restated as the kind its property holds", () => {
  const said = typeTextOn(declaration(LINKS, "maxCount"), "5", "number")

  expect(said).toBe(TYPE_BODY.replace(`maxCount: null }`, `maxCount: 5 }`))
})

test("a value that does not spell as the kind the field's property holds is refused", () => {
  const said = typeRestated(declaration(TITLES, "required"), "yes", "boolean")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`yes` is no boolean, so `required` is not restated")
})

test("a boolean the field states already is refused", () => {
  const said = typeRestated(declaration(TITLES, "required"), "false", "boolean")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`false` is what `required` states already")
})

test("text in a declaration is still restated as text", () => {
  const said = typeTextOn(declaration(TITLES, "pageProperty"), "text-property/kept-names")

  expect(said).toBe(TYPE_BODY.replace(`"${TITLES}"`, `"text-property/kept-names"`))
})
