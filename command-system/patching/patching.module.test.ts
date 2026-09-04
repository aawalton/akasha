import { afterAll, expect, test } from "bun:test"
import { said as gitSaid } from "@akasha/git/git-running"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing } from "../scratching/scratching.module.test-fixtures.ts"
import { added, blobsIn, bodyOf, deleted, patchOf } from "./patching.module.code.ts"

const ONE = "akasha/one.page.ts"
const TWO = "akasha/two.page.ts"
const NEW = "akasha/three.page.ts"
const HEX = /^[0-9a-f]{40}$/

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function repoWith(bodies: Readonly<Record<string, string>>): { root: string; base: string } {
  const root = scratch.rootFor("patching-")
  const paths = Object.keys(bodies)
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  for (const path of paths) writing(root, path, bodies[path] ?? "")
  gitSaid(root, ["add", "--", ...paths])
  const who = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]
  gitSaid(root, [...who, "commit", "-q", "-m", "base", "--", ...paths])
  return { root, base: gitSaid(root, ["rev-parse", "HEAD"]).trim() }
}

test("a changed body makes a patch naming the path", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\nbeta\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: "alpha\nGAMMA\n" }])
  expect(patch).toContain(`diff --git a/${ONE} b/${ONE}`)
  expect(patch).toContain("+GAMMA")
})

test("a blob a patch names is written in full", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: "omega\n" }])
  const blobs = blobsIn(patch).get(ONE)
  expect(blobs).toBeDefined()
  expect(blobs?.base).toMatch(HEX)
  expect(blobs?.result).toMatch(HEX)
})

test("a path the base does not hold is an addition", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: NEW, body: "fresh\n" }])
  const blobs = blobsIn(patch).get(NEW)
  expect(blobs).toBeDefined()
  expect(blobs === undefined ? false : added(blobs)).toBe(true)
  expect(blobs === undefined ? true : deleted(blobs)).toBe(false)
})

test("a change stating no body is a deletion", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n", [TWO]: "beta\n" })
  const patch = patchOf(root, base, [{ path: TWO, body: null }])
  const blobs = blobsIn(patch).get(TWO)
  expect(blobs).toBeDefined()
  expect(blobs === undefined ? false : deleted(blobs)).toBe(true)
})

test("a body the same as the one at the base makes nothing", () => {
  const held = "alpha\nbeta\n"
  const { root, base } = repoWith({ [ONE]: held })
  expect(patchOf(root, base, [{ path: ONE, body: held }])).toBe("")
})

test("no changes make nothing", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  expect(patchOf(root, base, [])).toBe("")
})

test("every path changed is read back from one patch", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n", [TWO]: "beta\n" })
  const patch = patchOf(root, base, [
    { path: ONE, body: "one\n" },
    { path: TWO, body: null },
    { path: NEW, body: "three\n" },
  ])
  const blobs = blobsIn(patch)
  expect([...blobs.keys()].sort()).toEqual([NEW, ONE, TWO].sort())
})

test("a body is recovered whole from the blob a patch names", () => {
  const odd = "alpha\n\n\tbeta\nno closing newline"
  const { root, base } = repoWith({ [ONE]: "was\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: odd }])
  const blobs = blobsIn(patch).get(ONE)
  expect(blobs).toBeDefined()
  expect(bodyOf(root, blobs?.result ?? "")).toBe(odd)
})

test("a body emptied is not a deletion", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: "" }])
  const blobs = blobsIn(patch).get(ONE)
  expect(blobs === undefined ? true : deleted(blobs)).toBe(false)
  expect(bodyOf(root, blobs?.result ?? "")).toBe("")
})

test("a deletion names no body to recover", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n", [TWO]: "beta\n" })
  const patch = patchOf(root, base, [{ path: TWO, body: null }])
  const blobs = blobsIn(patch).get(TWO)
  expect(bodyOf(root, blobs?.result ?? "")).toBeNull()
})

test("building a patch leaves the worktree and the index alone", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n", [TWO]: "beta\n" })
  patchOf(root, base, [
    { path: ONE, body: "changed\n" },
    { path: TWO, body: null },
    { path: NEW, body: "fresh\n" },
  ])
  expect(gitSaid(root, ["status", "--porcelain"])).toBe("")
})
