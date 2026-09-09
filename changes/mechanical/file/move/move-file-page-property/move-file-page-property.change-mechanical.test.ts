import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./move-file-page-property.change-mechanical.code.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

const PROPERTY_INTO = "akasha/two/properties/kept.text-property.ts"

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

test("a page property path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldOf(carried), { from: PROPERTY, to: PROPERTY_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical-file/move-file-page")
  expect(carried.given).toEqual({ from: PROPERTY, to: PROPERTY_INTO })
})
