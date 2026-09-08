import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange } from "./remove-file-page-property.change-mechanical.code.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

const BESIDE = "akasha/properties/kept.text-property.code.ts"

const PAGE = "akasha/one/kept.module.ts"

const PLAIN = "akasha/one/notes.md"

const UNDER = new Set(["text-property"])

type Taken = { at: string; given: unknown }

function worldOf(taken: Taken): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { kindsUnder: () => UNDER }),
    textOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      taken.at = at
      taken.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

function refusalFor(at: string): string {
  return `\`${at}\` is under no page property name, so this change takes nothing away`
}

test("a page property path is taken away by the change this change reaches", async () => {
  const taken: Taken = { at: "", given: null }

  const said = await runChange(worldOf(taken), { at: PROPERTY })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe("change-mechanical-file/remove-file-page")
  expect(taken.given).toEqual({ at: PROPERTY })
})

test("a page that is no page property is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PAGE))
})

test("a path beside a page property is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: BESIDE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(BESIDE))
})

test("a path under no page type is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: PLAIN })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PLAIN))
})
