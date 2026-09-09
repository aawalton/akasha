import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { moveFolderPackage, runChange } from "./move-folder-package.change-agent.code.ts"

const AT = "akasha/code-system/code-system.workspace-package.ts"

const TO = "akasha/code"

const MOVE_FOLDER_PACKAGE = "change-mechanical-folder/move-folder-package"

type Carried = { at: string; given: unknown }

function worldOf(carried: Carried): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      carried.at = at
      carried.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("the whole carry is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await moveFolderPackage(worldOf(carried), { at: AT, to: TO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(MOVE_FOLDER_PACKAGE)
  expect(carried.given).toEqual({ at: AT, to: TO })
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldOf({ at: "", given: null })
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { at: AT })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noTo.refused ?? "").toContain("`to`")
})
