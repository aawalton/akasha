import { expect, test } from "bun:test"
import { indexIsLevelWithThePages } from "akasha/check/code/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.check-code.check.code.ts"

test("nothing is refused at change, because the index is judged whole at audit", () => {
  expect(indexIsLevelWithThePages()).toEqual([])
})
