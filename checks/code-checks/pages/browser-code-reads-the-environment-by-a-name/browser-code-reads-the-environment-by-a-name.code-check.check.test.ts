import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { change, scratch } from "../../../modules/check-staging/check-staging.module.code.ts"
import {
  APP_PAGE,
  APP_PLAIN,
  appRooted,
} from "../../../modules/router-app-code/router-app-code.module.test-fixtures.ts"
import {
  askingIn,
  browserCodeReadsTheEnvironmentByAName,
} from "./browser-code-reads-the-environment-by-a-name.code-check.check.code.ts"

afterAll(scratch.sweep)

const OUTSIDE = "other/other.module.code.ts"

const NOTES = "web/panel/notes.md"

const ID = "01a08d3c-4f61-7a2e-b0d5-3f0c2e6a4471"

const KEYED = 'const NAME = "A"\nexport const sha = process.env[NAME]\n'

const ALSO: readonly string[] = [OUTSIDE]

test("a code file inside a router app's package is input to this check", () => {
  const shadow = shadowAt(appRooted(ID, ALSO))
  expect(browserCodeReadsTheEnvironmentByAName.isInput(APP_PLAIN, shadow)).toBe(true)
})

test("a file outside every router app's package is no input", () => {
  const shadow = shadowAt(appRooted(ID, ALSO))
  expect(browserCodeReadsTheEnvironmentByAName.isInput(OUTSIDE, shadow)).toBe(false)
})

test("a file that is no TypeScript inside an app's package is no input", () => {
  const shadow = shadowAt(appRooted(ID, ALSO))
  expect(browserCodeReadsTheEnvironmentByAName.isInput(NOTES, shadow)).toBe(false)
})

test("what the check asks names the router apps the index files", () => {
  const root = appRooted(ID, ALSO)
  expect(askingIn(change(root, {}), shadowAt(root)).appsFiled()).toEqual([APP_PAGE])
})

test("what the check asks reads a body from the change rather than from the disk", () => {
  const root = appRooted(ID, ALSO)
  expect(askingIn(change(root, { [APP_PLAIN]: KEYED }), shadowAt(root)).textAt(APP_PLAIN)).toBe(
    KEYED
  )
})

test("what the check asks names every path the index files", () => {
  const root = appRooted(ID, ALSO)
  expect(askingIn(change(root, {}), shadowAt(root)).everyPath()).toContain(APP_PLAIN)
})

test("an index declaring no route table file name refuses the check", () => {
  const root = appRooted(ID, ALSO)
  expect(() =>
    browserCodeReadsTheEnvironmentByAName(change(root, { [APP_PLAIN]: KEYED }), shadowAt(root))
  ).toThrow("route table")
})
