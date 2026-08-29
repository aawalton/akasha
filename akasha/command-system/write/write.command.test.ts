import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { corpusIn } from "../../write-system/corpus.module.code.ts"
import { bodiesAt, oidOf, recordAt } from "../../write-system/reading.module.code.ts"
import { closureFor } from "../../write-system/required-reading.module.code.ts"
import type { Given } from "../calling.module.code.ts"
import { write } from "./write.command.code.ts"

type Held = { readonly at: string; readonly value: Record<string, unknown> }

const SPINE: readonly Held[] = [
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

type Stage = { readonly root: string; readonly given: Given }

function stage(writer: string | null = "athena"): Stage {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-write-${count}-`)
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
  return {
    root,
    given: {
      root,
      corpus: corpusIn(root),
      record: recordAt(`${root}/record.json`),
      bodies: bodiesAt(`${root}/bodies`),
      index: `${root}/index`,
      writer,
      discardedTo: null,
      calledAs: "ops akasha write",
      from: root,
    },
  }
}

function away(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

function inTree(run: (stood: Stage) => void, writer: string | null = "athena"): void {
  const stood = stage(writer)
  try {
    run(stood)
  } finally {
    away(stood.root)
  }
}

function bodyAt(stood: Stage, name: string, text: string): string {
  writeFileSync(`${stood.root}/${name}`, text)
  return name
}

function readEverything(stood: Stage, path: string): void {
  stood.given.record.keep(path, oidOf(readFileSync(path, "utf8")), Date.now())
  for (const owed of closureFor(path, stood.given.corpus)) {
    stood.given.record.keep(owed, oidOf(readFileSync(owed, "utf8")), Date.now())
  }
}

function said(answer: { report: readonly string[]; refusals: readonly string[] }): string {
  return [...answer.report, ...answer.refusals].join("\n")
}

test("a body arrives as a file, and there is no argument that carries one", () =>
  inTree((stood) => {
    const answer = write(["--file-path", "leaf.thing.ts", "--content", "anything"], stood.given)
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("there is no argument that carries a body")
    expect(said(answer)).toContain("backticked span inside double quotes")
    expect(said(answer)).toContain("--content-file")
  }))

test("a write nothing says was read is refused, and nothing reaches disk", () =>
  inTree((stood) => {
    const was = readFileSync(`${stood.root}/leaf.thing.ts`, "utf8")
    const at = bodyAt(stood, "new-body.txt", "the new body")
    const answer = write(["--file-path", "leaf.thing.ts", "--content-file", at], stood.given)
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("You have not read")
    expect(readFileSync(`${stood.root}/leaf.thing.ts`, "utf8")).toBe(was)
  }))

test("a write with both obligations discharged lands the whole body", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    readEverything(stood, path)
    const at = bodyAt(stood, "new-body.txt", "the new body")
    const answer = write(["--file-path", "leaf.thing.ts", "--content-file", at], stood.given)
    expect(answer.code).toBe(0)
    expect(readFileSync(path, "utf8")).toBe("the new body")
    expect(said(answer)).toContain("leaf.thing.ts  12 bytes")
    expect(said(answer)).toContain("1 change(s) landed together")
  }))

test("a write nothing judged says so, so an ungated door cannot look like a gated one", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    readEverything(stood, path)
    const at = bodyAt(stood, "new-body.txt", "the new body")
    const answer = write(["--file-path", "leaf.thing.ts", "--content-file", at], stood.given)
    expect(answer.code).toBe(0)
    expect(said(answer)).toContain("no checks were consulted")
    expect(said(answer)).not.toContain("check(s) consulted:")
  }))

test("a path with nothing on it is created rather than refused as a write", () =>
  inTree((stood) => {
    readEverything(stood, `${stood.root}/leaf.thing.ts`)
    const at = bodyAt(stood, "new-body.txt", "made here")
    const answer = write(["--file-path", "made.thing.ts", "--content-file", at], stood.given)
    expect(answer.code).toBe(0)
    expect(readFileSync(`${stood.root}/made.thing.ts`, "utf8")).toBe("made here")
  }))

test("one refusal among many changes lands none of them", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    readEverything(stood, path)
    const good = bodyAt(stood, "good.txt", "a landed body")
    const answer = write(
      [
        "--file-path",
        "leaf.thing.ts",
        "--content-file",
        good,
        "--file-path",
        "whole.thing.ts",
        "--content-file",
        "gone.txt",
      ],
      stood.given
    )
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("gone.txt does not exist")
    expect(said(answer)).toContain("land together or not at all")
    expect(readFileSync(path, "utf8")).not.toBe("a landed body")
  }))

test("a removal and a write in one call land together", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    readEverything(stood, path)
    const at = bodyAt(stood, "new-body.txt", "still here")
    const answer = write(
      ["--file-path", "leaf.thing.ts", "--content-file", at, "--remove", "whole.thing.ts"],
      stood.given
    )
    expect(answer.code).toBe(0)
    expect(readFileSync(path, "utf8")).toBe("still here")
    expect(existsSync(`${stood.root}/whole.thing.ts`)).toBe(false)
    expect(said(answer)).toContain("took:   whole.thing.ts")
    expect(said(answer)).toContain("2 change(s) landed together")
  }))

test("taking away what is not there is refused rather than done quietly", () =>
  inTree((stood) => {
    const answer = write(["--remove", "nowhere.thing.ts"], stood.given)
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("is not there, so there is nothing to take away")
  }))

test("a content file that is not there is refused, naming it", () =>
  inTree((stood) => {
    readEverything(stood, `${stood.root}/leaf.thing.ts`)
    const answer = write(
      ["--file-path", "leaf.thing.ts", "--content-file", "gone.txt"],
      stood.given
    )
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("gone.txt does not exist")
  }))

test("a content file that is not text is refused, because a page is text", () =>
  inTree((stood) => {
    readEverything(stood, `${stood.root}/leaf.thing.ts`)
    writeFileSync(`${stood.root}/raw.bin`, Buffer.from([0xff, 0xfe, 0x00, 0x01]))
    const answer = write(["--file-path", "leaf.thing.ts", "--content-file", "raw.bin"], stood.given)
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("is not UTF-8 text")
  }))

test("a file path with no content file beside it is refused", () =>
  inTree((stood) => {
    expect(said(write(["--file-path", "leaf.thing.ts"], stood.given))).toContain(
      "given no --content-file"
    )
  }))

test("a content file following no file path is refused", () =>
  inTree((stood) => {
    const at = bodyAt(stood, "loose.txt", "x")
    expect(said(write(["--content-file", at], stood.given))).toContain("follows no --file-path")
  }))

test("a write outside the akasha folder is refused", () =>
  inTree((stood) => {
    const at = bodyAt(stood, "new-body.txt", "x")
    expect(
      said(write(["--file-path", "../escape.ts", "--content-file", at], stood.given))
    ).toContain("outside the akasha folder")
  }))

test("a write nobody is asking for is refused before anything is parsed", () =>
  inTree((stood) => {
    const answer = write(
      ["--file-path", "leaf.thing.ts", "--content-file", "anything.txt"],
      stood.given
    )
    expect(answer.code).toBe(1)
    expect(said(answer)).toContain("nothing identifies who is writing")
  }, null))

test("a call naming nothing to write is refused", () =>
  inTree((stood) => {
    expect(said(write([], stood.given))).toContain("names a file to write, and none was given")
  }))

test("what landed is recorded read, so the next write does not ask for it again", () =>
  inTree((stood) => {
    const path = `${stood.root}/leaf.thing.ts`
    readEverything(stood, path)
    const at = bodyAt(stood, "new-body.txt", "first")
    expect(write(["--file-path", "leaf.thing.ts", "--content-file", at], stood.given).code).toBe(0)
    const again = bodyAt(stood, "again.txt", "second")
    expect(write(["--file-path", "leaf.thing.ts", "--content-file", again], stood.given).code).toBe(
      0
    )
    expect(readFileSync(path, "utf8")).toBe("second")
  }))
