import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve as resolvePath } from "node:path"
import type { Corpus } from "../write-system/corpus.module.code.ts"
import { corpusIn } from "../write-system/corpus.module.code.ts"
import type { Outside } from "./calling.module.code.ts"
import { calling, codeBeside, commandsIn } from "./calling.module.code.ts"

function corpusAt(root: string): Corpus {
  const held = corpusIn(root)
  if ("refused" in held) throw new Error(held.refused)
  return held
}

const AKASHA = resolvePath(import.meta.dir, "..")

let count = 0

function outsideOf(root: string): Outside {
  return {
    repo: root,
    root,
    seat: "athena",
    record: `${root}/record.json`,
    bodies: `${root}/bodies`,
    index: `${root}/index`,
    discardedTo: null,
    calledAs: "ops akasha",
    from: root,
  }
}

function tree(): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-calling-${count}-`)
  const held: Record<string, Record<string, unknown>> = {
    "page.page-type.ts": { slug: "page", extendsSlug: null },
    "page-type.page-type.ts": { slug: "page-type", extendsSlug: "page" },
    "page-property-type.page-type.ts": { slug: "page-property-type", extendsSlug: "page" },
    "domain.page-type.ts": { slug: "domain", extendsSlug: "page" },
    "module.page-type.ts": { slug: "module", extendsSlug: "domain" },
    "command.page-type.ts": { slug: "command", extendsSlug: "module" },
    "code.page-property-type.ts": { slug: "code", kind: "file" },
  }
  for (const [at, value] of Object.entries(held)) {
    const named = at.split(".")[0] ?? "held"
    const key = named.replace(/-([a-z])/g, (_, one: string) => one.toUpperCase())
    writeFileSync(`${root}/${at}`, `export const ${key} = ${JSON.stringify(value, null, 2)}\n`)
  }
  return root
}

function withCommand(root: string, slug: string, body: string): void {
  writeFileSync(
    `${root}/${slug}.command.ts`,
    `export const ${slug} = ${JSON.stringify({ slug, code: "ts" }, null, 2)}\n`
  )
  writeFileSync(`${root}/${slug}.command.code.ts`, body)
}

function away(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

const ECHOES = `export function echo(argv, given) {
  return { report: [argv.join(" "), given.writer === null ? "nobody" : given.writer], refusals: [], code: 0 }
}
`

test("a command is reached by the slug its page carries", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    const answer = calling(["echo", "one", "two"], outsideOf(root))
    expect(answer.code).toBe(0)
    expect(answer.report).toEqual(["one two", "athena"])
  } finally {
    away(root)
  }
})

test("everything akasha cannot reach for itself arrives in the one argument", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    const answer = calling(["echo"], { ...outsideOf(root), seat: null })
    expect(answer.report).toEqual(["", "nobody"])
  } finally {
    away(root)
  }
})

test("a call naming no command is refused, and every command it carries is named", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    withCommand(root, "hush", ECHOES.replace("echo", "hush"))
    const answer = calling([], outsideOf(root))
    expect(answer.code).toBe(1)
    expect(answer.refusals[0]).toContain("takes a command, and none was named")
    expect(answer.refusals[0]).toContain("  ops akasha echo")
    expect(answer.refusals[0]).toContain("  ops akasha hush")
  } finally {
    away(root)
  }
})

test("a call naming no command akasha carries is refused, and says what it does carry", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    const answer = calling(["elsewhere"], outsideOf(root))
    expect(answer.code).toBe(1)
    expect(answer.refusals[0]).toContain("`elsewhere` is no command akasha carries")
    expect(answer.refusals[0]).toContain("  ops akasha echo")
  } finally {
    away(root)
  }
})

test("a page that is no command is not reachable as one", () => {
  const root = tree()
  try {
    writeFileSync(
      `${root}/held.module.ts`,
      `export const held = { "slug": "held", "code": "ts" }\n`
    )
    expect(calling(["held"], outsideOf(root)).code).toBe(1)
    expect(calling(["held"], outsideOf(root)).refusals[0]).toContain("is no command akasha carries")
  } finally {
    away(root)
  }
})

test("a command whose code answers to nothing callable is refused, not thrown on", () => {
  const root = tree()
  try {
    withCommand(root, "empty", `export const notAFunction = 1\nexport const norThis = 2\n`)
    const answer = calling(["empty"], outsideOf(root))
    expect(answer.code).toBe(1)
    expect(answer.refusals[0]).toContain("answers to nothing that can be called")
  } finally {
    away(root)
  }
})

test("a command with no code file beside it is refused, not thrown on", () => {
  const root = tree()
  try {
    writeFileSync(
      `${root}/gone.command.ts`,
      `export const gone = { "slug": "gone", "code": "ts" }\n`
    )
    const answer = calling(["gone"], outsideOf(root))
    expect(answer.code).toBe(1)
    expect(answer.refusals[0]).toContain("answers to nothing that can be called")
  } finally {
    away(root)
  }
})

test("a command's code is the file beside its page, named for the page", () => {
  expect(codeBeside("/a/b/read.command.ts", "read")).toBe("/a/b/read.command.code.ts")
})

test("the commands it carries are the pages whose page type is a command", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    writeFileSync(
      `${root}/held.module.ts`,
      `export const held = { "slug": "held", "code": "ts" }\n`
    )
    expect(commandsIn(corpusAt(root))).toEqual(["echo"])
  } finally {
    away(root)
  }
})

test("read is the command akasha carries, and it is reached by its slug", () => {
  expect(commandsIn(corpusAt(AKASHA))).toContain("read")
})

test("a real call of read through calling answers with the file it was given", () => {
  const root = mkdtempSync(`${tmpdir()}/akasha-calling-real-`)
  try {
    const answer = calling(["read", "--file-path", "akasha-system/akasha-import.domain.ts"], {
      repo: AKASHA,
      root: AKASHA,
      seat: "athena",
      record: `${root}/record.json`,
      bodies: `${root}/bodies`,
      index: `${root}/index`,
      discardedTo: null,
      calledAs: "ops akasha",
      from: AKASHA,
    })
    expect(answer.code).toBe(0)
    expect(answer.report.join("\n")).toContain("akasha-import.domain.ts")
    expect(answer.report.join("\n")).toContain(
      "What akasha needs from outside arrives as one value"
    )
  } finally {
    away(root)
  }
})

test("a real call of read refuses a pipe, so the record is never written from one", () => {
  const root = mkdtempSync(`${tmpdir()}/akasha-calling-pipe-`)
  try {
    const answer = calling(["read", "--file-path", "akasha-system/akasha-import.domain.ts"], {
      repo: AKASHA,
      root: AKASHA,
      seat: "athena",
      record: `${root}/record.json`,
      bodies: `${root}/bodies`,
      index: `${root}/index`,
      discardedTo: "a pipe",
      calledAs: "ops akasha",
      from: AKASHA,
    })
    expect(answer.code).toBe(1)
    expect(answer.refusals.join("\n")).toContain("nothing was read")
  } finally {
    away(root)
  }
})

test("a root named with a trailing slash gates a write exactly as the same root without one", () => {
  const kept = mkdtempSync(`${tmpdir()}/akasha-calling-slash-`)
  try {
    const at = "akasha-system/akasha-import.domain.ts"
    writeFileSync(`${kept}/body.txt`, readFileSync(`${AKASHA}/${at}`, "utf8"))
    const asked = ["write", "--file-path", at, "--content-file", `${kept}/body.txt`]
    const plain = calling(asked, { ...outsideOf(kept), root: AKASHA, from: AKASHA })
    const slashed = calling(asked, { ...outsideOf(kept), root: `${AKASHA}/`, from: AKASHA })
    expect(plain.refusals.join()).toContain("You have not read")
    expect(slashed.refusals).toEqual(plain.refusals)
    expect(slashed.code).toBe(plain.code)
  } finally {
    away(kept)
  }
})

test("a corpus that cannot be built is refused rather than thrown out of", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    writeFileSync(
      `${root}/asks.module.ts`,
      `export const asks = { "slug": "asks", "requiredReadingSlugs": ["nowhere"] }\n`
    )
    const answer = calling(["echo"], outsideOf(root))
    expect(answer.code).toBe(1)
    expect(answer.refusals.join("\n")).toContain("no page carries that slug")
  } finally {
    away(root)
  }
})

test("every relation naming no page is named at once, so one run is the whole worklist", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    for (const one of ["a", "b", "c"]) {
      writeFileSync(
        `${root}/${one}.module.ts`,
        `export const ${one} = { "slug": "${one}", "requiredReadingSlugs": ["no-${one}"] }\n`
      )
    }
    const said = calling(["echo"], outsideOf(root)).refusals.join("\n")
    expect(said).toContain("3 relations name no page akasha carries")
    for (const one of ["no-a", "no-b", "no-c"]) expect(said).toContain(`\`${one}\``)
  } finally {
    away(root)
  }
})
