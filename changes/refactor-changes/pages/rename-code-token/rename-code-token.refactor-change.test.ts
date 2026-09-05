import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { renameCodeToken } from "./rename-code-token.refactor-change.code.ts"

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
  expect([...(said.bodies ?? new Map()).keys()].sort()).toEqual([HELD_CODE, NAMER_CODE])
})

test("a name no export carries is renamed over its own file", () => {
  const said = renameCodeToken(
    scratch.rootFor("token-"),
    { at: LOCAL, of: "kept", to: CARRIED },
    bodyOf
  )
  expect(said.refused).toBe(null)
  expect(said.bodies?.get(LOCAL)).toBe(BODY.replaceAll("kept", CARRIED))
})

test("a name the file declares nowhere is refused", () => {
  const said = renameCodeToken(
    scratch.rootFor("token-"),
    { at: LOCAL, of: "missing", to: CARRIED },
    bodyOf
  )
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe("`akasha/one/local.module.code.ts` declares no `missing`")
})
