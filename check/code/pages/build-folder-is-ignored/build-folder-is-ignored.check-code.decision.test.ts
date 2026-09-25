import { expect, test } from "bun:test"
import { filesOf as reading } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  type BuildFolder,
  type Declared,
  declaredIn,
  ignoredAmong,
  refusalsOver,
} from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.decision.code.ts"
import {
  BUILT_AT,
  IGNORES_AT,
  IGNORING,
  KEY,
  NOT_IGNORING,
  PAGE_AT,
} from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.decision.test-fixtures.ts"

const FOLDERS: readonly BuildFolder[] = [
  { propertySlug: "route-types", key: KEY, folderName: ".react-router" },
]

const DECLARED: readonly Declared[] = [{ page: PAGE_AT, key: KEY, at: BUILT_AT }]

test("a page stating a build folder property true names that folder beside the page", () => {
  expect(declaredIn(PAGE_AT, { [KEY]: true }, FOLDERS)).toEqual(DECLARED)
})

test("a page stating the property false or not at all names no build folder", () => {
  expect(declaredIn(PAGE_AT, { [KEY]: false }, FOLDERS)).toEqual([])
  expect(declaredIn(PAGE_AT, {}, FOLDERS)).toEqual([])
  expect(declaredIn(PAGE_AT, null, FOLDERS)).toEqual([])
})

test("a page at the repository root names its build folder at the root", () => {
  const said = declaredIn("akasha.workspace.ts", { [KEY]: true }, FOLDERS)
  expect(said.map((one) => one.at)).toEqual([".react-router"])
})

test("a build folder a root rule ignores is let through", () => {
  expect(refusalsOver(DECLARED, reading({ [IGNORES_AT]: IGNORING }))).toEqual([])
})

test("a build folder a rule beside it ignores is let through", () => {
  expect(refusalsOver(DECLARED, reading({ "akasha/web/.gitignore": ".react-router\n" }))).toEqual(
    []
  )
})

test("a build folder no rule ignores is refused at the page naming it", () => {
  const said = refusalsOver(DECLARED, reading({ [IGNORES_AT]: NOT_IGNORING }))
  expect(said.map((one) => one.path)).toEqual([PAGE_AT])
  expect(said[0]?.reason).toContain(BUILT_AT)
  expect(said[0]?.reason).toContain(KEY)
})

test("a rule a later rule takes back leaves the folder refused", () => {
  const rules = `${IGNORING}!${BUILT_AT}/\n`
  expect(refusalsOver(DECLARED, reading({ [IGNORES_AT]: rules }))).toHaveLength(1)
})

test("a rule ignoring only the files inside leaves the folder refused", () => {
  expect(refusalsOver(DECLARED, reading({ [IGNORES_AT]: "*.ts\n" }))).toHaveLength(1)
})

test("no folder asked is answered with no folder ignored", () => {
  expect(ignoredAmong([], reading({}))).toEqual(new Set())
})
