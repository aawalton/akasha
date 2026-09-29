import { afterAll, expect, test } from "bun:test"
import { noPageAddressSpelled } from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.check.code.ts"
import {
  ADDRESS,
  HELD,
  PAGE,
  rooted,
  scratch,
} from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { change } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const SPELLS = `const AT = "${ADDRESS}"\n`

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noPageAddressSpelled(held, cast.shadow)
}

test("a body the change carries spelling a page's address is refused, naming the address", () => {
  const said = judged(rooted({ [HELD]: SPELLS }), [HELD])
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain(`\`${ADDRESS}\``)
})

test("which openings are page types is read off the index the change leaves", () => {
  const body = 'const AT = "nowhere/held"\n'
  expect(judged(rooted({ [HELD]: body }), [HELD])).toEqual([])
})

test("a page arriving refuses a body already there that spells the page's address", () => {
  const root = rooted({ [HELD]: SPELLS, [PAGE]: "export const held = {}\n" })
  const held = change(root, [PAGE])
  const arriving = { ...held, before: (path: string) => (path === PAGE ? null : held.before(path)) }
  const cast = shadowFor(arriving)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = noPageAddressSpelled(arriving, cast.shadow)
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain(`\`${ADDRESS}\``)
})

test("a page already there judges no body the change does not carry", () => {
  const root = rooted({ [HELD]: SPELLS, [PAGE]: "export const held = {}\n" })
  expect(judged(root, [PAGE])).toEqual([])
})

test("a page the change carries is passed over", () => {
  const body = `export const held = { parts: ["${ADDRESS}"] }\n`
  expect(judged(rooted({ [PAGE]: body }), [PAGE])).toEqual([])
})
