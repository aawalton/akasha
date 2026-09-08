import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { put } from "@akasha/testing-system/putting"
import {
  checking,
  git,
  givenIn,
  landedFrom,
  scratch,
  wrote,
  wroteWith,
} from "../asking/asking.module.test-fixtures.ts"
import {
  BROKEN,
  LOOSE,
  REFORMATTED,
  REFUSES_LOOSE,
  repoWithTheFormatter,
  TIDY,
} from "./change-preparing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a loose body lands formatted and sorted, and the report says it did", async () => {
  const root = repoWithTheFormatter()
  const said = await wrote(root, ["--message", "held"], LOOSE)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(TIDY)
  expect(git(root, ["show", "HEAD:akasha/two.ts"])).toBe(TIDY)
  expect(said.report).toContain(REFORMATTED)
})

test("a body that will not parse lands whole rather than blank", async () => {
  const root = repoWithTheFormatter()
  const said = await wrote(root, ["--message", "held"], BROKEN)
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(BROKEN)
  expect(said.report).not.toContain(REFORMATTED)
})

test("a body already formatted lands untouched, and the report says nothing extra", async () => {
  const root = repoWithTheFormatter()
  const said = await wrote(root, ["--message", "held"], TIDY)
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(TIDY)
  expect(said.report).not.toContain(REFORMATTED)
})

test("a removal is carried through the formatter untouched, and nothing is said of it", async () => {
  const root = repoWithTheFormatter({
    "akasha/one.ts": "committed\n",
    "akasha/two.ts": "committed\n",
  })
  const said = await wroteWith(root, ["--remove", "akasha/two.ts", "--message", "held"])
  expect(said.code).toBe(0)
  expect(said.report).toContain("landed akasha/two.ts")
  expect(said.report).not.toContain(REFORMATTED)
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("the gate judges the formatted body, so a check refusing a loose one passes what lands", async () => {
  const root = repoWithTheFormatter()
  checking(root, "refuses-loose", REFUSES_LOOSE)
  const said = await wrote(root, ["--message", "held"], LOOSE)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(TIDY)
})

test("a body the formatter changed is recorded as it landed, not as it was handed in", async () => {
  const root = repoWithTheFormatter()
  expect((await wrote(root, [], LOOSE)).report).toContain(REFORMATTED)
  const said = await landedFrom(
    ["--file-path", "akasha/two.ts", "--content-file", put(root, "again.txt", TIDY)],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})
