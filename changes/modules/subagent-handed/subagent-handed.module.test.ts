import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratch } from "@akasha/indexes/indexing/testing"
import { handedPageOf, handedUnder } from "./subagent-handed.module.code.ts"

afterAll(scratch.sweep)

const SEAT = "seat-system/seats/pages/tester.seat.ts"

const ROW = `${JSON.stringify({ kind: "remove", path: "one.md" })}\n`

function rootFor(): string {
  return scratch.rootFor("subagent-handed-")
}

function putting(root: string, at: string, text: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, text)
}

function keptFor(root: string, slug: string): undefined {
  putting(root, `seat-system/subagents/pages/${slug}.subagent.edits.uncommitted.jsonl`, ROW)
}

test("a subagent's page is under the subagents folder named for its slug", () => {
  expect(handedPageOf("tester-abc")).toBe("seat-system/subagents/pages/tester-abc.subagent.ts")
})

test("the edits a subagent left are the seat's once the subagent's page is gone", () => {
  const root = rootFor()
  keptFor(root, "tester-abc")

  expect(handedUnder(root, SEAT)).toEqual(["tester-abc"])
})

test("a subagent still holding a page has handed nothing over", () => {
  const root = rootFor()
  keptFor(root, "tester-abc")
  putting(root, handedPageOf("tester-abc"), "export const testerAbc = {}\n")

  expect(handedUnder(root, SEAT)).toEqual([])
})

test("a seat reaches the subagents whose slug its own name opens and no others", () => {
  const root = rootFor()
  keptFor(root, "tester-abc")
  keptFor(root, "other-abc")

  expect(handedUnder(root, SEAT)).toEqual(["tester-abc"])
})

test("a file the edits are not named by is passed over rather than read", () => {
  const root = rootFor()
  putting(root, "seat-system/subagents/pages/tester-abc.subagent.patch.diff", "held\n")

  expect(handedUnder(root, SEAT)).toEqual([])
})

test("the subagents are named in one order rather than the order the folder answers", () => {
  const root = rootFor()
  for (const one of ["tester-c", "tester-a", "tester-b"]) keptFor(root, one)

  expect(handedUnder(root, SEAT)).toEqual(["tester-a", "tester-b", "tester-c"])
})

test("a folder that is not there answers no subagent", () => {
  expect(handedUnder(rootFor(), SEAT)).toEqual([])
})

test("a path that is no page names no seat", () => {
  const root = rootFor()
  keptFor(root, "tester-abc")

  expect(handedUnder(root, "notes.md")).toEqual([])
})
