import { expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { moveFileCode } from "akasha/change/mechanical/file/move/move-file-code/move-file-code.change-mechanical.ts"
import {
  addressFor,
  runChange,
} from "akasha/change/mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.code.ts"
import { moveFilePage } from "akasha/change/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.ts"
import { moveFilePageProperty } from "akasha/change/mechanical/file/move/move-file-page-property/move-file-page-property.change-mechanical.ts"
import { moveFilePageType } from "akasha/change/mechanical/file/move/move-file-page-type/move-file-page-type.change-mechanical.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const MOVE_FILE = `${changeMechanicalFile.slug}/${moveFile.slug}` as const

const MOVE_FILE_CODE = `${changeMechanical.slug}/${moveFileCode.slug}` as const

const MOVE_FILE_PAGE = `${changeMechanicalFile.slug}/${moveFilePage.slug}` as const

const MOVE_FILE_PAGE_PROPERTY = `${changeMechanical.slug}/${moveFilePageProperty.slug}` as const

const MOVE_FILE_PAGE_TYPE = `${changeMechanical.slug}/${moveFilePageType.slug}` as const

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
  expect(addressFor(PAGED, PAGE)).toBe(MOVE_FILE_PAGE)
})

test("a path under a page type name is carried by the change carrying a page type", () => {
  const world = worldOf(new Set(["page-type"]), { at: "", given: null })

  expect(addressFor(world, "akasha/kept.page-type.ts")).toBe(MOVE_FILE_PAGE_TYPE)
})

test("a path under a page property name is carried by the change carrying a page property", () => {
  const world = worldOf(new Set(["text-property"]), { at: "", given: null })

  expect(addressFor(world, "akasha/properties/kept.text-property.ts")).toBe(MOVE_FILE_PAGE_PROPERTY)
})

test("every other TypeScript path is carried by the change judging the imports named", () => {
  expect(addressFor(NOTHING_NAMED, CODE)).toBe(MOVE_FILE_CODE)
})

test("every other path is carried by the change carrying the file alone", () => {
  expect(addressFor(NOTHING_NAMED, PLAIN)).toBe(MOVE_FILE)
})

test("the kind of path is read off the path the file is carried from", () => {
  expect(addressFor(PAGED, PLAIN)).toBe(MOVE_FILE)
})

test("the change reached is handed the path carried from and the path landed at", async () => {
  const carried: Carried = { at: "", given: null }
  const said = await runChange(worldOf(new Set(["held"]), carried), {
    from: PAGE,
    to: PAGE_INTO,
  })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(MOVE_FILE_PAGE)
  expect(carried.given).toEqual({ from: PAGE, to: PAGE_INTO })
})
