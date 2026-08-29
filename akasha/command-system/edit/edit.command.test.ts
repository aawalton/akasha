import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { corpusIn } from "../../write-system/corpus.module.code.ts"
import { bodiesAt, oidOf, recordAt } from "../../write-system/reading.module.code.ts"
import { closureFor } from "../../write-system/required-reading.module.code.ts"
import type { Given } from "../calling.module.code.ts"
import { edit, replacing } from "./edit.command.code.ts"

const SPINE = [
  { at: "page.page-type.ts", value: { extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "page-property-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "thing.page-type.ts", value: { extendsSlug: "page" } },
  {
    at: "page-slug.page-property-type.ts",
    value: { kind: "relation", targetPageTypeSlug: "page" },
  },
  { at: "part-slugs.page-property-type.ts", value: { kind: "list", entrySlug: "page-slug" } },
  { at: "definition.page-property-type.ts", value: { kind: "text" } },
  { at: "whole.thing.ts", value: { partSlugs: ["leaf"] } },
  { at: "leaf.thing.ts", value: { definition: "what is written on" } },
]

let count = 0

type Stage = ReturnType<typeof stage>

function stage(writer: string | null = "athena") {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-edit-${count}-`)
  for (const one of SPINE) {
    const at = `${root}/${one.at}`
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    const named = one.at.slice(one.at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    writeFileSync(
      at,
      `export const ${key} = ${JSON.stringify({ slug: named, ...one.value }, null, 2)}\n`
    )
  }
  const given: Given = {
    root,
    corpus: corpusIn(root),
    record: recordAt(`${root}/record.json`),
    bodies: bodiesAt(`${root}/bodies`),
    writer,
    discardedTo: null,
    calledAs: "ops akasha edit",
    from: root,
  }
  return { root, given }
}

function inTree(run: (stood: Stage) => void, writer: string | null = "athena"): void {
  const stood = stage(writer)
  try {
    run(stood)
  } finally {
    rmSync(stood.root, { recursive: true, force: true })
  }
}

function fileAt(stood: Stage, name: string, text: string): string {
  writeFileSync(`${stood.root}/${name}`, text)
  return name
}

function ready(stood: Stage, path: string): void {
  stood.given.record.keep(path, oidOf(readFileSync(path, "utf8")), Date.now())
  for (const owed of closureFor(path, stood.given.corpus)) {
    stood.given.record.keep(owed, oidOf(readFileSync(owed, "utf8")), Date.now())
  }
}

function said(answer: { report: readonly string[]; refusals: readonly string[] }): string {
  return [...answer.report, ...answer.refusals].join("\n")
}

function editing(stood: Stage, path: string, span: string, now: string) {
  const one = fileAt(stood, `span-${count}-${span.length}.txt`, span)
  const two = fileAt(stood, `now-${count}-${now.length}.txt`, now)
  return edit(["--file-path", path, "--span-file", one, "--replacement-file", two], stood.given)
}

function refusalOf(one: string | { refused: string }): string {
  return typeof one === "string" ? "" : one.refused
}

test("a span found once is replaced, and the rest of the body is untouched", () => {
  expect(replacing("one two three", "two", "four")).toBe("one four three")
})

test("an empty span names no place, so it is refused rather than matching everywhere", () => {
  expect(refusalOf(replacing("body", "", "x"))).toContain("empty span names no place")
})

test("a span identical to what would replace it is refused as changing nothing", () => {
  expect(refusalOf(replacing("body", "od", "od"))).toContain("changes nothing")
})

test("a span that is nowhere is refused, and says a span is matched exactly", () => {
  const what = refusalOf(replacing("a body\n", "a  body", "x"))
  expect(what).toContain("not in the file")
  expect(what).toContain("matched exactly, including whitespace and indentation")
})

test("a span whose first line is there says where, so the agent sees what differs", () => {
  const what = refusalOf(replacing("one\ntwo\nthree\n", "two\nCHANGED\n", "x"))
  expect(what).toContain("first line appears at line 2")
})

test("a span in the file twice is refused, counting them rather than taking the first", () => {
  const what = refusalOf(replacing("aa bb aa", "aa", "cc"))
  expect(what).toContain("in the file 2 times")
  expect(what).toContain("give more of the lines around it")
})

test("overlapping matches count as more than one, so `aa` in `aaa` is refused", () => {
  expect(refusalOf(replacing("aaa", "aa", "b"))).toContain("2 times")
})

test("an edit with both obligations discharged lands the whole body", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    ready(stood, path)
    const answer = editing(stood, "leaf.thing.ts", "what is written on", "what it says now")
    expect(answer.code).toBe(0)
    expect(readFileSync(path, "utf8")).toContain("what it says now")
    expect(readFileSync(path, "utf8")).toContain("export const leaf")
    expect(said(answer)).toContain("1 edit(s) over 1 file(s), landed together")
  }))

test("an edit nothing says was read is refused, and nothing reaches disk", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    const was = readFileSync(path, "utf8")
    const answer = editing(stood, "leaf.thing.ts", "what is written on", "moved")
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("You have not read")
    expect(readFileSync(path, "utf8")).toBe(was)
  }))

test("two edits naming one file fold into one change, the second seeing the first", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    ready(stood, path)
    const a = fileAt(stood, "a.txt", "what is written on")
    const b = fileAt(stood, "b.txt", "first pass")
    const c = fileAt(stood, "c.txt", "first pass")
    const d = fileAt(stood, "d.txt", "second pass")
    const answer = edit(
      [
        "--file-path",
        "leaf.thing.ts",
        "--span-file",
        a,
        "--replacement-file",
        b,
        "--file-path",
        "leaf.thing.ts",
        "--span-file",
        c,
        "--replacement-file",
        d,
      ],
      stood.given
    )
    expect(answer.code).toBe(0)
    expect(readFileSync(path, "utf8")).toContain("second pass")
    expect(said(answer)).toContain("2 edit(s) over 1 file(s), landed together")
  }))

test("one refused edit lands none of them, so a file is never half edited", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    ready(stood, path)
    const a = fileAt(stood, "a.txt", "what is written on")
    const b = fileAt(stood, "b.txt", "landed")
    const c = fileAt(stood, "c.txt", "nowhere in this body")
    const answer = edit(
      [
        "--file-path",
        "leaf.thing.ts",
        "--span-file",
        a,
        "--replacement-file",
        b,
        "--file-path",
        "leaf.thing.ts",
        "--span-file",
        c,
        "--replacement-file",
        b,
      ],
      stood.given
    )
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("not in the file")
    expect(said(answer)).toContain("land together or not at all")
    expect(readFileSync(path, "utf8")).not.toContain("landed")
  }))

test("a span arrives as a file, and there is no argument that carries one", () =>
  inTree((stood) => {
    const answer = edit(
      ["--file-path", "leaf.thing.ts", "--span", "anything", "--replacement", "else"],
      stood.given
    )
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("there is no argument that carries a span")
    expect(said(answer)).toContain("backticked span inside double quotes")
    expect(said(answer)).toContain("--span-file")
  }))

test("a file that is not there is refused, pointing at write rather than edit", () =>
  inTree((stood) => {
    const answer = editing(stood, "nowhere.thing.ts", "a", "b")
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("write it instead")
  }))

test("a span file that is not there is refused, naming it", () =>
  inTree((stood) => {
    ready(stood, `${stood.root}/leaf.thing.ts`)
    const answer = edit(
      ["--file-path", "leaf.thing.ts", "--span-file", "gone.txt", "--replacement-file", "gone.txt"],
      stood.given
    )
    expect(said(answer)).toContain("gone.txt does not exist")
  }))

test("a span file that is not text is refused, because a page is text", () =>
  inTree((stood) => {
    ready(stood, `${stood.root}/leaf.thing.ts`)
    writeFileSync(`${stood.root}/raw.bin`, Buffer.from([0xff, 0xfe, 0x00, 0x01]))
    const answer = edit(
      ["--file-path", "leaf.thing.ts", "--span-file", "raw.bin", "--replacement-file", "raw.bin"],
      stood.given
    )
    expect(said(answer)).toContain("is not UTF-8 text")
  }))

test("an edit outside the akasha folder is refused", () =>
  inTree((stood) => {
    expect(said(editing(stood, "../escape.ts", "a", "b"))).toContain("outside the akasha folder")
  }))

test("an edit nobody is asking for is refused before anything is parsed", () =>
  inTree((stood) => {
    const answer = editing(stood, "leaf.thing.ts", "a", "b")
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("nothing identifies who is editing")
  }, null))

test("a file path given no span file is refused, naming the path", () =>
  inTree((stood) => {
    const a = fileAt(stood, "a.txt", "x")
    const answer = edit(
      [
        "--file-path",
        "leaf.thing.ts",
        "--file-path",
        "whole.thing.ts",
        "--span-file",
        a,
        "--replacement-file",
        a,
      ],
      stood.given
    )
    expect(said(answer)).toContain("leaf.thing.ts was given no --span-file")
  }))

test("a span file given no replacement file is refused, naming the span", () =>
  inTree((stood) => {
    const a = fileAt(stood, "a.txt", "x")
    const answer = edit(["--file-path", "leaf.thing.ts", "--span-file", a], stood.given)
    expect(said(answer)).toContain(`${a} was given no --replacement-file`)
  }))

test("a call naming nothing to edit is refused", () =>
  inTree((stood) => {
    expect(said(edit([], stood.given))).toContain("names a file to edit, and none was given")
  }))

test("an edit nothing judged says so, so an ungated door cannot look like a gated one", () =>
  inTree((stood) => {
    ready(stood, `${stood.root}/leaf.thing.ts`)
    const answer = editing(stood, "leaf.thing.ts", "what is written on", "now")
    expect(answer.code).toBe(0)
    expect(said(answer)).toContain("no checks were consulted")
  }))
