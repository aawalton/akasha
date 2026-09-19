import { expect, test } from "bun:test"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFilePage } from "akasha/change/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.ts"
import { runChange } from "akasha/change/mechanical/file/move/move-file-page-property/move-file-page-property.change-mechanical.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const MOVE_FILE_PAGE = `${changeMechanicalFile.slug}/${moveFilePage.slug}` as const

const PROPERTY = "akasha/properties/kept.text-property.ts"

const PROPERTY_INTO = "akasha/two/properties/kept.text-property.ts"

test("a page property path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldRecording(carried), { from: PROPERTY, to: PROPERTY_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(MOVE_FILE_PAGE)
  expect(carried.given).toEqual({ from: PROPERTY, to: PROPERTY_INTO })
})
