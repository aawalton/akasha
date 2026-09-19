import { expect, test } from "bun:test"
import type { Said } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodyRestated,
  type Restating,
} from "akasha/change/modules/prose-splicing/prose-splicing.module.code.ts"
import { bodyOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "akasha/widgets/one.widget.ts"

const BODY = `export const one = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "widget",
  slug: "one",
  definition: "a page holds a value",
  partSlugs: ["widget/two"],
  decisions: [
    {
      decisionKind: "departure",
      statement: "a page holds one",
    },
    {
      decisionKind: "gap",
      statement: "a page holds two",
    },
    {
      decisionKind: "gap",
      statement: "a page holds two",
    },
  ],
} as const
`

function keyed(key: string, was: string, now: string): Restating {
  return { key, under: [], was, now }
}

function fielded(key: string, was: string, now: string): Restating {
  return { key, under: ["statement"], was, now }
}

function ranOver(text: string, held: readonly Restating[]): Said {
  return bodyRestated(AT, text, held)
}

function textOver(text: string, held: readonly Restating[]): string {
  return bodyOf(ranOver(text, held), (asked) => (asked === AT ? text : null))
}

function ranOn(held: readonly Restating[]): Said {
  return ranOver(BODY, held)
}

function textOn(held: readonly Restating[]): string {
  return textOver(BODY, held)
}

test("the text a key states is stated anew", () => {
  const said = textOn([keyed("definition", "a page holds a value", "a page has a value")])

  expect(said).toContain(`definition: "a page has a value",`)
})

test("one key is restated and the rest of the body is left as it is", () => {
  const said = textOn([keyed("definition", "a page holds a value", "a page has a value")])

  expect(said).toBe(BODY.replace(`"a page holds a value"`, `"a page has a value"`))
})

test("the passage stated each side is the line the key's value sits on", () => {
  const said = ranOn([keyed("definition", "a page holds a value", "a page has a value")])

  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: AT,
      contentFrom: `  definition: "a page holds a value",`,
      contentTo: `  definition: "a page has a value",`,
    },
  ])
})

test("a key the page states no text under is refused", () => {
  const said = ranOn([keyed("partSlugs", "a page holds a value", "a page has a value")])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no text under \`partSlugs\``)
})

test("a key stating what was asked for already is refused", () => {
  const said = ranOn([keyed("definition", "a page holds a value", "a page holds a value")])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`a page holds a value` is what `definition` states already")
})

test("the text is written back quoted", () => {
  const said = textOn([keyed("definition", "a page holds a value", 'a page has "one"')])

  expect(said).toContain(`definition: "a page has \\"one\\"",`)
})

test("an object above the exported one is not read", () => {
  const over = `const held = { definition: "a page holds a value" }\n${BODY}`

  const said = textOver(over, [keyed("definition", "a page holds a value", "a page has a value")])

  expect(said).toContain(`const held = { definition: "a page holds a value" }`)
  expect(said).toContain(`  definition: "a page has a value",`)
})

test("one field of the record whose words match is stated anew", () => {
  const said = textOn([fielded("decisions", "a page holds one", "a page has one")])

  expect(said).toContain(`statement: "a page has one",`)
})

test("the passage stated each side is the line the field's value sits on", () => {
  const said = ranOn([fielded("decisions", "a page holds one", "a page has one")])

  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: AT,
      contentFrom: `      statement: "a page holds one",`,
      contentTo: `      statement: "a page has one",`,
    },
  ])
})

test("a key holding no record is refused", () => {
  const said = ranOn([fielded("partSlugs", "a page holds one", "a page has one")])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no records under \`partSlugs\``)
})

test("a key the page states nothing under is refused", () => {
  const said = ranOn([fielded("directives", "a page holds one", "a page has one")])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no records under \`directives\``)
})

test("text no record states is refused", () => {
  const said = ranOn([fielded("decisions", "a page holds three", "a page has three")])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no record under `decisions` states that text under `statement`")
})

test("text more than one record states is refused, and the refusal says how many", () => {
  const said = ranOn([fielded("decisions", "a page holds two", "a page has two")])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "2 records under `decisions` state that text under `statement`, and one change works one"
  )
})

test("a field stating what was asked for already is refused", () => {
  const said = ranOn([fielded("decisions", "a page holds one", "a page holds one")])

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`a page holds one` is what `statement` states already")
})

test("two passages in one body are answered by one edit", () => {
  const held = [
    keyed("definition", "a page holds a value", "a page has a value"),
    fielded("decisions", "a page holds one", "a page has one"),
  ]

  const said = ranOn(held)

  expect(said.edits).toHaveLength(1)
  expect(textOn(held)).toBe(
    BODY.replace(`"a page holds a value"`, `"a page has a value"`).replace(
      `"a page holds one"`,
      `"a page has one"`
    )
  )
})

test("one passage refused refuses every passage in that body", () => {
  const said = ranOn([
    keyed("definition", "a page holds a value", "a page has a value"),
    fielded("decisions", "a page holds two", "a page has two"),
  ])

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("2 records")
})

test("a body with no passage to restate answers no edit", () => {
  const said = ranOn([])

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})
