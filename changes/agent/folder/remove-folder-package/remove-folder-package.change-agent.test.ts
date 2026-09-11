import { expect, test } from "bun:test"
import {
  removeFolderPackage,
  runChange,
} from "akasha/changes/agent/folder/remove-folder-package/remove-folder-package.change-agent.code.ts"
import { refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const AT = "akasha/code-system/code-system.workspace-package.ts"

const REMOVE_FOLDER_PACKAGE = "change-mechanical-folder/remove-folder-package"

const REFUSED = "`akasha/notes.md` names no `workspace-package`, so no folder is taken away"

test("the whole removal is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await removeFolderPackage(worldRecording(carried, NOTHING_OVER), { at: AT })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(REMOVE_FOLDER_PACKAGE)
  expect(carried.given).toEqual({ at: AT })
})

test("a refusal from the change reached is this change's answer", async () => {
  const world = worldRecording({ at: "", given: null }, refusing(REFUSED))

  const said = await removeFolderPackage(world, { at: AT })

  expect(said.refused).toBe(REFUSED)
  expect(said.edits).toEqual([])
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldRecording({ at: "", given: null }, NOTHING_OVER)

  const said = await runChange(world, {})

  expect(said.refused ?? "").toContain("`at`")
})
