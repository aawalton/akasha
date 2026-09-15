import { afterAll, expect, test } from "bun:test"
import {
  globalDeclaredOnce,
  readingIn,
} from "akasha/check/code/pages/global-declared-once/global-declared-once.check-code.check.code.ts"
import {
  globally,
  indented,
  reasoned,
} from "akasha/check/code/pages/global-declared-once/global-declared-once.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowed } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import {
  change,
  scratch,
  staged,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import {
  pageFiled,
  relationFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

afterAll(scratch.sweep)

const HERE = "akasha/"

const SHARED_AT = "akasha/shared.type-declaration.d.ts"

const MODULE_AT = "akasha/one.module.code.ts"

const MODULE_PAGE_AT = "akasha/one.module.ts"

const HOLDS_VALUE = "declare const HELD: number\n"

const APART = "declare const OTHER: string\n"

const AMBIENT = "ambient-types"

const DECLARES = "page-property"

const FILE_PROPERTY = "file-property"

const PAGE_TYPE = "page-type"

const DECLARER = "type-declaration"

const AMBIENT_AT = "akasha/ambient-types.file-property.ts"

const DECLARER_AT = "akasha/type-declaration.page-type.ts"

const SHARED_PAGE_AT = "akasha/shared.type-declaration.ts"

const APART_AT = "akasha/apart.type-declaration.d.ts"

const FILE_PROPERTY_PAGE_AT = "akasha/file-property.page-type.ts"

const DECLARES_PAGE_AT = "akasha/page-property.page-type.ts"

const AMBIENT_ID = "01a06110-0000-7000-8000-00000000e004"

const DECLARER_ID = "01a06110-0000-7000-8000-00000000e005"

const SHARED_PAGE_ID = "01a06110-0000-7000-8000-00000000e006"

function staging(shared: string, held: string): string {
  return staged({ [SHARED_AT]: shared, [MODULE_AT]: held })
}

function ambient(root: string): undefined {
  shapeAdded(root, FILE_PROPERTY, AMBIENT, [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: AMBIENT,
      propertySlug: "d",
      fileName: null,
    },
  ])
  listedFiled(root, FILE_PROPERTY, AMBIENT, [{ path: AMBIENT_AT, id: AMBIENT_ID }])
  pageFiled(root, AMBIENT_ID, AMBIENT_AT)
  listedFiled(root, PAGE_TYPE, DECLARER, [{ path: DECLARER_AT, id: DECLARER_ID }])
  pageFiled(root, DECLARER_ID, DECLARER_AT)
  relationFiled(root, AMBIENT_ID, DECLARES, DECLARER_ID, [{ path: DECLARER_AT }])
  listedFiled(root, DECLARER, "shared", [{ path: SHARED_PAGE_AT, id: SHARED_PAGE_ID }])
  valueAlsoFiled(root, DECLARER, [
    { path: SHARED_PAGE_AT, value: { id: SHARED_PAGE_ID, pageTypeSlug: DECLARER, slug: "shared" } },
  ])
}

function naming(shared: string, held: string): string {
  const root = staged({ [SHARED_AT]: shared, [MODULE_AT]: held, [APART_AT]: APART })
  ambient(root)
  return root
}

function reached(given: Change): readonly string[] {
  return readingIn(given, shadowed(given)).filter((one) => one.startsWith(HERE))
}

function judged(given: Change): readonly Judged[] {
  return globalDeclaredOnce(given, shadowed(given))
}

test("a clash the change carries the module of is refused", () => {
  const held = globally(indented(HOLDS_VALUE))
  const said = judged(change(staging(HOLDS_VALUE, held), { [MODULE_AT]: held }))
  expect(said.map((each) => each.path)).toEqual([MODULE_AT])
})

test("a clash the change carries neither of the two files of is refused nothing", () => {
  const held = globally(indented(HOLDS_VALUE))
  const root = staging(HOLDS_VALUE, held)
  const apart = "akasha/two.module.code.ts"
  expect(judged(change(root, { [apart]: "export const away = 2\n" }))).toEqual([])
})

test("a clash the change carries the declaration file of alone is refused", () => {
  const held = globally(indented(HOLDS_VALUE))
  const root = staging(HOLDS_VALUE, held)
  const said = judged(change(root, { [SHARED_AT]: HOLDS_VALUE }))
  expect(said.map((each) => each.path)).toEqual([MODULE_AT])
})

test("the files read are the ones the index names beside the ones the change carries", () => {
  const held = globally(indented(HOLDS_VALUE))
  const added = "akasha/two.module.code.ts"
  const given = change(staging(APART, held), { [added]: held })
  expect(reached(given)).toEqual([MODULE_AT, MODULE_PAGE_AT, SHARED_AT, added])
})

test("a file the change takes away is read no more", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(staging(HOLDS_VALUE, held), { [MODULE_AT]: null })
  expect(judged(given)).toEqual([])
})

test("a body is read from the change rather than from the disk", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(staging(HOLDS_VALUE, held), { [MODULE_AT]: globally(indented(APART)) })
  expect(judged(given)).toEqual([])
})

test("a TypeScript file akasha compiles is input to this check", () => {
  expect(globalDeclaredOnce.isInput(MODULE_AT, {} as never)).toBe(true)
})

test("a file inside the packages folder is no input", () => {
  expect(globalDeclaredOnce.isInput("node_modules/one/one.ts", {} as never)).toBe(false)
})

test("the declaration files read are the ones the index names as carrying ambient types", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(naming(HOLDS_VALUE, held), { [MODULE_AT]: held })
  expect(reached(given)).toEqual([MODULE_AT, SHARED_AT])
})

test("a declaration file the index names no ambient types on is read no further", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(naming(HOLDS_VALUE, held), { [MODULE_AT]: held })
  expect(reached(given)).not.toContain(APART_AT)
})

test("every file the tree holds is read where the change carries a declaration file", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(naming(HOLDS_VALUE, held), { [SHARED_AT]: HOLDS_VALUE })
  expect(reached(given)).toEqual([
    APART_AT,
    FILE_PROPERTY_PAGE_AT,
    MODULE_AT,
    MODULE_PAGE_AT,
    DECLARES_PAGE_AT,
    SHARED_AT,
    SHARED_PAGE_AT,
  ])
})

test("a clash with a declaration file the index names is refused where the reach is narrow", () => {
  const held = globally(indented(HOLDS_VALUE))
  const said = judged(change(naming(HOLDS_VALUE, held), { [MODULE_AT]: held }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(MODULE_AT)
  expect(reasoned(said)).toContain(SHARED_AT)
})
