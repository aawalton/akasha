import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file/remove/remove-file-page-type/remove-file-page-type.change-mechanical.code.ts"
import { worldTaking } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  scratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

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
