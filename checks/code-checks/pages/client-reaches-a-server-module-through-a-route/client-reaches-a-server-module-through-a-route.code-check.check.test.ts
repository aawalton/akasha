import { afterAll, expect, test } from "bun:test"
import {
  askingIn,
  clientReachesAServerModuleThroughARoute,
} from "akasha/checks/code-checks/pages/client-reaches-a-server-module-through-a-route/client-reaches-a-server-module-through-a-route.code-check.check.code.ts"
import {
  APP_PAGE,
  APP_PLAIN,
  appRooted,
} from "akasha/checks/modules/router-app-code/router-app-code.module.test-fixtures.ts"
import { change, scratch } from "akasha/checks/modules/staging/check-staging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const OUTSIDE = "other/other.module.code.ts"

const NOTES = "web/panel/notes.md"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299152"

const LEAK = 'import { held } from "./held.server.ts"\n'

const ALSO: readonly string[] = [OUTSIDE]

test("a code file inside a router app's package is input to this check", () => {
  const shadow = shadowAt(appRooted(ID, ALSO))
  expect(clientReachesAServerModuleThroughARoute.isInput(APP_PLAIN, shadow)).toBe(true)
})

test("a file outside every router app's package is no input", () => {
  const shadow = shadowAt(appRooted(ID, ALSO))
  expect(clientReachesAServerModuleThroughARoute.isInput(OUTSIDE, shadow)).toBe(false)
})

test("a file that is no TypeScript inside an app's package is no input", () => {
  const shadow = shadowAt(appRooted(ID, ALSO))
  expect(clientReachesAServerModuleThroughARoute.isInput(NOTES, shadow)).toBe(false)
})

test("what the check asks names the router apps the index files", () => {
  const root = appRooted(ID, ALSO)
  expect(askingIn(change(root, {}), shadowAt(root)).appsFiled()).toEqual([APP_PAGE])
})

test("what the check asks reads a body from the change rather than from the disk", () => {
  const root = appRooted(ID, ALSO)
  expect(askingIn(change(root, { [APP_PLAIN]: LEAK }), shadowAt(root)).textAt(APP_PLAIN)).toBe(LEAK)
})

test("what the check asks names every path the index files", () => {
  const root = appRooted(ID, ALSO)
  expect(askingIn(change(root, {}), shadowAt(root)).everyPath()).toContain(APP_PLAIN)
})
