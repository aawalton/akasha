import { expect, test } from "bun:test"
import {
  literalsIn,
  signatureRespelled,
} from "akasha/change/modules/property-signature-renaming/property-signature-renaming.module.code.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import ts from "typescript"

const TYPES_AT = "akasha/quoin/quoin.module.types.ts"

const TYPES_BODY = "export type Quoin = { wold: string }\n"

const CODE_AT = "akasha/quoin/quoin.module.code.ts"

const CODE_BODY = `import type { Quoin } from "./quoin.module.types.ts"

export const quoin: Quoin = { wold: "ts" }
`

const ENTRIES_AT = "akasha/quoin/quoin.module.tallies.jsonl"

const HELD: Readonly<Record<string, string>> = {
  [TYPES_AT]: TYPES_BODY,
  [CODE_AT]: CODE_BODY,
}

function aliasIn(said: string): ts.TypeNode {
  const source = ts.createSourceFile("held.ts", said, ts.ScriptTarget.Latest, true)
  const held = source.statements[0]
  if (held === undefined || !ts.isTypeAliasDeclaration(held)) throw new Error(`no alias in ${said}`)
  return held.type
}

function worldFor(importers: readonly string[]): World {
  return {
    ...worldOf(HELD),
    index: { everyPath: () => Object.keys(HELD), importersOf: () => importers } as never,
  }
}

test("a path that is no TypeScript body is refused", () => {
  const said = signatureRespelled(worldFor([]), {
    at: ENTRIES_AT,
    of: "Quoin.wold",
    to: "woldFile",
  })

  expect(said.refused).toBe(`\`${ENTRIES_AT}\` names no TypeScript body`)
})

test("a bare name is refused since one file declares one name on two types", () => {
  const said = signatureRespelled(worldFor([]), { at: TYPES_AT, of: "wold", to: "woldFile" })

  expect(said.refused).toBe("`wold` names no property signature — say it as `Type.property`")
})

test("a name no property could carry is refused", () => {
  const said = signatureRespelled(worldFor([]), { at: TYPES_AT, of: "Quoin.wold", to: "2two" })

  expect(said.refused).toBe("`2two` is no name a property carries")
})

test("the name it already carries is refused", () => {
  const said = signatureRespelled(worldFor([]), { at: TYPES_AT, of: "Quoin.wold", to: "wold" })

  expect(said.refused).toBe("`wold` is the name it already carries")
})

test("a file declaring no type of that name is refused", () => {
  const said = signatureRespelled(worldFor([]), { at: TYPES_AT, of: "Kept.wold", to: "woldFile" })

  expect(said.refused).toBe(`\`${TYPES_AT}\` declares no type \`Kept\``)
})

test("a type declaring no such property is refused", () => {
  const said = signatureRespelled(worldFor([]), { at: TYPES_AT, of: "Quoin.held", to: "woldFile" })

  expect(said.refused).toBe("`Quoin` declares no `held`")
})

test("the property a type declares is respelled wherever the checker resolves to it", () => {
  const world = worldFor([CODE_AT])

  const said = signatureRespelled(world, { at: TYPES_AT, of: "Quoin.wold", to: "woldFile" })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(TYPES_AT) ?? "").toContain("woldFile: string")
  expect(bodies.get(CODE_AT) ?? "").toContain('woldFile: "ts"')
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
