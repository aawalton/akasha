import { afterAll, expect, test } from "bun:test"
import {
  carriedBy,
  importersOf,
  manifestsAnew,
  movesOf,
  repointedOver,
} from "akasha/changes/modules/file-carrying/file-carrying.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { repoWorld } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  put,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const LANDS = "akasha/one/kept.module.code.ts"

const MOVED = new Map([[HELD_CODE, LANDS]])

const MANIFEST = "akasha/package.json"

const MANIFEST_BODY = `{
  "name": "@akasha/one",
  "exports": {
    "./held": "./one/held.module.code.ts"
  }
}
`

function worldNaming(): World {
  const root = indexedRepo()
  put(root, MANIFEST, MANIFEST_BODY)
  const world = worldAt(root, textIn(root))
  return {
    ...world,
    index: {
      ...world.index,
      everyPath: () => [MANIFEST],
      fileKeysAt: () => new Map([["manifest", "package.json"]]),
    },
  }
}

test("every file that moves is answered as one move", () => {
  expect(movesOf(MOVED)).toEqual([{ kind: "move", pathFrom: HELD_CODE, pathTo: LANDS }])
})

test("the importers of everything that moved are asked of the index in one call", () => {
  expect(importersOf(repoWorld(), MOVED)).toEqual([NAMER_CODE])
})

test("a body naming what moved names the path that file landed at", () => {
  const said = repointedOver(repoWorld(), MOVED, [HELD_CODE, NAMER_CODE])
  if (typeof said === "string") throw new Error(said)

  expect(said).toEqual([
    {
      kind: "replace",
      path: NAMER_CODE,
      contentFrom: 'import { kept } from "../one/held.module.code.ts"',
      contentTo: 'import { kept } from "../one/kept.module.code.ts"',
    },
  ])
})

test("a manifest naming a file that moved as a way in states where that file landed", () => {
  const said = manifestsAnew(worldNaming(), MOVED)
  if (typeof said === "string") throw new Error(said)

  expect(said).toEqual([
    {
      kind: "replace",
      path: MANIFEST,
      contentFrom: '    "./held": "./one/held.module.code.ts"',
      contentTo: '    "./held": "./one/kept.module.code.ts"',
    },
  ])
})

test("a world with no manifest has no way in restated", () => {
  expect(manifestsAnew(repoWorld(), MOVED)).toEqual([])
})

test("a whole carry answers the moves, then the repointing, then the ways in", () => {
  const said = carriedBy(repoWorld(), MOVED)
  if (typeof said === "string") throw new Error(said)

  expect(said[0]).toEqual({ kind: "move", pathFrom: HELD_CODE, pathTo: LANDS })
  expect(said.map((one) => one.kind)).toEqual(["move", "replace"])
})
