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
import { runChange as respellExport } from "../../../mechanical/pages/respell-export/respell-export.change-mechanical.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renameCodeToken } from "./rename-code-token.change-checked.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const NOTHING = (): null => null

const LOCAL = "akasha/one/local.module.code.ts"

const BODY = `export function held(): number {
  const kept = 1
  return kept + 1
}
`

function bodyOf(path: string): string | null {
  return path === LOCAL ? BODY : null
}

const RUNS: Reaching = async (world, at, given) => {
  if (at === "change-mechanical/rename-export") {
    return await renameExport(world, given as Parameters<typeof renameExport>[1])
  }
  if (at === "change-mechanical/rename-local-variable") {
    return renameLocalVariable(world, given as Parameters<typeof renameLocalVariable>[1])
  }
  if (at === "change-mechanical/respell-export") {
    return respellExport(world, given as Parameters<typeof respellExport>[1])
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, RUNS)
}

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map((one) => one.path).sort()
}

function bodyIn(said: Answer, path: string): string {
  return said.edits.find((one) => one.path === path)?.body ?? ""
}

test("a path that is no TypeScript body is refused", async () => {
  const world = worldIn(scratch.rootFor("token-"), NOTHING)
  const said = await renameCodeToken(world, { at: "a.md", of: "one", to: "two" })
  expect(said.refused).toBe("`a.md` names no TypeScript body")
})

test("a body that could not be read is refused", async () => {
  const world = worldIn(scratch.rootFor("token-"), NOTHING)
  const said = await renameCodeToken(world, { at: LOCAL, of: "one", to: "two" })
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` could not be read")
})

test("an exported name is renamed through every importer", async () => {
  const root = indexedRepo()
  const world = worldIn(root, textIn(root))
  const said = await renameCodeToken(world, { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([HELD_CODE, NAMER_CODE])
})

test("a name no export carries is renamed over its own file", async () => {
  const world = worldIn(scratch.rootFor("token-"), bodyOf)
  const said = await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodyIn(said, LOCAL)).toBe(BODY.replaceAll("kept", CARRIED))
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
})

test("a name the file declares nowhere is refused", async () => {
  const world = worldIn(scratch.rootFor("token-"), bodyOf)
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
  const world = worldAt(scratch.rootFor("token-"), bodyOf, (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })

  expect(reached).toEqual(["change-mechanical/rename-local-variable"])
})
