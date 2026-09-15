import { afterAll, expect, test } from "bun:test"
import { noRawNulBytes } from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.audit.code.ts"
import {
  AWAY,
  CERTIFICATE,
  NUL,
  scratch,
  TWO_NULS,
  tracked,
} from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree whose files carry no NUL is let through", () => {
  expect(noRawNulBytes(tracked({ "akasha/held.ts": "const one = 1\n" }))).toEqual([])
})

test("a NUL no change names is refused, and the file a property names is let through", () => {
  const held = `${NUL}${NUL}`
  const said = noRawNulBytes(tracked({ [CERTIFICATE]: held, [AWAY]: held }))
  expect(said.map((one) => one.path)).toEqual([AWAY])
  expect(said[0]?.reason).toBe(TWO_NULS)
})
