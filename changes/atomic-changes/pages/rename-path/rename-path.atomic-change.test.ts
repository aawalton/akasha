import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { renamePath } from "./rename-path.atomic-change.code.ts"

afterAll(scratch.sweep)

const KEPT = "akasha/one/kept.module.code.ts"

const NOTHING = (): null => null

test("the path it already sits at is refused", () => {
  const said = renamePath(scratch.rootFor("rename-path-"), { from: KEPT, to: KEPT }, NOTHING)
  expect(said.refused).toBe("`akasha/one/kept.module.code.ts` is the path it already sits at")
})

test("a body that could not be read is refused", () => {
  const said = renamePath(scratch.rootFor("rename-path-"), { from: HELD_CODE, to: KEPT }, NOTHING)
  expect(said.refused).toBe(`\`${HELD_CODE}\` could not be read`)
})

test("a body already at the path it would move to is refused", () => {
  const root = indexedRepo()
  const said = renamePath(root, { from: HELD_CODE, to: NAMER_CODE }, textIn(root))
  expect(said.refused).toBe(`\`${NAMER_CODE}\` is a body already`)
})

test("an index that cannot answer refuses rather than narrowing the reach", () => {
  const held = (path: string): string | null =>
    path === HELD_CODE ? "export const kept = 1\n" : null
  const said = renamePath(scratch.rootFor("rename-path-"), { from: HELD_CODE, to: KEPT }, held)
  expect(said.bodies).toBe(null)
  expect(said.refused).toContain("so none were repointed")
})

test("a path that moves carries its importer with it", () => {
  const root = indexedRepo()
  const said = renamePath(root, { from: HELD_CODE, to: KEPT }, textIn(root))
  expect(said.refused).toBe(null)
  expect(said.moved).toEqual({ from: HELD_CODE, to: KEPT })
  expect([...(said.bodies ?? new Map()).keys()].sort()).toEqual([KEPT, NAMER_CODE].sort())
  expect(said.bodies?.get(NAMER_CODE)).toContain("../one/kept.module.code.ts")
})
