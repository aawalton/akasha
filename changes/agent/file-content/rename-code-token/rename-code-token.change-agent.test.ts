import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as renameExport } from "../../../mechanical/file-content/rename/rename-export/rename-export.change-mechanical-file-content.code.ts"
import { runChange as renameLocalVariable } from "../../../mechanical/file-content/rename/rename-local-variable/rename-local-variable.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World, worldAt } from "../../../modules/shadow/change-shadow.module.code.ts"
import { renameCodeToken } from "./rename-code-token.change-agent.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const LOCAL = "akasha/one/local.module.code.ts"

const PAGE = "akasha/one/local.module.ts"

const BODY = `export function held(): number {
  const kept = 1
  return kept + 1
}
`

const PAGE_BODY = `export const held = 1\n`

const TYPES = "akasha/one/local.module.types.ts"

const TYPES_BODY = `export type Kept = { readonly one: number }\n`

const STRAY = "held.ts"

const FILE_TYPE_BODY = `type Kept = { readonly one: number }

export const held: Kept = { one: 1 }
`

const FILE_CONST_BODY = `const kept = 1

export function held(): number {
  return kept + 1
}
`

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, async (world, at, given) => {
    if (at === "change-mechanical-file-content/rename-export") {
      return renameExport(world, given as Parameters<typeof renameExport>[1])
    }
    if (at === "change-mechanical-file-content/rename-local-variable") {
      return renameLocalVariable(world, given as Parameters<typeof renameLocalVariable>[1])
    }
    return refusing(`\`${at}\` is reached by nothing here`)
  })
}

function heldIn(root: string, at: string, body: string): World {
  return worldIn(root, (path) => (path === at ? body : null))
}

test("a path that is no TypeScript body is refused", async () => {
  const world = worldIn(scratch.rootFor("token-"), () => null)
  const said = await renameCodeToken(world, { at: "a.md", of: "one", to: "two" })
  expect(said.refused).toBe("`a.md` names no TypeScript body")
})

test("a body that could not be read is refused", async () => {
  const world = worldIn(scratch.rootFor("token-"), () => null)
  const said = await renameCodeToken(world, { at: LOCAL, of: "one", to: "two" })
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` could not be read")
})

test("a page is refused, since a page's export is its slug", async () => {
  const world = heldIn(scratch.rootFor("token-"), PAGE, PAGE_BODY)
  const said = await renameCodeToken(world, { at: PAGE, of: "held", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${PAGE}\` is a page, and a page's export is its slug`)
})

test("a path beside no page is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), STRAY, PAGE_BODY)
  const said = await renameCodeToken(world, { at: STRAY, of: "held", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${STRAY}\` sits beside no page`)
})

test("a file beside a page holding types is read rather than refused as a page", async () => {
  const world = heldIn(scratch.rootFor("token-"), TYPES, TYPES_BODY)
  const said = await renameCodeToken(world, { at: TYPES, of: "Kept", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("so none were repointed")
})

test("a name no body could carry is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "held", to: "2two" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`2two` is no name a body carries")
})

test("the name it already carries is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "held", to: "held" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`held` is the name it already carries")
})

test("an index that cannot answer refuses rather than narrowing the reach", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "held", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("so none were repointed")
})

test("an exported name is renamed through every importer", async () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect([...new Set(pathsIn(said))].sort()).toEqual([HELD_CODE, NAMER_CODE])
  expect(bodiesIn(said, world.base).get(HELD_CODE)).toBe(`export const ${CARRIED} = 1\n`)
})

test("a rename refuses where a file it would change already reaches the new name", async () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, { at: HELD_CODE, of: HELD_EXPORT, to: "named" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_CODE}\` already reaches a \`named\``)
})

test("the bodies are answered rather than written", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await renameCodeToken(worldIn(root, text), {
    at: HELD_CODE,
    of: HELD_EXPORT,
    to: CARRIED,
  })
  expect(said.refused).toBe(null)
  expect(text(HELD_CODE)).toBe(`export const ${HELD_EXPORT} = 1\n`)
  expect(text(NAMER_CODE)).toContain(`import { ${HELD_EXPORT} }`)
})

test("a name no export carries is renamed over its own file", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(LOCAL)).toBe(BODY.replaceAll("kept", CARRIED))
  expect(said.edits[0]?.kind).toBe("replace")
})

test("a top-level type alias no export carries is spelled anew over its own file", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, FILE_TYPE_BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "Kept", to: "Carried" })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(LOCAL)).toBe(FILE_TYPE_BODY.replaceAll("Kept", "Carried"))
})

test("a top-level const no export carries is spelled anew over its own file", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, FILE_CONST_BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, world.base).get(LOCAL)).toBe(FILE_CONST_BODY.replaceAll("kept", CARRIED))
})

test("a file-scope name is handed to the change reached at the export address", async () => {
  const reached: string[] = []
  const world = worldAt(
    scratch.rootFor("token-"),
    (path) => (path === LOCAL ? FILE_CONST_BODY : null),
    (_world, at) => {
      reached.push(at)
      return Promise.resolve({ edits: [], refused: null })
    }
  )

  await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })

  expect(reached).toEqual(["change-mechanical-file-content/rename-export"])
})

test("a name the file declares nowhere is refused", async () => {
  const world = heldIn(scratch.rootFor("token-"), LOCAL, BODY)
  const said = await renameCodeToken(world, { at: LOCAL, of: "missing", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` declares no `missing`")
})

test("an exported name is handed to the change reached at the export address", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await renameCodeToken(world, { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED })

  expect(reached).toEqual(["change-mechanical-file-content/rename-export"])
})

test("a local name is handed to the change reached at the local address", async () => {
  const reached: string[] = []
  const world = worldAt(
    scratch.rootFor("token-"),
    (path) => (path === LOCAL ? BODY : null),
    (_world, at) => {
      reached.push(at)
      return Promise.resolve({ edits: [], refused: null })
    }
  )

  await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })

  expect(reached).toEqual(["change-mechanical-file-content/rename-local-variable"])
})
