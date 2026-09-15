import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { ENTRY_CEILING } from "akasha/page/modules/entry-ceiling/entry-ceiling.module.code.ts"
import { appending } from "akasha/page/service/modules/page-appending/page-appending.module.code.ts"

const PAGE = "one.module.ts"

const FIRST = "one.module.entries.uncommitted.jsonl"

const SECOND = "one.module.entries.part2.uncommitted.jsonl"

const LOGS = "one.module.check.logs.uncommitted.jsonl"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function seeded(): string {
  const root = scratch.rootFor("page-appending-")
  writeFileSync(join(root, PAGE), "", "utf8")
  return root
}

test("the lines of an append land beside the page, each one ending with a newline", () => {
  const root = seeded()
  const said = appending(root, { path: PAGE, lines: ['{"a":1}', '{"a":2}'] })
  expect(said).toEqual({ appended: FIRST })
  expect(readFileSync(join(root, FIRST), "utf8")).toBe('{"a":1}\n{"a":2}\n')
})

test("an append names the part it is kept under", () => {
  const root = seeded()
  const said = appending(root, { path: PAGE, under: "check.logs", lines: ["{}"] })
  expect(said).toEqual({ appended: LOGS })
  expect(readFileSync(join(root, LOGS), "utf8")).toBe("{}\n")
  expect(existsSync(join(root, FIRST))).toBe(false)
})

test("a path naming no page here is refused rather than given a file of its own", () => {
  const root = seeded()
  const said = appending(root, { path: "nowhere.module.ts", lines: ["{}"] })
  expect("refused" in said && said.refused).toContain("names no page here")
  expect(existsSync(join(root, "nowhere.module.entries.uncommitted.jsonl"))).toBe(false)
})

test("a part filled to its ceiling rolls to the next part", () => {
  const root = seeded()
  writeFileSync(join(root, FIRST), "x".repeat(ENTRY_CEILING - 1) + "\n", "utf8")
  const said = appending(root, { path: PAGE, lines: ["{}"] })
  expect(said).toEqual({ appended: SECOND })
  expect(readFileSync(join(root, SECOND), "utf8")).toBe("{}\n")
})

test("an append leaves no turn behind it", () => {
  const root = seeded()
  appending(root, { path: PAGE, lines: ["{}"] })
  expect(existsSync(`${join(root, FIRST)}.lock`)).toBe(false)
})
