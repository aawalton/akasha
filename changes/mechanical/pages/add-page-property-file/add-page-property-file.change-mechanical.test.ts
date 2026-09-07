import { afterAll, expect, test } from "bun:test"
import { indexedRepo, scratch } from "@akasha/indexes/indexing/testing"
import { worldIn } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./add-page-property-file.change-mechanical.code.ts"

const REACHES = "change-mechanical-file/add-page-file"

afterAll(scratch.sweep)

const BODY = "export const fresh = 1\n"

function whyRefused(at: string): string {
  return `\`${at}\` is under no page property name, so this change writes nothing`
}

test("a page property path is written by the change this change reaches", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.relation-property.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ path: at, was: null, body: BODY }])
})

test("a page that is no page property is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.module.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(whyRefused(at))
})

test("a path beside a page property is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.relation-property.code.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(whyRefused(at))
})

test("a path under no page type is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/fresh.notatype.ts"

  const said = await runChange(worldIn(root, REACHES), { at, body: BODY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(whyRefused(at))
})
