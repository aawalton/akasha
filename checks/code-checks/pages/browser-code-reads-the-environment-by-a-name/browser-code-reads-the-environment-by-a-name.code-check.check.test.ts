import { afterAll, expect, test } from "bun:test"
import {
  listedFiled,
  pathFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import {
  change,
  scratch,
  staged,
} from "../../../modules/check-staging/check-staging.module.code.ts"
import {
  askingIn,
  browserCodeReadsTheEnvironmentByAName,
} from "./browser-code-reads-the-environment-by-a-name.code-check.check.code.ts"

afterAll(scratch.sweep)

const APP = "router-app"

const PAGE = "web/web.router-app.ts"

const PLAIN = "web/panel/panel.module.code.tsx"

const OUTSIDE = "other/other.module.code.ts"

const NOTES = "web/panel/notes.md"

const ID = "01a08d3c-4f61-7a2e-b0d5-3f0c2e6a4471"

const HELD = "export const held = 1\n"

const KEYED = 'const NAME = "A"\nexport const sha = process.env[NAME]\n'

function rooted(): string {
  const root = staged({ [PAGE]: HELD, [PLAIN]: HELD, [OUTSIDE]: HELD })
  listedFiled(root, APP, "web", [{ path: PAGE, id: ID }])
  valueAlsoFiled(root, APP, [{ path: PAGE, value: { id: ID, pageTypeSlug: APP, slug: "web" } }])
  pathFiled(root, PAGE, [{ path: PAGE, id: ID }])
  pathFiled(root, PLAIN, [{ path: PLAIN, id: ID }])
  pathFiled(root, OUTSIDE, [{ path: OUTSIDE, id: ID }])
  return root
}

test("a code file inside a router app's package is input to this check", () => {
  expect(browserCodeReadsTheEnvironmentByAName.isInput(PLAIN, shadowAt(rooted()))).toBe(true)
})

test("a file outside every router app's package is no input", () => {
  expect(browserCodeReadsTheEnvironmentByAName.isInput(OUTSIDE, shadowAt(rooted()))).toBe(false)
})

test("a file that is no TypeScript inside an app's package is no input", () => {
  expect(browserCodeReadsTheEnvironmentByAName.isInput(NOTES, shadowAt(rooted()))).toBe(false)
})

test("what the check asks names the router apps the index files", () => {
  const root = rooted()
  expect(askingIn(change(root, {}), shadowAt(root)).appsFiled()).toEqual([PAGE])
})

test("what the check asks reads a body from the change rather than from the disk", () => {
  const root = rooted()
  expect(askingIn(change(root, { [PLAIN]: KEYED }), shadowAt(root)).textAt(PLAIN)).toBe(KEYED)
})

test("what the check asks names every path the index files", () => {
  const root = rooted()
  expect(askingIn(change(root, {}), shadowAt(root)).everyPath()).toContain(PLAIN)
})

test("an index declaring no route table file name refuses the check", () => {
  const root = rooted()
  expect(() =>
    browserCodeReadsTheEnvironmentByAName(change(root, { [PLAIN]: KEYED }), shadowAt(root))
  ).toThrow("route table")
})
