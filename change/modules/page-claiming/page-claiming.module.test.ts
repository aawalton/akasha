import { afterAll, expect, test } from "bun:test"
import { dirname, join } from "node:path"
import { NOT_TEXT } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { claimedIn } from "akasha/change/modules/page-claiming/page-claiming.module.code.ts"
import { type World, worldAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

afterAll(scratch.sweep)

const MODULE = "module"

const HELD_AT = dirname(HELD_PAGE)

const HELD_DDS = join(HELD_AT, "held.dds")

const DEEP_DDS = join(HELD_AT, "deep", "deeper.dds")

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

function endingWorld(root: string): World {
  const world = worldAt(root, textIn(root))
  const under = [...world.under(HELD_AT), HELD_DDS, DEEP_DDS]
  return {
    ...world,
    index: {
      ...world.index,
      extensionPropertiesAt: () => new Map([[MODULE, new Map([["held-dds", "dds"]])]]),
    },
    under: (folder) => (folder === HELD_AT ? under : world.under(folder)),
    bodyOf: (path) => (path === HELD_DDS || path === DEEP_DDS ? NOT_TEXT : world.bodyOf(path)),
  }
}

function endingClaims(stated: boolean): readonly string[] {
  const root = indexedRepo()
  const world = endingWorld(root)
  const value = stated ? { ...heldValue(world), heldDds: true } : heldValue(world)
  return claimedIn(world, HELD_PAGE, value)
}

test("a file beside the page whose ending a property of the page names is answered too", () => {
  expect(endingClaims(true)).toContain(HELD_DDS)
})

test("a file under a folder beneath the page's own folder is no such file", () => {
  expect(endingClaims(true)).not.toContain(DEEP_DDS)
})

test("a page stating no such property claims no file by its ending", () => {
  expect(endingClaims(false)).not.toContain(HELD_DDS)
})
