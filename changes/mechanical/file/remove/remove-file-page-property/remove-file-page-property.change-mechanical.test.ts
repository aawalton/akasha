import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./remove-file-page-property.change-mechanical.code.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

type Taken = { at: string; given: unknown }

function worldOf(taken: Taken): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      taken.at = at
      taken.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("a page property path is taken away by the change this change reaches", async () => {
  const taken: Taken = { at: "", given: null }

  const said = await runChange(worldOf(taken), { at: PROPERTY })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe("change-mechanical-file/remove-file-page")
  expect(taken.given).toEqual({ at: PROPERTY })
})
