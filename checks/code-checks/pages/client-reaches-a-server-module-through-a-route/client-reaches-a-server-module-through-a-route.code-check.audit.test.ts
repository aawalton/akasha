import { afterAll, expect, test } from "bun:test"
import { listedFiled, pathFiled } from "@akasha/indexes/testing"
import { scratch, staged } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import {
  askingAt,
  clientReachesAServerModuleThroughARoute,
} from "./client-reaches-a-server-module-through-a-route.code-check.audit.code.ts"

afterAll(scratch.sweep)

const APP = "router-app"

const PAGE = "web/web.router-app.ts"

const PLAIN = "web/panel/panel.module.code.tsx"

const NOWHERE = "web/panel/nowhere.module.code.tsx"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299153"

const HELD = "export const held = 1\n"

function rooted(): string {
  const root = staged({ [PAGE]: HELD, [PLAIN]: HELD })
  listedFiled(root, APP, "web", [{ path: PAGE, id: ID }])
  pathFiled(root, PAGE, [{ path: PAGE, id: ID }])
  pathFiled(root, PLAIN, [{ path: PLAIN, id: ID }])
  return root
}

test("what the audit asks names the router apps the index files", () => {
  expect(askingAt(rooted(), []).appsFiled()).toEqual([PAGE])
})

test("what the audit asks reads a body from the disk, there being no change", () => {
  expect(askingAt(rooted(), []).textAt(PLAIN)).toBe(HELD)
})

test("what the audit asks answers nothing for a path that is not there", () => {
  expect(askingAt(rooted(), []).textAt(NOWHERE)).toBe(null)
})

test("what the audit asks names every path the audit was handed", () => {
  expect(askingAt(rooted(), [PLAIN]).everyPath()).toEqual([PLAIN])
})

test("an audit over an index declaring no route table file name refuses", () => {
  expect(() => clientReachesAServerModuleThroughARoute(rooted())).toThrow("route table")
})
