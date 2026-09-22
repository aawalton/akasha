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
import { treed } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratch } from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"

afterAll(scratch.sweep)

const NOWHERE = "web/panel/nowhere.module.code.tsx"

const ID = "01a08d3c-4f61-7a2e-b0d5-3f0c2e6a4472"

function rooted(): string {
  return treed(appRooted(ID))
}

test("what the audit asks names the router apps the index files", () => {
  expect(askingAt(rooted()).appsFiled()).toEqual([APP_PAGE])
})

test("what the audit asks reads a body from the commit, there being no change", () => {
  expect(askingAt(rooted()).textAt(APP_PLAIN)).toBe(APP_HELD)
})

test("what the audit asks answers nothing for a path that is not there", () => {
  expect(askingAt(rooted()).textAt(NOWHERE)).toBe(null)
})

test("what the audit asks names the paths under an app's package", () => {
  const found = askingAt(rooted()).pathsUnder(folderOf(APP_PAGE))
  expect([...found].sort()).toEqual([APP_PAGE, APP_PLAIN, APP_PLAIN_PAGE].sort())
})

test("an audit over an index declaring no route table file name refuses", () => {
  expect(() => browserCodeReadsTheEnvironmentByAName(rooted())).toThrow("route table")
})
