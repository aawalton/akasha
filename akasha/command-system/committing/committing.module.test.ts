import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { landing } from "../landing/landing.module.code.ts"
import { ADMITS, bytes } from "../landing/landing.module.test-fixtures.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { AUTHOR, whileIndexFrees } from "./committing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-committing-")
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

test("a commit no writer is named for is authored by akasha", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(git(root, ["log", "-1", "--pretty=%an <%ae>"]).trim()).toBe(AUTHOR)
})

test("a git index another process holds is waited for rather than refusing the change", () => {
  const root = repoWith({ "one.txt": "committed" })
  const lock = join(root, ".git/index.lock")
  writeFileSync(lock, "")
  Bun.spawn(["sh", "-c", `sleep 1.5; rm -f '${lock}'`], { stdout: "ignore", stderr: "ignore" })
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(existsSync(join(root, "new.txt"))).toBe(true)
})

test("anything else git refuses is thrown on the first attempt rather than waited on", () => {
  const root = repoWith({ "one.txt": "committed" })
  writeFileSync(join(root, ".git/HEAD"), "not a ref\n")
  const began = Date.now()
  expect(() =>
    landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  ).toThrow()
  expect(Date.now() - began).toBeLessThan(2_000)
  expect(existsSync(join(root, "new.txt"))).toBe(false)
})

test("a wait on the index gives up after its ceiling and throws what git said", () => {
  let tries = 0
  const began = Date.now()
  expect(() =>
    whileIndexFrees(() => {
      tries += 1
      throw new Error("fatal: Unable to create '/x/.git/index.lock': File exists.")
    }, 400)
  ).toThrow("index.lock")
  expect(Date.now() - began).toBeGreaterThanOrEqual(350)
  expect(tries).toBeGreaterThan(2)
})
