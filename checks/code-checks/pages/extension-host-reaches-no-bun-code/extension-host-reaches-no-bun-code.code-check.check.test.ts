import { afterAll, expect, test } from "bun:test"
import { extensionHostReachesNoBunCode } from "akasha/checks/code-checks/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.code-check.check.code.ts"
import {
  ENTRY,
  NEXT,
  rooted,
  scratch,
  withManifest,
} from "akasha/checks/code-checks/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.code-check.decision.test-fixtures.ts"
import { bodiesOver } from "akasha/checks/modules/staging/check-staging.module.code.ts"
import { shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const READS_NEXT = 'import { next } from "./next.module.code.ts"\n\nexport const one = next\n'

function pathsIn(bodies: Readonly<Record<string, string>>): readonly string[] {
  const held = bodiesOver(rooted(), withManifest(bodies))
  return extensionHostReachesNoBunCode(held, shadowAsked(held)).map((one) => one.path)
}

test("a bun module the host loads is refused through the check", () => {
  expect(pathsIn({ [ENTRY]: READS_NEXT, [NEXT]: 'import "bun:ffi"\n' })).toEqual([NEXT])
})

test("a graph the host loads that reaches no bun is let through", () => {
  expect(pathsIn({ [ENTRY]: READS_NEXT, [NEXT]: "export const next = 2\n" })).toEqual([])
})

test("the check runs on the manifest as well as on a text", () => {
  const held = bodiesOver(rooted(), {})
  const shadow = shadowAsked(held)
  const takes = (path: string): boolean => extensionHostReachesNoBunCode.isInput(path, shadow)
  expect(takes("editor-extension/ops-extension/package.json")).toBe(true)
  expect(takes(NEXT)).toBe(true)
  expect(takes("design/colors/pages/blue.color.md")).toBe(false)
})
