import { afterAll, expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFilePage } from "akasha/change/mechanical/file/add/add-file-page/add-file-page.change-mechanical.ts"
import { runChange } from "akasha/change/mechanical/file/add/add-file-page-type/add-file-page-type.change-mechanical.code.ts"
import { worldIn } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  indexedRepo,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

const REACHES = `${changeMechanical.slug}/${addFilePage.slug}` as const

afterAll(scratch.sweep)

const BODY = "export const fresh = 1\n"

test("a page type path is written by the change this change reaches", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.page-type.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "add", path: at, content: BODY }])
})
