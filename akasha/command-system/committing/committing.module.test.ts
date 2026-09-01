import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { landing } from "../landing/landing.module.code.ts"
import { ADMITS, bytes } from "../landing/landing.module.test-fixtures.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { AUTHOR } from "./committing.module.code.ts"

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

test("a path the git index would not take refuses the change rather than reading as nothing", () => {
  const root = repoWith({ "one.txt": "committed" })
  writeFileSync(join(root, ".git/index.lock"), "")
  expect(() =>
    landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  ).toThrow("index.lock")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
})
