import { expect, test } from "bun:test"
import { indexIsLevelWithThePages } from "akasha/checks/code-checks/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.code-check.check.code.ts"

test("nothing is refused at change, because the index is judged whole at audit", () => {
  expect(indexIsLevelWithThePages()).toEqual([])
})
