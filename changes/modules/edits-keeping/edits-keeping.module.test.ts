import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratch } from "@akasha/indexes/indexing/testing"
import { ENTRY_CEILING } from "@akasha/pages/entry-ceiling"
import { said as gitIn } from "../../../git/git-running/git-running.module.code.ts"
import { pathsOf } from "../answer/change-answer.module.code.ts"
import type { FileChange } from "../answer/change-answer.module.types.ts"
import {
  appendEdits,
  editsAt,
  editsIn,
  foldedIn,
  keptAt,
  keptEdits,
} from "./edits-keeping.module.code.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/agents/pages/tester.agent.ts"

const AT = "akasha/agents/pages/tester.agent.edits.uncommitted.jsonl"

const TWO_AT = "akasha/agents/pages/tester.agent.edits.part2.uncommitted.jsonl"

const ONE = "akasha/one.module.ts"

const TWO = "akasha/two.module.ts"

function adding(path: string, content: string): FileChange {
  return { kind: "add", path, content }
}

function rootFor(): string {
  const root = scratch.rootFor("akasha-edits-")
  gitIn(root, ["init"])
  return root
}

function pathsIn(said: ReturnType<typeof editsIn>): readonly string[] {
  return "why" in said ? [] : said.rows.flatMap(pathsOf)
}

function putting(root: string, text: string, at: string = AT): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, text)
}

function lined(...rows: readonly unknown[]): string {
  return rows.map((one) => `${JSON.stringify(one)}\n`).join("")
}

function storedIn(root: string): readonly string[] {
  return readFileSync(join(root, AT), "utf8")
    .split("\n")
    .filter((one) => one !== "")
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

  appendEdits(root, PAGE, [adding(ONE, "a\n")])
  appendEdits(root, PAGE, [{ kind: "remove", path: TWO }, adding(ONE, "c\n")])

  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE, TWO, ONE])
})

test("an add comes back stating the path and the content that path is to hold", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [adding(ONE, "a\n")])

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ kind: "add", path: ONE, content: "a\n" }] })
})

test("a replace comes back stating the passage each side", () => {
  const root = rootFor()
  const row = { kind: "replace", path: ONE, contentFrom: "two", contentTo: "three" } as const

  appendEdits(root, PAGE, [row])

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("a remove comes back stating the path alone", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [{ kind: "remove", path: ONE }])

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ kind: "remove", path: ONE }] })
})

test("a move comes back stating the path moved from and the path moved to", () => {
  const root = rootFor()
  const row = { kind: "move", pathFrom: ONE, pathTo: TWO } as const

  appendEdits(root, PAGE, [row])

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("a row states no body the change worked that row out from", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)

  appendEdits(root, PAGE, [{ kind: "remove", path: ONE }])

  expect(storedIn(root)).toEqual([JSON.stringify({ kind: "remove", path: ONE })])
})

test("a row saying its readers owe no reading keeps that flag", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [{ readersOweReading: false, kind: "add", path: ONE, content: "a\n" }])

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ readersOweReading: false, kind: "add", path: ONE, content: "a\n" }],
  })
})

test("a row saying its readers owe reading keeps that flag", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [{ readersOweReading: true, kind: "add", path: ONE, content: "a\n" }])

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ readersOweReading: true, kind: "add", path: ONE, content: "a\n" }],
  })
})

test("a row saying nothing of that flag comes back saying nothing", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [adding(ONE, "a\n")])

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ kind: "add", path: ONE, content: "a\n" }] })
})

test("a line whose flag is no boolean refuses the whole file", () => {
  const root = rootFor()
  putting(root, lined({ kind: "add", path: ONE, content: "a\n", readersOweReading: "no" }))

  expect(editsIn(root, PAGE)).toEqual({ why: "line 1 reads as no edit" })
})

test("a line stating a kind that is no kind refuses the whole file", () => {
  const root = rootFor()
  putting(root, lined({ kind: "swap", path: ONE }))

  expect(editsIn(root, PAGE)).toEqual({ why: "line 1 reads as no edit" })
})

test("a file worked out to no row is taken away", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [adding(ONE, "a\n")])

  expect(keptEdits(root, PAGE, () => null)).toEqual({ rows: [] })
  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a line reading as no edit refuses the whole file and names the line", () => {
  const root = rootFor()
  putting(root, `${lined(adding(ONE, "a\n"))}not an edit\n`)

  expect(editsIn(root, PAGE)).toEqual({ why: "line 2 reads as no edit" })
})

test("a file a line refuses is left as that file is", () => {
  const root = rootFor()
  putting(root, "not an edit\n")

  expect(keptEdits(root, PAGE, () => [])).toEqual({ why: "line 1 reads as no edit" })
  expect(editsIn(root, PAGE)).toEqual({ why: "line 1 reads as no edit" })
})

test("the rows fold into one answer holding every row in the order the rows were kept", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [adding(ONE, "a\n")])
  appendEdits(root, PAGE, [{ kind: "replace", path: ONE, contentFrom: "a", contentTo: "b" }])

  const said = editsIn(root, PAGE)

  expect(foldedIn("why" in said ? [] : said.rows)).toEqual({
    edits: [
      { kind: "add", path: ONE, content: "a\n" },
      { kind: "replace", path: ONE, contentFrom: "a", contentTo: "b" },
    ],
    refused: null,
  })
})

test("an append leaves the bytes already appended where those bytes are", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [adding(ONE, "a\n")])
  const was = readFileSync(join(root, AT), "utf8")

  appendEdits(root, PAGE, [adding(TWO, "b\n")])

  expect(readFileSync(join(root, AT), "utf8").startsWith(was)).toBe(true)
})

test("an append answers the rows appended rather than every row kept", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [adding(ONE, "a\n")])

  expect(appendEdits(root, PAGE, [adding(TWO, "b\n")])).toEqual({
    rows: [{ kind: "add", path: TWO, content: "b\n" }],
  })
})

test("an append leaves no ref and writes no git object", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [adding(ONE, "a\n")])

  expect(gitIn(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/**"]).trim()).toBe("")
})

test("a row past the ceiling is alone and the row after it opens the next file", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [adding(ONE, "z".repeat(ENTRY_CEILING))])

  appendEdits(root, PAGE, [adding(TWO, "b\n")])

  expect(existsSync(join(root, TWO_AT))).toBe(true)
  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE, TWO])
})

test("the file the edits are kept in is the file the apply reports", () => {
  expect(keptAt(PAGE)).toBe(AT)
})

test("the rows a settle writes again are the rows that settle answered", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [
    { kind: "remove", path: ONE },
    { kind: "remove", path: TWO },
  ])

  keptEdits(root, PAGE, (had) => had.slice(1))

  expect(storedIn(root)).toEqual([JSON.stringify({ kind: "remove", path: TWO })])
})
