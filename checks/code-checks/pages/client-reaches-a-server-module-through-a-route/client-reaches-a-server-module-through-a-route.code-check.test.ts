import { afterAll, expect, test } from "bun:test"
import { listedFiled, pathFiled } from "@akasha/indexes/testing"
import { shadowAt } from "@akasha/pages/shadow"
import { change, scratch, staged } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import {
  askingIn,
  clientReachesAServerModuleThroughARoute,
} from "./client-reaches-a-server-module-through-a-route.code-check.code.ts"

afterAll(scratch.sweep)

const APP = "router-app"

const PAGE = "web/web.router-app.ts"

const PLAIN = "web/panel/panel.module.code.tsx"

const OUTSIDE = "other/other.module.code.ts"

const NOTES = "web/panel/notes.md"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299152"

const HELD = "export const held = 1\n"

const LEAK = 'import { held } from "./held.server.ts"\n'

function rooted(): string {
  const root = staged({ [PAGE]: HELD, [PLAIN]: HELD, [OUTSIDE]: HELD })
  listedFiled(root, APP, "web", [{ path: PAGE, id: ID }])
  pathFiled(root, PAGE, [{ path: PAGE, id: ID }])
  pathFiled(root, PLAIN, [{ path: PLAIN, id: ID }])
  pathFiled(root, OUTSIDE, [{ path: OUTSIDE, id: ID }])
  return root
}

test("a code file inside a router app's package is input to this check", () => {
  expect(clientReachesAServerModuleThroughARoute.isInput(PLAIN, shadowAt(rooted()))).toBe(true)
})

test("a file outside every router app's package is no input", () => {
  expect(clientReachesAServerModuleThroughARoute.isInput(OUTSIDE, shadowAt(rooted()))).toBe(false)
})

test("a file that is no TypeScript inside an app's package is no input", () => {
  expect(clientReachesAServerModuleThroughARoute.isInput(NOTES, shadowAt(rooted()))).toBe(false)
})

test("what the check asks names the router apps the index files", () => {
  const root = rooted()
  expect(askingIn(change(root, {}), shadowAt(root)).appsFiled()).toEqual([PAGE])
})

test("what the check asks reads a body from the change rather than from the disk", () => {
  const root = rooted()
  expect(askingIn(change(root, { [PLAIN]: LEAK }), shadowAt(root)).textAt(PLAIN)).toBe(LEAK)
})

test("what the check asks names every path the index files", () => {
  const root = rooted()
  expect(askingIn(change(root, {}), shadowAt(root)).everyPath()).toContain(PLAIN)
})
