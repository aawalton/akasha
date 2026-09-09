import { expect, test } from "bun:test"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { removeFolder, runChange } from "./remove-folder.change-agent.code.ts"

const AT = "akasha/code-system"

const REMOVE_FOLDER = "change-mechanical-folder/remove-folder"

const REFUSED = "`akasha/code-system` holds no body, so nothing is taken away"

type Carried = { at: string; given: unknown }

function worldOf(carried: Carried, answers: Answer): World {
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
      return Promise.resolve(answers)
    },
  }
}

test("the whole removal is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await removeFolder(worldOf(carried, NOTHING_OVER), { at: AT })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(REMOVE_FOLDER)
  expect(carried.given).toEqual({ at: AT })
})

test("a refusal from the change reached is this change's answer", async () => {
  const world = worldOf({ at: "", given: null }, refusing(REFUSED))

  const said = await removeFolder(world, { at: AT })

  expect(said.refused).toBe(REFUSED)
  expect(said.edits).toEqual([])
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const world = worldOf({ at: "", given: null }, NOTHING_OVER)

  const said = await runChange(world, {})

  expect(said.refused ?? "").toContain("`at`")
})
