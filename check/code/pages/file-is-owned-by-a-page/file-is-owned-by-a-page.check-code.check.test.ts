import { afterAll, expect, test } from "bun:test"
import { fileIsOwnedByAPage } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.check.code.ts"
import { UNOWNED } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts"
import {
  FILED_AT,
  NAMED_AT,
  STRAY_AT,
  strayed,
} from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.test-fixtures.ts"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = strayed()

const BOTH = onDisk(ROOT)

const HELD = shadowAt(ROOT)

afterAll(scratch.sweep)

function changing(changed: readonly string[]): Change {
  return { root: ROOT, changed, before: BOTH, after: BOTH }
}

test("the change refuses the path no page owns and lets the one a page names through", () => {
  expect(fileIsOwnedByAPage(changing([NAMED_AT, STRAY_AT]), HELD)).toEqual([
    { path: STRAY_AT, reason: UNOWNED },
  ])
})

test("a path the change leaves out is judged by nothing, so the tree is walked no further", () => {
  expect(fileIsOwnedByAPage(changing([NAMED_AT]), HELD)).toEqual([])
})

test("an index answer a change carries is let through", () => {
  expect(fileIsOwnedByAPage(changing([FILED_AT]), HELD)).toEqual([])
})
