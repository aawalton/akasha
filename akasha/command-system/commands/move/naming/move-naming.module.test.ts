import { afterAll, expect, test } from "bun:test"
import { HELD, heldIndexed, scratch, THREE } from "../move.command.test-fixtures.ts"
import { importingOf, namingOf, spellingOf } from "./move-naming.module.code.ts"

afterAll(scratch.sweep)

const NOWHERE = "akasha/one/nowhere.module.ts"

const AT = "HEAD"

const MOVING = new Map([[HELD, THREE]])

function unindexed(): string {
  return scratch.rootFor("move-naming-")
}

test("a path no page owns is answered as owned by no page", () => {
  expect(namingOf(heldIndexed(), NOWHERE)).toEqual({ held: null })
})

test("an index that will not answer leaves what owns a path unread", () => {
  const said = namingOf(unindexed(), HELD)
  expect("unread" in said).toBe(true)
})

test("an index that will not answer leaves the importers unread", () => {
  const said = importingOf(unindexed(), MOVING)
  expect("unread" in said ? said.unread : "").toContain("so none were repointed")
})

test("a caller naming nothing moved reads no importer at all", () => {
  expect(importingOf(unindexed(), new Map())).toEqual({ importers: [] })
})

test("a path the caller already knows about is left out of the search", () => {
  const root = heldIndexed()
  const every = spellingOf(root, AT, MOVING, new Set())
  expect(spellingOf(root, AT, MOVING, new Set(every))).toEqual([])
})

test("a path that moves is never answered as a body naming what moved", () => {
  expect(spellingOf(heldIndexed(), AT, MOVING, new Set())).not.toContain(HELD)
})
