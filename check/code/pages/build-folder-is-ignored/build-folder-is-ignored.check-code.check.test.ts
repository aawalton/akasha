import { afterAll, expect, test } from "bun:test"
import { buildFolderIsIgnored } from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.check.code.ts"
import {
  BUILT_AT,
  built,
  IGNORES_AT,
  IGNORING,
  NOT_IGNORING,
  PAGE_AT,
} from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.decision.test-fixtures.ts"
import {
  change,
  judgingBy,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const judged = judgingBy(buildFolderIsIgnored)

test("a page the change has naming a build folder no rule ignores is refused", () => {
  const said = judged(change(built({ [IGNORES_AT]: NOT_IGNORING }), [PAGE_AT]))
  expect(said.map((one) => one.path)).toEqual([PAGE_AT])
  expect(said[0]?.reason).toContain(BUILT_AT)
})

test("a change to a .gitignore judges every page naming a build folder", () => {
  const said = judged(change(built({ [IGNORES_AT]: NOT_IGNORING }), [IGNORES_AT]))
  expect(said.map((one) => one.path)).toEqual([PAGE_AT])
})

test("a page whose build folder a rule ignores is let through", () => {
  expect(judged(change(built({ [IGNORES_AT]: IGNORING }), [PAGE_AT, IGNORES_AT]))).toEqual([])
})

test("a change with no page and no .gitignore judges nothing", () => {
  expect(judged(change(built({ [IGNORES_AT]: NOT_IGNORING }), ["akasha/web/notes.txt"]))).toEqual(
    []
  )
})
