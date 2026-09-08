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

function ranOn(was: string, now: string, text: string = BODY): Answer {
  return respelled(AT, text, was, now)
}

function textOn(was: string, now: string, text: string = BODY): string {
  return bodyOf(ranOn(was, now, text), (asked) => (asked === AT ? text : null))
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

test("the whole body is stated each side rather than the passage under that key", () => {
  expect(ranOn("pluralSlug", "manySlug").edits).toEqual([
    {
      kind: "replace",
      path: AT,
      contentFrom: BODY,
      contentTo: BODY.replace("pluralSlug:", "manySlug:"),
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
