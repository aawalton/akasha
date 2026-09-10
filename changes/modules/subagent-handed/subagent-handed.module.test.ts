import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratch } from "@akasha/indexes/indexing/testing"
import { valueAlsoFiled } from "@akasha/indexes/testing"
import { keepUncommitted } from "@akasha/pages/page-uncommitted"
import { handedPageOf, handedUnder } from "./subagent-handed.module.code.ts"

afterAll(scratch.sweep)

const SEAT = "seat-system/seats/pages/tester.seat.ts"

const SUBAGENT = "subagent"

const ROW = `${JSON.stringify({ kind: "remove", path: "one.md" })}\n`

function rootFor(): string {
  const root = scratch.rootFor("subagent-handed-")
  valueAlsoFiled(root, SUBAGENT, [])
  return root
}

function putting(root: string, at: string, text: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, text)
}

function pageFor(root: string, slug: string): undefined {
  const at = handedPageOf(slug)
  putting(root, at, "export const held = {}\n")
  valueAlsoFiled(root, SUBAGENT, [{ path: at, value: { id: slug, slug } }])
}

function keptFor(root: string, slug: string): undefined {
  putting(root, `seat-system/subagents/pages/${slug}.subagent.edits.uncommitted.jsonl`, ROW)
}

function returnedFor(root: string, slug: string): undefined {
  keepUncommitted(root, handedPageOf(slug), { returned: true })
}

function handed(root: string, slug: string): undefined {
  pageFor(root, slug)
  keptFor(root, slug)
  returnedFor(root, slug)
}

test("a subagent's page is under the subagents folder named for its slug", () => {
  expect(handedPageOf("tester-abc")).toBe("seat-system/subagents/pages/tester-abc.subagent.ts")
})

test("the edits a subagent left are the seat's once the subagent has returned", () => {
  const root = rootFor()
  handed(root, "tester-abc")

  expect(handedUnder(root, SEAT)).toEqual(["tester-abc"])
})

test("a subagent that has not returned has handed nothing over", () => {
  const root = rootFor()
  pageFor(root, "tester-abc")
  keptFor(root, "tester-abc")

  expect(handedUnder(root, SEAT)).toEqual([])
})

test("a subagent whose edits are gone has handed nothing over", () => {
  const root = rootFor()
  pageFor(root, "tester-abc")
  returnedFor(root, "tester-abc")

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
