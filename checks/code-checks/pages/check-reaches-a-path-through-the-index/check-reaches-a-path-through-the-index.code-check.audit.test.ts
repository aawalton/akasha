import { afterAll, expect, test } from "bun:test"
import { listedFiled, pathFiled } from "@akasha/indexes/testing"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { scratch, staged } from "../typecheck/typecheck.code-check.decision.test-fixtures.ts"
import { checkReachesAPathThroughTheIndex } from "./check-reaches-a-path-through-the-index.code-check.audit.code.ts"

afterAll(scratch.sweep)

const PAGE_TYPE = "page-type"

const THING = "thing"

const TYPE_AT = "akasha/thing.page-type.ts"

const CODE_AT = "akasha/one.thing.code.ts"

const FIXTURES_AT = "akasha/one.thing.test-fixtures.ts"

const HELD_AT = "akasha/held/held.module.code.ts"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299150"

const LISTS = 'export const held = readdirSync("akasha/held")\n'

const ASKS = "export const held = 1\n"

function rootWith(bodies: Readonly<Record<string, string>>): string {
  const root = staged({ [TYPE_AT]: ASKS, [HELD_AT]: ASKS, ...bodies })
  listedFiled(root, PAGE_TYPE, THING, [{ path: TYPE_AT, id: ID }])
  pathFiled(root, HELD_AT, [{ path: HELD_AT, id: ID }])
  for (const at of Object.keys(bodies)) pathFiled(root, at, [{ path: at, id: ID }])
  return root
}

test("an audit reads every path the index files rather than a change", () => {
  const said = checkReachesAPathThroughTheIndex(rootWith({ [CODE_AT]: LISTS }))
  expect(said.map((one) => one.path)).toEqual([CODE_AT])
  expect(said[0]?.reason).toContain("akasha/held")
})

test("an audit lets a page's code that lists nothing through", () => {
  expect(checkReachesAPathThroughTheIndex(rootWith({ [CODE_AT]: ASKS }))).toEqual([])
})

test("an audit passes over a file beside a page that is no code file", () => {
  expect(checkReachesAPathThroughTheIndex(rootWith({ [FIXTURES_AT]: LISTS }))).toEqual([])
})

test("an audit judges no file the index does not file", () => {
  const root = rootWith({})
  put(root, CODE_AT, LISTS)
  expect(checkReachesAPathThroughTheIndex(root)).toEqual([])
})
