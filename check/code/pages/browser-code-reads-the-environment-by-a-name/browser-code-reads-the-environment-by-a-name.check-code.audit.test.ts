import { afterAll, expect, test } from "bun:test"
import {
  askingAt,
  browserCodeReadsTheEnvironmentByAName,
} from "akasha/check/code/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.check-code.audit.code.ts"
import { folderOf } from "akasha/check/modules/router-app-code/router-app-code.module.code.ts"
import {
  APP_HELD,
  APP_PAGE,
  APP_PLAIN,
  APP_PLAIN_PAGE,
  appRooted,
} from "akasha/check/modules/router-app-code/router-app-code.module.test-fixtures.ts"
import { scratch } from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"

afterAll(scratch.sweep)

const NOWHERE = "web/panel/nowhere.module.code.tsx"

const ID = "01a08d3c-4f61-7a2e-b0d5-3f0c2e6a4472"

test("what the audit asks names the router apps the index files", () => {
  expect(askingAt(appRooted(ID)).appsFiled()).toEqual([APP_PAGE])
})

test("what the audit asks reads a body from the disk, there being no change", () => {
  expect(askingAt(appRooted(ID)).textAt(APP_PLAIN)).toBe(APP_HELD)
})

test("what the audit asks answers nothing for a path that is not there", () => {
  expect(askingAt(appRooted(ID)).textAt(NOWHERE)).toBe(null)
})

test("what the audit asks names the paths under an app's package", () => {
  const found = askingAt(appRooted(ID)).pathsUnder(folderOf(APP_PAGE))
  expect([...found].sort()).toEqual([APP_PAGE, APP_PLAIN, APP_PLAIN_PAGE].sort())
})

test("an audit over an index declaring no route table file name refuses", () => {
  expect(() => browserCodeReadsTheEnvironmentByAName(appRooted(ID))).toThrow("route table")
})
