import { afterAll, expect, test } from "bun:test"
import { noTmp } from "akasha/checks/code-checks/pages/no-tmp/no-tmp.code-check.check.code.ts"
import {
  CODE_AT,
  rooted,
  SPELLING,
  scratch,
} from "akasha/checks/code-checks/pages/no-tmp/no-tmp.code-check.decision.test-fixtures.ts"
import { change } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a reach for the scratch we refuse, in a text the change carries, is refused", () => {
  const root = rooted({ [CODE_AT]: SPELLING })
  const said = noTmp(change(root, [CODE_AT]), shadowAt(root))
  expect(said.map((one) => one.path)).toEqual([CODE_AT])
  expect(said[0]?.reason).toContain("where no scratch of ours sits")
})

test("a page saying its paths are a container's has that reach let through", () => {
  const root = rooted({ [CODE_AT]: SPELLING }, "akasha-no-tmp-allowed-", true)
  expect(noTmp(change(root, [CODE_AT]), shadowAt(root))).toEqual([])
})
