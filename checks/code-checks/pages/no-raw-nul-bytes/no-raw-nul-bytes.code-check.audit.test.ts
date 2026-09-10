import { afterAll, expect, test } from "bun:test"
import { noRawNulBytes } from "./no-raw-nul-bytes.code-check.audit.code.ts"
import {
  AWAY,
  CERTIFICATE,
  NUL,
  scratch,
  TWO_NULS,
  tracked,
} from "./no-raw-nul-bytes.code-check.decision.test-fixtures.ts"

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
