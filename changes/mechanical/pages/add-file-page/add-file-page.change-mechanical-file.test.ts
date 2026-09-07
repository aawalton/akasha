import { afterAll, expect, test } from "bun:test"
import { indexedRepo, scratch } from "@akasha/indexes/indexing/testing"
import { worldIn } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./add-file-page.change-mechanical-file.code.ts"

const REACHES = "change-mechanical-file/add-file-code"

afterAll(scratch.sweep)

const BODY = "export const fresh = 1\n"

test("a page path is written by the change this change reaches", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.module.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ path: at, was: null, body: BODY }])
})

test("a path beside a page is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.module.code.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` is under no page name, so this change writes nothing`)
})

test("a path under no page type is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.notatype.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` is under no page name, so this change writes nothing`)
})
