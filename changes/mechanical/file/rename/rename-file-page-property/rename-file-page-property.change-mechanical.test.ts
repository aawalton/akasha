import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./rename-file-page-property.change-mechanical.code.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

const TO = "carried"

type Renamed = { at: string; given: unknown }

function worldOf(renamed: Renamed): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      renamed.at = at
      renamed.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("a page property path is renamed by the change this change reaches", async () => {
  const renamed: Renamed = { at: "", given: null }

  const said = await runChange(worldOf(renamed), { at: PROPERTY, to: TO })

  expect(said.refused).toBe(null)
  expect(renamed.at).toBe("change-mechanical/rename-file-page")
  expect(renamed.given).toEqual({ at: PROPERTY, to: TO })
})

test("a plural this change was handed is handed on", async () => {
  const renamed: Renamed = { at: "", given: null }

  await runChange(worldOf(renamed), { at: PROPERTY, to: TO, plural: "carries" })

  expect(renamed.given).toEqual({ at: PROPERTY, to: TO, plural: "carries" })
})
