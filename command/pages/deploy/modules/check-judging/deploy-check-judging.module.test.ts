import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  blamedIn,
  changeFrom,
  saidOf,
  saidOfHeldBack,
  saidOfNoGate,
  saidOfUnproven,
  sinceCommit,
} from "akasha/command/pages/deploy/modules/check-judging/deploy-check-judging.module.code.ts"
import { SCRATCH_AT } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const NOWHERE = "no-commit-this-checkout-holds"

const BUILT = new Set(["one.ts", "two.ts"])

const FRESH = changeFrom(ROOT, null, "HEAD", BUILT)

const NAMED = changeFrom(ROOT, "HEAD", "HEAD", BUILT, ["three.ts"])

test("a service no deploy has finished for is judged over every file it is built from", () => {
  expect([...FRESH.changed].sort()).toEqual(["one.ts", "two.ts"])
})

test("a service no deploy has finished for is a change nothing moved in", () => {
  expect(FRESH.before).toBe(FRESH.after)
})

test("the change carries the root it is judged in", () => {
  expect(FRESH.root).toBe(ROOT)
})

test("a file the deploy names to be judged joins the diff, changed or not", () => {
  expect([...NAMED.changed]).toEqual(["three.ts"])
})

test("the change carries every file the deploy is built from", () => {
  const carried = NAMED.carried ?? []
  expect(carried).toContain("one.ts")
  expect(carried).toContain("two.ts")
})

test("a file in a folder the deploy is built from is carried with it", () => {
  const carried = changeFrom(ROOT, "HEAD", "HEAD", new Set(["bun.lock"])).carried ?? []
  expect(carried).toContain("biome.json")
})

test("the change is judged over the pages the deploy's commit holds, index and bodies alike", () => {
  for (const change of [FRESH, NAMED]) {
    expect(change.base).toBe("HEAD")
    expect(change.pages?.read("biome.json")).toBe(pagesAt(ROOT, "HEAD").read("biome.json"))
    expect(change.pages?.holds("page-type")).toBe(true)
  }
})

const GIT = ["git", "-c", "user.name=held", "-c", "user.email=held@example.com"]

function gitIn(root: string, ...words: string[]): string {
  const done = ran([...GIT, ...words], { cwd: root })
  if (done.code !== 0) throw new Error(`git ${words.join(" ")} failed: ${done.err}`)
  return done.out.trim()
}

function committed(root: string, said: string): string {
  gitIn(root, "add", "-A")
  gitIn(root, "commit", "-q", "-m", said)
  return gitIn(root, "rev-parse", "HEAD")
}

test("a file renamed away is judged where it was, in a change that moves nothing", () => {
  const root = mkdtempSync(join(SCRATCH_AT, "deploy-check-judging-"))
  try {
    const was = "pages/old/old.held.ts"
    const now = "pages/new/new.held.ts"
    const body = "export const held = { id: 'one', place: 1 }\n"
    gitIn(root, "init", "-q")
    mkdirSync(join(root, INDEX_AT), { recursive: true })
    writeFileSync(join(root, INDEX_AT, "kept"), "kept\n")
    mkdirSync(join(root, "pages", "old"), { recursive: true })
    writeFileSync(join(root, was), body)
    const before = committed(root, "the page as it was")
    mkdirSync(join(root, "pages", "new"), { recursive: true })
    renameSync(join(root, was), join(root, now))
    const after = committed(root, "the page renamed")
    const change = changeFrom(root, before, after, new Set([now]))
    expect(change.changed).toContain(now)
    expect(change.changed).toContain(was)
    expect(change.before).toBe(change.after)
    expect(change.after(was)).toBeNull()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a commit git no longer holds is read as no commit", () => {
  expect(sinceCommit(ROOT, NOWHERE)).toBe(null)
})

test("a page carrying no commit is read as no commit", () => {
  expect(sinceCommit(ROOT, null)).toBe(null)
})

test("a refusal names the file and what the check said of it", () => {
  expect(saidOf([{ path: "one.ts", reason: "it climbs to a parent folder" }])).toEqual([
    "one.ts — it climbs to a parent folder",
  ])
})

test("a check refusing over what that check cost refuses no deploy", () => {
  expect(saidOf([{ path: "one.test.ts", reason: "it spent 6.4 seconds", slow: true }])).toEqual([])
})

test("what a check found still refuses the deploy beside a refusal over cost", () => {
  expect(
    saidOf([
      { path: "one.test.ts", reason: "it spent 6.4 seconds", slow: true },
      { path: "two.ts", reason: "it climbs to a parent folder" },
    ])
  ).toEqual(["two.ts — it climbs to a parent folder"])
})

test("what a check blames is the file that check names", () => {
  expect(blamedIn([{ path: "one.ts", reason: "it climbs to a parent folder" }])).toEqual([
    { path: "one.ts", reason: "it climbs to a parent folder" },
  ])
})

test("a check refusing over what that check cost blames no file", () => {
  expect(blamedIn([{ path: "one.test.ts", reason: "it spent 6.4 seconds", slow: true }])).toEqual(
    []
  )
})

test("checks that will not load refuse the deploy by name", () => {
  const said = saidOfNoGate("atlas", "the file is not there")
  expect(said).toContain("atlas")
  expect(said).toContain("the file is not there")
})

test("the refusal names each service with no test proving it runs", () => {
  const said = saidOfUnproven(["one.running.test.ts", "two.running.test.ts"])
  expect(said).toContain("one.running.test.ts")
  expect(said).toContain("two.running.test.ts")
  expect(said).toContain("proves it runs")
})

test("the refusal names each service left running what that service was running", () => {
  const said = saidOfHeldBack(["one", "two"])
  expect(said).toContain("one, two")
  expect(said).toContain("left running")
  expect(said).toContain("every other service was put up")
})
