import { afterAll, expect, test } from "bun:test"
import { partsListIsSorted } from "akasha/checks/code-checks/pages/parts-list-is-sorted/parts-list-is-sorted.code-check.check.code.ts"
import {
  AT,
  domainBody,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/parts-list-is-sorted/parts-list-is-sorted.code-check.decision.test-fixtures.ts"
import {
  judgingBy,
  landing,
  shadowed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(partsListIsSorted)

test("the check refuses a page the change carries whose parts are out of order", () => {
  const body = domainBody('parts: ["domain/b", "domain/a"]')

  const said = judging(landing(rooted(), { [AT]: body }))

  expect(said.map((one) => one.path)).toEqual([AT])
})

test("the check lets through a page whose parts rise", () => {
  const body = domainBody('parts: ["domain/a", "domain/b"]')

  expect(judging(landing(rooted(), { [AT]: body }))).toEqual([])
})

test("the check takes a page as its input and no file that is no page", () => {
  const shadow = shadowed(landing(rooted(), { [AT]: domainBody('parts: ["domain/a"]') }))

  expect(partsListIsSorted.isInput(AT, shadow)).toBe(true)
  expect(partsListIsSorted.isInput("akasha/held.ts", shadow)).toBe(false)
})
