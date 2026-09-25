import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { hashIndexedEntryKeepsItsPlace } from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/hash-indexed-entry-keeps-its-place.check-code.audit.code.ts"
import { treed } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const PAGE = "kit/kit.module.ts"

const CODE = "kit/kit.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(code: string, named: readonly string[]): string {
  const root = scratch.rootFor("akasha-hash-indexed-audit-")
  valueAlsoFiled(root, module.slug, [
    { path: PAGE, value: { slug: "kit", code: "ts", hashIndexed: named } },
  ])
  mkdirSync(dirname(join(root, CODE)), { recursive: true })
  writeFileSync(join(root, CODE), code)
  return treed(root)
}

test("an audit lets through every marked table it can read", () => {
  expect(hashIndexedEntryKeepsItsPlace(rooted('const KITS = ["a", "b"]\n', ["KITS"]))).toEqual([])
})

test("an audit refuses a mark naming a table its code does not hold", () => {
  const said = hashIndexedEntryKeepsItsPlace(rooted('const KITS = ["a"]\n', ["SLOTS"]))
  expect(said.map((one) => one.path)).toEqual([CODE])
  expect(said[0]?.reason).toContain("declares no `SLOTS`")
})
