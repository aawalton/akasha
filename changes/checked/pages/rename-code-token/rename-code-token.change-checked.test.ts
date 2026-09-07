import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as renameExport } from "../../../mechanical/pages/rename-export/rename-export.change-mechanical.code.ts"
import { runChange as renameLocalVariable } from "../../../mechanical/pages/rename-local-variable/rename-local-variable.change-mechanical.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renameCodeToken } from "./rename-code-token.change-checked.code.ts"

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

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, async (world, at, given) => {
    if (at === "change-mechanical/rename-export") {
      return await renameExport(world, given as Parameters<typeof renameExport>[1])
    }
    if (at === "change-mechanical/rename-local-variable") {
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
  expect(said.edits.map((one) => one.path).sort()).toEqual([HELD_CODE, NAMER_CODE])
  expect(said.edits.find((one) => one.path === HELD_CODE)?.body).toBe(
    `export const ${CARRIED} = 1\n`
  )
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
  expect(said.edits.find((one) => one.path === LOCAL)?.body).toBe(BODY.replaceAll("kept", CARRIED))
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
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

  expect(reached).toEqual(["change-mechanical/rename-export"])
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

  expect(reached).toEqual(["change-mechanical/rename-local-variable"])
})
