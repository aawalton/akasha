import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { addressFor, runChange } from "./move-file-of-any-kind.change-mechanical.code.ts"

const PAGE = "akasha/one.held.ts"

const PAGE_INTO = "akasha/two/one.held.ts"

const CODE = "akasha/one/one.module.code.ts"

const PLAIN = "akasha/one/notes.md"

type Carried = { at: string; given: unknown }

const UNDER = new Set(["text-property"])

function worldOf(named: ReadonlySet<string>, carried: Carried): World {
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
      carried.at = at
      carried.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

const NOTHING_NAMED = worldOf(new Set<string>(), { at: "", given: null })

const PAGED = worldOf(new Set(["held"]), { at: "", given: null })

test("a path under a page name is carried by the change carrying the files beside it", () => {
  expect(addressFor(PAGED, PAGE)).toBe("change-mechanical-file/move-file-page")
})

test("a path under a page type name is carried by the change carrying a page type", () => {
  const world = worldOf(new Set(["page-type"]), { at: "", given: null })

  expect(addressFor(world, "akasha/kept.page-type.ts")).toBe(
    "change-mechanical/move-file-page-type"
  )
})

test("a path under a page property name is carried by the change carrying a page property", () => {
  const world = worldOf(new Set(["text-property"]), { at: "", given: null })

  expect(addressFor(world, "akasha/properties/kept.text-property.ts")).toBe(
    "change-mechanical/move-file-page-property"
  )
})

test("every other TypeScript path is carried by the change judging the imports named", () => {
  expect(addressFor(NOTHING_NAMED, CODE)).toBe("change-mechanical/move-file-code")
})

test("every other path is carried by the change carrying the file alone", () => {
  expect(addressFor(NOTHING_NAMED, PLAIN)).toBe("change-mechanical-file/move-file")
})

test("the kind of path is read off the path the file is carried from", () => {
  expect(addressFor(PAGED, PLAIN)).toBe("change-mechanical-file/move-file")
})

test("the change reached is handed the path carried from and the path landed at", async () => {
  const carried: Carried = { at: "", given: null }
  const said = await runChange(worldOf(new Set(["held"]), carried), {
    from: PAGE,
    to: PAGE_INTO,
  })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical-file/move-file-page")
  expect(carried.given).toEqual({ from: PAGE, to: PAGE_INTO })
})
