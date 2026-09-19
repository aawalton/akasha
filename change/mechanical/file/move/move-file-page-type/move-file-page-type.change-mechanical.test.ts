import { expect, test } from "bun:test"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFilePage } from "akasha/change/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.ts"
import { runChange } from "akasha/change/mechanical/file/move/move-file-page-type/move-file-page-type.change-mechanical.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const MOVE_FILE_PAGE = `${changeMechanicalFile.slug}/${moveFilePage.slug}` as const

const TYPE = "akasha/kept.page-type.ts"

const TYPE_INTO = "akasha/two/kept.page-type.ts"

test("a page type path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldRecording(carried), { from: TYPE, to: TYPE_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(MOVE_FILE_PAGE)
  expect(carried.given).toEqual({ from: TYPE, to: TYPE_INTO })
})
