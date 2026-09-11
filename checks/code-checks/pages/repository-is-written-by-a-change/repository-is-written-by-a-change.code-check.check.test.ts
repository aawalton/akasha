import { afterAll, expect, test } from "bun:test"
import { repositoryIsWrittenByAChange } from "akasha/checks/code-checks/pages/repository-is-written-by-a-change/repository-is-written-by-a-change.code-check.check.code.ts"
import {
  AT,
  IGNORE_AT,
  IGNORES_HOLDING,
  IGNORES_LESS,
  READS,
  rooted,
  scratch,
  WRITES,
  WRITES_HELD,
  WRITES_VENDORED,
} from "akasha/checks/code-checks/pages/repository-is-written-by-a-change/repository-is-written-by-a-change.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { landing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

function judgedOver(files: Readonly<Record<string, Uint8Array>>): readonly Judged[] {
  const held = landing(rooted(), files)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return repositoryIsWrittenByAChange(held, cast.shadow)
}

function judged(text: string): readonly Judged[] {
  return judgedOver({ [AT]: bytesOf(text) })
}

test("the check refuses code the change carries that writes TypeScript under the root", () => {
  const said = judged(WRITES)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("only a change writes the repository")
})

test("the check lets through code that writes nothing under the root", () => {
  expect(judged(READS)).toEqual([])
})

test("a write into a folder the `.gitignore` on disk does not name is refused", () => {
  expect(judged(WRITES_HELD)).toHaveLength(1)
})

test("that same write is let through where the change adds the folder to `.gitignore`", () => {
  expect(judgedOver({ [AT]: bytesOf(WRITES_HELD), [IGNORE_AT]: bytesOf(IGNORES_HOLDING) })).toEqual(
    []
  )
})

test("a write into a folder the `.gitignore` on disk names is let through", () => {
  expect(judged(WRITES_VENDORED)).toEqual([])
})

test("that same write is refused where the change takes the folder out of `.gitignore`", () => {
  expect(
    judgedOver({ [AT]: bytesOf(WRITES_VENDORED), [IGNORE_AT]: bytesOf(IGNORES_LESS) })
  ).toHaveLength(1)
})

test("the check takes the code outside the changes as its input and no other body", () => {
  const cast = shadowFor(landing(rooted(), { [AT]: bytesOf(READS) }))
  if ("refused" in cast) throw new Error(cast.refused)
  const inside = "changes/one/one.module.code.ts"

  expect(repositoryIsWrittenByAChange.isInput(AT, cast.shadow)).toBe(true)
  expect(repositoryIsWrittenByAChange.isInput(inside, cast.shadow)).toBe(false)
})

test("a page of another type sharing the command slug does not move where the commands are", () => {
  const cast = shadowFor(landing(rooted(), { [AT]: bytesOf(READS) }))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(
    repositoryIsWrittenByAChange.isInput("commands/one/one.command.code.ts", cast.shadow)
  ).toBe(false)
})
