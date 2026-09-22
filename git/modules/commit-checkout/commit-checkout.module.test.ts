import { afterAll, expect, test } from "bun:test"
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { checkoutAt } from "akasha/git/modules/commit-checkout/commit-checkout.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"

const HOME = "HOME"

const MARK = ".at-commit"

const NOWHERE = "0000000000000000000000000000000000000000"

const scratch = scratchWorld()

const HOME_WAS = requireEnv(HOME)

process.env[HOME] = scratch.rootFor("akasha-checkout-home-")

afterAll(() => {
  process.env[HOME] = HOME_WAS
  scratch.sweep()
})

function repoAt(): string {
  const root = scratch.rootFor("akasha-checkout-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "checkout@nowhere"])
  git(root, ["config", "user.name", "Checkout"])
  git(root, ["config", "commit.gpgsign", "false"])
  return root
}

function committed(root: string, named: string): string {
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", named])
  return git(root, ["rev-parse", "HEAD"]).trim()
}

function everyIn(dir: string, under: string = ""): readonly string[] {
  const found: string[] = []
  for (const one of readdirSync(join(dir, under), { withFileTypes: true })) {
    const at = under === "" ? one.name : `${under}/${one.name}`
    if (one.isDirectory()) found.push(...everyIn(dir, at))
    else found.push(at)
  }
  return [...found].sort()
}

test("a checkout holding nothing is filled from the commit whole", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  put(root, "deep/two.txt", "two")
  const dir = checkoutAt(root, committed(root, "first"))
  expect(everyIn(dir)).toEqual(["deep/two.txt", "one.txt"])
  expect(readFileSync(join(dir, "one.txt"), "utf8")).toBe("one")
  expect(readFileSync(join(dir, "deep/two.txt"), "utf8")).toBe("two")
})

test("a checkout sits outside the repository and holds no git folder", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  const dir = checkoutAt(root, committed(root, "first"))
  expect(dir.startsWith(root)).toBe(false)
  expect(existsSync(join(dir, ".git"))).toBe(false)
})

test("one checkout answers for a repository, whatever commit a caller asks for", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  const first = committed(root, "first")
  put(root, "one.txt", "again")
  const second = committed(root, "second")
  expect(checkoutAt(root, second)).toBe(checkoutAt(root, first))
})

test("a checkout brought forward is written where the commit changed and left where it was not", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  put(root, "deep/two.txt", "two")
  const dir = checkoutAt(root, committed(root, "first"))
  writeFileSync(join(dir, "left.txt"), "left")
  put(root, "one.txt", "again")
  put(root, "deep/three.txt", "three")
  checkoutAt(root, committed(root, "second"))
  expect(readFileSync(join(dir, "one.txt"), "utf8")).toBe("again")
  expect(readFileSync(join(dir, "deep/two.txt"), "utf8")).toBe("two")
  expect(readFileSync(join(dir, "deep/three.txt"), "utf8")).toBe("three")
  expect(existsSync(join(dir, "left.txt"))).toBe(true)
})

test("bringing a checkout forward takes away the paths the commit no longer holds", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  put(root, "deep/two.txt", "two")
  const dir = checkoutAt(root, committed(root, "first"))
  expect(existsSync(join(dir, "deep/two.txt"))).toBe(true)
  rmSync(join(root, "deep/two.txt"))
  checkoutAt(root, committed(root, "second"))
  expect(existsSync(join(dir, "deep/two.txt"))).toBe(false)
  expect(existsSync(join(dir, "deep"))).toBe(false)
  expect(everyIn(dir)).toEqual(["one.txt"])
})

test("a checkout says which commit that checkout was last brought to, beside the checkout", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  const first = committed(root, "first")
  const dir = checkoutAt(root, first)
  expect(readFileSync(`${dir}${MARK}`, "utf8").trim()).toBe(first)
  expect(everyIn(dir)).toEqual(["one.txt"])
})

test("a checkout marked with a commit git cannot resolve is filled from the commit whole", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  const dir = checkoutAt(root, committed(root, "first"))
  writeFileSync(join(dir, "left.txt"), "left")
  writeFileSync(`${dir}${MARK}`, NOWHERE)
  put(root, "one.txt", "again")
  const second = committed(root, "second")
  checkoutAt(root, second)
  expect(existsSync(join(dir, "left.txt"))).toBe(false)
  expect(readFileSync(join(dir, "one.txt"), "utf8")).toBe("again")
  expect(readFileSync(`${dir}${MARK}`, "utf8").trim()).toBe(second)
})

test("a commit git cannot resolve is said out loud rather than checked out", () => {
  const root = repoAt()
  put(root, "one.txt", "one")
  committed(root, "first")
  expect(() => checkoutAt(root, NOWHERE)).toThrow("names no commit")
})
