import { afterAll, expect, test } from "bun:test"
import { noPageAddressSpelled } from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.audit.code.ts"
import {
  ADDRESS,
  HELD,
  scratch,
  tracked,
} from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree spelling no page's address is let through", () => {
  expect(noPageAddressSpelled(tracked({ [HELD]: "export const one = 1\n" }))).toEqual([])
})

test("a spelling no change names is refused, because an audit reads the whole tree", () => {
  const root = tracked({ [HELD]: `const AT = "${ADDRESS}"\n` })
  const said = noPageAddressSpelled(root)
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain(`\`${ADDRESS}\``)
})
