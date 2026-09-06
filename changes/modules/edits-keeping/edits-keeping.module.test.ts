import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratch } from "@akasha/indexes/indexing/testing"
import { taking, writing } from "../change-answer/change-answer.module.code.ts"
import { appendEdits, editsAt, editsIn, foldedIn, keptEdits } from "./edits-keeping.module.code.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/agents/pages/tester.agent.ts"

const AT = "akasha/agents/pages/tester.agent.edits.jsonl"

const ONE = "akasha/one.module.ts"

const TWO = "akasha/two.module.ts"

function rootFor(): string {
  return scratch.rootFor("akasha-edits-")
}

function pathsIn(said: ReturnType<typeof editsIn>): readonly string[] {
  return "why" in said ? [] : said.rows.map((one) => one.path)
}

function putting(root: string, text: string): undefined {
  const full = join(root, AT)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, text)
}

test("the file is named beside the page by the rule every file beside a page is named by", () => {
  expect(editsAt(PAGE)).toBe(AT)
})

test("a path that is no page keeps no edits", () => {
  expect(editsAt("akasha/notes.md")).toBe(null)
  expect(editsIn(rootFor(), "akasha/notes.md")).toEqual({
    why: "a path that is no page keeps no edits",
  })
})

test("an agent that has appended nothing holds no row", () => {
  expect(editsIn(rootFor(), PAGE)).toEqual({ rows: [] })
})

test("two appends leave both sets of rows in the order the rows were appended", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])
  appendEdits(root, PAGE, [taking(TWO, "b\n"), writing(ONE, "a\n", "c\n")])

  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE, TWO, ONE])
})

test("a row comes back holding the path, the body it was worked out from and the body it leaves", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [taking(ONE, "a\n")])

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ path: ONE, was: "a\n", body: null }] })
})

test("a row naming the path it came from keeps that path", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [{ path: TWO, was: "a\n", body: "a\n", from: ONE }])

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ path: TWO, was: "a\n", body: "a\n", from: ONE }],
  })
})

test("a file worked out to no row is taken away", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])

  expect(keptEdits(root, PAGE, () => null)).toEqual({ rows: [] })
  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a line reading as no edit refuses the whole file and names the line", () => {
  const root = rootFor()
  putting(root, `${JSON.stringify(writing(ONE, null, "a\n"))}\nnot an edit\n`)

  expect(editsIn(root, PAGE)).toEqual({ why: "line 2 reads as no edit" })
})

test("a file a line refuses is left as that file is", () => {
  const root = rootFor()
  putting(root, "not an edit\n")

  expect(keptEdits(root, PAGE, () => [])).toEqual({ why: "line 1 reads as no edit" })
  expect(editsIn(root, PAGE)).toEqual({ why: "line 1 reads as no edit" })
})

test("the rows fold into one answer where the later followed the earlier", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])
  appendEdits(root, PAGE, [writing(ONE, "a\n", "b\n")])

  const said = editsIn(root, PAGE)

  expect(foldedIn("why" in said ? [] : said.rows)).toEqual({
    edits: [{ path: ONE, was: null, body: "b\n" }],
    refused: null,
  })
})

test("two rows for one path the later did not follow fold to a refusal", () => {
  const said = foldedIn([writing(ONE, null, "a\n"), writing(ONE, "z\n", "b\n")])

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`\`${ONE}\` is answered twice`)
})
