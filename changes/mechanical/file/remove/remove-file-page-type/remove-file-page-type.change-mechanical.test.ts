import { afterAll, expect, test } from "bun:test"
import { bodyOf, idOf, indexedRepo, scratch } from "@akasha/indexes/indexing/testing"
import { worldTaking } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
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

test("a page type path is taken away by the change this change reaches", async () => {
  const root = indexedRepo({ [KEPT_TYPE]: TYPE })

  const said = await runChange(worldTaking(root, REACHES), { at: KEPT_TYPE })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "remove", path: KEPT_TYPE }])
})
