import { expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { removeFileCode } from "akasha/change/mechanical/file/remove/remove-file-code/remove-file-code.change-mechanical.ts"
import {
  addressFor,
  runChange,
} from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.code.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import { removeFilePageProperty } from "akasha/change/mechanical/file/remove/remove-file-page-property/remove-file-page-property.change-mechanical.ts"
import { removeFilePageType } from "akasha/change/mechanical/file/remove/remove-file-page-type/remove-file-page-type.change-mechanical.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REMOVE_FILE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const REMOVE_FILE_CODE = `${changeMechanical.slug}/${removeFileCode.slug}` as const

const REMOVE_FILE_PAGE = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

const REMOVE_FILE_PAGE_PROPERTY = `${changeMechanical.slug}/${removeFilePageProperty.slug}` as const

const REMOVE_FILE_PAGE_TYPE = `${changeMechanical.slug}/${removeFilePageType.slug}` as const

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
  expect(addressFor(PAGED, PAGE)).toBe(REMOVE_FILE_PAGE)
})

test("a path under a page type name goes by the change taking a page type away", () => {
  const world = worldOf(new Set(["page-type"]), { at: "", given: null })

  expect(addressFor(world, "akasha/kept.page-type.ts")).toBe(REMOVE_FILE_PAGE_TYPE)
})

test("a path under a page property name goes by the change taking a page property away", () => {
  const world = worldOf(new Set(["text-property"]), { at: "", given: null })

  expect(addressFor(world, "akasha/properties/kept.text-property.ts")).toBe(
    REMOVE_FILE_PAGE_PROPERTY
  )
})

test("every other TypeScript path goes by the change judging the imports named", () => {
  expect(addressFor(NOTHING_NAMED, CODE)).toBe(REMOVE_FILE_CODE)
})

test("every other path goes by the change taking the file alone away", () => {
  expect(addressFor(NOTHING_NAMED, PLAIN)).toBe(REMOVE_FILE)
})

test("a path no page type is named for goes by the change taking the file alone away", () => {
  expect(addressFor(PAGED, PLAIN)).toBe(REMOVE_FILE)
})

test("the change reached is handed the path taken away", async () => {
  const taken: Taken = { at: "", given: null }

  const said = await runChange(worldOf(new Set(["held"]), taken), { at: PAGE })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe(REMOVE_FILE_PAGE)
  expect(taken.given).toEqual({ at: PAGE })
})
