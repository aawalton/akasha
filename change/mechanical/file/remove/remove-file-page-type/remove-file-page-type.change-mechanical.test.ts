import { afterAll, expect, test } from "bun:test"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import { runChange } from "akasha/change/mechanical/file/remove/remove-file-page-type/remove-file-page-type.change-mechanical.code.ts"
import { worldTaking } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

const REACHES = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

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
