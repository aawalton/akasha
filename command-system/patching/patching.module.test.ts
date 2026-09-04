import { afterAll, expect, test } from "bun:test"
import { textIn } from "@akasha/code-system/body-text"
import { said as gitSaid } from "@akasha/git/git-running"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing } from "../scratching/scratching.module.test-fixtures.ts"
import { added, blobsIn, bodyOf, deleted, patchOf } from "./patching.module.code.ts"

const ONE = "akasha/one.page.ts"
const TWO = "akasha/two.page.ts"
const NEW = "akasha/three.page.ts"
const BIN = "akasha/four.page.bin"
const HEX = /^[0-9a-f]{40}$/
const NOT_TEXT = new Uint8Array([0xff, 0xfe, 0x01, 0x02])
const AS_BYTES = "GIT binary patch"

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

function said(root: string, blob: string | undefined): string | null {
  const held = bodyOf(root, blob ?? "")
  return held === null ? null : textIn(held)
}

test("a changed body makes a patch naming the path", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\nbeta\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: bytes("alpha\nGAMMA\n") }])
  expect(patch).toContain(`diff --git a/${ONE} b/${ONE}`)
  expect(patch).toContain("+GAMMA")
})

test("a blob a patch names is written in full", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: bytes("omega\n") }])
  const blobs = blobsIn(patch).get(ONE)
  expect(blobs).toBeDefined()
  expect(blobs?.base).toMatch(HEX)
  expect(blobs?.result).toMatch(HEX)
})

test("a path the base does not hold is an addition", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: NEW, body: bytes("fresh\n") }])
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
  expect(patchOf(root, base, [{ path: ONE, body: bytes(held) }])).toBe("")
})

test("no changes make nothing", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  expect(patchOf(root, base, [])).toBe("")
})

test("every path changed is read back from one patch", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n", [TWO]: "beta\n" })
  const patch = patchOf(root, base, [
    { path: ONE, body: bytes("one\n") },
    { path: TWO, body: null },
    { path: NEW, body: bytes("three\n") },
  ])
  const blobs = blobsIn(patch)
  expect([...blobs.keys()].sort()).toEqual([NEW, ONE, TWO].sort())
})

test("a body is recovered whole from the blob a patch names", () => {
  const odd = "alpha\n\n\tbeta\nno closing newline"
  const { root, base } = repoWith({ [ONE]: "was\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: bytes(odd) }])
  const blobs = blobsIn(patch).get(ONE)
  expect(blobs).toBeDefined()
  expect(said(root, blobs?.result)).toBe(odd)
})

test("a body emptied is not a deletion", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: ONE, body: bytes("") }])
  const blobs = blobsIn(patch).get(ONE)
  expect(blobs === undefined ? true : deleted(blobs)).toBe(false)
  expect(said(root, blobs?.result)).toBe("")
})

test("a deletion names no body to recover", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n", [TWO]: "beta\n" })
  const patch = patchOf(root, base, [{ path: TWO, body: null }])
  const blobs = blobsIn(patch).get(TWO)
  expect(said(root, blobs?.result)).toBeNull()
})

test("a body that is not text is drawn in git's own format for bytes", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: BIN, body: NOT_TEXT }])
  expect(patch).toContain(AS_BYTES)
  expect(patch).toContain(`diff --git a/${BIN} b/${BIN}`)
  const blobs = blobsIn(patch).get(BIN)
  expect(blobs).toBeDefined()
  expect([...(bodyOf(root, blobs?.result ?? "") ?? [])]).toEqual([...NOT_TEXT])
})

test("a patch drawn for bytes is text a reader can hold whole", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n" })
  const patch = patchOf(root, base, [{ path: BIN, body: NOT_TEXT }])
  expect([...bytes(patch)].every((one) => one < 128)).toBe(true)
})

test("a change to text beside one to bytes stays a diff the lines are read from", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\nbeta\n" })
  const patch = patchOf(root, base, [
    { path: ONE, body: bytes("alpha\nGAMMA\n") },
    { path: BIN, body: NOT_TEXT },
  ])
  const text = patch.split("diff --git ").find((one) => one.startsWith(`a/${ONE} `)) ?? ""
  expect(text).toContain("-beta")
  expect(text).toContain("+GAMMA")
  expect(text).not.toContain(AS_BYTES)
  expect(said(root, blobsIn(patch).get(ONE)?.result)).toBe("alpha\nGAMMA\n")
})

test("building a patch leaves the worktree and the index alone", () => {
  const { root, base } = repoWith({ [ONE]: "alpha\n", [TWO]: "beta\n" })
  patchOf(root, base, [
    { path: ONE, body: bytes("changed\n") },
    { path: TWO, body: null },
    { path: NEW, body: bytes("fresh\n") },
  ])
  expect(gitSaid(root, ["status", "--porcelain"])).toBe("")
})
