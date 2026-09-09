import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { addressFor, runChange } from "./remove-file-of-any-kind.change-mechanical.code.ts"

const PAGE = "akasha/one.held.ts"

const CODE = "akasha/one/one.module.code.ts"

const PLAIN = "akasha/one/notes.md"

type Taken = { at: string; given: unknown }

const UNDER = new Set(["text-property"])

function worldOf(named: ReadonlySet<string>, taken: Taken): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], {
      pageTypesIn: () => named,
      kindsUnder: () => UNDER,
    }),
    textOf: () => null,
    bodyOf: () => null,
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

const NOTHING_NAMED = worldOf(new Set<string>(), { at: "", given: null })

const PAGED = worldOf(new Set(["held"]), { at: "", given: null })

test("a path under a page name goes by the change taking the files beside it away", () => {
  expect(addressFor(PAGED, PAGE)).toBe("change-mechanical-file/remove-file-page")
})

test("a path under a page type name goes by the change taking a page type away", () => {
  const world = worldOf(new Set(["page-type"]), { at: "", given: null })

  expect(addressFor(world, "akasha/kept.page-type.ts")).toBe(
    "change-mechanical/remove-file-page-type"
  )
})

test("a path under a page property name goes by the change taking a page property away", () => {
  const world = worldOf(new Set(["text-property"]), { at: "", given: null })

  expect(addressFor(world, "akasha/properties/kept.text-property.ts")).toBe(
    "change-mechanical/remove-file-page-property"
  )
})

test("every other TypeScript path goes by the change judging the imports named", () => {
  expect(addressFor(NOTHING_NAMED, CODE)).toBe("change-mechanical/remove-file-code")
})

test("every other path goes by the change taking the file alone away", () => {
  expect(addressFor(NOTHING_NAMED, PLAIN)).toBe("change-mechanical-file/remove-file")
})

test("a path no page type is named for goes by the change taking the file alone away", () => {
  expect(addressFor(PAGED, PLAIN)).toBe("change-mechanical-file/remove-file")
})

test("the change reached is handed the path taken away", async () => {
  const taken: Taken = { at: "", given: null }

  const said = await runChange(worldOf(new Set(["held"]), taken), { at: PAGE })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe("change-mechanical-file/remove-file-page")
  expect(taken.given).toEqual({ at: PAGE })
})
