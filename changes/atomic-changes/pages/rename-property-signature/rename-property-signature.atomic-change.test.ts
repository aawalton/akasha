import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../../command-system/scratching/scratching.module.code.ts"
import { renamePropertySignature } from "./rename-property-signature.atomic-change.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CODE = "akasha/one/held/held.module.code.ts"

const NOTHING = (): null => null

function whyOf(at: string, of: string, to: string): string {
  const said = renamePropertySignature(scratch.rootFor("rename-key-"), { at, of, to }, NOTHING)
  expect(said.bodies).toBe(null)
  return said.refused ?? ""
}

test("a path that is no TypeScript body is refused", () => {
  expect(whyOf("akasha/one/held/held.md", "one", "two")).toBe(
    "`akasha/one/held/held.md` names no TypeScript body"
  )
})

test("a key no type could declare is refused", () => {
  expect(whyOf(CODE, "one", "2two")).toBe("`2two` is no key a type declares")
  expect(whyOf(CODE, "1one", "two")).toBe("`1one` is no key a type declares")
})

test("the key it already carries is refused", () => {
  expect(whyOf(CODE, "one", "one")).toBe("`one` is the key it already carries")
})

test("an index that cannot answer refuses rather than narrowing the reach", () => {
  expect(whyOf(CODE, "one", "two")).toContain("so none were repointed")
})
