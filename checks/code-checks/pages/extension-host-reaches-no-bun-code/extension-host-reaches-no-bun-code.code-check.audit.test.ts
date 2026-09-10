import { afterAll, expect, test } from "bun:test"
import { extensionHostReachesNoBunCode } from "./extension-host-reaches-no-bun-code.code-check.audit.code.ts"
import {
  ENTRY,
  NEXT,
  scratch,
  tracked,
  withManifest,
} from "./extension-host-reaches-no-bun-code.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const READS_NEXT = 'import { next } from "./next.module.code.ts"\n\nexport const one = next\n'

test("a tree whose host graph reaches no bun is let through", () => {
  const root = tracked(withManifest({ [ENTRY]: READS_NEXT, [NEXT]: "export const next = 2\n" }))
  expect(extensionHostReachesNoBunCode(root)).toEqual([])
})

test("a bun module no change names is refused, an audit reading the whole tree", () => {
  const root = tracked(withManifest({ [ENTRY]: READS_NEXT, [NEXT]: 'import "bun:ffi"\n' }))
  expect(extensionHostReachesNoBunCode(root).map((one) => one.path)).toEqual([NEXT])
})
