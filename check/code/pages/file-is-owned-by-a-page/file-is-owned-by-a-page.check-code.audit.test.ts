import { afterAll, expect, test } from "bun:test"
import { fileIsOwnedByAPage } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.audit.code.ts"
import { UNOWNED } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts"
import {
  AWAY_AT,
  AWAY_ENDED_AT,
  STRAY_AT,
  strayed,
  whole,
} from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.test-fixtures.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

test("a tree whose every file belongs to a page is let through", () => {
  expect(fileIsOwnedByAPage(whole())).toEqual([])
})

test("a file no change names and no page owns is refused, and the rest are let through", () => {
  const said = fileIsOwnedByAPage(strayed())
  expect(said.map((one) => one.path)).toEqual([STRAY_AT, AWAY_AT, AWAY_ENDED_AT])
  expect(new Set(said.map((one) => one.reason))).toEqual(new Set([UNOWNED]))
})
