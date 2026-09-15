import { expect, test } from "bun:test"
import { runChange } from "akasha/change/mechanical/file-content/rename/rename-property-signature/rename-property-signature.change-mechanical-file-content.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const CODE = "akasha/one/held/held.module.code.ts"

function whyOf(at: string, of: string, to: string): string {
  const said = runChange(worldOf({}), { at, of, to })
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("a path that is no TypeScript body is refused", () => {
  expect(whyOf("akasha/one/held/held.md", "Held.one", "two")).toBe(
    "`akasha/one/held/held.md` names no TypeScript body"
  )
})

test("a bare name is refused where one file declares one name on two types", () => {
  expect(whyOf(CODE, "one", "two")).toBe(
    "`one` names no property signature — say it as `Type.property`"
  )
})

test("a file declaring no type at all is refused", () => {
  expect(whyOf(CODE, "Held.one", "two")).toBe(
    "`akasha/one/held/held.module.code.ts` declares no type `Held`"
  )
})
