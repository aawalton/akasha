import { expect, test } from "bun:test"
import { restated } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.code.ts"
import {
  BODY,
  METRIC_BODY,
} from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.test-fixtures.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodyOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

function ranOn(path: string, text: string, key: string, to: string): Answer {
  return restated(path, text, key, to)
}

function textOn(path: string, text: string, key: string, to: string): string {
  return bodyOf(ranOn(path, text, key, to), (asked) => (asked === path ? text : null))
}

const AT = "akasha/held/kept.page-type.ts"

test("a key's text is stated anew", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic")
  expect(said).toContain(`pluralSlug: "change-atomic",`)
})

test("one key is restated and the rest of the body is left as it is", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic")
  expect(said).toBe(BODY.replace(`"kepts"`, `"change-atomic"`))
})

test("the passage stated each side is the line the key's value sits on", () => {
  const said = restated(AT, BODY, "pluralSlug", "change-atomic")
  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: AT,
      contentFrom: `  pluralSlug: "kepts",`,
      contentTo: `  pluralSlug: "change-atomic",`,
    },
  ])
})

test("a key the page states no text under is refused", () => {
  const said = ranOn(AT, BODY, "definition", "x")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no text under \`definition\``)
})

test("a key holding something other than text is refused", () => {
  const said = ranOn(AT, BODY, "partSlugs", "x")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no text under \`partSlugs\``)
})

test("a key stating what was asked for already is refused", () => {
  const said = ranOn(AT, BODY, "slug", "kept")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`kept` is what `slug` states already")
})

test("the text is written back quoted", () => {
  const said = textOn(AT, BODY, "slug", 'has "quotes"')
  expect(said).toContain(`slug: "has \\"quotes\\"",`)
})

test("an object above the exported one is not read", () => {
  const held = `const held = { slug: "wrong" }\n${BODY}`
  const said = textOn(AT, held, "slug", "change-atomic")
  expect(said).toContain(`const held = { slug: "wrong" }`)
  expect(said).toContain(`slug: "change-atomic",`)
})

test("a newline ending what was asked for is dropped", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic\n")
  expect(said).toContain(`pluralSlug: "change-atomic",`)
})

test("every newline ending what was asked for is dropped", () => {
  const said = textOn(AT, BODY, "pluralSlug", "change-atomic\n\n")
  expect(said).toBe(BODY.replace(`"kepts"`, `"change-atomic"`))
})

test("a newline inside what was asked for is left as it is", () => {
  const said = textOn(AT, BODY, "pluralSlug", "one\ntwo")
  expect(said).toContain(`pluralSlug: "one\\ntwo",`)
})

test("what a key states already is refused though a newline ends what was asked for", () => {
  const said = ranOn(AT, BODY, "slug", "kept\n")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`kept` is what `slug` states already")
})

test("nothing here judges whether that key may be restated", () => {
  expect(ranOn(AT, BODY, "id", "01a00000-0000-7000-8000-000000000000").refused).toBe(null)
})

const METRIC_AT = "akasha/held/health.metric.ts"

test("a key holding a number is stated anew as a number", () => {
  const said = restated(METRIC_AT, METRIC_BODY, "value", "8", "number")
  expect(said.edits).toEqual([
    { kind: "replace", path: METRIC_AT, contentFrom: "  value: 10,", contentTo: "  value: 8," },
  ])
})

test("a key holding a boolean is stated anew as a boolean", () => {
  const said = restated(METRIC_AT, METRIC_BODY, "shown", "false", "boolean")
  expect(bodyOf(said, () => METRIC_BODY)).toBe(METRIC_BODY.replace("shown: true", "shown: false"))
})

test("a value that is no number is refused for a key holding a number", () => {
  const said = restated(METRIC_AT, METRIC_BODY, "value", "eight", "number")
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`eight` is no number, so nothing is restated")
})

test("a value that is no boolean is refused for a key holding a boolean", () => {
  const said = restated(METRIC_AT, METRIC_BODY, "shown", "yes", "boolean")
  expect(said.refused).toBe("`yes` is no boolean, so nothing is restated")
})

test("a number the key states already is refused", () => {
  const said = restated(METRIC_AT, METRIC_BODY, "value", "10\n", "number")
  expect(said.refused).toBe("`10` is what `value` states already")
})

test("a key the page states nothing under is refused for a number", () => {
  const said = restated(METRIC_AT, METRIC_BODY, "maximum", "8", "number")
  expect(said.refused).toBe(`\`${METRIC_AT}\` states no number under \`maximum\``)
})

test("a key holding a number is refused as text where no kind is handed in", () => {
  const said = restated(METRIC_AT, METRIC_BODY, "value", "8")
  expect(said.refused).toBe(`\`${METRIC_AT}\` states no text under \`value\``)
})
