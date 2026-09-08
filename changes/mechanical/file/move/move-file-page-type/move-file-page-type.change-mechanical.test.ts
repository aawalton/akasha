import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange } from "./move-file-page-type.change-mechanical.code.ts"

const TYPE = "akasha/kept.page-type.ts"

const TYPE_INTO = "akasha/two/kept.page-type.ts"

const BESIDE = "akasha/kept.page-type.code.ts"

const PAGE = "akasha/one/kept.module.ts"

const PLAIN = "akasha/one/notes.md"

const NAMED = new Set(["page-type", "module"])

type Carried = { at: string; given: unknown }

function worldOf(carried: Carried): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { pageTypesIn: () => NAMED }),
    textOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      carried.at = at
      carried.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

function refusalFor(at: string): string {
  return `\`${at}\` is under no \`page-type\` name, so this change carries nothing`
}

test("a page type path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldOf(carried), { from: TYPE, to: TYPE_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical-file/move-file-page")
  expect(carried.given).toEqual({ from: TYPE, to: TYPE_INTO })
})

test("a path under another page type is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { from: PAGE, to: TYPE_INTO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PAGE))
})

test("a path beside a page type is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { from: BESIDE, to: TYPE_INTO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(BESIDE))
})

test("a path under no page type is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { from: PLAIN, to: TYPE_INTO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PLAIN))
})
