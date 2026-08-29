import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { landFiles, LandingRefused, put } from "./land.ts"

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

function unreadableIndex(root: string): void {
  writeFileSync(`${root}/.git/index`, "not an index")
}

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

test("a body lands whole and leaves no part file behind", () => {
  const root = scratchRepo()
  put(`${root}/held/deep.txt`, "the whole body\n")
  expect(readFileSync(`${root}/held/deep.txt`, "utf8")).toBe("the whole body\n")
  expect(readdirSync(`${root}/held`)).toEqual(["deep.txt"])
})

test("a rewrite replaces the file rather than writing over it in place", () => {
  const root = scratchRepo()
  const at = `${root}/held.txt`
  put(at, "first\n")
  const before = statSync(at).ino
  put(at, "second\n")
  expect(readFileSync(at, "utf8")).toBe("second\n")
  expect(statSync(at).ino).not.toBe(before)
})

test("a rewrite keeps the mode the standing file already carried", () => {
  const root = scratchRepo()
  const at = `${root}/run.sh`
  put(at, "#!/bin/sh\necho one\n")
  chmodSync(at, 0o700)
  put(at, "#!/bin/sh\necho two\n")
  expect(statSync(at).mode & 0o777).toBe(0o700)
})

test("a new body carrying a shebang lands executable", () => {
  const root = scratchRepo()
  const at = `${root}/fresh.sh`
  put(at, "#!/bin/sh\necho hi\n")
  expect(statSync(at).mode & 0o100).toBe(0o100)
})

test("a new body carrying no shebang does not land executable", () => {
  const root = scratchRepo()
  const at = `${root}/plain.txt`
  put(at, "no shebang\n")
  expect(statSync(at).mode & 0o111).toBe(0)
})
