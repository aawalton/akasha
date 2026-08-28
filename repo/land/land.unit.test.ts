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

function scratchRepo(): string {
  const root = mkdtempSync(`${SCRATCH}/land-repo-`)
  made.push(root)
  const git = (...args: string[]) => execFileSync("git", ["-C", root, ...args])
  git("init", "-q", "-b", "main")
  git("config", "user.email", "a@b.c")
  git("config", "user.name", "t")
  return root
}

function committed(root: string, rel: string, body: string): void {
  writeFileSync(`${root}/${rel}`, body)
  execFileSync("git", ["-C", root, "add", "--", rel])
  execFileSync("git", ["-C", root, "commit", "-qm", `hold ${rel}`])
}

// The paths a landing hands its commit, taken from the commit itself: what is named there is what
// the removal actually lands, and a path left out of it goes nowhere.
function namedByRemoving(root: string, removing: readonly string[]): readonly string[] {
  let named: readonly string[] = []
  landFiles({
    repo: "code-editor",
    root,
    message: "take it away",
    removing,
    commit: (_root, paths) => {
      named = paths
      return "sha"
    },
  })
  return named
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
  const root = scratchRepo()
  committed(root, "was.txt", "body\n")
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

test("a removal of a path standing in the worktree is named in the commit and unlinked", () => {
  const root = scratchRepo()
  committed(root, "was.txt", "body\n")
  expect(namedByRemoving(root, ["was.txt"])).toContain("was.txt")
  expect(existsSync(`${root}/was.txt`)).toBe(false)
})

// THE WORKTREE DELETION IS THE WHOLE CHANGE where a path was deleted on disk and never committed:
// nothing leaves the disk here, so a commit naming only what left it names nothing, lands nothing,
// and leaves the deletion stranded — while the check after the commit refuses for taking nothing
// away, after the commit it was left out of has already gone.
test("a removal of a path the worktree lost while HEAD holds it is named in the commit", () => {
  const root = scratchRepo()
  committed(root, "was.txt", "body\n")
  rmSync(`${root}/was.txt`)
  expect(namedByRemoving(root, ["was.txt"])).toContain("was.txt")
})

test("a removal of a path neither the worktree nor git holds is named in no commit", () => {
  const root = scratchRepo()
  committed(root, "was.txt", "body\n")
  expect(namedByRemoving(root, ["never.txt"])).not.toContain("never.txt")
})
