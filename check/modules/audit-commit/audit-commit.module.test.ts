import { afterAll, expect, test } from "bun:test"
import { Buffer } from "node:buffer"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodied,
  commitIn,
  filesIn,
  overEachIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const SCRATCH = mkdtempSync("/var/tmp/audit-commit-")

afterAll(() => rmSync(SCRATCH, { recursive: true, force: true }))

function indexed(name: string, bodies: Readonly<Record<string, string>>): string {
  const root = join(SCRATCH, name)
  mkdirSync(root, { recursive: true })
  const started = ran(["git", "-C", root, "init", "-q"])
  if (started.code !== 0) throw new Error(`no repository at ${root} — ${started.err.trim()}`)
  for (const [at, body] of Object.entries(bodies)) {
    const whole = join(root, at)
    mkdirSync(dirname(whole), { recursive: true })
    writeFileSync(whole, body)
  }
  const added = ran(["git", "-C", root, "add", "-A"])
  if (added.code !== 0) throw new Error(`nothing was tracked at ${root} — ${added.err.trim()}`)
  return root
}

test("the files a commit holds are the files its index names", () => {
  const root = indexed("named", { "one.txt": "one\n", "under/two.txt": "two\n" })
  expect(filesIn(root)).toEqual(["one.txt", "under/two.txt"])
})

test("a file the index does not name is not a file the commit holds", () => {
  const root = indexed("untracked", { "one.txt": "one\n" })
  writeFileSync(join(root, "two.txt"), "two\n")
  expect(filesIn(root)).toEqual(["one.txt"])
})

test("a body is read at the path the index names", () => {
  const root = indexed("bodies", { "one.txt": "one\n" })
  expect(commitIn(root).read("one.txt")).toBe("one\n")
  expect(commitIn(root).read("nowhere.txt")).toBe(null)
})

test("a commit says where it is and what it holds", () => {
  const root = indexed("says", { "one.txt": "one\n" })
  const commit = commitIn(root)
  expect(commit.root).toBe(root)
  expect(commit.paths).toEqual(["one.txt"])
})

test("a path holding no page is read as no page, and read once", () => {
  const root = indexed("pages", { "one.txt": "one\n" })
  const commit = commitIn(root)
  expect(commit.pageOf("one.txt")).toBe(null)
  expect(commit.pageOf("one.txt")).toBe(null)
})

test("a rule handed in is asked of each file the check takes", () => {
  const root = indexed("each", { "one.ts": "one\n", "two.md": "two\n" })
  const commit = commitIn(root)
  expect(overEachText(commit, (path, text) => [`${path} says ${text.trim()}`])).toEqual([
    { path: "one.ts", reason: "one.ts says one" },
  ])
})

test("a body is read from TypeScript and from styles, and from nothing else", () => {
  expect(bodied("one.ts")).toBe(true)
  expect(bodied("one.tsx")).toBe(true)
  expect(bodied("one.css")).toBe(true)
  expect(bodied("one.md")).toBe(false)
})

test("a body given as bytes is not decoded, so what is not text survives it", () => {
  const root = indexed("raw", { "one.txt": "one\n" })
  writeFileSync(join(root, "two.bin"), Buffer.from([0x41, 0x00, 0xff, 0x42]))
  const added = ran(["git", "-C", root, "add", "-A"])
  expect(added.code).toBe(0)
  const commit = commitIn(root)
  expect([...(commit.bytes("two.bin") ?? [])]).toEqual([0x41, 0x00, 0xff, 0x42])
  expect(commit.bytes("nowhere.bin")).toBe(null)
})

test("a folder is no body, as a path that is not there is no body", () => {
  const root = indexed("folders", { "under/one.txt": "one\n" })
  const commit = commitIn(root)
  expect(commit.bytes("under")).toBe(null)
})

test("a check saying it takes nothing is asked about nothing", () => {
  const root = indexed("takes-nothing", { "one.ts": "one\n" })
  const commit = commitIn(root)
  expect(
    overEachIn(
      commit,
      () => false,
      (path) => [path]
    )
  ).toEqual([])
})
