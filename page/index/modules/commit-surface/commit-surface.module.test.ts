import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { readingEnded } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { readingFrom } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"

const scratch = scratchWorld()

afterAll(() => {
  readingEnded()
  scratch.sweep()
})

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-commit-surface-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

const ENTRY = '{"path":"held/a.ts","id":"01a04e11-0000-7000-8000-000000000001"}'

function seeded(): string {
  return repoWith({
    ".index/held/slug/a.jsonl": `${ENTRY}\n`,
    "held/a.ts": "export const a = 1\n",
  })
}

test("the lines of an entry file are the lines the commit holds under the index folder", () => {
  const reading = readingFrom(seeded(), "HEAD")
  expect(reading?.lines("held/slug/a.jsonl")).toEqual([ENTRY])
  readingEnded()
})

test("an entry file the commit does not hold reads as no lines", () => {
  const reading = readingFrom(seeded(), "HEAD")
  expect(reading?.lines("held/slug/b.jsonl")).toEqual([])
  readingEnded()
})

test("a path the commit holds under the index folder is there, and another is not", () => {
  const reading = readingFrom(seeded(), "HEAD")
  expect(reading?.holds("")).toBe(true)
  expect(reading?.holds("held/slug")).toBe(true)
  expect(reading?.holds("held/slug/a.jsonl")).toBe(true)
  expect(reading?.holds("held/nowhere")).toBe(false)
  readingEnded()
})

test("a folder lists the children the commit holds, saying which are folders", () => {
  const reading = readingFrom(seeded(), "HEAD")
  expect(reading?.listing("held")).toEqual([{ name: "slug", directory: true }])
  expect(reading?.listing("held/slug")).toEqual([{ name: "a.jsonl", directory: false }])
  readingEnded()
})

test("a body is the body the commit holds rather than the body the checkout holds", () => {
  const root = seeded()
  writeFileSync(join(root, "held/a.ts"), "export const a = 2\n")
  const reading = readingFrom(root, "HEAD")
  expect(reading?.read("held/a.ts")).toBe("export const a = 1\n")
  expect(reading?.read("nowhere.ts")).toBeNull()
  readingEnded()
})

test("a commit holding no index folder is answered no reading", () => {
  expect(readingFrom(repoWith({ "held/a.ts": "export const a = 1\n" }), "HEAD")).toBeNull()
  readingEnded()
})

test("a name that is no commit is answered no reading", () => {
  expect(readingFrom(seeded(), "0".repeat(40))).toBeNull()
  readingEnded()
})
