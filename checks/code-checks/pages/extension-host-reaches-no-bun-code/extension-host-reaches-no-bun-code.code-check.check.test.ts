import { afterAll, expect, test } from "bun:test"
import { shadowAsked } from "@akasha/pages/shadow"
import { extensionHostReachesNoBunCode } from "./extension-host-reaches-no-bun-code.code-check.check.code.ts"
import {
  bodied,
  ENTRY,
  NEXT,
  rooted,
  scratch,
  withManifest,
} from "./extension-host-reaches-no-bun-code.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const READS_NEXT = 'import { next } from "./next.module.code.ts"\n\nexport const one = next\n'

function pathsIn(bodies: Readonly<Record<string, string>>): readonly string[] {
  const held = bodied(rooted(), withManifest(bodies))
  return extensionHostReachesNoBunCode(held, shadowAsked(held)).map((one) => one.path)
}

test("a bun module the host loads is refused through the check", () => {
  expect(pathsIn({ [ENTRY]: READS_NEXT, [NEXT]: 'import "bun:ffi"\n' })).toEqual([NEXT])
})

test("a graph the host loads that reaches no bun is let through", () => {
  expect(pathsIn({ [ENTRY]: READS_NEXT, [NEXT]: "export const next = 2\n" })).toEqual([])
})

test("the check runs on the manifest as well as on a text", () => {
  const held = bodied(rooted(), {})
  const shadow = shadowAsked(held)
  const takes = (path: string): boolean => extensionHostReachesNoBunCode.isInput(path, shadow)
  expect(takes("editor-extension/ops-extension/package.json")).toBe(true)
  expect(takes(NEXT)).toBe(true)
  expect(takes("design/colors/pages/blue.color.md")).toBe(false)
})
