import { afterAll, expect, test } from "bun:test"
import { noUnusedModules } from "akasha/check/code/pages/no-unused-modules/no-unused-modules.check-code.audit.code.ts"
import {
  founded,
  tracked,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { importFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/modules/held/held.module.ts"

const CODE_AT = "akasha/modules/held/held.module.code.ts"

const READER_AT = "akasha/modules/reader/reader.module.code.ts"

const PAGE_TEXT =
  'export const held = { id: "01a0c660-9eed-7009-8000-000000000001",' +
  ' type: "page-type/module", slug: "held" }\n'

function rooted(): string {
  const root = scratch.rootFor("akasha-unused-modules-audit-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  wrote(root, {
    [PAGE_AT]: PAGE_TEXT,
    [CODE_AT]: "export const held = 1\n",
    [READER_AT]: "export const reader = 1\n",
  })
  return tracked(root)
}

test("an audit judges every module in the tree, no change naming one of them", () => {
  expect(noUnusedModules(rooted()).map((one) => one.path)).toEqual([PAGE_AT])
})

test("an audit lets through a module another file in the tree imports", () => {
  const root = rooted()
  importFiled(root, CODE_AT, [{ path: READER_AT }])

  expect(noUnusedModules(root)).toEqual([])
})
