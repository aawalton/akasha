import { afterAll, expect, test } from "bun:test"
import { noRawNulBytes } from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.check.code.ts"
import {
  CERTIFICATE,
  ELSEWHERE,
  letThrough,
  NUL,
  scratch,
  TWO_NULS,
} from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.decision.test-fixtures.ts"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

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
