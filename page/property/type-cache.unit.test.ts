import { afterEach, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import type { Property } from "./property.ts"
import type { FileTree } from "../file-tree.ts"
import { type Answer, keepAnswer, keptAnswer, keyFor } from "./type-cache.ts"

const CHAIN = ["pages/page-type/seat.page-type.md", "pages/page-type/page.page-type.md"]

const MODE: Property = {
  name: "mode",
  slug: "seat-mode",
  at: "pages/page-property-definition/seat-mode.page-property-definition.md",
  on: "seat",
  type: "select(slug)",
  returnType: null,
  from: [],
  back: null,
  expression: null,
  relation: null,
  reduction: null,
  over: null,
  reaches: false,
  required: false,
  secret: false,
  attachment: null,
  default: null,
  computed: true,
  blank: false,
  oneOf: null,
  rows: null,
  uncommitted: false,
  target: null,
  mayBeGone: false,
  narrowsSlug: null,
  slugProperty: null,
  stated: { pattern: null, backstop: null, values: null, max: null },
}

const ANSWER: Answer = { properties: [MODE], why: null }

const made: string[] = []

function treeAt(root: string, pending: readonly string[] = []): FileTree {
  return { paths: () => [], open: () => null, repoOf: () => null, root, pending: new Set(pending) }
}

function git(root: string, args: readonly string[]): number {
  const done = Bun.spawnSync(["git", ...args], { cwd: root, timeout: 10_000 })
  return done.exitCode ?? -1
}

function repo(): string {
  const root = mkdtempSync("/var/tmp/page-type-cache-")
  made.push(root)
  for (const at of ["pages/page-type", "pages/page-property-definition", "pages/page-property-type", "tools/page"])
    mkdirSync(`${root}/${at}`, { recursive: true })
  writeFileSync(`${root}/.gitignore`, "node_modules\n")
  writeFileSync(`${root}/pages/page-type/seat.page-type.md`, "---\nextends-slug: page\n---\n")
  writeFileSync(`${root}/pages/page-type/page.page-type.md`, "---\nextends-slug: none\n---\n")
  writeFileSync(`${root}/pages/page-property-definition/seat-mode.page-property-definition.md`, "---\nkey: mode\n---\n")
  writeFileSync(`${root}/pages/page-property-type/slug.page-property-type.md`, "---\nkey: slug\n---\n")
  writeFileSync(`${root}/tools/page/page-types.ts`, "export const A = 1\n")
  git(root, ["init", "-q"])
  git(root, ["config", "user.email", "test@example.com"])
  git(root, ["config", "user.name", "test"])
  git(root, ["add", "-A"])
  git(root, ["commit", "-qm", "one"])
  return root
}

afterEach(() => {
  for (const at of made.splice(0)) rmSync(at, { recursive: true, force: true })
})

test("a clean tree at a commit yields a key", () => {
  expect(keyFor(treeAt(repo()), CHAIN)).toMatch(/^[0-9a-f]{64}$/)
})

test("the same tree yields the same key twice", () => {
  const root = repo()
  expect(keyFor(treeAt(root), CHAIN)).toBe(keyFor(treeAt(root), CHAIN) as string)
})

test("a different chain yields a different key", () => {
  const root = repo()
  expect(keyFor(treeAt(root), CHAIN)).not.toBe(keyFor(treeAt(root), ["pages/page-type/page.page-type.md"]) as string)
})

test("an untracked page type yields no key", () => {
  const root = repo()
  writeFileSync(`${root}/pages/page-type/ghost.md`, "---\nextends-slug: page\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("an untracked property definition yields no key", () => {
  const root = repo()
  writeFileSync(`${root}/pages/page-property-definition/ghost.md`, "---\nkey: ghost\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("an untracked property type yields no key", () => {
  const root = repo()
  writeFileSync(`${root}/pages/page-property-type/ghost.md`, "---\nkey: ghost\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("an ignored file yields a key still", () => {
  const root = repo()
  mkdirSync(`${root}/node_modules`, { recursive: true })
  writeFileSync(`${root}/node_modules/ghost.md`, "ignored\n")
  expect(keyFor(treeAt(root), CHAIN)).toMatch(/^[0-9a-f]{64}$/)
})

test("a changed tracked file yields no key", () => {
  const root = repo()
  writeFileSync(`${root}/pages/page-type/seat.page-type.md`, "---\nextends-slug: page\nmoved: true\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("a changed gitignore yields no key", () => {
  const root = repo()
  writeFileSync(`${root}/.gitignore`, "node_modules\ndist\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("a committed gitignore change moves the key", () => {
  const root = repo()
  const was = keyFor(treeAt(root), CHAIN)
  writeFileSync(`${root}/.gitignore`, "node_modules\ndist\n")
  git(root, ["commit", "-qam", "two"])
  expect(keyFor(treeAt(root), CHAIN)).not.toBe(was as string)
})

test("a committed change to the answering code moves the key", () => {
  const root = repo()
  const was = keyFor(treeAt(root), CHAIN)
  writeFileSync(`${root}/tools/page/page-types.ts`, "export const A = 2\n")
  git(root, ["commit", "-qam", "two"])
  expect(keyFor(treeAt(root), CHAIN)).not.toBe(was as string)
})

test("an answer kept under a key comes back whole, from under the resolved folder", () => {
  const root = repo()
  const key = keyFor(treeAt(root), CHAIN) as string
  keepAnswer(root, "seat", key, ANSWER)
  expect(keptAnswer(root, "seat", key)).toEqual(ANSWER)
  expect(existsSync(`${root}/.git/pages/resolved/page-type/seat/${key}.json`)).toBe(true)
})

test("a key nothing was kept under answers nothing", () => {
  const root = repo()
  const key = keyFor(treeAt(root), CHAIN) as string
  keepAnswer(root, "seat", key, ANSWER)
  expect(keptAnswer(root, "seat", "0".repeat(64))).toBeNull()
})

test("a page type that answered nothing keeps that, and gives it back", () => {
  const root = repo()
  const key = keyFor(treeAt(root), CHAIN) as string
  const none: Answer = { properties: null, why: "`pages/page-type/seat.page-type.md` declares no `extends-slug`" }
  keepAnswer(root, "seat", key, none)
  expect(keptAnswer(root, "seat", key)).toEqual(none)
})

test("a slug that is not a slug keeps nothing", () => {
  const root = repo()
  const key = keyFor(treeAt(root), CHAIN) as string
  keepAnswer(root, "../escape", key, ANSWER)
  expect(existsSync(`${root}/.git/pages`)).toBe(false)
})

test("a tree carrying a pending body yields no key", () => {
  const root = repo()
  expect(keyFor(treeAt(root, ["pages/page-type/seat.page-type.md"]), CHAIN)).toBeNull()
})

test("a tree standing in no repo yields no key", () => {
  const bare: FileTree = { paths: () => [], open: () => null, repoOf: () => null }
  expect(keyFor(bare, CHAIN)).toBeNull()
})
