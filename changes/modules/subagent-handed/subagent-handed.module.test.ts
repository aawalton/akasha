import { afterAll, expect, test } from "bun:test"
import { scratch } from "@akasha/indexes/indexing/testing"
import type { FileChange } from "../answer/change-answer.module.types.ts"
import { appendEdits } from "../edits-keeping/edits-keeping.module.code.ts"
import { handedPageOf, handedUnder } from "./subagent-handed.module.code.ts"
import {
  handedFrom,
  noSubagentFiled,
  returnedFrom,
  subagentFiled,
} from "./subagent-handed.module.test-fixtures.ts"

afterAll(scratch.sweep)

const SEAT = "seat-system/seats/pages/tester.seat.ts"

const ROW: FileChange = { kind: "remove", path: "one.md" }

function rootFor(): string {
  const root = scratch.rootFor("subagent-handed-")
  noSubagentFiled(root)
  return root
}

function handed(root: string, slug: string): undefined {
  handedFrom(root, slug, [ROW])
}

test("a subagent's page is the path the index files that subagent at", () => {
  const root = rootFor()
  handed(root, "tester-abc")

  expect(handedPageOf(root, "tester-abc")).toBe(
    "seat-system/subagents/pages/tester-abc/tester-abc.subagent.ts"
  )
})

test("a subagent the index files no page for is at no page", () => {
  expect(handedPageOf(rootFor(), "tester-abc")).toBe(null)
})

test("the edits a subagent left are the seat's once the subagent has returned", () => {
  const root = rootFor()
  handed(root, "tester-abc")

  expect(handedUnder(root, SEAT)).toEqual(["tester-abc"])
})

test("a subagent that has not returned has handed nothing over", () => {
  const root = rootFor()
  appendEdits(root, subagentFiled(root, "tester-abc"), [ROW])

  expect(handedUnder(root, SEAT)).toEqual([])
})

test("a subagent whose edits are gone has handed nothing over", () => {
  const root = rootFor()
  subagentFiled(root, "tester-abc")
  returnedFrom(root, "tester-abc")

  expect(handedUnder(root, SEAT)).toEqual([])
})

test("a seat reaches the subagents whose slug its own name opens and no others", () => {
  const root = rootFor()
  handed(root, "tester-abc")
  handed(root, "other-abc")

  expect(handedUnder(root, SEAT)).toEqual(["tester-abc"])
})

test("the subagents are named in one order rather than the order the index answers", () => {
  const root = rootFor()
  for (const one of ["tester-c", "tester-a", "tester-b"]) handed(root, one)

  expect(handedUnder(root, SEAT)).toEqual(["tester-a", "tester-b", "tester-c"])
})

test("a repository the index files no subagent in answers none", () => {
  expect(handedUnder(rootFor(), SEAT)).toEqual([])
})

test("a path that is no page names no seat", () => {
  const root = rootFor()
  handed(root, "tester-abc")

  expect(handedUnder(root, "notes.md")).toEqual([])
})
