import { afterAll, expect, test } from "bun:test"
import {
  folderOf,
  modulesIn,
  pathsFor,
  pathsUnder,
  serverNamed,
} from "akasha/check/modules/router-app-code/router-app-code.module.code.ts"
import {
  APP_PAGE,
  APP_PLAIN,
  APP_PLAIN_PAGE,
  appRooted,
} from "akasha/check/modules/router-app-code/router-app-code.module.test-fixtures.ts"
import { scratch } from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const PAGE = "hum/hum.router-app.ts"

const TABLE = "hum/routes.ts"

const ROOTED = "01a0912e-6d41-7a55-9c2e-5b7f0d2a4e18"

const TABLED = "routes.ts"

const PACKAGED = {
  at: folderOf(APP_PAGE),
  page: APP_PAGE,
  table: `${folderOf(APP_PAGE)}${TABLED}`,
}

test("an app's folder is the folder its page sits in", () => {
  expect(folderOf(PAGE)).toBe("hum/")
  expect(folderOf("top.router-app.ts")).toBe("")
})

test("only a string ending in a module extension names a route module", () => {
  const text =
    'route("home", "routes/home.tsx")\nimport { route } from "@react-router/dev/routes"\n'
  expect(modulesIn(TABLE, text)).toEqual(["routes/home.tsx"])
})

test("a name closing with `.server` before its extension is server-only", () => {
  expect(serverNamed("hum/held.server.ts")).toBe(true)
  expect(serverNamed("hum/held.ts")).toBe(false)
})

test("a module under a `.server` folder is server-only", () => {
  expect(serverNamed("hum/.server/held/held.module.code.ts")).toBe(true)
})

test("the paths under a package are the TypeScript files the tree holds there", () => {
  const found = pathsUnder(shadowAt(appRooted(ROOTED)), folderOf(APP_PAGE))
  expect([...found].sort()).toEqual([APP_PAGE, APP_PLAIN, APP_PLAIN_PAGE].sort())
})

test("a package nowhere on disk holds no path", () => {
  expect(pathsUnder(shadowAt(appRooted(ROOTED)), "nowhere/")).toEqual([])
})

test("the paths judged are the changed paths alone until the page or the table changed", () => {
  const listed = (): readonly string[] => [APP_PAGE, APP_PLAIN]
  expect(pathsFor(PACKAGED, [APP_PLAIN], listed)).toEqual([APP_PLAIN])
  expect(pathsFor(PACKAGED, [APP_PAGE], listed)).toEqual([APP_PAGE, APP_PLAIN].sort())
})
