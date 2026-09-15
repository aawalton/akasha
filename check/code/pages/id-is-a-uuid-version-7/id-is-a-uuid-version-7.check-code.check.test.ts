import { afterAll, expect, test } from "bun:test"
import { idIsAUuidVersion7 } from "akasha/check/code/pages/id-is-a-uuid-version-7/id-is-a-uuid-version-7.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { arriving } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AT = "akasha/held.check.ts"

const PAGE = 'export const one = {\n  id: "held-1",\n} as const satisfies Check\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function judged(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const root = scratch.rootFor("akasha-id-check-")
  return idIsAUuidVersion7(arriving(root, bodies), shadowAt(root))
}

test("a body the change carries is judged by what the decision answers", () => {
  const said = judged({ [AT]: PAGE })
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("is not a uuid")
})

test("a file that is not TypeScript is passed over", () => {
  expect(judged({ "akasha/notes.txt": PAGE })).toEqual([])
})
