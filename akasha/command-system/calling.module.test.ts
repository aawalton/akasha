import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve as resolvePath } from "node:path"
import { corpusIn } from "../write-system/corpus.module.code.ts"
import type { Outside } from "./calling.module.code.ts"
import { calling, codeBeside, commandsIn } from "./calling.module.code.ts"

const AKASHA = resolvePath(import.meta.dir, "..")

let count = 0

function outsideOf(root: string): Outside {
  return {
    root,
    seat: "athena",
    record: `${root}/record.json`,
    bodies: `${root}/bodies`,
    discardedTo: null,
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

test("a call naming no command is refused, and every command that stands is named", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    withCommand(root, "hush", ECHOES.replace("echo", "hush"))
    const answer = calling([], outsideOf(root))
    expect(answer.code).toBe(1)
    expect(answer.refusals[0]).toContain("akasha takes a command, and none was named")
    expect(answer.refusals[0]).toContain("  akasha echo")
    expect(answer.refusals[0]).toContain("  akasha hush")
  } finally {
    away(root)
  }
})

test("a call naming no command akasha carries is refused, and says what does stand", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    const answer = calling(["elsewhere"], outsideOf(root))
    expect(answer.code).toBe(1)
    expect(answer.refusals[0]).toContain("`elsewhere` is no command akasha carries")
    expect(answer.refusals[0]).toContain("  akasha echo")
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

test("the commands that stand are the pages whose page type is a command", () => {
  const root = tree()
  try {
    withCommand(root, "echo", ECHOES)
    writeFileSync(
      `${root}/held.module.ts`,
      `export const held = { "slug": "held", "code": "ts" }\n`
    )
    expect(commandsIn(corpusIn(root))).toEqual(["echo"])
  } finally {
    away(root)
  }
})

test("read is the command akasha carries, and it is reached by its slug", () => {
  expect(commandsIn(corpusIn(AKASHA))).toContain("read")
})

test("a real call of read through calling answers with the file it was given", () => {
  const root = mkdtempSync(`${tmpdir()}/akasha-calling-real-`)
  try {
    const answer = calling(["read", "--file-path", "akasha-system/akasha-import.domain.ts"], {
      root: AKASHA,
      seat: "athena",
      record: `${root}/record.json`,
      bodies: `${root}/bodies`,
      discardedTo: null,
    })
    expect(answer.code).toBe(0)
    expect(answer.report.join("\n")).toContain("akasha-import.domain.ts")
    expect(answer.report.join("\n")).toContain(
      "An akasha file imports nothing outside the akasha folder"
    )
  } finally {
    away(root)
  }
})

test("a real call of read refuses a pipe, so the record is never written from one", () => {
  const root = mkdtempSync(`${tmpdir()}/akasha-calling-pipe-`)
  try {
    const answer = calling(["read", "--file-path", "akasha-system/akasha-import.domain.ts"], {
      root: AKASHA,
      seat: "athena",
      record: `${root}/record.json`,
      bodies: `${root}/bodies`,
      discardedTo: "a pipe",
    })
    expect(answer.code).toBe(1)
    expect(answer.refusals.join("\n")).toContain("nothing was read")
  } finally {
    away(root)
  }
})
