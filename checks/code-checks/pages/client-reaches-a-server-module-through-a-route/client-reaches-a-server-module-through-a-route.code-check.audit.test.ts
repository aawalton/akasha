import { afterAll, expect, test } from "bun:test"
import { scratch } from "../../../modules/check-staging/check-staging.module.code.ts"
import {
  APP_HELD,
  APP_PAGE,
  APP_PLAIN,
  appRooted,
} from "../../../modules/router-app-code/router-app-code.module.test-fixtures.ts"
import {
  askingAt,
  clientReachesAServerModuleThroughARoute,
} from "./client-reaches-a-server-module-through-a-route.code-check.audit.code.ts"

afterAll(scratch.sweep)

const NOWHERE = "web/panel/nowhere.module.code.tsx"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299153"

test("what the audit asks names the router apps the index files", () => {
  expect(askingAt(appRooted(ID), []).appsFiled()).toEqual([APP_PAGE])
})

test("what the audit asks reads a body from the disk, there being no change", () => {
  expect(askingAt(appRooted(ID), []).textAt(APP_PLAIN)).toBe(APP_HELD)
})

test("what the audit asks answers nothing for a path that is not there", () => {
  expect(askingAt(appRooted(ID), []).textAt(NOWHERE)).toBe(null)
})

test("what the audit asks names every path the audit was handed", () => {
  expect(askingAt(appRooted(ID), [APP_PLAIN]).everyPath()).toEqual([APP_PLAIN])
})

test("an audit over an index declaring no route table file name refuses", () => {
  expect(() => clientReachesAServerModuleThroughARoute(appRooted(ID))).toThrow("route table")
})
