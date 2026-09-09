import { expect, test } from "bun:test"
import type { Answer, Replacing } from "../../../../modules/answer/change-answer.module.types.ts"
import { bodyOf, worldOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { respelled, runChange } from "./rename-entry-key.change-mechanical-file-content.code.ts"

const AT = "akasha/held/month.monarch-month.transactions.jsonl"

const BODY = `{"id":"one","accountSlug":"checking","tagSlugs":["ai"]}
{"id":"two","note":{"accountSlug":"inner"},"accountSlug":"savings"}
{"id":"three","merchant":"a \\"quoted\\" name"}
`

function ranOn(was: string, now: string, text: string = BODY): Answer {
  return respelled(AT, text, was, now)
}

function textOn(was: string, now: string, text: string = BODY): string {
  return bodyOf(ranOn(was, now, text), (asked) => (asked === AT ? text : null))
}

function onlyEdit(said: Answer): Replacing {
  expect(said.edits).toHaveLength(1)
  const held = said.edits[0]
  if (held === undefined || held.kind !== "replace") throw new Error("no passage was answered")
  return held
}

test("every entry stating the key is respelled", () => {
  const said = textOn("accountSlug", "account")

  expect(said).toContain(`"account":"checking"`)
  expect(said).toContain(`"account":"savings"`)
})

test("the value stated under the key and the key's place are kept", () => {
  expect(textOn("accountSlug", "account")).toBe(
    BODY.replace(`"accountSlug":"checking"`, `"account":"checking"`).replace(
      `"accountSlug":"savings"`,
      `"account":"savings"`
    )
  )
})

test("a key inside a value an entry states is left as that key is", () => {
  expect(textOn("accountSlug", "account")).toContain(`"note":{"accountSlug":"inner"}`)
})

test("an entry stating no such key is passed over", () => {
  expect(textOn("accountSlug", "account")).toContain(
    `{"id":"three","merchant":"a \\"quoted\\" name"}`
  )
})

test("one passage is answered however many entries are respelled", () => {
  expect(onlyEdit(ranOn("accountSlug", "account")).path).toBe(AT)
})

test("the passage answered runs to the last entry respelled rather than the body", () => {
  expect(onlyEdit(ranOn("accountSlug", "account")).contentFrom).not.toContain("three")
})

test("a key held by one entry alone is respelled on its own line", () => {
  expect(onlyEdit(ranOn("tagSlugs", "tags")).contentFrom).toBe(
    `{"id":"one","accountSlug":"checking","tagSlugs":["ai"]}`
  )
})

test("a body stating that key in no entry answers no edit rather than being refused", () => {
  const said = ranOn("categorySlug", "category")

  expect(said.edits).toEqual([])
  expect(said.refused).toBeNull()
})

test("a body whose entry already states the key asked for is refused", () => {
  const said = ranOn("accountSlug", "id")

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` states \`id\` already`)
})

test("a body that is no run of JSON objects is refused", () => {
  const said = ranOn("accountSlug", "account", `{"id":"one","accountSlug":"checking"\n`)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` reads as no run of entries, so no key is respelled`)
})

test("a path holding no body is refused", () => {
  const said = runChange(worldOf({}), { at: AT, was: "accountSlug", now: "account" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${AT}\` holds no body, so no key is respelled`)
})

test("the body the world answers is what the run reads", () => {
  const said = runChange(worldOf({ [AT]: BODY }), {
    at: AT,
    was: "accountSlug",
    now: "account",
  })

  expect(said.refused).toBeNull()
})
