import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { landFiles, LandingRefused, removeOutside } from "./land.ts"

const SCRATCH = "/var/tmp"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function loosePath(): string {
  const dir = mkdtempSync(`${SCRATCH}/land-outside-`)
  made.push(dir)
  return `${dir}/gone.txt`
}

function said(run: () => void): string {
  const held = process.stdout.write.bind(process.stdout)
  let out = ""
  process.stdout.write = ((text: string) => {
    out += text
    return true
  }) as typeof process.stdout.write
  try {
    run()
  } finally {
    process.stdout.write = held
  }
  return out
}

test("a dry run outside every repo says what would go and leaves it standing", () => {
  const at = loosePath()
  writeFileSync(at, "probe\n")
  const out = said(() => removeOutside([at], true))
  expect(out).toContain("write:  dry-run — 1 file(s) would be removed outside every repo")
  expect(out).toContain(`${at}  6 → gone`)
  expect(existsSync(at)).toBe(true)
})

test("a removal outside every repo takes the file and commits nothing", () => {
  const at = loosePath()
  writeFileSync(at, "probe\n")
  const out = said(() => removeOutside([at], false))
  expect(out).toContain("write:  1 file(s) removed outside every repo")
  expect(out).toContain(`${at}  6 → gone`)
  expect(out).toContain("commit: none — no repo holds these paths, so nothing carries their history")
  expect(existsSync(at)).toBe(false)
})

test("a commit that fails names the carried path it already renamed", () => {
  const root = mkdtempSync(`${SCRATCH}/land-carry-`)
  made.push(root)
  const git = (...args: string[]) => execFileSync("git", ["-C", root, ...args])
  git("init", "-q", "-b", "main")
  git("config", "user.email", "a@b.c")
  git("config", "user.name", "t")
  writeFileSync(`${root}/was.txt`, "body\n")
  git("add", "-A")
  git("commit", "-qm", "init")
  let said = ""
  try {
    landFiles({
      repo: "code-editor",
      root,
      message: "carry",
      carrying: [{ from: "was.txt", to: "now.txt" }],
      commit: () => {
        throw new LandingRefused("git commit failed: Unable to create index.lock: File exists.")
      },
    })
  } catch (err) {
    said = err instanceof Error ? err.message : String(err)
  }
  // The rename stands on disk before the commit is attempted, so a refusal that does not name it
  // sends the caller to commit a set that leaves the move half-applied.
  expect(existsSync(`${root}/now.txt`)).toBe(true)
  expect(existsSync(`${root}/was.txt`)).toBe(false)
  expect(said).toContain("was.txt")
  expect(said).toContain("now.txt")
})
