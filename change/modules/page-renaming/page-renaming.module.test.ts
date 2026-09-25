import { afterAll, expect, test } from "bun:test"
import { movesOf } from "akasha/change/mechanical/page/rename/rename-page/rename-page.change-mechanical.test-fixtures.ts"
import { pageRenamed } from "akasha/change/modules/page-renaming/page-renaming.module.code.ts"
import { carrying, ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import {
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const rungId = (one: string): string => `01a04a4a-0007-7000-8000-00000000000${one}`

const RUNGS_PAGE = "akasha/rungs/rungs.module.ts"

const CHILD_PAGE = "akasha/rungs/rungs-one/rungs-one.module.ts"

const CHILD_MOVED = "akasha/rung/rungs-one/rungs-one.module.ts"

test("a rename stacked on another lands its folder where the first rename left the folder above", () => {
  const root = indexedRepo({
    [RUNGS_PAGE]: pageOf({ id: rungId("1"), type: MODULE_AT, slug: "rungs" }),
    [CHILD_PAGE]: pageOf({ id: rungId("2"), type: MODULE_AT, slug: "rungs-one" }),
  })
  const ledger = ledgerAt(root, textIn(root))
  const first = pageRenamed(ledger, { at: RUNGS_PAGE, to: "rung" })
  expect(first.refused).toBe(null)
  expect(movesOf(first)).toContainEqual([CHILD_PAGE, CHILD_MOVED])

  const second = pageRenamed(carrying(ledger, first), { at: CHILD_MOVED, to: "rung-one" })

  expect(second.refused).toBe(null)
  expect(movesOf(second)).toEqual([[CHILD_MOVED, "akasha/rung/one/rung-one.module.ts"]])
})

const PART_PAGE = "akasha/sets/page/rename/sets-file-rename.module.ts"

test("a folder is named against the one page above it, whatever else sits beside that page", () => {
  const root = indexedRepo({
    "akasha/sets/sets.module.ts": pageOf({ id: rungId("3"), type: MODULE_AT, slug: "sets" }),
    "akasha/sets/page/sets-page.module.ts": pageOf({
      id: rungId("4"),
      type: MODULE_AT,
      slug: "sets-page",
    }),
    "akasha/sets/page/notes.md": "kept\n",
    [PART_PAGE]: pageOf({ id: rungId("5"), type: MODULE_AT, slug: "sets-file-rename" }),
  })

  const said = pageRenamed(ledgerAt(root, textIn(root)), { at: PART_PAGE, to: "sets-page-rename" })

  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([[PART_PAGE, "akasha/sets/page/rename/sets-page-rename.module.ts"]])
})
