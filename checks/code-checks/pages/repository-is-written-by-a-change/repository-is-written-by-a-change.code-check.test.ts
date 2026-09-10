import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { landing } from "../../../modules/scratch/check-scratch.module.code.ts"
import { repositoryIsWrittenByAChange } from "./repository-is-written-by-a-change.code-check.code.ts"
import {
  AT,
  READS,
  rooted,
  scratch,
  WRITES,
} from "./repository-is-written-by-a-change.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(text: string): readonly Judged[] {
  const held = landing(rooted(), { [AT]: bytesOf(text) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return repositoryIsWrittenByAChange(held, cast.shadow)
}

test("the check refuses code the change carries that writes TypeScript under the root", () => {
  const said = judged(WRITES)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("only a change writes the repository")
})

test("the check lets through code that writes nothing under the root", () => {
  expect(judged(READS)).toEqual([])
})

test("the check takes the code outside the changes as its input and no other body", () => {
  const cast = shadowFor(landing(rooted(), { [AT]: bytesOf(READS) }))
  if ("refused" in cast) throw new Error(cast.refused)
  const inside = "changes/one/one.module.code.ts"

  expect(repositoryIsWrittenByAChange.isInput(AT, cast.shadow)).toBe(true)
  expect(repositoryIsWrittenByAChange.isInput(inside, cast.shadow)).toBe(false)
})
