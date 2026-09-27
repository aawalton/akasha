import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  sidecarsIn,
  sidecarsOf,
  sidecarsOver,
} from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
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

test("the page types named answer as every page type read together answers them", () => {
  const root = rootOf(import.meta.dir)
  const every = sidecarsOver(root, [])
  const kinds = [
    "seat",
    "persona",
    "module",
    "page",
    "service-workstation",
    "module-property-group",
    "story-chapter-read",
    "no-such-page-type",
  ]
  const named = sidecarsOf(root, kinds)
  for (const kind of kinds) expect(named.get(kind)).toEqual(every.get(kind))
  expect(named.get("seat")?.uncommitted).toBe(true)
})

test("a page of a file property group page type has no file of its own beside it", () => {
  expect([...(sidecarsIn(GROUPING).get("module-property-group")?.besides ?? [])]).toEqual([])
})
