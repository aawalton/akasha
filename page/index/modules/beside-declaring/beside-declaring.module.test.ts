import { expect, test } from "bun:test"
import { sidecarsIn } from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
import {
  ABOVE,
  GROUPING,
} from "akasha/page/index/modules/beside-declaring/beside-declaring.module.test-fixtures.ts"

test("the files beside a page are read from every page type above it", () => {
  const said = sidecarsIn(ABOVE).get("both")

  expect(said?.secret).toBe(true)
  expect(said?.uncommitted).toBe(true)
  expect([...(said?.besides ?? [])]).toEqual([
    ["patch", { held: "two-default", uncommitted: false }],
  ])
})

test("a page type declaring a file property group has a file beside it for every member", () => {
  expect([...(sidecarsIn(GROUPING).get("check-code")?.besides ?? [])]).toEqual([
    ["audit.code", { held: "ts", uncommitted: false }],
    ["audit.test", { held: "ts", uncommitted: false }],
    ["audit.logs", { held: "jsonl", uncommitted: true }],
  ])
})

test("a page of a file property group page type has no file of its own beside it", () => {
  expect([...(sidecarsIn(GROUPING).get("module-property-group")?.besides ?? [])]).toEqual([])
})
