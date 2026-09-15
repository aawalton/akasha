import { afterAll, expect, test } from "bun:test"
import { partsListIsSorted } from "akasha/check/code/pages/parts-list-is-sorted/parts-list-is-sorted.check-code.audit.code.ts"
import {
  AT,
  domainText,
  rooted,
  scratch,
} from "akasha/check/code/pages/parts-list-is-sorted/parts-list-is-sorted.check-code.decision.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const root = tracked(rooted(), { [AT]: domainText('parts: ["domain/b", "domain/a"]') })

  const said = partsListIsSorted(root)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`domain/a` after `domain/b`")
})

test("an audit lets through a tree whose every parts list rises", () => {
  const root = tracked(rooted(), { [AT]: domainText('parts: ["domain/a", "domain/b"]') })

  expect(partsListIsSorted(root)).toEqual([])
})
