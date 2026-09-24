import { afterAll, expect, test } from "bun:test"
import { movesOf } from "akasha/change/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.test-fixtures.ts"
import { pageRenamed } from "akasha/change/modules/page-renaming/page-renaming.module.code.ts"
import { carrying, ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const rungId = (one: string): string => `01a04a4a-0007-7000-8000-00000000000${one}`

const RUNGS_PAGE = "akasha/rungs/rungs.module.ts"

const CHILD_PAGE = "akasha/rungs/rungs-one/rungs-one.module.ts"

const CHILD_MOVED = "akasha/rung/rungs-one/rungs-one.module.ts"

test("a rename stacked on another lands its folder where the first rename left the folder above", () => {
  const root = indexedRepo({
    [RUNGS_PAGE]: pageOf({ id: rungId("1"), pageTypeSlug: "module", slug: "rungs" }),
    [CHILD_PAGE]: pageOf({ id: rungId("2"), pageTypeSlug: "module", slug: "rungs-one" }),
  })
  const ledger = ledgerAt(root, textIn(root))
  const first = pageRenamed(ledger, { at: RUNGS_PAGE, to: "rung" })
  expect(first.refused).toBe(null)
  expect(movesOf(first)).toContainEqual([CHILD_PAGE, CHILD_MOVED])

  const second = pageRenamed(carrying(ledger, first), { at: CHILD_MOVED, to: "rung-one" })

  expect(second.refused).toBe(null)
  expect(movesOf(second)).toEqual([[CHILD_MOVED, "akasha/rung/one/rung-one.module.ts"]])
})
