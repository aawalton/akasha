import { expect, test } from "bun:test"
import {
  changeFrom,
  saidOf,
  saidOfNoGate,
  sinceCommit,
} from "akasha/commands/pages/deploy/check-judging/deploy-check-judging.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const NOWHERE = "no-commit-this-checkout-holds"

const BUILT = new Set(["one.ts", "two.ts"])

test("a service no deploy has finished for is judged over every file it is built from", () => {
  expect([...changeFrom(ROOT, null, "HEAD", BUILT).changed].sort()).toEqual(["one.ts", "two.ts"])
})

test("a service no deploy has finished for is a change nothing moved in", () => {
  const change = changeFrom(ROOT, null, "HEAD", BUILT)
  expect(change.before).toBe(change.after)
})

test("the change carries the root it is judged in", () => {
  expect(changeFrom(ROOT, null, "HEAD", BUILT).root).toBe(ROOT)
})

test("a file the deploy names to be judged joins the diff, changed or not", () => {
  const change = changeFrom(ROOT, "HEAD", "HEAD", BUILT, ["three.ts"])
  expect([...change.changed]).toEqual(["three.ts"])
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

test("checks that will not load refuse the deploy by name", () => {
  const said = saidOfNoGate("atlas", "the file is not there")
  expect(said).toContain("atlas")
  expect(said).toContain("the file is not there")
})
