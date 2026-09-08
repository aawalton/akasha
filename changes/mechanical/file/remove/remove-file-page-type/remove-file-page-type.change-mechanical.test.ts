import { afterAll, expect, test } from "bun:test"
import { bodyOf, idOf, indexedRepo, NAMER_PAGE, scratch } from "@akasha/indexes/indexing/testing"
import { worldTaking } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./remove-file-page-type.change-mechanical.code.ts"

const REACHES = "change-mechanical-file/remove-file-page"

afterAll(scratch.sweep)

const KEPT_TYPE = "akasha/kept.page-type.ts"

const TYPE = bodyOf({
  id: idOf("e"),
  pageTypeSlug: "page-type",
  slug: "kept",
  extendsSlug: ["page-type/page"],
})

const REFUSED = "is under no `page-type` name, so this change takes nothing away"

test("a page type path is taken away by the change this change reaches", async () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE })

  const said = await runChange(worldTaking(root, REACHES), { at: KEPT_TYPE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "remove", path: KEPT_TYPE }])
})

test("a page that is no page type is refused", async () => {
  const root = indexedRepo()

  const said = await runChange(worldTaking(root, REACHES), { at: NAMER_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` ${REFUSED}`)
})

test("a path beside a page type is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/kept.page-type.code.ts"

  const said = await runChange(worldTaking(root, REACHES), { at })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` ${REFUSED}`)
})

test("a path under no page type is refused", async () => {
  const root = indexedRepo()
  const at = "akasha/one/kept.notatype.ts"

  const said = await runChange(worldTaking(root, REACHES), { at })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${at}\` ${REFUSED}`)
})
