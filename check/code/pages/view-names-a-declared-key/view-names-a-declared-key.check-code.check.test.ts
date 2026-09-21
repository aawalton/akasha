import { afterAll, expect, test } from "bun:test"
import { viewNamesADeclaredKey } from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.check.code.ts"
import {
  QUOIN,
  rooted,
  scratch,
  TEXT,
  viewing,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.test-fixtures.ts"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  landing,
  pathFor,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

const UNDER = "akasha-viewed-check-"

const PAGE_TYPE = "page-type"

const LISTS_QUOIN = `${PAGE_TYPE}/${QUOIN}`

afterAll(scratch.sweep)

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return viewNamesADeclaredKey(change, cast.shadow)
}

function narrowing(root: string, declares: readonly string[]): Change {
  typed(root, QUOIN, "page", declares)
  const at = pathFor(PAGE_TYPE, QUOIN)
  return landing(root, { [at]: onDisk(root)(at) })
}

test("a change naming only a page type is judged over every view listing that page type", () => {
  const root = rooted(UNDER)
  const at = viewing(root, "looking", { pageType: LISTS_QUOIN, shown: ["held"] })

  const said = judged(narrowing(root, []))

  expect(said.map((one) => one.path)).toEqual([at])
  expect(said[0]?.reason ?? "").toContain("`held` at `shown[0]`")
})

test("a change leaving every key a view names declared is let through", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { pageType: LISTS_QUOIN, shown: ["held"] })

  expect(judged(narrowing(root, [`${TEXT}/held`]))).toEqual([])
})

test("a view is a path this check takes", () => {
  const root = rooted(UNDER)
  const at = viewing(root, "looking", { pageType: LISTS_QUOIN })
  const cast = shadowFor(landing(root, {}))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(viewNamesADeclaredKey.isInput(at, cast.shadow)).toBe(true)
})
