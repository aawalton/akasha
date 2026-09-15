import { afterAll, expect, test } from "bun:test"
import { relationResolves } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.audit.code.ts"
import {
  A,
  A_ID,
  filing,
  rooted,
  scratch,
} from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const root = rooted()
  filing(root, A, A_ID, "note", "a", { domainSlug: "domain/gone" })

  expect(relationResolves(tracked(root))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `gone`" },
  ])
})

test("an audit lets through a tree where every name reaches a page", () => {
  const root = rooted()
  filing(root, A, A_ID, "note", "a", { domainSlug: "domain/d" })

  expect(relationResolves(tracked(root))).toEqual([])
})
