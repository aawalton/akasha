import { afterAll, expect, test } from "bun:test"
import { moveFiles } from "akasha/changes/mechanical/file/move/move-files/move-files.change-mechanical.code.ts"
import { repoWorld } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  HELD_CODE,
  NAMER_CODE,
  scratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const LANDS = "akasha/one/kept.module.code.ts"

const MOVED = { [HELD_CODE]: LANDS }

test("every body importing a file that moved names the path that file landed at", () => {
  const said = moveFiles(repoWorld(), { moved: MOVED })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([
    { kind: "move", pathFrom: HELD_CODE, pathTo: LANDS },
    {
      kind: "replace",
      path: NAMER_CODE,
      contentFrom: 'import { kept } from "../one/held.module.code.ts"',
      contentTo: 'import { kept } from "../one/kept.module.code.ts"',
    },
  ])
})

test("a call handing in no path is refused", () => {
  expect(moveFiles(repoWorld(), { moved: {} }).refused).toBe(
    "no path was handed in, so nothing is moved"
  )
})

test("a path with no body is refused rather than moved", () => {
  const said = moveFiles(repoWorld(), { moved: { "akasha/one/gone.module.code.ts": LANDS } })

  expect(said.refused).toBe("`akasha/one/gone.module.code.ts` holds no body, so nothing is moved")
})

test("a path a body already sits at is refused rather than written over", () => {
  const said = moveFiles(repoWorld(), { moved: { [HELD_CODE]: NAMER_CODE } })

  expect(said.refused).toBe(`\`${NAMER_CODE}\` is a body already`)
})

test("a path landing where it already sits is refused", () => {
  const said = moveFiles(repoWorld(), { moved: { [HELD_CODE]: HELD_CODE } })

  expect(said.refused).toBe(`\`${HELD_CODE}\` is the path it already sits at`)
})
