import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { said as gitIn } from "@akasha/git/git-running"
import { scratch } from "@akasha/indexes/indexing/testing"
import { ENTRY_CEILING } from "@akasha/pages/entry-ceiling"
import { taking, writing } from "../change-answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsAt,
  editsIn,
  foldedIn,
  keptAt,
  keptEdits,
  putUnder,
} from "./edits-keeping.module.code.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/agents/pages/tester.agent.ts"

const AT = "akasha/agents/pages/tester.agent.edits.uncommitted.jsonl"

const TWO_AT = "akasha/agents/pages/tester.agent.edits.part2.uncommitted.jsonl"

const OLD_AT = "akasha/agents/pages/tester.agent.edits.jsonl"

const KEPT = `refs/akasha/edits/${OLD_AT}`

const ONE = "akasha/one.module.ts"

const TWO = "akasha/two.module.ts"

function rootFor(): string {
  const root = scratch.rootFor("akasha-edits-")
  gitIn(root, ["init"])
  return root
}

function pathsIn(said: ReturnType<typeof editsIn>): readonly string[] {
  return "why" in said ? [] : said.rows.map((one) => one.path)
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
  putting(root, "b\n", TWO)

  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])
  appendEdits(root, PAGE, [taking(TWO, "b\n"), writing(ONE, "a\n", "c\n")])

  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE, TWO, ONE])
})

test("a row comes back holding the path, the body it was worked out from and the body it leaves", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)

  appendEdits(root, PAGE, [taking(ONE, "a\n")])

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ path: ONE, was: "a\n", body: null }] })
})

test("a row naming the path it came from keeps that path", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)

  appendEdits(root, PAGE, [{ path: TWO, was: "a\n", body: "a\n", from: ONE }])

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ path: TWO, was: "a\n", body: "a\n", from: ONE }],
  })
})

test("a row saying its readers owe no reading keeps that flag", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [{ path: ONE, was: null, body: "a\n", readersOweReading: false }])

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ path: ONE, was: null, body: "a\n", readersOweReading: false }],
  })
})

test("a row saying its readers owe reading keeps that flag", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [{ path: ONE, was: null, body: "a\n", readersOweReading: true }])

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ path: ONE, was: null, body: "a\n", readersOweReading: true }],
  })
})

test("a row saying nothing of that flag comes back saying nothing", () => {
  const root = rootFor()

  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ path: ONE, was: null, body: "a\n" }] })
})

test("a line whose flag is no boolean refuses the whole file", () => {
  const root = rootFor()
  putting(root, `${JSON.stringify({ ...writing(ONE, null, "a\n"), readersOweReading: "no" })}\n`)

  expect(editsIn(root, PAGE)).toEqual({ why: "line 1 reads as no edit" })
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

test("an append leaves the bytes already appended where those bytes are", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])
  const was = readFileSync(join(root, AT), "utf8")

  appendEdits(root, PAGE, [writing(TWO, null, "b\n")])

  expect(readFileSync(join(root, AT), "utf8").startsWith(was)).toBe(true)
})

test("an append answers the rows appended rather than every row kept", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])

  expect(appendEdits(root, PAGE, [writing(TWO, null, "b\n")])).toEqual({
    rows: [writing(TWO, null, "b\n")],
  })
})

test("an append leaves no ref and writes no git object", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [writing(ONE, null, "a\n")])

  expect(gitIn(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/**"]).trim()).toBe("")
})

test("a row past the ceiling is alone and the row after it opens the next file", () => {
  const root = rootFor()
  appendEdits(root, PAGE, [writing(ONE, null, "z".repeat(ENTRY_CEILING))])

  appendEdits(root, PAGE, [writing(TWO, null, "b\n")])

  expect(existsSync(join(root, TWO_AT))).toBe(true)
  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE, TWO])
})

test("a ledger an earlier keeping left under a ref is read where no file is there", () => {
  const root = rootFor()
  putUnder(root, KEPT, `${JSON.stringify(writing(ONE, null, "a\n"))}\n`)

  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE])
})

test("the next write moves that ledger into the file and takes the ref away", () => {
  const root = rootFor()
  putUnder(root, KEPT, `${JSON.stringify(writing(ONE, null, "a\n"))}\n`)

  appendEdits(root, PAGE, [writing(TWO, null, "b\n")])

  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE, TWO])
  expect(existsSync(join(root, AT))).toBe(true)
  expect(gitIn(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/**"]).trim()).toBe("")
})

test("the file the edits are kept in is the file the apply reports", () => {
  expect(keptAt(PAGE)).toBe(AT)
})

test("a row stating an add is read as the edit that add leaves", () => {
  const root = rootFor()
  putting(root, lined({ kind: "add", path: ONE, content: "a\n" }))

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ path: ONE, was: null, body: "a\n" }] })
})

test("a row stating a remove is read with the body the file beneath holds", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)
  putting(root, lined({ kind: "remove", path: ONE }))

  expect(editsIn(root, PAGE)).toEqual({ rows: [{ path: ONE, was: "a\n", body: null }] })
})

test("a row stating a move is read as the edit carrying that body across", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)
  putting(root, lined({ kind: "move", pathFrom: ONE, pathTo: TWO }))

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ path: TWO, was: "a\n", body: "a\n", from: ONE }],
  })
})

test("a row stating a replace is read as the edit that passage leaves", () => {
  const root = rootFor()
  putting(root, "one two\n", ONE)
  putting(root, lined({ kind: "replace", path: ONE, contentFrom: "two", contentTo: "three" }))

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ path: ONE, was: "one two\n", body: "one three\n" }],
  })
})

test("a row reads the body the row before it left rather than the body beneath", () => {
  const root = rootFor()
  putting(
    root,
    lined(
      { kind: "add", path: ONE, content: "one two\n" },
      { kind: "replace", path: ONE, contentFrom: "two", contentTo: "three" }
    )
  )

  expect(editsIn(root, PAGE)).toEqual({
    rows: [
      { path: ONE, was: null, body: "one two\n" },
      { path: ONE, was: "one two\n", body: "one three\n" },
    ],
  })
})

test("a narrow row saying its readers owe no reading keeps that flag", () => {
  const root = rootFor()
  putting(root, lined({ kind: "add", path: ONE, content: "a\n", readersOweReading: false }))

  expect(editsIn(root, PAGE)).toEqual({
    rows: [{ path: ONE, was: null, body: "a\n", readersOweReading: false }],
  })
})

test("a narrow row that will not read against the files beneath refuses the whole file", () => {
  const root = rootFor()
  putting(root, lined({ kind: "remove", path: ONE }))

  expect(editsIn(root, PAGE)).toEqual({
    why: `\`${ONE}\` holds no body, so nothing is taken away`,
  })
})

test("a row stating a kind that is no kind refuses the whole file and names the line", () => {
  const root = rootFor()
  putting(root, lined({ kind: "swap", path: ONE }))

  expect(editsIn(root, PAGE)).toEqual({ why: "line 1 reads as no edit" })
})

test("a whole row and a narrow row are read side by side", () => {
  const root = rootFor()
  putting(root, lined(writing(ONE, null, "a\n"), { kind: "add", path: TWO, content: "b\n" }))

  expect(pathsIn(editsIn(root, PAGE))).toEqual([ONE, TWO])
})

test("a row taking a path away is written without the body that path held", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)

  appendEdits(root, PAGE, [taking(ONE, "a\n")])

  expect(storedIn(root)).toEqual([JSON.stringify({ kind: "remove", path: ONE })])
  expect(editsIn(root, PAGE)).toEqual({ rows: [taking(ONE, "a\n")] })
})

test("a row carrying a body across is written without that body", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)
  const row = { path: TWO, was: "a\n", body: "a\n", from: ONE }

  appendEdits(root, PAGE, [row])

  expect(storedIn(root)).toEqual([JSON.stringify({ kind: "move", pathFrom: ONE, pathTo: TWO })])
  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("a row adding a path is written without the body that path lacked", () => {
  const root = rootFor()
  const row = writing(ONE, null, "a\n")

  appendEdits(root, PAGE, [row])

  expect(storedIn(root)).toEqual([JSON.stringify({ kind: "add", path: ONE, content: "a\n" })])
  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("a row writing one body over another states the whole body each side", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)
  const row = writing(ONE, "a\n", "b\n")

  appendEdits(root, PAGE, [row])

  expect(storedIn(root)).toEqual([JSON.stringify(row)])
  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("a row writing over a body the files beneath no longer hold reads back as that row", () => {
  const root = rootFor()
  putting(root, "c\n", ONE)
  const row = writing(ONE, "a\n", "b\n")

  appendEdits(root, PAGE, [row])

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("a row that would read back as no row states the whole body", () => {
  const root = rootFor()
  const row = writing(ONE, "a\n", "a\n")

  appendEdits(root, PAGE, [row])

  expect(storedIn(root)).toEqual([JSON.stringify(row)])
})

test("a row that would read back under another path states the whole body", () => {
  const root = rootFor()
  const row = { path: TWO, was: "a\n", body: null, from: ONE }

  appendEdits(root, PAGE, [row])

  expect(storedIn(root)).toEqual([JSON.stringify(row)])
})

test("a row that would read back refused states the whole body", () => {
  const root = rootFor()
  const row = { path: TWO, was: null, body: "a\n", from: ONE }

  appendEdits(root, PAGE, [row])

  expect(storedIn(root)).toEqual([JSON.stringify(row)])
  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("the rows a settle writes again state the whole body", () => {
  const root = rootFor()
  putting(root, "a\n", ONE)
  putting(root, "b\n", TWO)
  appendEdits(root, PAGE, [taking(ONE, "a\n"), taking(TWO, "b\n")])

  keptEdits(root, PAGE, (had) => had.slice(1))

  expect(storedIn(root)).toEqual([JSON.stringify(taking(TWO, "b\n"))])
})
