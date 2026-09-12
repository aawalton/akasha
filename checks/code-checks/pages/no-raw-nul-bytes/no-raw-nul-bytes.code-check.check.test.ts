import { afterAll, expect, test } from "bun:test"
import { noRawNulBytes } from "akasha/checks/code-checks/pages/no-raw-nul-bytes/no-raw-nul-bytes.code-check.check.code.ts"
import {
  CERTIFICATE,
  ELSEWHERE,
  letThrough,
  NUL,
  scratch,
  TWO_NULS,
} from "akasha/checks/code-checks/pages/no-raw-nul-bytes/no-raw-nul-bytes.code-check.decision.test-fixtures.ts"
import { onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const HOLDING = letThrough()

afterAll(scratch.sweep)

test("the check lets the named file through and says why it judges the one elsewhere", () => {
  const held = `${NUL}${NUL}`
  writing(HOLDING, CERTIFICATE, held)
  writing(HOLDING, ELSEWHERE, held)
  const both = onDisk(HOLDING)
  const change = { root: HOLDING, changed: [CERTIFICATE, ELSEWHERE], before: both, after: both }
  expect(noRawNulBytes(change, shadowAt(HOLDING))).toEqual([{ path: ELSEWHERE, reason: TWO_NULS }])
})
