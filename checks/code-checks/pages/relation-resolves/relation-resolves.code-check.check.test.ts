import { afterAll, expect, test } from "bun:test"
import type { Change } from "@akasha/pages/change"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { relationResolves } from "./relation-resolves.code-check.check.code.ts"
import {
  A,
  note,
  over,
  rooted,
  scratch,
} from "./relation-resolves.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return relationResolves(change, cast.shadow)
}

test("the check refuses a page the change carries whose name reaches nothing", () => {
  const root = rooted()

  expect(judged(over(root, [A], note(', domainSlug: "domain/gone"')))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `gone`" },
  ])
})

test("the check lets through a page whose name reaches a page the index carries", () => {
  const root = rooted()

  expect(judged(over(root, [A], note(', domainSlug: "domain/d"')))).toEqual([])
})

test("the check takes a page as its input and no other body", () => {
  const root = rooted()
  const cast = shadowFor(over(root, [A], note(', domainSlug: "domain/d"')))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(relationResolves.isInput(A, cast.shadow)).toBe(true)
  expect(relationResolves.isInput("akasha/t/a.module.code.ts", cast.shadow)).toBe(false)
})
