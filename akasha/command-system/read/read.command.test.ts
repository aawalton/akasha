import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { corpusIn } from "../../write-system/corpus.module.code.ts"
import { bodiesAt, oidOf, recordAt } from "../../write-system/reading.module.code.ts"
import type { Answer, Where } from "./read.command.code.ts"
import { CEILING, read } from "./read.command.code.ts"

type Held = { readonly at: string; readonly value: Record<string, unknown> }

const SPINE: readonly Held[] = [
  { at: "page.page-type.ts", value: { slug: "page", extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { slug: "page-type", extendsSlug: "page" } },
  {
    at: "page-property-type.page-type.ts",
    value: { slug: "page-property-type", extendsSlug: "page" },
  },
  { at: "thing.page-type.ts", value: { slug: "thing", extendsSlug: "page" } },
  { at: "other.page-type.ts", value: { slug: "other", extendsSlug: "page" } },
  {
    at: "page-slug.page-property-type.ts",
    value: { slug: "page-slug", kind: "relation", targetPageTypeSlug: "page" },
  },
  {
    at: "part-slugs.page-property-type.ts",
    value: { slug: "part-slugs", kind: "list", entrySlug: "page-slug" },
  },
  {
    at: "conditional-reading-slugs.page-property-type.ts",
    value: { slug: "conditional-reading-slugs", kind: "list", entrySlug: "page-slug" },
  },
  { at: "definition.page-property-type.ts", value: { slug: "definition", kind: "text" } },
]

let count = 0

type Stage = { readonly root: string; readonly where: Where }

function stage(all: readonly Held[] = [], plain: Readonly<Record<string, string>> = {}): Stage {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-read-${count}-`)
  for (const one of [...SPINE, ...all]) {
    const at = `${root}/${one.at}`
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    const named = one.at.slice(one.at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    writeFileSync(at, `export const ${key} = ${JSON.stringify(one.value, null, 2)}\n`)
  }
  for (const [at, body] of Object.entries(plain)) {
    const to = `${root}/${at}`
    mkdirSync(to.slice(0, to.lastIndexOf("/")), { recursive: true })
    writeFileSync(to, body)
  }
  const where: Where = {
    root,
    corpus: corpusIn(root),
    record: recordAt(`${root}/record.json`),
    bodies: bodiesAt(`${root}/bodies`),
    writer: "athena",
    discardedTo: null,
    calledAs: "ops akasha read",
  }
  return { root, where }
}

function away(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

function text(answer: Answer): string {
  return [...answer.report, ...answer.refusals].join("\n")
}

test("a read printing to a pipe records nothing and says so", () => {
  const { root, where } = stage([], { "notes.txt": "held\n" })
  try {
    const answer = read(["--file-path", "notes.txt"], { ...where, discardedTo: "a pipe" })
    expect(answer.code).toBe(1)
    expect(answer.report).toEqual([])
    expect(text(answer)).toContain("nothing was read")
    expect(text(answer)).toContain("a pipe")
    expect(where.record.of(`${root}/notes.txt`)).toBe(null)
  } finally {
    away(root)
  }
})

test("a read of a file nothing says you saw returns the whole file, numbered", () => {
  const { root, where } = stage([], { "notes.txt": "one\ntwo\nthree\n" })
  try {
    const said = text(read(["--file-path", "notes.txt"], where))
    expect(said).toContain("nothing on record says you have read it")
    expect(said).toContain("3 lines")
    expect(said).toContain("     1\tone")
    expect(said).toContain("     3\tthree")
  } finally {
    away(root)
  }
})

test("a read of a file that has not moved returns no body at all", () => {
  const { root, where } = stage([], { "notes.txt": "one\ntwo\n" })
  try {
    read(["--file-path", "notes.txt"], where)
    const said = text(read(["--file-path", "notes.txt"], where))
    expect(said).toContain("unchanged since you read it")
    expect(said).toContain("nothing follows")
    expect(said).not.toContain("\tone")
  } finally {
    away(root)
  }
})

test("a read of a file that moved returns what moved, not the whole of it", () => {
  const { root, where } = stage([], {
    "notes.txt": ["a", "b", "c", "d", "e", "f", "g", "h"].join("\n"),
  })
  try {
    read(["--file-path", "notes.txt"], where)
    writeFileSync(`${root}/notes.txt`, ["a", "b", "c", "D", "e", "f", "g", "h"].join("\n"))
    const said = text(read(["--file-path", "notes.txt"], where))
    expect(said).toContain("the difference from what you last read follows")
    expect(said).toContain("-d")
    expect(said).toContain("+D")
    expect(said).not.toContain("+a")
  } finally {
    away(root)
  }
})

test("the body a read records is kept, so what moved is answered without asking git", () => {
  const { root, where } = stage([], { "notes.txt": "one\n" })
  try {
    read(["--file-path", "notes.txt"], where)
    expect(where.bodies.of(oidOf("one\n"))).toBe("one\n")
  } finally {
    away(root)
  }
})

test("a file that moved whose body was not kept returns the whole file", () => {
  const { root, where } = stage([], { "notes.txt": "one\n" })
  try {
    read(["--file-path", "notes.txt"], where)
    rmSync(`${root}/bodies`, { recursive: true, force: true })
    writeFileSync(`${root}/notes.txt`, "two\n")
    const said = text(read(["--file-path", "notes.txt"], where))
    expect(said).toContain("the body you read was not kept")
    expect(said).toContain("     1\ttwo")
  } finally {
    away(root)
  }
})

test("a read returns the whole file where the agent asks for it", () => {
  const { root, where } = stage([], { "notes.txt": "one\ntwo\n" })
  try {
    read(["--file-path", "notes.txt"], where)
    const said = text(read(["--full", "--file-path", "notes.txt"], where))
    expect(said).toContain("the whole file, as `--full` asks")
    expect(said).toContain("     1\tone")
  } finally {
    away(root)
  }
})

test("a read records what it returned, so a write may be judged against it", () => {
  const { root, where } = stage([], { "notes.txt": "one\n" })
  try {
    expect(where.record.of(`${root}/notes.txt`)).toBe(null)
    read(["--file-path", "notes.txt"], where)
    expect(where.record.of(`${root}/notes.txt`)?.oid).toBe(oidOf("one\n"))
  } finally {
    away(root)
  }
})

test("a slug naming pages of two page types is refused with a path for each", () => {
  const { root, where } = stage([
    { at: "one/dup.thing.ts", value: { slug: "dup" } },
    { at: "two/dup.other.ts", value: { slug: "dup" } },
  ])
  try {
    const answer = read(["--slug", "dup"], where)
    expect(answer.code).toBe(1)
    expect(text(answer)).toContain("is carried by 2 pages")
    expect(text(answer)).toContain("--file-path one/dup.thing.ts")
    expect(text(answer)).toContain("--file-path two/dup.other.ts")
  } finally {
    away(root)
  }
})

test("a slug one page carries is read by that slug", () => {
  const { root, where } = stage([{ at: "only.thing.ts", value: { slug: "only" } }])
  try {
    const said = text(read(["--slug", "only"], where))
    expect(said).toContain("only.thing.ts")
    expect(where.record.of(`${root}/only.thing.ts`)).not.toBe(null)
  } finally {
    away(root)
  }
})

test("a slug no page carries is refused", () => {
  const { root, where } = stage()
  try {
    expect(text(read(["--slug", "nowhere"], where))).toContain("no page carries the slug `nowhere`")
  } finally {
    away(root)
  }
})

test("a file outside the akasha folder is refused", () => {
  const { root, where } = stage()
  try {
    expect(text(read(["--file-path", "../../etc/hosts"], where))).toContain(
      "is outside the akasha folder"
    )
  } finally {
    away(root)
  }
})

test("naming one file twice is refused rather than read twice", () => {
  const { root, where } = stage([], { "notes.txt": "one\n" })
  try {
    expect(text(read(["--file-path", "notes.txt", "--file-path", "notes.txt"], where))).toContain(
      "is named more than once"
    )
  } finally {
    away(root)
  }
})

test("a call naming nothing to read is refused, and so is an argument this does not take", () => {
  const { root, where } = stage()
  try {
    expect(text(read([], where))).toContain("names a file to read, and none was given")
    expect(text(read(["--lines", "1-20"], where))).toContain("is not an argument this takes")
    expect(text(read(["--file-path"], where))).toContain("--file-path needs a value")
  } finally {
    away(root)
  }
})

test("what a page requires arrives with it, under a line saying it was not asked for", () => {
  const { root, where } = stage([
    { at: "whole.thing.ts", value: { slug: "whole", partSlugs: ["leaf"] } },
    { at: "leaf.thing.ts", value: { slug: "leaf" } },
  ])
  try {
    const said = text(read(["--file-path", "leaf.thing.ts"], where))
    expect(said).toContain("were not asked for")
    expect(said).toContain("a write is refused for not having read")
    expect(said).toContain("whole.thing.ts")
    expect(where.record.of(`${root}/whole.thing.ts`)).not.toBe(null)
  } finally {
    away(root)
  }
})

test("a conditional reading arrives as a definition and a path, never as a body", () => {
  const { root, where } = stage([
    { at: "asks.thing.ts", value: { slug: "asks", conditionalReadingSlugs: ["maybe"] } },
    {
      at: "maybe.thing.ts",
      value: { slug: "maybe", definition: "read it if it bears on what you are doing" },
    },
  ])
  try {
    const said = text(read(["--file-path", "asks.thing.ts"], where))
    expect(said).toContain("document(s) below are conditional reading")
    expect(said).toContain("maybe — maybe.thing.ts")
    expect(said).toContain("read it if it bears on what you are doing")
    expect(said).not.toContain("\texport const maybe")
    expect(where.record.of(`${root}/maybe.thing.ts`)).toBe(null)
  } finally {
    away(root)
  }
})

test("a body past what one answer holds returns what it is, and records nothing", () => {
  const big = `${"x".repeat(CEILING + 1000)}\n`
  const { root, where } = stage([], { "big.txt": big })
  try {
    const answer = read(["--file-path", "big.txt"], where)
    expect(answer.code).toBe(1)
    expect(text(answer)).toContain(`past the ${CEILING} one answer holds`)
    expect(text(answer)).toContain("an authored file is split before it is changed")
    expect(text(answer)).not.toContain("xxxxxxxxxx")
    expect(where.record.of(`${root}/big.txt`)).toBe(null)
  } finally {
    away(root)
  }
})

test("a read too big for one answer returns fewer files and the call that takes the rest", () => {
  const plain: Record<string, string> = {}
  for (let at = 0; at < 6; at++) plain[`part-${at}.txt`] = `${"y".repeat(7000)}\n`
  const { root, where } = stage([], plain)
  try {
    const argv = Object.keys(plain).flatMap((one) => ["--file-path", one])
    const answer = read(argv, where)
    const said = text(answer)
    expect(said).toContain("were left unread here")
    expect(said).toContain("ops akasha read --file-path")
    expect(said.length).toBeLessThanOrEqual(CEILING + 2000)
    const left = Object.keys(plain).filter((one) => where.record.of(`${root}/${one}`) === null)
    expect(left.length).toBeGreaterThan(0)
    for (const one of left) expect(said).toContain(`--file-path ${one}`)
  } finally {
    away(root)
  }
})

test("a body that is not text says what it is, and is recorded read whole", () => {
  const { root, where } = stage()
  try {
    writeFileSync(`${root}/held.bin`, Buffer.from([0x00, 0xff, 0xfe, 0x01, 0x02, 0x03, 0x04, 0x05]))
    const said = text(read(["--file-path", "held.bin"], where))
    expect(said).toContain("bytes that are not UTF-8 text")
    expect(said).toContain("00fffe01")
    expect(said).toContain("recorded as read whole")
    expect(where.record.of(`${root}/held.bin`)).not.toBe(null)
  } finally {
    away(root)
  }
})

test("where nothing identifies the reader, the read says the next change is refused for it", () => {
  const { root, where } = stage([], { "notes.txt": "one\n" })
  try {
    const said = text(read(["--file-path", "notes.txt"], { ...where, writer: null }))
    expect(said).toContain("nothing identifies who is reading")
    expect(said).toContain("refused for it")
  } finally {
    away(root)
  }
})

test("a read takes no line range, so no call returns part of a file", () => {
  const { root, where } = stage([], { "notes.txt": "one\ntwo\nthree\n" })
  try {
    for (const argv of [
      ["--lines", "1-2"],
      ["--from", "1"],
      ["--head", "1"],
      ["--offset", "1"],
    ]) {
      expect(read([...argv, "--file-path", "notes.txt"], where).code).toBe(1)
    }
  } finally {
    away(root)
  }
})

test("the call that takes the rest names the invocation this was reached by", () => {
  const plain: Record<string, string> = {}
  for (let at = 0; at < 6; at++) plain[`part-${at}.txt`] = `${"y".repeat(7000)}\n`
  const { root, where } = stage([], plain)
  try {
    const argv = Object.keys(plain).flatMap((one) => ["--file-path", one])
    const said = text(read(argv, { ...where, calledAs: "somewhere else read" }))
    expect(said).toContain("somewhere else read --file-path")
    expect(said).not.toContain("ops akasha read --file-path")
  } finally {
    away(root)
  }
})

test("a read stopped at the ceiling records every file it did return", () => {
  const plain: Record<string, string> = {}
  for (let at = 0; at < 6; at++) plain[`part-${at}.txt`] = `${"y".repeat(7000)}\n`
  const { root, where } = stage([], plain)
  try {
    const argv = Object.keys(plain).flatMap((one) => ["--file-path", one])
    const said = text(read(argv, where))
    const returned = Object.keys(plain).filter((one) => said.includes(`${one} — `))
    expect(returned.length).toBeGreaterThan(0)
    for (const one of returned) {
      expect(where.record.of(`${root}/${one}`)).not.toBe(null)
    }
  } finally {
    away(root)
  }
})

test("a read stopped at the ceiling leaves its record on disk for the next call", () => {
  const plain: Record<string, string> = {}
  for (let at = 0; at < 6; at++) plain[`part-${at}.txt`] = `${"z".repeat(7000)}\n`
  const { root, where } = stage([], plain)
  try {
    const argv = Object.keys(plain).flatMap((one) => ["--file-path", one])
    read(argv, where)
    const fresh = recordAt(`${root}/record.json`)
    const known = Object.keys(plain).filter((one) => fresh.of(`${root}/${one}`) !== null)
    expect(known.length).toBeGreaterThan(0)
  } finally {
    away(root)
  }
})
