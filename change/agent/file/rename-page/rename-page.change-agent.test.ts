import { expect, test } from "bun:test"
import {
  renamePage,
  runChange,
} from "akasha/change/agent/file/rename-page/rename-page.change-agent.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { renameFilePage } from "akasha/change/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "akasha/one/held.module.ts"

const TO = "carried"

const RENAME_FILE_PAGE = `${changeMechanical.slug}/${renameFilePage.slug}` as const

test("the whole rename is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await renamePage(worldRecording(carried), { at: AT, to: TO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(RENAME_FILE_PAGE)
  expect(carried.given).toEqual({ at: AT, to: TO })
})

test("what the act was handed is handed on to that change", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldRecording(carried), { at: AT, to: TO })

  expect(carried.given).toEqual({ at: AT, to: TO })
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldRecording({ at: "", given: null })
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { at: AT })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
})

test("a page type is refused rather than handed to the change renaming a page", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await renamePage(worldRecording(carried), {
    at: "akasha/one/held.page-type.ts",
    to: TO,
  })

  expect(said.refused).not.toBe(null)
  expect(carried.at).toBe("")
})
