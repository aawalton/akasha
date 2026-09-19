import { expect, test } from "bun:test"
import { runChange } from "akasha/change/agent/file/rename-pages/rename-pages.change-agent.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { renameFilePages } from "akasha/change/mechanical/file/rename/rename-file-pages/rename-file-pages.change-mechanical.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const ONE = "akasha/one/held.module.ts"

const TWO = "akasha/two/namer.module.ts"

const RENAME_FILE_PAGES = `${changeMechanical.slug}/${renameFilePages.slug}` as const

test("every line is carried to the change renaming many pages", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldRecording(carried), {
    moved: `${ONE} carried\n${TWO} borne\n`,
  })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(RENAME_FILE_PAGES)
  expect(carried.given).toEqual({ moved: { [ONE]: "carried", [TWO]: "borne" } })
})

test("a line with nothing on it is read over", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldRecording(carried), { moved: `\n${ONE} carried\n\n` })

  expect(carried.given).toEqual({ moved: { [ONE]: "carried" } })
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldRecording({ at: "", given: null }), {})

  expect(said.refused ?? "").toContain("`moved`")
})

test("a line that is not a path and a slug parted by a space is refused", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldRecording(carried), { moved: `${ONE}\n` })

  expect(said.refused ?? "").toContain("parted by a space")
  expect(carried.at).toBe("")
})

test("a page type is refused rather than handed to the change renaming many pages", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldRecording(carried), {
    moved: "akasha/one/held.page-type.ts carried\n",
  })

  expect(said.refused ?? "").toContain("rename-page-type")
  expect(carried.at).toBe("")
})
