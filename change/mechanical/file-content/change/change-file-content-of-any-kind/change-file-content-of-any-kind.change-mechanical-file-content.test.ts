import { expect, test } from "bun:test"
import { changeFileContent } from "akasha/change/mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.ts"
import { changeFileContentCode } from "akasha/change/mechanical/file-content/change/change-file-content-code/change-file-content-code.change-mechanical-file-content.ts"
import {
  addressFor,
  runChange,
} from "akasha/change/mechanical/file-content/change/change-file-content-of-any-kind/change-file-content-of-any-kind.change-mechanical-file-content.code.ts"
import { changeFileContentPage } from "akasha/change/mechanical/file-content/change/change-file-content-page/change-file-content-page.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHANGE_FILE_CONTENT = `${changeMechanicalFileContent.slug}/${changeFileContent.slug}` as const

const CHANGE_FILE_CONTENT_CODE =
  `${changeMechanicalFileContent.slug}/${changeFileContentCode.slug}` as const

const CHANGE_FILE_CONTENT_PAGE =
  `${changeMechanicalFileContent.slug}/${changeFileContentPage.slug}` as const

const PAGE = "akasha/one.held.ts"

const CODE = "akasha/one/one.module.code.ts"

const PLAIN = "akasha/one/notes.md"

const UNDER = new Set(["text-property"])

type Worked = { at: string; given: unknown }

function worldOf(named: ReadonlySet<string>, worked: Worked): World {
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
      worked.at = at
      worked.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

const NOTHING_NAMED = worldOf(new Set<string>(), { at: "", given: null })

const PAGED = worldOf(new Set(["held"]), { at: "", given: null })

test("a path under a page name is worked by the change judging what that page states", () => {
  expect(addressFor(PAGED, PAGE)).toBe(CHANGE_FILE_CONTENT_PAGE)
})

test("every other TypeScript path is worked by the change judging the imports named", () => {
  expect(addressFor(NOTHING_NAMED, CODE)).toBe(CHANGE_FILE_CONTENT_CODE)
})

test("every other path is worked by the change judging nothing else", () => {
  expect(addressFor(NOTHING_NAMED, PLAIN)).toBe(CHANGE_FILE_CONTENT)
})

test("the change reached is handed the path and both passages", async () => {
  const worked: Worked = { at: "", given: null }

  const said = await runChange(worldOf(new Set(["held"]), worked), {
    at: PAGE,
    old: "one",
    new: "two",
  })

  expect(said.refused).toBe(null)
  expect(worked.at).toBe(CHANGE_FILE_CONTENT_PAGE)
  expect(worked.given).toEqual({ at: PAGE, old: "one", new: "two" })
})
