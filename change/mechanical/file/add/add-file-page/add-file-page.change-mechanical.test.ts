import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/change/mechanical/file/add/add-file-page/add-file-page.change-mechanical.code.ts"
import { worldIn } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  indexedRepo,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

const REACHES = "change-mechanical/add-file-code"

afterAll(scratch.sweep)

const BODY = "export const fresh = 1\n"

test("a page path is written by the change this change reaches", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.module.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "add", path: at, content: BODY }])
})
