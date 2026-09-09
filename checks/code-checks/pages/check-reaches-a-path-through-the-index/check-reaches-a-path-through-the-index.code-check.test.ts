import { afterAll, expect, test } from "bun:test"
import { listedFiled, pathFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { type Shadow, shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change, scratch, staged } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import { checkReachesAPathThroughTheIndex } from "./check-reaches-a-path-through-the-index.code-check.code.ts"

afterAll(scratch.sweep)

const PAGE_TYPE = "page-type"

const THING = "thing"

const TYPE_AT = "akasha/thing.page-type.ts"

const CODE_AT = "akasha/one.thing.code.ts"

const FIXTURES_AT = "akasha/one.thing.test-fixtures.ts"

const HELD_AT = "akasha/held/held.module.code.ts"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299151"

const LISTS = 'export const held = readdirSync("akasha/held")\n'

const ASKS = "export const held = 1\n"

function rooted(): string {
  const root = staged({ [TYPE_AT]: ASKS, [HELD_AT]: ASKS })
  listedFiled(root, PAGE_TYPE, THING, [{ path: TYPE_AT, id: ID }])
  pathFiled(root, HELD_AT, [{ path: HELD_AT, id: ID }])
  return root
}

function shadowed(given: Change): Shadow {
  const cast = shadowFor(given)
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow
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
