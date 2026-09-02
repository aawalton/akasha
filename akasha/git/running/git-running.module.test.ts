import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { argvFor, askedFor, said, told } from "./git-running.module.code.ts"

const SEED = "seed"

function made(): string {
  const root = mkdtempSync("/var/tmp/git-running-")
  said(root, ["init", "--quiet"])
  said(root, ["config", "user.email", "held@akasha"])
  said(root, ["config", "user.name", "held"])
  said(root, ["config", "commit.gpgsign", "false"])
  writeFileSync(join(root, SEED), "held\n")
  said(root, ["add", "--", SEED])
  said(root, ["commit", "--quiet", "-m", SEED, "--", SEED])
  return root
}

const ROOT = made()

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

test("the repository is named to git by -C rather than by a folder", () => {
  expect(argvFor("/held", ["status"])).toEqual(["git", "-C", "/held", "status"])
})

test("a ceiling a caller states is carried to the runner", () => {
  expect(askedFor({ timeout: 5_000 })).toEqual({ timeout: 5_000 })
})

test("a caller stating no ceiling asks for nothing", () => {
  expect(askedFor({})).toEqual({})
})

test("what git said is answered unchanged rather than trimmed", () => {
  const held = said(ROOT, ["rev-parse", "HEAD"])
  expect(held.endsWith("\n")).toBe(true)
  expect(held.trim()).toMatch(/^[0-9a-f]{40}$/)
})

test("the repository run in is the one stated rather than the one the caller is in", () => {
  const there = said(ROOT, ["rev-parse", "--show-toplevel"]).trim()
  expect(there).toBe(realpathSync(ROOT))
})

test("a command git could not run throws where a caller asked for the text", () => {
  expect(() => said(ROOT, ["cat-file", "-p", "nothingstandshere"])).toThrow()
})

test("a command git could not run answers nothing where a caller asked to be told", () => {
  expect(told(ROOT, ["cat-file", "-p", "nothingstandshere"])).toBeNull()
})

test("both doors answer alike where git ran", () => {
  expect(told(ROOT, ["rev-parse", "HEAD"])).toBe(said(ROOT, ["rev-parse", "HEAD"]))
})
