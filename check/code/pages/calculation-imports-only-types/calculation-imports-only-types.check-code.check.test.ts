import { afterAll, expect, test } from "bun:test"
import { calculationImportsOnlyTypes } from "akasha/check/code/pages/calculation-imports-only-types/calculation-imports-only-types.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { arriving } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AT = "akasha/held.computed-property.code.ts"

const VALUE = 'import { a } from "./x.ts"\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function judged(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const root = scratch.rootFor("akasha-calculation-check-")
  return calculationImportsOnlyTypes(arriving(root, bodies), shadowAt(root))
}

test("a body the change carries is judged by what the decision answers", () => {
  const said = judged({ [AT]: VALUE })
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`a`")
})

test("a file that is not TypeScript is passed over", () => {
  expect(judged({ "akasha/notes.txt": VALUE })).toEqual([])
})

test("a file that is no calculation's code file is passed over", () => {
  expect(judged({ "akasha/held.computed-property.ts": VALUE })).toEqual([])
})
