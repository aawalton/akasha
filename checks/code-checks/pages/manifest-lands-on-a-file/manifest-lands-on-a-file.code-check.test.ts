import { afterAll, expect, test } from "bun:test"
import type { Change } from "@akasha/pages/change"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { manifestLandsOnAFile } from "./manifest-lands-on-a-file.code-check.code.ts"
import {
  AT,
  EXPORTS,
  HELD,
  MANIFEST_AT,
  manifest,
  rooted,
  scratch,
  wrote,
} from "./manifest-lands-on-a-file.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(held: Change): readonly Judged[] {
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return manifestLandsOnAFile(held, cast.shadow)
}

test("every manifest the index names is judged whether or not the change has it", () => {
  const root = wrote(rooted(), { [MANIFEST_AT]: manifest({ exports: EXPORTS }) })

  const said = judged(change(root, ["akasha/held/gone.module.code.ts"]))

  expect(said.map((one) => one.path)).toEqual([MANIFEST_AT])
  expect(said[0]?.reason).toContain(AT)
})

test("a way in landing on a file the change leaves there is let through", () => {
  const root = wrote(rooted(), {
    [MANIFEST_AT]: manifest({ exports: EXPORTS }),
    [AT]: HELD,
  })

  expect(judged(change(root, [AT]))).toEqual([])
})
