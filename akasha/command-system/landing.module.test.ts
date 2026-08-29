import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, test } from "bun:test"
import type { Judging } from "../checks-system/judging.module.code.ts"
import { baseOf, landing, leavingOf } from "./landing.module.code.ts"

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-landing-"))
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

const ADMITS: Judging = { named: ["admits"], over: () => [] }

const REFUSES: Judging = {
  named: ["refuses"],
  over: (leaving) => leaving.changed.map((path) => ({ path, reason: "refused for the test" })),
}

const bytes = (s: string): Uint8Array => new TextEncoder().encode(s)

test("a body the change does not touch is read from the base commit, not the working tree", () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  writeFileSync(join(root, "two.txt"), "dirty in the worktree")
  const leaving = leavingOf(root, {
    base: baseOf(root),
    changed: [{ path: "one.txt", body: bytes("proposed") }],
  })
  const said = leaving.at("two.txt")
  expect(said === null ? "" : new TextDecoder().decode(said)).toBe("committed")
  rmSync(root, { recursive: true })
})

test("a body the change touches is read as the change would leave it", () => {
  const root = repoWith({ "one.txt": "committed" })
  const leaving = leavingOf(root, {
    base: baseOf(root),
    changed: [{ path: "one.txt", body: bytes("proposed") }],
  })
  const said = leaving.at("one.txt")
  expect(said === null ? "" : new TextDecoder().decode(said)).toBe("proposed")
  rmSync(root, { recursive: true })
})

test("a body the change takes away reads as gone rather than as what stands", () => {
  const root = repoWith({ "one.txt": "committed" })
  const leaving = leavingOf(root, {
    base: baseOf(root),
    changed: [{ path: "one.txt", body: null }],
  })
  expect(leaving.at("one.txt")).toBeNull()
  rmSync(root, { recursive: true })
})

test("a refused change leaves nothing behind", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", REFUSES)
  expect("refusals" in said).toBe(true)
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})

test("a refusal says nothing was written and how many changes were asked for", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", REFUSES)
  const refusals = "refusals" in said ? said.refusals : []
  expect(refusals[refusals.length - 1]).toContain("nothing was written")
  expect(refusals[refusals.length - 1]).toContain("land together or not at all")
  rmSync(root, { recursive: true })
})

test("a change that passes is written and committed onto the base it was judged against", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(readFileSync(join(root, "new.txt"), "utf8")).toBe("proposed")
  expect(said.wrote).toEqual(["new.txt"])
  expect(said.commit).not.toBeNull()
  expect(git(root, ["rev-parse", "HEAD^"]).trim()).toBe(said.base)
  rmSync(root, { recursive: true })
})

test("a change that takes a file away removes it and commits the removal", () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  const said = landing(root, [{ path: "two.txt", body: null }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(existsSync(join(root, "two.txt"))).toBe(false)
  expect(said.took).toEqual(["two.txt"])
  expect(git(root, ["ls-files"]).trim()).toBe("one.txt")
  rmSync(root, { recursive: true })
})

test("asking for nothing is refused rather than committed empty", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = landing(root, [], "held", ADMITS)
  expect("refusals" in said).toBe(true)
  expect(baseOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})

test("a change asking for what already stands commits nothing", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = landing(root, [{ path: "one.txt", body: bytes("committed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(said.commit).toBeNull()
  expect(baseOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})

test("the checks are shown every path the change touches", () => {
  const root = repoWith({ "one.txt": "committed" })
  const seen: string[] = []
  const watching: Judging = {
    named: ["watching"],
    over: (leaving) => {
      seen.push(...leaving.changed)
      return []
    },
  }
  landing(
    root,
    [
      { path: "b.txt", body: bytes("one") },
      { path: "a.txt", body: bytes("two") },
    ],
    "held",
    watching
  )
  expect(seen).toEqual(["a.txt", "b.txt"])
  rmSync(root, { recursive: true })
})
