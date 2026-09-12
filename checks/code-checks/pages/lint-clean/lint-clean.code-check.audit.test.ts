import { afterAll, expect, test } from "bun:test"
import {
  lintClean,
  mortalling,
} from "akasha/checks/code-checks/pages/lint-clean/lint-clean.code-check.audit.code.ts"
import {
  CLEAN,
  RULE,
  repo,
  scratch,
  UNUSED,
} from "akasha/checks/code-checks/pages/lint-clean/lint-clean.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { pagesAtFor } from "akasha/pages/service/page-composing/page-composing.module.code.ts"

afterAll(scratch.sweep)

const NONE_GO = { mortal: (): readonly string[] => [] }

test("an audit judges every file in the tree the linter reads, no change naming one", () => {
  const root = tracked(repo({ "akasha/one.ts": UNUSED, "akasha/two.ts": CLEAN }))

  const judged = lintClean(root, NONE_GO)

  expect(judged.map((one) => one.path)).toEqual(["akasha/one.ts"])
  expect(judged[0]?.reason).toContain(RULE)
})

test("an audit lets through a tree the linter finds nothing in", () => {
  const root = tracked(repo({ "akasha/one.ts": CLEAN }))

  expect(lintClean(root, NONE_GO)).toEqual([])
})

test("an audit judges a file under a folder no path names, the linter finding it itself", () => {
  const root = tracked(repo({ "akasha/deep/down/one.ts": UNUSED, "akasha/two.ts": CLEAN }))

  expect(lintClean(root, NONE_GO).map((one) => one.path)).toEqual(["akasha/deep/down/one.ts"])
})

test("an audit judges nothing under the pages of a page type that states it is mortal", () => {
  const root = tracked(repo({ "akasha/gone/pages/one.ts": UNUSED, "akasha/two.ts": CLEAN }))

  expect(lintClean(root, { mortal: () => ["akasha/gone/pages"] })).toEqual([])
})

test("which folders those are is read from the page types rather than named here", () => {
  const root = rootOf(import.meta.dir)

  const found = mortalling(root)

  expect(found).toContain(pagesAtFor(root, "subagent"))
  expect(found).not.toContain(pagesAtFor(root, "module"))
})
