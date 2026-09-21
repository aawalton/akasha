import { afterAll, expect, test } from "bun:test"
import {
  carriedBy,
  importersOf,
  movesOf,
  repointedOver,
} from "akasha/change/modules/file-carrying/file-carrying.module.code.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { repoWorld } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  HELD_CODE,
  HELD_PAGE,
  NAMER_CODE,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

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

const HELD_VALUES = "akasha/one/held.module.uncommitted.ts"

const KEPT_VALUES = "akasha/one/kept.module.uncommitted.ts"

const VALUES = 'export const heldModuleUncommitted = {\n  "well": true\n} as const\n'

const RENAMED = new Map([
  [HELD_PAGE, "akasha/one/kept.module.ts"],
  [HELD_VALUES, KEPT_VALUES],
])

test("a page renamed carries its uncommitted sidecar exporting the name the new page names", () => {
  const world = repoWorld({ [HELD_VALUES]: VALUES })
  const said = carriedBy(world, RENAMED)
  if (typeof said === "string") throw new Error(said)

  expect(bodiesIn({ edits: said, refused: null }, world.base).get(KEPT_VALUES)).toBe(
    'export const keptModuleUncommitted = {\n  "well": true\n} as const\n'
  )
})

test("a sidecar landing beside the page it already sits beside is left as it is", () => {
  const world = repoWorld({ [HELD_VALUES]: VALUES })
  const said = carriedBy(world, new Map([[HELD_VALUES, "akasha/two/held.module.uncommitted.ts"]]))
  if (typeof said === "string") throw new Error(said)

  expect(said.map((one) => one.kind)).toEqual(["move"])
})
