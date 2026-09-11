import { afterAll, expect, test } from "bun:test"
import { pageMatchesItsType } from "akasha/checks/code-checks/pages/page-matches-its-type/page-matches-its-type.code-check.check.code.ts"
import {
  rooting,
  scratch,
  THING_AT,
  THING_BODY,
  THING_EXTRA,
  wrote,
} from "akasha/checks/code-checks/pages/page-matches-its-type/page-matches-its-type.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { change } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

const UNDER = "akasha-matches-bound-"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return pageMatchesItsType(held, cast.shadow)
}

test("the check refuses a page stating what its type does not declare", () => {
  const root = wrote(rooting(UNDER), { [THING_AT]: THING_EXTRA })

  const said = judged(root, [THING_AT])

  expect(said.map((one) => one.path)).toEqual([THING_AT])
  expect(said[0]?.reason).toContain("does not declare")
})

test("the check lets through a page carrying what its type declares", () => {
  const root = wrote(rooting(UNDER), { [THING_AT]: THING_BODY })

  expect(judged(root, [THING_AT])).toEqual([])
})

test("the check takes a page as its input and no file that is no page", () => {
  const root = wrote(rooting(UNDER), { [THING_AT]: THING_BODY })
  const cast = shadowFor(change(root, [THING_AT]))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(pageMatchesItsType.isInput(THING_AT, cast.shadow)).toBe(true)
  expect(pageMatchesItsType.isInput("akasha/one.ts", cast.shadow)).toBe(false)
})

const ROWS_AT = "akasha/one.thing.rows.jsonl"

const ROWED = 'export const one = { pageTypeSlug: "thing", slug: "one", rows: "jsonl" }\n'

const ROWING = { [THING_AT]: ROWED, [ROWS_AT]: "not json at all\n" }

const UNREAD = `'${ROWS_AT}' holds no JSON on line 1, so what the page carries there is unknown rather than nothing`

test("the check takes an entry file as its input, though the change carries no page", () => {
  const cast = shadowFor(change(wrote(rooting(UNDER), ROWING), [ROWS_AT]))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(pageMatchesItsType.isInput(ROWS_AT, cast.shadow)).toBe(true)
})

test("a change with an entry file alone is judged as the page that file sits beside", () => {
  const root = wrote(rooting(UNDER), ROWING)

  expect(judged(root, [ROWS_AT])).toEqual([{ path: THING_AT, reason: UNREAD }])
})

test("a page the change carries beside its own entry file is judged once rather than twice", () => {
  const root = wrote(rooting(UNDER), ROWING)

  expect(judged(root, [ROWS_AT, THING_AT])).toEqual([{ path: THING_AT, reason: UNREAD }])
})
