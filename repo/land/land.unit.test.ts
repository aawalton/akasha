import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { landFiles, LandingRefused } from "./land.ts"

const SCRATCH = "/var/tmp"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

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

// A git call that could not answer, failed for a real reason rather than stubbed: `ls-files
// --cached` reads the index, and an index it cannot parse is the shape a transient failure here
// actually takes.
function unreadableIndex(root: string): void {
  writeFileSync(`${root}/.git/index`, "not an index")
}

// THE COMMIT IS PATHSPEC-LIMITED AND THE RENAME IS ALREADY ON DISK, so a carry dropped from the
// set named to it lands nowhere while the worktree has moved, and the landing still returns a sha.
// Nothing is asked of git after the worktree moves, so refusing here takes the whole landing away.
test("a carry whose ls-files could not answer refuses rather than committing a subset", () => {
  const root = scratchRepo()
  committed(root, "was.txt", "body\n")
  committed(root, "kept.txt", "kept\n")
  unreadableIndex(root)
  let named: number | null = null
  let said = ""
  try {
    landFiles({
      repo: "code-editor",
      root,
      message: "carry",
      entries: [{ relPath: "kept.txt", body: "kept, changed\n" }],
      carrying: [{ from: "was.txt", to: "now.txt" }],
      commit: (_root, paths) => {
        named = paths.length
        return "sha"
      },
    })
  } catch (err) {
    said = err instanceof Error ? err.message : String(err)
  }
  expect(named).toBe(null)
  expect(said).toContain("was.txt")
  expect(existsSync(`${root}/now.txt`)).toBe(false)
  expect(existsSync(`${root}/was.txt`)).toBe(true)
  expect(readFileSync(`${root}/kept.txt`, "utf8")).toBe("kept\n")
})

// NO HISTORY HOLDS WHAT WENT AT is a claim about what git was asked, and a failed ask is not a no.
test("a removal whose ls-files could not answer refuses rather than calling it untracked", () => {
  const root = scratchRepo()
  committed(root, "was.txt", "body\n")
  unreadableIndex(root)
  let said = ""
  try {
    namedByRemoving(root, ["was.txt"])
  } catch (err) {
    said = err instanceof Error ? err.message : String(err)
  }
  expect(said).toContain("was.txt")
  expect(existsSync(`${root}/was.txt`)).toBe(true)
})
