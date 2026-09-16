import { afterAll, expect, test } from "bun:test"
import { extensionHostReachesNoBunCode } from "akasha/check/code/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.check-code.audit.code.ts"
import { manifestIn } from "akasha/check/code/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.check-code.decision.code.ts"
import {
  ENTRY,
  MANIFEST,
  NEXT,
  scratch,
  tracked,
  withManifest,
} from "akasha/check/code/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.check-code.decision.test-fixtures.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const READS_NEXT = 'import { next } from "./next.module.code.ts"\n\nexport const one = next\n'

test("a page of a type extending the declarer states where the editor is linked", () => {
  expect(manifestIn(shadowAt(tracked(withManifest({}))).index)).toBe(MANIFEST)
})

test("a tree whose host graph reaches no bun is let through", () => {
  const root = tracked(withManifest({ [ENTRY]: READS_NEXT, [NEXT]: "export const next = 2\n" }))
  expect(extensionHostReachesNoBunCode(root)).toEqual([])
})

test("a bun module no change names is refused, an audit reading the whole tree", () => {
  const root = tracked(withManifest({ [ENTRY]: READS_NEXT, [NEXT]: 'import "bun:ffi"\n' }))
  expect(extensionHostReachesNoBunCode(root).map((one) => one.path)).toEqual([NEXT])
})
