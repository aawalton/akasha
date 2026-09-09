import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./move-file-page-type.change-mechanical.code.ts"

const TYPE = "akasha/kept.page-type.ts"

const TYPE_INTO = "akasha/two/kept.page-type.ts"

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

test("a page type path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldOf(carried), { from: TYPE, to: TYPE_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical-file/move-file-page")
  expect(carried.given).toEqual({ from: TYPE, to: TYPE_INTO })
})
