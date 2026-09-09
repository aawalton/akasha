import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import type { Value } from "@akasha/pages/page-value"
import { type World, worldAt } from "../shadow/change-shadow.module.code.ts"
import { claimedIn } from "./page-claiming.module.code.ts"

afterAll(scratch.sweep)

function heldValue(world: World): Value {
  const one = world.index.pageAt("module", "held")
  if (one === null) throw new Error("the fixture holds no `held` page")
  return one
}

function claimsIn(): readonly string[] {
  const root = indexedRepo()
  const world = worldAt(root, textIn(root))
  return claimedIn(world, HELD_PAGE, heldValue(world))
}

test("the page's own file leads the files answered", () => {
  expect(claimsIn()[0]).toBe(HELD_PAGE)
})

test("a file the page claims is answered beside the page", () => {
  expect(claimsIn()).toContain(HELD_CODE)
})

test("a path is answered once however often the page claims that path", () => {
  const held = claimsIn()

  expect(held.length).toBe(new Set(held).size)
})
