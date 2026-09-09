import { expect, test } from "bun:test"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { bodyOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  fieldRestated,
  type Named,
} from "./change-property-record-field.change-mechanical-file-content.code.ts"

const AT = "akasha/held/kept.module.ts"

const BODY = `import type { Module } from "@akasha/code/module"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "module",
  slug: "kept",
  code: "ts",
  partSlugs: ["module/one"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "the first",
      workingMemory: "what the first held",
    },
    {
      invariantKind: "gap",
      statement: "the second",
    },
    {
      invariantKind: "gap",
      statement: "the second",
    },
  ],
} as const satisfies Module
`

function named(where: string, is: string, field: string): Named {
  return { key: "invariants", where, is, field }
}

function ranOn(one: Named, to: string): Answer {
  return fieldRestated(AT, BODY, one, to)
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
  const said = textOn(named("invariantKind", "departure", "statement"), "stated anew")

  expect(said).toContain(`statement: "stated anew",`)
})

test("a key holding no record is refused", () => {
  const said = fieldRestated(AT, BODY, { ...named("a", "b", "c"), key: "partSlugs" }, "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no records under \`partSlugs\``)
})

test("a key the page states nothing under is refused", () => {
  const said = fieldRestated(AT, BODY, { ...named("a", "b", "c"), key: "directives" }, "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no records under \`directives\``)
})

test("text no record states is refused", () => {
  const said = ranOn(named("statement", "the third", "workingMemory"), "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no record under `invariants` states that text under `statement`")
})

test("text more than one record states is refused, and the refusal says how many", () => {
  const said = ranOn(named("statement", "the second", "invariantKind"), "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "2 records under `invariants` state that text under `statement`, and one change works one"
  )
})

test("a record stating no text under the field worked is refused", () => {
  const said = ranOn(named("statement", "the first", "definition"), "x")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("that record states no text under `definition`")
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
