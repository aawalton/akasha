import { expect, test } from "bun:test"
import {
  type Carried,
  worldRecording,
} from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./move-file-page-property.change-mechanical.code.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

const PROPERTY_INTO = "akasha/two/properties/kept.text-property.ts"

test("a page property path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldRecording(carried), { from: PROPERTY, to: PROPERTY_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical-file/move-file-page")
  expect(carried.given).toEqual({ from: PROPERTY, to: PROPERTY_INTO })
})
