import { afterAll, expect, test } from "bun:test"
import { checkReachesAPathThroughTheIndex } from "akasha/check/code/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowed } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import {
  change,
  scratch,
  staged,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

afterAll(scratch.sweep)

const PAGE_TYPE = "page-type"

const THING = "thing"

const TYPE_AT = "akasha/thing.page-type.ts"

const CODE_AT = "akasha/one.thing.code.ts"

const FIXTURES_AT = "akasha/one.thing.test-fixtures.ts"

const HELD_AT = "akasha/held/held.module.code.ts"

const LOOSE = "akasha/loose"

const LOOSE_AT = `${LOOSE}/loose.module.code.ts`

const INDEX = "index"

const INDEX_TYPE_AT = "akasha/index.page-type.ts"

const INDEX_CODE_AT = "akasha/one.index.code.ts"

const INDEX_TEST_AT = "akasha/one.index.test.ts"

const INDEX_ID = "01a09163-1a4e-7001-aebe-6612c8d7f8e7"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299151"

const LISTS = 'export const held = readdirSync("akasha/held")\n'

const LISTS_LOOSE = `export const held = readdirSync("${LOOSE}")\n`

const ASKS = "export const held = 1\n"

const SPELLS_A_TAIL = 'const SUFFIX = ".thing.code.ts"\nexport const held = readdirSync(dir)\n'

function rooted(): string {
  const root = staged({
    [TYPE_AT]: ASKS,
    [INDEX_TYPE_AT]: ASKS,
    [HELD_AT]: ASKS,
    [LOOSE_AT]: ASKS,
  })
  listedFiled(root, PAGE_TYPE, THING, [{ path: TYPE_AT, id: ID }])
  listedFiled(root, PAGE_TYPE, INDEX, [{ path: INDEX_TYPE_AT, id: INDEX_ID }])
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

test("a folder the checkout holds that the index answers no path under is listed", () => {
  const said = judged({ [CODE_AT]: LISTS_LOOSE })
  expect(said.map((one) => one.path)).toEqual([CODE_AT])
  expect(said[0]?.reason).toContain(LOOSE)
})

test("a page file's name spelled where the file lists a folder is refused", () => {
  expect(judged({ [CODE_AT]: SPELLS_A_TAIL })).toHaveLength(1)
})

test("a page's path spelled is refused where the path of a page's file is not", () => {
  expect(judged({ [CODE_AT]: `export const at = "${TYPE_AT}"\n` })).toHaveLength(1)
  expect(judged({ [CODE_AT]: `export const at = "${HELD_AT}"\n` })).toEqual([])
})

test("a page's test fixtures the change carries are passed over", () => {
  expect(judged({ [FIXTURES_AT]: LISTS })).toEqual([])
})

test("a page's code is input to this check and its test fixtures are not", () => {
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
