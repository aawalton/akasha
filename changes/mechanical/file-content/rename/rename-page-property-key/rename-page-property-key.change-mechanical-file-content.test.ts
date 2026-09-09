import { expect, test } from "bun:test"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import {
  bodyOf,
  worldOf,
} from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  respelled,
  runChange,
} from "./rename-page-property-key.change-mechanical-file-content.code.ts"

const AT = "akasha/held/kept.page-type.ts"

const BODY = `import type { PageType } from "../../pages/types/page-type.page-type.ts"

export const kept = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "page-type",
  slug: "kept",
  pluralSlug: "kepts",
  partSlugs: ["kept/one"],
} as const satisfies PageType
`

const RECORDS = `import type { Kept } from "./kept.page-type.ts"

export const held = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b060",
  pageTypeSlug: "kept",
  slug: "held",
  personaSlug: "outside",
  personaMessages: [
    { personaSlug: "one", sent: 3 },
    { sent: 1 },
    { personaSlug: "two", sent: 2 },
  ],
} as const satisfies Kept
`

function ranOn(
  was: string,
  now: string,
  text: string = BODY,
  within: string | null = null
): Answer {
  return respelled(AT, text, was, now, within)
}

function textOn(
  was: string,
  now: string,
  text: string = BODY,
  within: string | null = null
): string {
  return bodyOf(ranOn(was, now, text, within), (asked) => (asked === AT ? text : null))
}

test("one key is spelled anew", () => {
  expect(textOn("pluralSlug", "manySlug")).toContain(`manySlug: "kepts",`)
})

test("the value under that key and the key's place are kept", () => {
  expect(textOn("pluralSlug", "manySlug")).toBe(BODY.replace("pluralSlug:", "manySlug:"))
})

test("a key holding a list is spelled anew as readily as a key holding text", () => {
  expect(textOn("partSlugs", "pieceSlugs")).toContain(`pieceSlugs: ["kept/one"],`)
})

test("the passage stated each side is the line the key sits on", () => {
  expect(ranOn("pluralSlug", "manySlug").edits).toEqual([
    {
      kind: "replace",
      path: AT,
      contentFrom: `  pluralSlug: "kepts",`,
      contentTo: `  manySlug: "kepts",`,
    },
  ])
})

test("a key spelled as a string is respelled as a string", () => {
  const held = BODY.replace("pluralSlug:", `"plural-slug":`)

  expect(textOn("plural-slug", "pluralSlug", held)).toContain(`"pluralSlug": "kepts",`)
})

test("a body exporting no object is refused", () => {
  const said = ranOn("slug", "name", 'const kept = { slug: "kept" }\n')

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` exports no object`)
})

test("a key the body does not state is refused", () => {
  const said = ranOn("definition", "meaning")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states no \`definition\``)
})

test("a key the body states already is refused", () => {
  const said = ranOn("pluralSlug", "slug")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states \`slug\` already`)
})

test("an object above the exported one is not read", () => {
  const held = `const held = { pluralSlug: "wrong" }\n${BODY}`

  const said = textOn("pluralSlug", "manySlug", held)

  expect(said).toContain(`const held = { pluralSlug: "wrong" }`)
  expect(said).toContain(`manySlug: "kepts",`)
})

test("a path holding no body is refused", () => {
  const said = runChange(worldOf({}), { at: AT, was: "slug", now: "name" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` holds no body, so no key is respelled`)
})

test("the body a path holds is what the run reads", () => {
  const said = runChange(worldOf({ [AT]: BODY }), {
    at: AT,
    was: "pluralSlug",
    now: "manySlug",
  })

  expect(said.refused).toBeNull()
})

test("a key inside each record is spelled anew where the key holding them is named", () => {
  const said = textOn("personaSlug", "persona", RECORDS, "personaMessages")

  expect(said).toContain(`{ persona: "one", sent: 3 },`)
  expect(said).toContain(`{ persona: "two", sent: 2 },`)
})

test("a record stating no such key is passed over", () => {
  expect(textOn("personaSlug", "persona", RECORDS, "personaMessages")).toContain(`{ sent: 1 },`)
})

test("the same key at the top of the object is left as it is", () => {
  expect(textOn("personaSlug", "persona", RECORDS, "personaMessages")).toContain(
    `personaSlug: "outside",`
  )
})

test("records sitting apart answer an edit each", () => {
  expect(ranOn("personaSlug", "persona", RECORDS, "personaMessages").edits).toHaveLength(2)
})

test("records stating that key nowhere answer no edit rather than being refused", () => {
  const said = ranOn("ruleNote", "note", RECORDS, "personaMessages")

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
})

test("a record already stating the key asked for is refused", () => {
  const said = ranOn("sent", "personaSlug", RECORDS, "personaMessages")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states \`personaSlug\` already`)
})

test("a key holding no records answers no edit", () => {
  const said = ranOn("personaSlug", "persona", RECORDS, "slug")

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
})

test("the key held within is what a run names it by", () => {
  const said = runChange(worldOf({ [AT]: RECORDS }), {
    at: AT,
    was: "personaSlug",
    now: "persona",
    within: "personaMessages",
  })

  expect(said.edits).toHaveLength(2)
})
