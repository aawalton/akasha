import { expect, test } from "bun:test"
import {
  commitAt,
  pathsIn,
  saidOfDrift,
  saidOfNoCommit,
} from "akasha/commands/pages/deploy/deploy-commit-naming/deploy-commit-naming.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HASH_LENGTH = 40

const NOWHERE = "no-ref-this-checkout-holds"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

test("a call naming no commit is made at the commit HEAD is at", () => {
  expect(commitAt(ROOT, null)).toBe(commitAt(ROOT, "HEAD"))
})

test("a commit is answered as a whole hash rather than as the name given", () => {
  expect(commitAt(ROOT, "HEAD")?.length).toBe(HASH_LENGTH)
})

test("a name git resolves to no commit is answered as nothing", () => {
  expect(commitAt(ROOT, NOWHERE)).toBe(null)
})

test("a name no commit is under is said back with that name in it", () => {
  expect(saidOfNoCommit(NOWHERE)).toContain(NOWHERE)
})

test("what git named is read as paths, with the blank line at the end left out", () => {
  expect(pathsIn("one.ts\ntwo.ts\n")).toEqual(["one.ts", "two.ts"])
})

test("text git left nothing in is read as no path at all", () => {
  expect(pathsIn("")).toEqual([])
})

test("a refusal over one path says file rather than files", () => {
  expect(saidOfDrift("atlas", COMMIT, ["one.ts"])).toContain("1 tracked file differing")
})

test("a refusal names the commit and the first three paths", () => {
  const said = saidOfDrift("atlas", COMMIT, ["one.ts", "two.ts", "three.ts", "four.ts"])
  expect(said).toContain(COMMIT)
  expect(said).toContain("one.ts, two.ts, three.ts")
  expect(said).toContain("and 1 more")
})
