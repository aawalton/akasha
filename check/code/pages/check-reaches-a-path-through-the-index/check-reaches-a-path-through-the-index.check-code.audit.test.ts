import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { checkReachesAPathThroughTheIndex } from "akasha/check/code/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.check-code.audit.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import {
  scratch,
  staged,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

afterAll(scratch.sweep)

const PAGE_TYPE = "page-type"

const THING = "thing"

const TYPE_AT = "akasha/thing.page-type.ts"

const CODE_AT = "akasha/one.thing.code.ts"

const FIXTURES_AT = "akasha/one.thing.test-fixtures.ts"

const HELD_AT = "akasha/held/held.module.code.ts"

const GONE_AT = "akasha/gone.thing.code.ts"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299150"

const LISTS = 'export const held = readdirSync("akasha/held")\n'

const ASKS = "export const held = 1\n"

function rootWith(bodies: Readonly<Record<string, string>>): string {
  const root = tracked(staged({ [TYPE_AT]: ASKS, [HELD_AT]: ASKS, ...bodies }))
  listedFiled(root, PAGE_TYPE, THING, [{ path: TYPE_AT, id: ID }])
  return root
}

test("an audit reads every text the tree holds rather than a change", () => {
  const said = checkReachesAPathThroughTheIndex(rootWith({ [CODE_AT]: LISTS }))
  expect(said.map((one) => one.path)).toEqual([CODE_AT])
  expect(said[0]?.reason).toContain("akasha/held")
})

test("an audit lets a page's code that lists nothing through", () => {
  expect(checkReachesAPathThroughTheIndex(rootWith({ [CODE_AT]: ASKS }))).toEqual([])
})

test("an audit passes over a page's test fixtures", () => {
  expect(checkReachesAPathThroughTheIndex(rootWith({ [FIXTURES_AT]: LISTS }))).toEqual([])
})

test("a path the tree names and the disk no longer holds reads as nothing", () => {
  const root = rootWith({})
  put(root, GONE_AT, LISTS)
  ran(["git", "-C", root, "add", "-A"])
  rmSync(join(root, GONE_AT))

  expect(checkReachesAPathThroughTheIndex(root)).toEqual([])
})
