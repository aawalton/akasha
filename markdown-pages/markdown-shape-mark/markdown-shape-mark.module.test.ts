import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { chmodSync, mkdirSync, mkdtempSync, rmSync, unlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import {
  blobsNamed,
  diskAtCommit,
  namedAtCommit,
} from "../markdown-shape-mark/markdown-shape-mark.module.code.ts"

// Every case here is a checkout this one test makes, commits into and then throws away, so nothing
// it does is ever asked of the checkout the tests run in. That matters more than usual for this
// file: the state under test is index-against-commit disagreement, and seeding that in the shared
// worktree is the outage this code exists to answer.
function madeCheckout(): string {
  const root = mkdtempSync(`${tmpdir()}/shape-mark-`)
  const run = (...args: string[]): void => {
    execFileSync("git", args, { cwd: root, stdio: "ignore" })
  }
  run("init", "-q", "-b", "main", ".")
  run("config", "user.email", "shape-mark@test")
  run("config", "user.name", "shape mark test")
  mkdirSync(`${root}/page`)
  writeFileSync(`${root}/page/a.ts`, "one\n")
  writeFileSync(`${root}/page/b.ts`, "keep\n")
  run("add", "--", "page/a.ts", "page/b.ts")
  run("commit", "-q", "-m", "one", "--", "page/a.ts", "page/b.ts")
  return root
}

function inCheckout(root: string, ...args: string[]): string {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim()
}

function stagedThen(root: string, at: string, held: string, then: string): void {
  writeFileSync(`${root}/${at}`, held)
  execFileSync("git", ["add", "--", at], { cwd: root, stdio: "ignore" })
  writeFileSync(`${root}/${at}`, then)
}

function askedOf(root: string): ReadonlyMap<string, string> | null {
  return diskAtCommit(root, ["page"])
}

// What `shapeMarkOf` reads, and the whole of what it read before: 1 is every no it could tell.
function commitDiffCode(root: string, ...specs: string[]): number {
  const done = Bun.spawnSync({
    cmd: ["git", "diff-index", "--quiet", "HEAD", "--", ...(specs.length > 0 ? specs : ["page"])],
    cwd: root,
  })
  return done.exitCode
}

const PAGE_TYPE = "---\nslug: probe\n---\n\nbody\n"

function namedBlobsIn(root: string): ReadonlyMap<string, string> {
  return blobsNamed(root) as ReadonlyMap<string, string>
}

function stagedThenTakenOffDisk(root: string, at: string): void {
  writeFileSync(`${root}/${at}`, PAGE_TYPE)
  execFileSync("git", ["add", "--", at], { cwd: root, stdio: "ignore" })
  unlinkSync(`${root}/${at}`)
}

function droppedAfter(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

// CAUGHT. The staged blob is not the commit's and the file on disk is, which is the state that
// took the mark to null for every agent in the checkout while nothing at all had changed.
test("a path staged away from the commit whose file is the commit's own content is skew", () => {
  const root = madeCheckout()
  try {
    stagedThen(root, "page/a.ts", "STAGED\n", "one\n")
    expect(commitDiffCode(root)).toBe(1)
    expect(inCheckout(root, "hash-object", "page/a.ts")).toBe(
      inCheckout(root, "rev-parse", "HEAD:page/a.ts")
    )
    expect(inCheckout(root, "status", "--porcelain", "--", "page/a.ts")).toBe("MM page/a.ts")
    const staged = askedOf(root)
    expect(staged).not.toBeNull()
    expect([...(staged as ReadonlyMap<string, string>).keys()]).toEqual(["page/a.ts"])
    expect(staged?.get("page/a.ts")).toBe(inCheckout(root, "rev-parse", "HEAD:page/a.ts"))
  } finally {
    droppedAfter(root)
  }
})

// CAUGHT. Two at once, because a commit naming exact paths leaves as many staged as were staged.
test("every path staged away from the commit is named, not just the first", () => {
  const root = madeCheckout()
  try {
    stagedThen(root, "page/a.ts", "STAGED\n", "one\n")
    stagedThen(root, "page/b.ts", "STAGED\n", "keep\n")
    expect(commitDiffCode(root)).toBe(1)
    const staged = askedOf(root)
    expect([...(staged as ReadonlyMap<string, string>).keys()].sort()).toEqual([
      "page/a.ts",
      "page/b.ts",
    ])
  } finally {
    droppedAfter(root)
  }
})

// CAUGHT, still. This is what tells the state apart from a stale stat: a refresh rewrites when git
// last looked at a file and cannot rewrite which blob is staged, so the state outlives both of the
// things an agent reaches for on seeing a tree it believes is clean.
test("skew outlives a status and an index refresh", () => {
  const root = madeCheckout()
  try {
    stagedThen(root, "page/a.ts", "STAGED\n", "one\n")
    execFileSync("git", ["status"], { cwd: root, stdio: "ignore" })
    // `--refresh` without `-q` exits 1 on an entry it says needs updating, which this state is one
    // of, so it is spawned rather than raised on.
    Bun.spawnSync({ cmd: ["git", "update-index", "-q", "--refresh"], cwd: root })
    expect(commitDiffCode(root)).toBe(1)
    expect([...(askedOf(root) as ReadonlyMap<string, string>).keys()]).toEqual(["page/a.ts"])
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED, and the mark stays null. A path staged as deleted whose file still stands holds
// the commit's own content, so a mark could in principle be worked out for it — but `git diff`
// walks the index and answers for that path as a deletion, so this refuses it rather than reading
// past what git will say. The cost is the recompute that was always paid here; the alternative was
// a second kind of reasoning about a rarer state, which is where a wrong answer would come from.
test("a path staged as deleted whose file still stands is refused", () => {
  const root = madeCheckout()
  try {
    execFileSync("git", ["update-index", "--force-remove", "--", "page/a.ts"], {
      cwd: root,
      stdio: "ignore",
    })
    expect(commitDiffCode(root)).toBe(1)
    expect(askedOf(root)).toBeNull()
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED. The ordinary state of a working agent: the file on disk is not the commit's. A
// mark here would hand every reader answers worked out from content this checkout no longer holds.
test("an ordinary dirty tree is not skew", () => {
  const root = madeCheckout()
  try {
    writeFileSync(`${root}/page/b.ts`, "changed\n")
    expect(askedOf(root)).toBeNull()
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED. Staged work matching the file on disk is a changed tree, not skew — the index and
// the worktree agree with each other and both differ from the commit.
test("staged work that matches the file on disk is not skew", () => {
  const root = madeCheckout()
  try {
    writeFileSync(`${root}/page/b.ts`, "changed\n")
    execFileSync("git", ["add", "--", "page/b.ts"], { cwd: root, stdio: "ignore" })
    expect(askedOf(root)).toBeNull()
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED.
test("a file taken away is not skew", () => {
  const root = madeCheckout()
  try {
    unlinkSync(`${root}/page/b.ts`)
    expect(askedOf(root)).toBeNull()
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED. Content equal and mode not is still a tree the commit does not describe.
test("a mode change alone is not skew", () => {
  const root = madeCheckout()
  try {
    chmodSync(`${root}/page/b.ts`, 0o755)
    expect(askedOf(root)).toBeNull()
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED. A file the commit has never held is content this checkout has and the mark cannot
// describe, whether or not it is staged.
test("a staged file the commit has never held is not skew", () => {
  const root = madeCheckout()
  try {
    writeFileSync(`${root}/page/c.ts`, "new\n")
    execFileSync("git", ["add", "--", "page/c.ts"], { cwd: root, stdio: "ignore" })
    expect(askedOf(root)).toBeNull()
  } finally {
    droppedAfter(root)
  }
})

// THE LOOPHOLE ITSELF. A file staged and then taken off the disk is no difference at all to
// `diff-index --quiet`, because the add and the delete cancel, so this state is reached with a
// mark still being worked out — unlike every other state in this file, which is refused.
test("a staged file taken off disk is no difference git will report", () => {
  const root = madeCheckout()
  try {
    stagedThenTakenOffDisk(root, "phantom.page-type.md")
    expect(commitDiffCode(root, "page", "*.page-type.md")).toBe(0)
    expect(inCheckout(root, "status", "--porcelain", "--", "phantom.page-type.md")).toBe(
      "AD phantom.page-type.md"
    )
  } finally {
    droppedAfter(root)
  }
})

// CAUGHT, and left out. The blob is real and the file is not, so it is content this checkout does
// not hold and has no business in a mark that says what this checkout holds.
test("a page path staged with no file under it is left out of the named blobs", () => {
  const root = madeCheckout()
  try {
    stagedThenTakenOffDisk(root, "phantom.page-type.md")
    expect(inCheckout(root, "ls-files", "-s", "--", "*.page-type.md")).toContain(
      "phantom.page-type.md"
    )
    expect(namedBlobsIn(root).has("phantom.page-type.md")).toBe(false)
  } finally {
    droppedAfter(root)
  }
})

// THE STALE ANSWER THIS CLOSES. The phantom's blob is the same object a checkout that really holds
// the page reads for it, so before this the two states put the same ingredient into the mark while
// holding different files — one has the page, the other has nothing at that path. Whichever worked
// its answers out first, the other was served them. Now only the checkout holding the file carries
// the blob, and the one without it marks as what it is: a checkout without that page.
test("a phantom does not mark as a checkout where that page is real", () => {
  const phantom = madeCheckout()
  const real = madeCheckout()
  const without = madeCheckout()
  try {
    stagedThenTakenOffDisk(phantom, "probe.page-type.md")
    writeFileSync(`${real}/probe.page-type.md`, PAGE_TYPE)
    execFileSync("git", ["add", "--", "probe.page-type.md"], { cwd: real, stdio: "ignore" })
    execFileSync("git", ["commit", "-q", "-m", "two", "--", "probe.page-type.md"], {
      cwd: real,
      stdio: "ignore",
    })
    const blob = inCheckout(real, "rev-parse", "HEAD:probe.page-type.md")
    expect(inCheckout(phantom, "ls-files", "-s", "--", "probe.page-type.md")).toContain(blob)
    expect(namedBlobsIn(real).get("probe.page-type.md")).toBe(blob)
    expect(namedBlobsIn(phantom).has("probe.page-type.md")).toBe(false)
    expect([...namedBlobsIn(phantom)]).toEqual([...namedBlobsIn(without)])
  } finally {
    droppedAfter(phantom)
    droppedAfter(real)
    droppedAfter(without)
  }
})

// A page path git would quote is a page path `existsSync` would never find, and leaving a real
// file out of the mark is worse than the phantom: nothing would move the mark when it changed.
test("a page path git would quote is still in the named blobs", () => {
  const root = madeCheckout()
  try {
    writeFileSync(`${root}/café.page-type.md`, PAGE_TYPE)
    execFileSync("git", ["add", "--", "café.page-type.md"], { cwd: root, stdio: "ignore" })
    execFileSync("git", ["commit", "-q", "-m", "two", "--", "café.page-type.md"], {
      cwd: root,
      stdio: "ignore",
    })
    expect(inCheckout(root, "ls-files", "--", "*.page-type.md")).toBe(
      '"caf\\303\\251.page-type.md"'
    )
    expect(namedBlobsIn(root).get("café.page-type.md")).toBe(
      inCheckout(root, "rev-parse", "HEAD:café.page-type.md")
    )
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED. One real change is enough: skew and a changed file together are a changed tree.
test("skew standing beside a changed file is not skew", () => {
  const root = madeCheckout()
  try {
    stagedThen(root, "page/a.ts", "STAGED\n", "one\n")
    writeFileSync(`${root}/page/b.ts`, "changed\n")
    expect(askedOf(root)).toBeNull()
  } finally {
    droppedAfter(root)
  }
})

// NOT REPORTED, and the mark stands. A file rewritten with its own content is a difference to
// `diff-index --quiet` and to nothing else: no blob anywhere disagrees, so there is no path here
// for an agent to act on and none is named. This is the other silent null the mark used to take.
test("a stale stat is no paths at all, not skew", () => {
  const root = madeCheckout()
  try {
    writeFileSync(`${root}/page/a.ts`, "one\n")
    execFileSync("touch", ["-d", "2030-01-01", `${root}/page/a.ts`])
    expect(commitDiffCode(root)).toBe(1)
    expect([...(askedOf(root) as ReadonlyMap<string, string>).keys()]).toEqual([])
  } finally {
    droppedAfter(root)
  }
})

// A clean checkout is never asked this in the running code, and it answers nothing rather than
// something, so the signal cannot fire on it.
test("a clean checkout answers no staged paths", () => {
  const root = madeCheckout()
  try {
    expect([...(askedOf(root) as ReadonlyMap<string, string>).keys()]).toEqual([])
  } finally {
    droppedAfter(root)
  }
})

// The mark's own ingredient. `blobsNamed` reads the index, so under skew the index is what has to
// be written over — otherwise the mark carries a blob no file in the checkout holds.
test("the named blobs are put back to what the commit holds", () => {
  const named = new Map([
    ["pages/x.page-type.md", "1111111111111111111111111111111111111111"],
    ["pages/y.page-type.md", "2222222222222222222222222222222222222222"],
  ])
  const staged = new Map([
    ["pages/x.page-type.md", "3333333333333333333333333333333333333333"],
    ["page/a.ts", "4444444444444444444444444444444444444444"],
  ])
  const held = namedAtCommit(named, staged)
  expect(held.get("pages/x.page-type.md")).toBe("3333333333333333333333333333333333333333")
  expect(held.get("pages/y.page-type.md")).toBe("2222222222222222222222222222222222222222")
  expect(held.has("page/a.ts")).toBe(false)
})

// The corrected mark is the clean checkout's mark. That equality is the whole of what makes the
// answers kept under it the right answers to serve.
test("a checkout under skew marks the same as a clean one on the same commit", () => {
  const clean = new Map([["pages/x.page-type.md", "1111111111111111111111111111111111111111"]])
  const underSkew = new Map([["pages/x.page-type.md", "9999999999999999999999999999999999999999"]])
  const staged = new Map([["pages/x.page-type.md", "1111111111111111111111111111111111111111"]])
  expect([...namedAtCommit(underSkew, staged)]).toEqual([...clean])
})
