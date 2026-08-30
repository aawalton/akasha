import { expect, test } from "bun:test"
import { spawn, spawnSync } from "node:child_process"
import { until } from "../../testing-system/waiting/waiting.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"
import { git, gitOver, repoWith } from "../landing/landing.module.test-fixtures.ts"
import { bodyAt, readingEnded } from "./commit-reading.module.code.ts"

const MODULE_AT = new URL("./commit-reading.module.code.ts", import.meta.url).pathname

const LANDING_AT = new URL("../landing/landing.module.code.ts", import.meta.url).pathname

const NUL = new Uint8Array([104, 0, 101, 108, 100, 0, 0, 10])

const BROKEN = new Uint8Array([0xff, 0xfe, 0x41, 0x80, 0x42, 0xc3, 0x28])

test("a body is answered as the bytes the commit holds, whatever they are", () => {
  const root = repoWith({ "nul.bin": NUL, "broken.bin": BROKEN })
  const base = baseOf(root)
  expect(bodyAt(root, base, "nul.bin")).toEqual(NUL)
  expect(bodyAt(root, base, "broken.bin")).toEqual(BROKEN)
  readingEnded()
})

test("a path the commit does not carry answers as nothing rather than as trouble", () => {
  const root = repoWith({ "one.txt": "committed" })
  const base = baseOf(root)
  expect(bodyAt(root, base, "nowhere.txt")).toBeNull()
  expect(bodyAt(root, base, "one.txt/deeper.txt")).toBeNull()
  readingEnded()
})

test("a base that names no commit is said out loud rather than read as nothing", () => {
  const root = repoWith({ "one.txt": "committed" })
  expect(() => bodyAt(root, "0".repeat(40), "one.txt")).toThrow("names no commit")
  readingEnded()
})

test("one git answers every body asked for, and none outlives the reader being ended", () => {
  const root = repoWith({ "one.txt": "a", "two.txt": "b", "three.txt": "c" })
  const base = baseOf(root)
  for (const one of ["one.txt", "two.txt", "three.txt"])
    expect(bodyAt(root, base, one)).not.toBeNull()
  expect(gitOver(root).length).toBe(1)
  readingEnded()
  expect(gitOver(root)).toEqual([])
})

test("a second commit is read by the same reader, each base asked after once", () => {
  const root = repoWith({ "one.txt": "a" })
  const was = baseOf(root)
  git(root, ["commit", "--quiet", "--allow-empty", "-m", "again"])
  const now = baseOf(root)
  expect(bodyAt(root, was, "one.txt")).not.toBeNull()
  expect(bodyAt(root, now, "one.txt")).not.toBeNull()
  expect(gitOver(root).length).toBe(1)
  readingEnded()
})

test("a body that would not read ends the reader rather than leaving it half read", () => {
  const root = repoWith({ "one.txt": "a" })
  expect(() => bodyAt(root, "0".repeat(40), "one.txt")).toThrow()
  expect(gitOver(root)).toEqual([])
})

test("reading a body the commit does not carry says nothing on stderr", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = spawnSync(
    "bun",
    [
      "-e",
      `import { bodyAt, readingEnded } from ${JSON.stringify(MODULE_AT)}
import { baseOf } from ${JSON.stringify(LANDING_AT)}
const root = ${JSON.stringify(root)}
const base = baseOf(root)
for (const one of ["a.txt", "b.txt", "c.txt"]) bodyAt(root, base, one)
readingEnded()`,
    ],
    { encoding: "utf8" }
  )
  expect(said.stderr).toBe("")
  expect(said.status).toBe(0)
})

test("a parent killed outright leaves no git behind it", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const kid = spawn(
    "bun",
    [
      "-e",
      `import { bodyAt } from ${JSON.stringify(MODULE_AT)}
import { baseOf } from ${JSON.stringify(LANDING_AT)}
const root = ${JSON.stringify(root)}
bodyAt(root, baseOf(root), "one.txt")
setInterval(() => {}, 1000)`,
    ],
    { stdio: "ignore" }
  )
  expect(await until(() => gitOver(root).length === 1)).toBe(true)
  kid.kill("SIGKILL")
  expect(await until(() => gitOver(root).length === 0)).toBe(true)
})
