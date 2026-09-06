import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import type { Answer } from "../../modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../modules/change-shadow/change-shadow.module.code.ts"
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

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map((one) => one.path).sort()
}

function bodyIn(said: Answer, path: string): string {
  return said.edits.find((one) => one.path === path)?.body ?? ""
}

test("a path that is no TypeScript body is refused", () => {
  const world = worldAt(scratch.rootFor("token-"), NOTHING)
  const said = renameCodeToken(world, { at: "a.md", of: "one", to: "two" })
  expect(said.refused).toBe("`a.md` names no TypeScript body")
})

test("a body that could not be read is refused", () => {
  const world = worldAt(scratch.rootFor("token-"), NOTHING)
  const said = renameCodeToken(world, { at: LOCAL, of: "one", to: "two" })
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` could not be read")
})

test("an exported name is renamed through every importer", () => {
  const root = indexedRepo()
  const world = worldAt(root, textIn(root))
  const said = renameCodeToken(world, { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([HELD_CODE, NAMER_CODE])
})

test("a name no export carries is renamed over its own file", () => {
  const world = worldAt(scratch.rootFor("token-"), bodyOf)
  const said = renameCodeToken(world, { at: LOCAL, of: "kept", to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodyIn(said, LOCAL)).toBe(BODY.replaceAll("kept", CARRIED))
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
})

test("a name the file declares nowhere is refused", () => {
  const world = worldAt(scratch.rootFor("token-"), bodyOf)
  const said = renameCodeToken(world, { at: LOCAL, of: "missing", to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` declares no `missing`")
})
