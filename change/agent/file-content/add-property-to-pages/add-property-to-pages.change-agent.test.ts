import { expect, test } from "bun:test"
import {
  runChange,
  valuedIn,
} from "akasha/change/agent/file-content/add-property-to-pages/add-property-to-pages.change-agent.code.ts"
import { addPropertyToPages as addPropertyToPagesMechanical } from "akasha/change/mechanical/file-content/add/add-property-to-pages/add-property-to-pages.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const ONE = "held/one.domain.ts"

const TWO = "held/two.domain.ts"

const NOUN = `[{ partOfSpeech: "part-of-speech/noun", spelling: "one" }]`

const OTHER = `[{ partOfSpeech: "part-of-speech/noun", spelling: "two" }]`

const KEY = "spellings"

const REACHED = `${changeMechanicalFileContent.slug}/${addPropertyToPagesMechanical.slug}` as const

function caught(): Carried {
  return { at: "", given: null }
}

test("a line is a path, a tab, then the value that page takes", () => {
  expect(valuedIn(`${ONE}\t${NOUN}`)).toEqual([{ path: ONE, value: NOUN }])
})

test("a line holding no tab is refused rather than read as a path alone", () => {
  expect(valuedIn(ONE)).toContain("holds no tab")
})

test("an empty line is passed over rather than refused", () => {
  expect(valuedIn(`\n${ONE}\t${NOUN}\n\n`)).toEqual([{ path: ONE, value: NOUN }])
})

test("each line names a page of its own", () => {
  expect(valuedIn(`${ONE}\t${NOUN}\n${TWO}\t${OTHER}`)).toEqual([
    { path: ONE, value: NOUN },
    { path: TWO, value: OTHER },
  ])
})

test("naming no page is refused rather than answered as no edit", async () => {
  const said = await runChange(worldRecording(caught()), { key: KEY, pages: "\n\n" })
  expect(said.refused).toBe("no page is named, so nothing is put in")
})

test("this change handed no key is refused", async () => {
  const said = await runChange(worldRecording(caught()), { pages: `${ONE}\t${NOUN}` })
  expect(said.refused ?? "").toContain("key")
})

test("this change handed no pages is refused", async () => {
  const said = await runChange(worldRecording(caught()), { key: KEY })
  expect(said.refused ?? "").toContain("pages")
})

test("the one change reached is the mechanical change putting a value on each page", async () => {
  const held = caught()
  await runChange(worldRecording(held), { key: KEY, pages: `${ONE}\t${NOUN}` })
  expect(held.at).toBe(REACHED)
})

test("the change reached is handed the lines read as pages and values", async () => {
  const held = caught()
  await runChange(worldRecording(held), { key: KEY, pages: `${ONE}\t${NOUN}` })
  expect(held.given).toEqual({ key: KEY, valued: [{ path: ONE, value: NOUN }] })
})

test("an `after` the caller states is handed to the change reached", async () => {
  const held = caught()
  await runChange(worldRecording(held), { key: KEY, pages: `${ONE}\t${NOUN}`, after: "slug" })
  expect(held.given).toEqual({
    key: KEY,
    valued: [{ path: ONE, value: NOUN }],
    after: "slug",
  })
})
