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
import { renameCodeToken } from "./rename-code-token.change.code.ts"

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
  const said = renameCodeToken(
    scratch.rootFor("token-"),
    { at: "a.md", of: "one", to: "two" },
    NOTHING
  )
  expect(said.refused).toBe("`a.md` names no TypeScript body")
})

test("a body that could not be read is refused", () => {
  const said = renameCodeToken(
    scratch.rootFor("token-"),
    { at: LOCAL, of: "one", to: "two" },
    NOTHING
  )
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` could not be read")
})

test("an exported name is renamed through every importer", () => {
  const root = indexedRepo()
  const said = renameCodeToken(root, { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED }, textIn(root))
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([HELD_CODE, NAMER_CODE])
})

test("a name no export carries is renamed over its own file", () => {
  const said = renameCodeToken(
    scratch.rootFor("token-"),
    { at: LOCAL, of: "kept", to: CARRIED },
    bodyOf
  )
  expect(said.refused).toBe(null)
  expect(bodyIn(said, LOCAL)).toBe(BODY.replaceAll("kept", CARRIED))
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
})

test("a name the file declares nowhere is refused", () => {
  const said = renameCodeToken(
    scratch.rootFor("token-"),
    { at: LOCAL, of: "missing", to: CARRIED },
    bodyOf
  )
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` declares no `missing`")
})
