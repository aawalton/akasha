import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Composed, Landing } from "./migration-landing.module.code.ts"
import {
  batchesOf,
  emptiedUnder,
  messageFor,
  migrationLanded,
  mistakenIn,
  unitsOf,
} from "./migration-landing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function heard(): { readonly lines: string[]; readonly saying: (line: string) => undefined } {
  const lines: string[] = []
  return {
    lines,
    saying: (line: string): undefined => {
      lines.push(line)
    },
  }
}

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

test("three batches refused stop the migration and say so", () => {
  const held = takingDown([REFUSED, REFUSED, REFUSED, LANDED])
  const said = migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(8),
    files: 2,
    landing: held.landing,
    saying: heard().saying,
  })
  expect(held.asked.length).toBe(3)
  expect(said.halted).toContain("3 of 4 batches were refused")
})

test("a batch that landed does not clear the count of those refused", () => {
  const held = takingDown([REFUSED, REFUSED, LANDED, REFUSED, REFUSED])
  const said = migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(10),
    files: 2,
    landing: held.landing,
    saying: heard().saying,
  })
  expect(held.asked.length).toBe(4)
  expect(said.halted).toContain("3 of 5 batches were refused")
  expect(said.refused.length).toBe(3)
})

test("a refused batch is said to a caller that reads nothing back", () => {
  const held = takingDown([LANDED, REFUSED, LANDED])
  const told = heard()
  migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(6),
    files: 2,
    landing: held.landing,
    saying: told.saying,
  })
  expect(told.lines.some((one) => one.includes("batch 2 of 3 was refused"))).toBe(true)
  expect(told.lines.some((one) => one.includes("this migration is partial"))).toBe(true)
})

test("a migration every batch of which lands says nothing", () => {
  const held = takingDown([])
  const told = heard()
  migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: composedOf(4),
    files: 2,
    landing: held.landing,
    saying: told.saying,
  })
  expect(told.lines).toEqual([])
})

test("a body composed twice is said as well as answered", () => {
  const told = heard()
  migrationLanded("/root", {
    calledAs: "test",
    subject: "one",
    composed: [
      { path: "one.ts", body: "a" },
      { path: "one.ts", body: "b" },
    ],
    landing: takingDown([]).landing,
    saying: told.saying,
  })
  expect(told.lines.some((one) => one.includes("composed twice"))).toBe(true)
})

test("a directory a refused batch left holding nothing is taken away", () => {
  const root = scratch.rootFor("migration-landing-")
  mkdirSync(join(root, "pages", "one"), { recursive: true })
  const swept = emptiedUnder(root, ["pages/one/a.ts"])
  expect(swept).toEqual([join("pages", "one"), "pages"])
  expect(existsSync(join(root, "pages"))).toBe(false)
})

test("a directory still holding something is left alone", () => {
  const root = scratch.rootFor("migration-landing-")
  mkdirSync(join(root, "pages", "one"), { recursive: true })
  writeFileSync(join(root, "pages", "one", "kept.ts"), "x")
  expect(emptiedUnder(root, ["pages/one/a.ts"])).toEqual([])
  expect(existsSync(join(root, "pages", "one"))).toBe(true)
})

test("the root itself is never taken away", () => {
  const root = scratch.rootFor("migration-landing-")
  expect(emptiedUnder(root, ["a.ts"])).toEqual([])
  expect(existsSync(root)).toBe(true)
})
