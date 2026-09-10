import { afterAll, expect, test } from "bun:test"
import { importFiled } from "@akasha/indexes/testing"
import { shadowAsked } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { noImportCycle } from "./no-import-cycle.code-check.check.code.ts"
import {
  AT,
  bodied,
  OUTSIDE,
  rooted,
  scratch,
  TWO_AT,
} from "./no-import-cycle.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const READS_TWO = 'import { two } from "./two.ts"\n\nexport const one = two\n'

const READS_ONE = 'import { one } from "./one.ts"\n\nexport const two = one\n'

const READS_ONE_OUT = 'import { one } from "./one.ts"\n\nexport const out = one\n'

function judged(root: string, bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const held = bodied(root, bodies)
  return noImportCycle(held, shadowAsked(held))
}

test("a cycle among the paths the change carries is refused through the check", () => {
  const said = judged(rooted(), { [AT]: READS_TWO, [TWO_AT]: READS_ONE })
  expect(said.map((one) => one.path)).toEqual([AT, TWO_AT])
})

test("a file outside the change is read where an importer the index files reaches it", () => {
  const root = rooted()
  importFiled(root, AT, [{ path: OUTSIDE }])
  const reads = 'import { out } from "./outside.ts"\n'
  const held = bodied(root, { [AT]: reads, [OUTSIDE]: READS_ONE_OUT })
  const said = noImportCycle({ ...held, changed: [AT] }, shadowAsked(held))
  expect(said.map((one) => one.path)).toEqual([AT, OUTSIDE])
})
