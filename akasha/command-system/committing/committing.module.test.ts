import { afterAll, expect, test } from "bun:test"
import { chmodSync, existsSync, mkdirSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { landing } from "../landing/landing.module.code.ts"
import { ADMITS, bytes } from "../landing/landing.module.test-fixtures.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { AUTHOR, committed, whileIndexFrees } from "./committing.module.code.ts"

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

function landedMode(root: string, path: string): string {
  return git(root, ["ls-tree", "HEAD", "--", path]).trim().split(" ")[0] ?? ""
}

function indexedMode(root: string, path: string): string {
  return git(root, ["ls-files", "-s", "--", path]).trim().split(" ")[0] ?? ""
}

function tookAnother(root: string, path: string): undefined {
  git(root, ["add", "-A", "--", path])
  git(root, ["commit", "--quiet", "-m", "again"])
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

test("a scratch repository records the executable bit at all", () => {
  const root = repoWith({ "run.sh": "one" })
  chmodSync(join(root, "run.sh"), 0o755)
  tookAnother(root, "run.sh")
  expect(landedMode(root, "run.sh")).toBe("100755")
})

test("a file its owner may run lands at 100755 in the tree and in the index", () => {
  const root = repoWith({ "run.sh": "one" })
  expect(landedMode(root, "run.sh")).toBe("100644")
  chmodSync(join(root, "run.sh"), 0o755)
  const said = landing(root, [{ path: "run.sh", body: bytes("two") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "run.sh")).toBe("100755")
  expect(indexedMode(root, "run.sh")).toBe("100755")
})

test("a file its owner may run deep in the tree lands at 100755", () => {
  const root = repoWith({ "a/b/c/run.sh": "one", "a/b/plain.txt": "one" })
  chmodSync(join(root, "a/b/c/run.sh"), 0o755)
  const said = landing(root, [{ path: "a/b/c/run.sh", body: bytes("two") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "a/b/c/run.sh")).toBe("100755")
  expect(indexedMode(root, "a/b/c/run.sh")).toBe("100755")
  expect(landedMode(root, "a/b/plain.txt")).toBe("100644")
})

test("the bit read is the one its owner runs by rather than the one its group runs by", () => {
  const root = repoWith({ "owner.sh": "one", "group.sh": "one" })
  chmodSync(join(root, "owner.sh"), 0o744)
  chmodSync(join(root, "group.sh"), 0o654)
  const said = landing(
    root,
    [
      { path: "owner.sh", body: bytes("two") },
      { path: "group.sh", body: bytes("two") },
    ],
    "held",
    ADMITS
  )
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "owner.sh")).toBe("100755")
  expect(landedMode(root, "group.sh")).toBe("100644")
  expect(indexedMode(root, "owner.sh")).toBe("100755")
  expect(indexedMode(root, "group.sh")).toBe("100644")
})

test("a mode changed with the body left alone lands as a mode change and nothing else", () => {
  const root = repoWith({ "auth.ts": "same bytes" })
  const before = git(root, ["rev-parse", "HEAD"]).trim()
  chmodSync(join(root, "auth.ts"), 0o777)
  const said = landing(root, [{ path: "auth.ts", body: bytes("same bytes") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "auth.ts")).toBe("100755")
  expect(git(root, ["diff", "--numstat", `${before}..HEAD`]).trim()).toBe("0\t0\tauth.ts")
  expect(git(root, ["diff", "--summary", `${before}..HEAD`]).trim()).toBe(
    "mode change 100644 => 100755 auth.ts"
  )
})

test("a file its owner may not run lands at 100644 in the tree and in the index", () => {
  const root = repoWith({ "plain.txt": "one" })
  const said = landing(root, [{ path: "plain.txt", body: bytes("two") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "plain.txt")).toBe("100644")
  expect(indexedMode(root, "plain.txt")).toBe("100644")
})

test("a file HEAD records at 100755 keeps that mode when its body is written again", () => {
  const root = repoWith({ "run.sh": "one" })
  chmodSync(join(root, "run.sh"), 0o755)
  tookAnother(root, "run.sh")
  expect(landedMode(root, "run.sh")).toBe("100755")
  const said = landing(root, [{ path: "run.sh", body: bytes("two") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "run.sh")).toBe("100755")
  expect(indexedMode(root, "run.sh")).toBe("100755")
})

test("a file HEAD records at 100755 that the disk no longer runs lands at 100644", () => {
  const root = repoWith({ "run.sh": "one" })
  chmodSync(join(root, "run.sh"), 0o755)
  tookAnother(root, "run.sh")
  expect(landedMode(root, "run.sh")).toBe("100755")
  chmodSync(join(root, "run.sh"), 0o644)
  const said = landing(root, [{ path: "run.sh", body: bytes("two") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "run.sh")).toBe("100644")
  expect(indexedMode(root, "run.sh")).toBe("100644")
})

test("a path that is no plain file keeps the mode HEAD recorded for it", () => {
  const root = repoWith({ "one.txt": "committed" })
  symlinkSync("one.txt", join(root, "link"))
  tookAnother(root, "link")
  expect(landedMode(root, "link")).toBe("120000")
  committed(root, ["link"], [], "the link again", null)
  expect(landedMode(root, "link")).toBe("120000")
})

test("a path a change takes away leaves the modes of the paths beside it alone", () => {
  const root = repoWith({ "a/run.sh": "one", "a/gone.txt": "one" })
  chmodSync(join(root, "a/run.sh"), 0o755)
  tookAnother(root, "a/run.sh")
  expect(landedMode(root, "a/run.sh")).toBe("100755")
  const said = landing(root, [{ path: "a/gone.txt", body: null }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  expect(landedMode(root, "a/run.sh")).toBe("100755")
})
