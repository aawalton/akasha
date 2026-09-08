import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange } from "./rename-file-page-property.change-mechanical.code.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

const BESIDE = "akasha/properties/kept.text-property.code.ts"

const PAGE = "akasha/one/kept.module.ts"

const PLAIN = "akasha/one/notes.md"

const TO = "carried"

const UNDER = new Set(["text-property"])

type Renamed = { at: string; given: unknown }

function worldOf(renamed: Renamed): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { kindsUnder: () => UNDER }),
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      renamed.at = at
      renamed.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

function refusalFor(at: string): string {
  return `\`${at}\` is under no page property name, so this change renames nothing`
}

test("a page property path is renamed by the change this change reaches", async () => {
  const renamed: Renamed = { at: "", given: null }

  const said = await runChange(worldOf(renamed), { at: PROPERTY, to: TO })

  expect(said.refused).toBe(null)
  expect(renamed.at).toBe("change-mechanical/rename-file-page")
  expect(renamed.given).toEqual({ at: PROPERTY, to: TO })
})

test("a plural this change was handed is handed on", async () => {
  const renamed: Renamed = { at: "", given: null }

  await runChange(worldOf(renamed), { at: PROPERTY, to: TO, plural: "carries" })

  expect(renamed.given).toEqual({ at: PROPERTY, to: TO, plural: "carries" })
})

test("a page that is no page property is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: PAGE, to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PAGE))
})

test("a path beside a page property is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: BESIDE, to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(BESIDE))
})

test("a path under no page type is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: PLAIN, to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PLAIN))
})
