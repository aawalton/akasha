import { afterAll, expect, test } from "bun:test"
import { scratch } from "@akasha/indexes/indexing/testing"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renamePropertySignature } from "./rename-property-signature.change-mechanical.code.ts"

afterAll(scratch.sweep)

const CODE = "akasha/one/held/held.module.code.ts"

function whyOf(at: string, of: string, to: string): string {
  const world = worldAt(scratch.rootFor("rename-property-"), () => null)
  const said = renamePropertySignature(world, { at, of, to })
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("a path that is no TypeScript body is refused", () => {
  expect(whyOf("akasha/one/held/held.md", "Held.one", "two")).toBe(
    "`akasha/one/held/held.md` names no TypeScript body"
  )
})

test("a bare name is refused, since one file declares one name on two types", () => {
  expect(whyOf(CODE, "one", "two")).toBe(
    "`one` names no property signature — say it as `Type.property`"
  )
})

test("a name no property could carry is refused", () => {
  expect(whyOf(CODE, "Held.one", "2two")).toBe("`2two` is no name a property carries")
})

test("the name it already carries is refused", () => {
  expect(whyOf(CODE, "Held.one", "one")).toBe("`one` is the name it already carries")
})

test("an index that cannot answer refuses rather than narrowing the reach", () => {
  expect(whyOf(CODE, "Held.one", "two")).toContain("so none were repointed")
})
