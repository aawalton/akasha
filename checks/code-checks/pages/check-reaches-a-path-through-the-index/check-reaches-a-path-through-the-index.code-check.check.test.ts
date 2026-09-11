import { afterAll, expect, test } from "bun:test"
import { checkReachesAPathThroughTheIndex } from "akasha/checks/code-checks/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.code-check.check.code.ts"
import {
  change,
  scratch,
  staged,
} from "akasha/checks/modules/check-staging/check-staging.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { pathFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

afterAll(scratch.sweep)

const PAGE_TYPE = "page-type"

const THING = "thing"

const TYPE_AT = "akasha/thing.page-type.ts"

const CODE_AT = "akasha/one.thing.code.ts"

const FIXTURES_AT = "akasha/one.thing.test-fixtures.ts"

const HELD_AT = "akasha/held/held.module.code.ts"

const INDEX = "index"

const INDEX_TYPE_AT = "akasha/index.page-type.ts"

const INDEX_CODE_AT = "akasha/one.index.code.ts"

const INDEX_TEST_AT = "akasha/one.index.test.ts"

const INDEX_ID = "01a09163-1a4e-7001-aebe-6612c8d7f8e7"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299151"

const LISTS = 'export const held = readdirSync("akasha/held")\n'

const ASKS = "export const held = 1\n"

function rooted(): string {
  const root = staged({ [TYPE_AT]: ASKS, [INDEX_TYPE_AT]: ASKS, [HELD_AT]: ASKS })
  listedFiled(root, PAGE_TYPE, THING, [{ path: TYPE_AT, id: ID }])
  listedFiled(root, PAGE_TYPE, INDEX, [{ path: INDEX_TYPE_AT, id: INDEX_ID }])
  pathFiled(root, HELD_AT, [{ path: HELD_AT, id: ID }])
  return root
}

function judged(over: Readonly<Record<string, string>>): readonly Judged[] {
  const given = change(rooted(), over)
  return checkReachesAPathThroughTheIndex(given, shadowed(given))
}

test("a body the change carries is judged by what the decision answers", () => {
  const said = judged({ [CODE_AT]: LISTS })
  expect(said.map((one) => one.path)).toEqual([CODE_AT])
  expect(said[0]?.reason).toContain("akasha/held")
})

test("a page's code the change carries that lists nothing is let through", () => {
  expect(judged({ [CODE_AT]: ASKS })).toEqual([])
})

test("a file beside a page that is no code file is passed over", () => {
  expect(judged({ [FIXTURES_AT]: LISTS })).toEqual([])
})

test("a page's code is input to this check and a file beside it is not", () => {
  const given = change(rooted(), {})
  const shadow = shadowed(given)
  expect(checkReachesAPathThroughTheIndex.isInput(CODE_AT, shadow)).toBe(true)
  expect(checkReachesAPathThroughTheIndex.isInput(FIXTURES_AT, shadow)).toBe(false)
})

test("an index's own code is no input to this check and an index's test is", () => {
  const given = change(rooted(), {})
  const shadow = shadowed(given)
  expect(checkReachesAPathThroughTheIndex.isInput(INDEX_CODE_AT, shadow)).toBe(false)
  expect(checkReachesAPathThroughTheIndex.isInput(INDEX_TEST_AT, shadow)).toBe(true)
})
