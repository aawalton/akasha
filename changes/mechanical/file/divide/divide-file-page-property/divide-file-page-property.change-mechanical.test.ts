import { expect, test } from "bun:test"
import {
  editsOver,
  linesIn,
  partsFor,
} from "akasha/changes/mechanical/file/divide/divide-file-page-property/divide-file-page-property.change-mechanical.code.ts"

const PAGE = "made-up/logs/one/one.made-up-log.ts"

const PROPERTY = "rows"

const HELD = "jsonl"

const BASE = "made-up/logs/one/one.made-up-log.rows.jsonl"

const SECOND = "made-up/logs/one/one.made-up-log.rows.part2.jsonl"

const THIRD = "made-up/logs/one/one.made-up-log.rows.part3.jsonl"

function textsOf(held: Record<string, string>): (at: string) => string | null {
  return (at) => held[at] ?? null
}

function pathsIn(made: ReturnType<typeof partsFor>): readonly string[] {
  return "refused" in made ? [] : made.parts.map((one) => one.path)
}

test("a text is read as its lines, each keeping the newline it closes with", () => {
  expect([...linesIn(["one\ntwo\n"])]).toEqual(["one\n", "two\n"])
})

test("a last line closing with no newline is a line still", () => {
  expect([...linesIn(["one\ntwo"])]).toEqual(["one\n", "two"])
})

test("the lines of every text are read in the order the texts were handed over", () => {
  expect([...linesIn(["one\n", "two\n", "three\n"])]).toEqual(["one\n", "two\n", "three\n"])
})

test("rows under the ceiling are laid out in the first file alone", () => {
  expect(pathsIn(partsFor(PAGE, PROPERTY, HELD, ["one\ntwo\n"], 1024))).toEqual([BASE])
})

test("rows past the ceiling are laid out across numbered files", () => {
  const made = partsFor(PAGE, PROPERTY, HELD, ["aaaa\nbbbb\ncccc\n"], 10)

  expect(pathsIn(made)).toEqual([BASE, SECOND])
})

test("one row past the ceiling alone is refused rather than divided", () => {
  const made = partsFor(PAGE, PROPERTY, HELD, ["aaaaaaaaaaaa\n"], 4)

  expect("refused" in made ? made.refused : "").toContain("no value is divided")
})

test("a file the layout does not name is taken away", () => {
  const edits = editsOver([BASE, SECOND], textsOf({ [BASE]: "one\n", [SECOND]: "two\n" }), [
    { path: BASE, text: "one\ntwo\n" },
  ])

  expect(edits).toContainEqual({ kind: "remove", path: SECOND })
})

test("a file already holding what the layout says draws no edit", () => {
  const edits = editsOver([BASE], textsOf({ [BASE]: "one\n" }), [{ path: BASE, text: "one\n" }])

  expect(edits).toEqual([])
})

test("a file the layout names that is not there is added", () => {
  const edits = editsOver([BASE], textsOf({ [BASE]: "one\n" }), [
    { path: BASE, text: "one\n" },
    { path: SECOND, text: "two\n" },
  ])

  expect(edits).toEqual([{ kind: "add", path: SECOND, content: "two\n" }])
})

test("a file whose text the layout changes is replaced rather than added", () => {
  const edits = editsOver([BASE], textsOf({ [BASE]: "one\n" }), [{ path: BASE, text: "two\n" }])

  expect(edits).toEqual([{ kind: "replace", path: BASE, contentFrom: "one\n", contentTo: "two\n" }])
})

test("a file past the end of a shorter layout is taken away after the files written", () => {
  const edits = editsOver(
    [BASE, SECOND, THIRD],
    textsOf({ [BASE]: "a\n", [SECOND]: "b\n", [THIRD]: "c\n" }),
    [{ path: BASE, text: "a\nb\nc\n" }]
  )

  expect(edits).toEqual([
    { kind: "replace", path: BASE, contentFrom: "a\n", contentTo: "a\nb\nc\n" },
    { kind: "remove", path: SECOND },
    { kind: "remove", path: THIRD },
  ])
})
