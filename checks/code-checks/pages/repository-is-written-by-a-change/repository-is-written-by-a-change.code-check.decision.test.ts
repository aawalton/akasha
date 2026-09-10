import { expect, test } from "bun:test"
import {
  asideIn,
  namesAside,
  reasonsOver,
} from "./repository-is-written-by-a-change.code-check.decision.code.ts"

const AT = "commands/pages/one/one.command.code.ts"

const IGNORED =
  "# a note\n\n*.uncommitted.*\n.supervisors/\nnode_modules/\ndist/\n!keep/a.uncommitted.js\n"

const ASIDE = asideIn(IGNORED)

function only(text: string): readonly string[] {
  return reasonsOver(AT, text, ASIDE)
}

test("the names the repository ignores are read with `.git` and without an un-ignoring rule", () => {
  expect(ASIDE).toEqual([".git", ".uncommitted.", ".supervisors", "node_modules", "dist"])
})

test("an ignored folder is named where a whole part of the path is that folder", () => {
  expect(namesAside("a/dist/b.json", "dist")).toBe(true)
  expect(namesAside("dist/b.json", "dist")).toBe(true)
})

test("a name merely holding an ignored folder's letters names no ignored folder", () => {
  expect(namesAside("a/redistribute.json", "dist")).toBe(false)
  expect(namesAside("a/distinct/b.json", "dist")).toBe(false)
})

test("an ignored ending is named where the name ends there or a part ends there", () => {
  expect(namesAside("a/b.uncommitted.jsonl", ".uncommitted.")).toBe(true)
  expect(namesAside("a/.git/held.txt", ".git")).toBe(true)
})

test("a longer ending merely opening with an ignored one names nothing ignored", () => {
  expect(namesAside("a/.gitignore", ".git")).toBe(false)
})

test("a TypeScript file written under a root taken from the root module is refused", () => {
  const said = only(
    'import { writeFile } from "node:fs/promises"\n' +
      'import { join, resolve } from "node:path"\n' +
      'import { codeRoot } from "@akasha/pages/code-root"\n' +
      "export async function one(): Promise<void> {\n" +
      '  const here = resolve(codeRoot(), "a")\n' +
      '  await writeFile(join(here, "b.ts"), "")\n' +
      "}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 6")
})

test("a root handed in as `root` is the checkout root", () => {
  const said = only(
    'import { writeFileSync } from "node:fs"\n' +
      'import { join } from "node:path"\n' +
      "export function one(given: { root: string }): void {\n" +
      '  writeFileSync(join(given.root, "a/b.seat.ts"), "")\n' +
      "}\n"
  )
  expect(said).toHaveLength(1)
})

test("a destination named by a constant the write does not spell is followed", () => {
  const said = only(
    'import { writeFile } from "node:fs/promises"\n' +
      'import { resolve } from "node:path"\n' +
      'import { codeRoot } from "@akasha/pages/code-root"\n' +
      'const OUT = "temper/one/a.generated.ts"\n' +
      "export async function one(): Promise<void> {\n" +
      "  const out = resolve(codeRoot(), OUT)\n" +
      '  await writeFile(out, "")\n' +
      "}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 7")
})

test("a root a body assigns rather than declares is followed", () => {
  const said = only(
    'import { realpathSync, writeFileSync } from "node:fs"\n' +
      'import { join } from "node:path"\n' +
      'import { codeRoot } from "@akasha/pages/code-root"\n' +
      "export function one(): void {\n" +
      "  let root: string\n" +
      "  root = realpathSync(codeRoot())\n" +
      '  writeFileSync(join(root, "a.ts"), "")\n' +
      "}\n"
  )
  expect(said).toHaveLength(1)
})

test("a root a caller hands in under another name is no checkout root", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(root: string): void {\n" +
        '  writeFileSync(join(root, "a.ts"), "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a directory made under the root is no source file", () => {
  expect(
    only(
      'import { mkdirSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  mkdirSync(join(given.root, "a/b"), { recursive: true })\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a file under the root that is no TypeScript is refused too", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  writeFileSync(join(given.root, "a/b.json"), "")\n' +
        "}\n"
    )
  ).toHaveLength(1)
})

test("a file under the root the repository ignores is let through", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  writeFileSync(join(given.root, "a/b.uncommitted.jsonl"), "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a file under a folder the repository ignores is let through", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  writeFileSync(join(given.root, ".supervisors", "a", "b.log"), "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a file under `.git` is let through though no rule names it", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  writeFileSync(join(given.root, ".git", "held.txt"), "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("an ignored name a constant carries is followed", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        'const OUT = "a/b.uncommitted.jsonl"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  writeFileSync(join(given.root, OUT), "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a root a body only hashes into a name under the home directory is no destination", () => {
  expect(
    only(
      'import { renameSync, writeFileSync } from "node:fs"\n' +
        'import { homedir } from "node:os"\n' +
        'import { join } from "node:path"\n' +
        "function stateDir(): string {\n" +
        '  return join(homedir(), ".local", "state", "held")\n' +
        "}\n" +
        "function fileFor(root: string): string {\n" +
        "  return join(stateDir(), hashOf(root))\n" +
        "}\n" +
        "export function one(given: { root: string }): void {\n" +
        "  const path = fileFor(given.root)\n" +
        "  const staging = `${path}.staging`\n" +
        '  writeFileSync(staging, "")\n' +
        "  renameSync(staging, path)\n" +
        "}\n"
    )
  ).toEqual([])
})

test("a destination spelling no name at all is let through, the check reading nothing", () => {
  expect(
    only(
      'import { rmSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        "  for (const at of besideOf(given.root)) rmSync(join(given.root, at))\n" +
        "}\n"
    )
  ).toEqual([])
})

test("a TypeScript file written outside the checkout is let through", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        "export function one(): void {\n" +
        '  writeFileSync("/elsewhere/a.ts", "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a write reached through a namespace taken from `node:fs` is seen", () => {
  expect(
    only(
      'import * as fs from "node:fs"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  fs.writeFileSync(`${given.root}/a.ts`, "")\n' +
        "}\n"
    )
  ).toHaveLength(1)
})

test("`Bun.write` is a write too", () => {
  expect(
    only(
      'import { join } from "node:path"\n' +
        "export async function one(given: { root: string }): Promise<void> {\n" +
        '  await Bun.write(join(given.root, "a.ts"), "")\n' +
        "}\n"
    )
  ).toHaveLength(1)
})

test("a rename is judged on the path it leaves", () => {
  expect(
    only(
      'import { renameSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  renameSync(join(given.root, "a.ts"), "/elsewhere/a.ts")\n' +
        "}\n"
    )
  ).toHaveLength(1)
})

test("the path a copy reads is no destination", () => {
  expect(
    only(
      'import { copyFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  copyFileSync(join(given.root, "a.ts"), "/elsewhere/a.ts")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a body taking no write from the file system is let through", () => {
  expect(only('import { join } from "node:path"\nexport const a = join("b", "c.ts")\n')).toEqual([])
})

test("each write is named on its own", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(given: { root: string }): void {\n" +
        '  writeFileSync(join(given.root, "a.ts"), "")\n' +
        '  writeFileSync(join(given.root, "b.tsx"), "")\n' +
        "}\n"
    )
  ).toHaveLength(2)
})
