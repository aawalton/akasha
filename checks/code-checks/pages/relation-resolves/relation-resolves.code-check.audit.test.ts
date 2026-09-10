import { afterAll, expect, test } from "bun:test"
import { relationResolves } from "./relation-resolves.code-check.audit.code.ts"
import {
  A,
  A_ID,
  filing,
  rooted,
  scratch,
  tracked,
} from "./relation-resolves.code-check.decision.test-fixtures.ts"

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
