import { expect, test } from "bun:test"
import {
  changeFrom,
  saidOf,
  saidOfNoGate,
  sinceCommit,
} from "akasha/command/pages/deploy/modules/check-judging/deploy-check-judging.module.code.ts"
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

test("checks that will not load refuse the deploy by name", () => {
  const said = saidOfNoGate("atlas", "the file is not there")
  expect(said).toContain("atlas")
  expect(said).toContain("the file is not there")
})
