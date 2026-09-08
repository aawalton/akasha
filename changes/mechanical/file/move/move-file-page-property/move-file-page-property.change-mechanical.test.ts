import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange } from "./move-file-page-property.change-mechanical.code.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

const PROPERTY_INTO = "akasha/two/properties/kept.text-property.ts"

const BESIDE = "akasha/properties/kept.text-property.code.ts"

const PAGE = "akasha/one/kept.module.ts"

const PLAIN = "akasha/one/notes.md"

const UNDER = new Set(["text-property"])

type Carried = { at: string; given: unknown }

function worldOf(carried: Carried): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { kindsUnder: () => UNDER }),
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
  return `\`${at}\` is under no page property name, so this change carries nothing`
}

test("a page property path is carried by the change this change reaches", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldOf(carried), { from: PROPERTY, to: PROPERTY_INTO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical-file/move-file-page")
  expect(carried.given).toEqual({ from: PROPERTY, to: PROPERTY_INTO })
})

test("a page that is no page property is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { from: PAGE, to: PROPERTY_INTO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PAGE))
})

test("a path beside a page property is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), {
    from: BESIDE,
    to: PROPERTY_INTO,
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(BESIDE))
})

test("a path under no page type is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { from: PLAIN, to: PROPERTY_INTO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PLAIN))
})
