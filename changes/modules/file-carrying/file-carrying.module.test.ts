import { afterAll, expect, test } from "bun:test"
import {
  carriedBy,
  importersOf,
  movesOf,
  repointedOver,
} from "akasha/changes/modules/file-carrying/file-carrying.module.code.ts"
import { repoWorld } from "akasha/changes/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  HELD_CODE,
  NAMER_CODE,
  scratch,
} from "akasha/pages/indexes/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const LANDS = "akasha/one/kept.module.code.ts"

const MOVED = new Map([[HELD_CODE, LANDS]])

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

test("a whole carry answers the moves, then the repointing", () => {
  const said = carriedBy(repoWorld(), MOVED)
  if (typeof said === "string") throw new Error(said)

  expect(said[0]).toEqual({ kind: "move", pathFrom: HELD_CODE, pathTo: LANDS })
  expect(said.map((one) => one.kind)).toEqual(["move", "replace"])
})
