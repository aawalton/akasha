import { afterAll, expect, test } from "bun:test"
import { scratch } from "@akasha/indexes/indexing/testing"
import ts from "typescript"
import { worldAt } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  literalsIn,
  renamePropertySignature,
} from "./rename-property-signature.change-mechanical-file-content.code.ts"

function aliasIn(said: string): ts.TypeNode {
  const source = ts.createSourceFile("held.ts", said, ts.ScriptTarget.Latest, true)
  const held = source.statements[0]
  if (held === undefined || !ts.isTypeAliasDeclaration(held)) throw new Error(`no alias in ${said}`)
  return held.type
}

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

test("a union of type literals is read as every literal in it", () => {
  expect(literalsIn(aliasIn("type Held = { one: string } | { one: number }\n"))).toHaveLength(2)
})

test("an intersection of type literals is read as every literal in it", () => {
  expect(literalsIn(aliasIn("type Held = { one: string } & { two: number }\n"))).toHaveLength(2)
})

test("a type that is neither a literal nor a shape of them is read as no literal", () => {
  expect(literalsIn(aliasIn("type Held = string\n"))).toEqual([])
})
