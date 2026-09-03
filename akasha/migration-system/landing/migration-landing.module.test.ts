import { expect, test } from "bun:test"
import type { Answer } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import type { Composed, Landing } from "./migration-landing.module.code.ts"
import {
  batchesOf,
  messageFor,
  migrationLanded,
  mistakenIn,
  unitsOf,
} from "./migration-landing.module.code.ts"

const LANDED: Answer = { report: ["committed as abc"], refusals: [], code: 0 }

const REFUSED: Answer = { report: [], refusals: ["no"], code: 3 }

function composedOf(many: number, body = "x"): readonly Composed[] {
  return Array.from({ length: many }, (_one, at) => ({ path: `pages/one/${at}.ts`, body }))
}

function takingDown(answers: readonly Answer[]): {
  readonly asked: FileEdit[][]
  readonly said: string[]
  readonly landing: Landing
} {
  const asked: FileEdit[][] = []
  const said: string[] = []
  let at = 0
  const landing: Landing = (
    _root: string,
    _calledAs: string,
    changes: readonly FileEdit[],
    message: string
  ): Answer => {
    asked.push([...changes])
    said.push(message)
    const answer = answers[at] ?? LANDED
    at += 1
    return answer
  }
  return { asked, said, landing }
}

test("a batch fills to the count it was given and no further", () => {
  const batches = batchesOf(composedOf(5), 2, 1_000_000)
  expect(batches.map((one) => one.length)).toEqual([2, 2, 1])
})

test("a batch fills to the weight it was given and no further", () => {
  const batches = batchesOf(composedOf(4, "aaaa"), 100, 9)
  expect(batches.map((one) => one.length)).toEqual([2, 2])
})

test("bodies stating one together are never parted across two batches", () => {
  const composed: readonly Composed[] = [
    { path: "one.ts", body: "a", together: "one" },
    { path: "two.ts", body: "a" },
    { path: "one.md", body: "a", together: "one" },
  ]
  expect(unitsOf(composed).map((one) => one.map((held) => held.path))).toEqual([
    ["one.ts", "one.md"],
    ["two.ts"],
  ])
  const batches = batchesOf(composed, 1, 1_000_000)
  expect(batches.map((one) => one.map((held) => held.path))).toEqual([
    ["one.ts", "one.md"],
    ["two.ts"],
  ])
})

test("a unit larger than the count is its own batch rather than being split", () => {
  const composed: readonly Composed[] = [
    { path: "one.ts", body: "a", together: "one" },
    { path: "two.ts", body: "a", together: "one" },
    { path: "three.ts", body: "a", together: "one" },
  ]
  expect(batchesOf(composed, 1, 10).map((one) => one.length)).toEqual([3])
})

test("a message says the subject, the count, and which batch it is", () => {
  expect(messageFor("proof", 1, 1, 1)).toBe("migration: proof — 1 file")
  expect(messageFor("proof", 2, 7, 200)).toBe("migration: proof — 200 files (batch 2 of 7)")
})

test("one path composed twice is refused before anything lands", () => {
  expect(
    mistakenIn([
      { path: "one.ts", body: "a" },
      { path: "one.ts", body: "b" },
    ])
  ).toEqual(["one.ts is composed twice, and one landing writes a path once"])
  const held = takingDown([])
  const said = migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: [
      { path: "one.ts", body: "a" },
      { path: "one.ts", body: "b" },
    ],
    landing: held.landing,
  })
  expect(said.code).toBe(1)
  expect(held.asked).toEqual([])
})

test("an absolute path is refused before anything lands", () => {
  expect(mistakenIn([{ path: "/one/two.ts", body: "a" }])[0]).toContain("absolute path")
})

test("every batch lands and what landed is answered whole", () => {
  const held = takingDown([])
  const said = migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(5),
    files: 2,
    landing: held.landing,
  })
  expect(held.asked.map((one) => one.length)).toEqual([2, 2, 1])
  expect(said.landed.length).toBe(5)
  expect(said.code).toBe(0)
  expect(held.said[0]).toBe("migration: one — 2 files (batch 1 of 3)")
})

test("a body composed as nothing lands as a removal", () => {
  const held = takingDown([])
  migrationLanded("/root", {
    calledAs: "test",
    subject: "gone",
    composed: [{ path: "pages/one/a.md", body: null }],
    landing: held.landing,
  })
  expect(held.asked[0]).toEqual([{ path: "pages/one/a.md", body: null }])
})

test("a batch refused leaves the batches before it landed", () => {
  const held = takingDown([LANDED, REFUSED, LANDED])
  const said = migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(6),
    files: 2,
    landing: held.landing,
  })
  expect(said.landed.length).toBe(4)
  expect(said.refused.length).toBe(1)
  expect(said.refused[0]?.batch.at).toBe(2)
  expect(said.halted).toBe(null)
  expect(said.code).toBe(1)
})

test("three batches refused in a row stop the migration and say so", () => {
  const held = takingDown([REFUSED, REFUSED, REFUSED, LANDED])
  const said = migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(8),
    files: 2,
    landing: held.landing,
  })
  expect(held.asked.length).toBe(3)
  expect(said.halted).toContain("3 batches in a row were refused")
})

test("a batch that landed clears the count of those refused in a row", () => {
  const held = takingDown([REFUSED, REFUSED, LANDED, REFUSED, REFUSED])
  const said = migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(10),
    files: 2,
    landing: held.landing,
  })
  expect(held.asked.length).toBe(5)
  expect(said.halted).toBe(null)
  expect(said.refused.length).toBe(4)
})
