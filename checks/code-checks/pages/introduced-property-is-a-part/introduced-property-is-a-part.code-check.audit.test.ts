import { afterAll, expect, test } from "bun:test"
import { introducedPropertyIsAPart } from "./introduced-property-is-a-part.code-check.audit.code.ts"
import {
  pathFor,
  rooted,
  scratch,
  TEXT,
  typed,
} from "./introduced-property-is-a-part.code-check.decision.test-fixtures.ts"

const UNDER = "akasha-introduced-audit-"

afterAll(scratch.sweep)

test("an audit judges every page type the index has, no change naming any of them", () => {
  const root = rooted(UNDER)
  typed(root, "held", null, ["mine"], [])
  typed(root, "other", null, ["its"], [`${TEXT}/its`])
  const said = introducedPropertyIsAPart(root)
  expect(said.map((one) => one.path)).toEqual([pathFor("held")])
  expect(said[0]?.reason).toContain("`mine`")
})

test("an audit lets through a tree where every introduced property is a part", () => {
  const root = rooted(UNDER)
  typed(root, "held", null, ["mine"], [`${TEXT}/mine`])
  expect(introducedPropertyIsAPart(root)).toEqual([])
})
