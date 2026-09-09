import { afterAll, expect, test } from "bun:test"
import { indexedRepo, scratch } from "@akasha/indexes/indexing/testing"
import { worldIn } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./add-file-page.change-mechanical.code.ts"

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
