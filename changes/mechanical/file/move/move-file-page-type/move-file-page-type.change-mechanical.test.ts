import { expect, test } from "bun:test"
import {
  type Carried,
  worldRecording,
} from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./move-file-page-type.change-mechanical.code.ts"

const TYPE = "akasha/kept.page-type.ts"

const TYPE_INTO = "akasha/two/kept.page-type.ts"

test("a page type path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldRecording(carried), { from: TYPE, to: TYPE_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical-file/move-file-page")
  expect(carried.given).toEqual({ from: TYPE, to: TYPE_INTO })
})
