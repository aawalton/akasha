import { expect, test } from "bun:test"
import {
  moveFolderPackage,
  runChange,
} from "akasha/changes/agent/folder/move-folder-package/move-folder-package.change-agent.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const AT = "akasha/code-system/code-system.workspace-package.ts"

const TO = "akasha/code"

const MOVE_FOLDER_PACKAGE = "change-mechanical-folder/move-folder-package"

test("the whole carry is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await moveFolderPackage(worldRecording(carried), { at: AT, to: TO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(MOVE_FOLDER_PACKAGE)
  expect(carried.given).toEqual({ at: AT, to: TO })
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldRecording({ at: "", given: null })
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { at: AT })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
})
