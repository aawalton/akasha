import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { baseOf, landing } from "../landing/landing.module.code.ts"
import { ADMITS, bytes } from "../landing/landing.module.test-fixtures.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { gitIn as git } from "./committing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-committing-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

function hookIn(root: string, lines: readonly string[]): undefined {
  const at = join(root, ".git/hooks/pre-commit")
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, `${["#!/bin/sh", ...lines].join("\n")}\n`, { mode: 0o755 })
}

const ELSEWHERE = [
  "tree=$(git rev-parse HEAD^{tree})",
  'held=$(git commit-tree "$tree" -p HEAD -m elsewhere)',
  'git update-ref HEAD "$held"',
  "exit 1",
]

const CARRYING = [
  "blob=$(git hash-object -w -- new.txt)",
  'tree=$(printf "100644 blob %s\\tnew.txt\\n" "$blob" | git mktree)',
  'held=$(git commit-tree "$tree" -p HEAD -m carrying)',
  'git update-ref HEAD "$held"',
  "exit 1",
]

test("a commit that failed is not answered with a commit that landed while it ran", () => {
  const root = repoWith({ "one.txt": "committed" })
  hookIn(root, ELSEWHERE)
  const was = baseOf(root)
  expect(() =>
    landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  ).toThrow()
  expect(baseOf(root)).not.toBe(was)
  expect(git(root, ["ls-tree", "-r", "--name-only", "HEAD"])).not.toContain("new.txt")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
})

test("a commit that failed is answered where what stands carries the change all the same", () => {
  const root = repoWith({ "one.txt": "committed" })
  hookIn(root, CARRYING)
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(said.commit).toBe(baseOf(root))
  expect(git(root, ["ls-tree", "-r", "--name-only", "HEAD"])).toContain("new.txt")
})

test("a path that could not be staged refuses the change rather than reading as nothing to commit", () => {
  const root = repoWith({ "one.txt": "committed" })
  writeFileSync(join(root, ".git/index.lock"), "")
  expect(() =>
    landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  ).toThrow("index.lock")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
})
