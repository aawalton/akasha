import { afterEach, describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import type { Property } from "./property.ts"
import type { FileTree } from "../file-tree.ts"
import { type Answer, ANSWER_SEEDS, CODE_AT, keepAnswer, keptAnswer, keyFor } from "./type-cache.ts"
import { HERE } from "../../repo/roots/roots.ts"

const CHAIN = ["pages/page-type/seat.page-type.md", "pages/page-type/page.page-type.md"]

const MODE: Property = {
  name: "mode",
  slug: "seat-mode",
  at: "pages/page-property-definition/seat-mode.page-property-definition.md",
  on: "seat",
  type: "select(slug)",
  from: [],
  back: null,
  expression: null,
  relation: null,
  reduction: null,
  over: null,
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
  for (const at of ["pages/page-type", "pages/page-property-definition", "pages/page-property-type"])
    mkdirSync(`${root}/${at}`, { recursive: true })
  for (const at of CODE_AT) {
    mkdirSync(`${root}/${at}`, { recursive: true })
    writeFileSync(`${root}/${at}/stands.ts`, "export const A = 1\n")
  }
  writeFileSync(`${root}/.gitignore`, "node_modules\n")
  writeFileSync(`${root}/pages/page-type/seat.page-type.md`, "---\nextends-slug: page\n---\n")
  writeFileSync(`${root}/pages/page-type/page.page-type.md`, "---\nextends-slug: none\n---\n")
  writeFileSync(`${root}/pages/page-property-definition/seat-mode.page-property-definition.md`, "---\nkey: mode\n---\n")
  writeFileSync(`${root}/pages/page-property-type/slug.page-property-type.md`, "---\nkey: slug\n---\n")
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
  writeFileSync(`${root}/pages/page-type/ghost.page-type.md`, "---\nextends-slug: page\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("an untracked property definition yields no key", () => {
  const root = repo()
  writeFileSync(`${root}/pages/page-property-definition/ghost.page-property-definition.md`, "---\nkey: ghost\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("an untracked property type yields no key", () => {
  const root = repo()
  writeFileSync(`${root}/pages/page-property-type/ghost.page-property-type.md`, "---\nkey: ghost\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
})

test("an untracked declaration file yields a key still", () => {
  const root = repo()
  writeFileSync(`${root}/page/stands.d.ts`, "export declare const A: number\n")
  expect(keyFor(treeAt(root), CHAIN)).toMatch(/^[0-9a-f]{64}$/)
})

test("an untracked file beside a page that is no page yields a key still", () => {
  const root = repo()
  writeFileSync(`${root}/pages/page-type/ghost.page-type.md.staged`, "---\nextends-slug: page\n---\n")
  expect(keyFor(treeAt(root), CHAIN)).toMatch(/^[0-9a-f]{64}$/)
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
  writeFileSync(`${root}/page/stands.ts`, "export const A = 2\n")
  git(root, ["commit", "-qam", "two"])
  expect(keyFor(treeAt(root), CHAIN)).not.toBe(was as string)
})

test("a declared code folder that is gone yields no key, rather than a key blind to it", () => {
  const root = repo()
  rmSync(`${root}/${CODE_AT[0] as string}`, { recursive: true, force: true })
  git(root, ["commit", "-qam", "two"])
  expect(keyFor(treeAt(root), CHAIN)).toBeNull()
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

const IMPORT = /(?:^|\n)\s*(?:import|export)[\s\S]*?from\s+"([^"]+)"/g

interface Closure {
  readonly reached: ReadonlySet<string>
}

function closureFrom(root: string, seeds: readonly string[]): Closure {
  const reached = new Set<string>()
  const queue = [...seeds]
  while (queue.length > 0) {
    const rel = queue.pop()
    if (rel === undefined || reached.has(rel)) continue
    reached.add(rel)
    const path = resolve(root, rel)
    if (!existsSync(path)) continue
    for (const match of readFileSync(path, "utf8").matchAll(IMPORT)) {
      const spec = match[1] ?? ""
      if (!spec.startsWith(".")) continue
      queue.push(relative(root, resolve(dirname(path), spec)))
    }
  }
  return { reached }
}

describe("the key names the code the answer is worked out by", () => {
  const { reached } = closureFrom(HERE, ANSWER_SEEDS)
  const covered = (at: string): boolean => CODE_AT.some((dir) => at.startsWith(`${dir}/`))

  test("every file the answer is worked out from stands under a declared folder", () => {
    expect([...reached].filter((at) => !covered(at)).sort()).toEqual([])
  })

  test("the answer reaches no code outside this repository", () => {
    expect([...reached].filter((at) => at.startsWith("../")).sort()).toEqual([])
  })

  test("every declared folder stands and is recorded, so none is left out of the ground", () => {
    expect(CODE_AT.filter((at) => !existsSync(resolve(HERE, at)))).toEqual([])
    expect(CODE_AT.filter((at) => git(HERE, ["rev-parse", "-q", "--verify", `HEAD:${at}`]) !== 0)).toEqual([])
  })

  test("the seeds stand, so the walk is over the answering code and not over nothing", () => {
    expect(ANSWER_SEEDS.filter((at) => !existsSync(resolve(HERE, at)))).toEqual([])
    expect(reached.size).toBeGreaterThan(ANSWER_SEEDS.length)
  })
})
