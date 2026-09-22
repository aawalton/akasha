import { expect, test } from "bun:test"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  PINNED_AT,
  pinnedTree,
  stampIn,
  treeIn,
} from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"

const SCRATCH = "/var/tmp"

const KIND = "example-kind"

const A_PAUSE = 10

type Repo = { readonly root: string; readonly cleanup: () => void }

function committed(root: string, what: string): string {
  said(["git", "add", "-A"], { cwd: root })
  said(["git", "commit", "-q", "-m", what], { cwd: root })
  return said(["git", "rev-parse", "HEAD"], { cwd: root }).trim()
}

function madeRepo(): Repo {
  const root = mkdtempSync(join(SCRATCH, "deploy-tree-"))
  said(["git", "init", "-q", "-b", "main"], { cwd: root })
  said(["git", "config", "user.email", "test@local"], { cwd: root })
  said(["git", "config", "user.name", "test"], { cwd: root })
  said(["git", "config", "commit.gpgsign", "false"], { cwd: root })
  return { root, cleanup: () => rmSync(root, { recursive: true, force: true }) }
}

function firstCommit(repo: Repo): string {
  writeFileSync(join(repo.root, "one.txt"), "first")
  writeFileSync(join(repo.root, "steady.txt"), "steady")
  mkdirSync(join(repo.root, "kept"), { recursive: true })
  writeFileSync(join(repo.root, "kept", "gone.txt"), "going")
  return committed(repo.root, "first")
}

function secondCommit(repo: Repo): string {
  writeFileSync(join(repo.root, "one.txt"), "second")
  rmSync(join(repo.root, "kept", "gone.txt"))
  writeFileSync(join(repo.root, "kept", "added.txt"), "added")
  return committed(repo.root, "second")
}

function pinnedAt(repo: Repo, commit: string): string {
  const pinned = pinnedTree(repo.root, KIND, commit)
  if (!("at" in pinned)) throw new Error(pinned.refused)
  return pinned.at
}

test("a tree is named for its kind under the git directory of the checkout", () => {
  const repo = madeRepo()
  try {
    firstCommit(repo)
    expect(treeIn(repo.root, KIND)).toBe(join(repo.root, ".git", "trees", KIND))
  } finally {
    repo.cleanup()
  }
})

test("a root git answers no folder for has no tree", () => {
  expect(treeIn(join(SCRATCH, "no-repo-is-here"), KIND)).toBe(null)
})

test("the first pinning writes the commit out and leaves no git directory in the tree", () => {
  const repo = madeRepo()
  try {
    const at = pinnedAt(repo, firstCommit(repo))
    expect(readFileSync(join(at, "one.txt"), "utf8")).toBe("first")
    expect(readFileSync(join(at, "kept", "gone.txt"), "utf8")).toBe("going")
    expect(readdirSync(at)).not.toContain(".git")
    expect(existsSync(join(at, ".git"))).toBe(false)
  } finally {
    repo.cleanup()
  }
})

test("pinning again writes what changed, adds what was added and takes away what was dropped", () => {
  const repo = madeRepo()
  try {
    const at = pinnedAt(repo, firstCommit(repo))
    const before = statSync(join(at, "steady.txt")).mtimeMs
    Bun.sleepSync(A_PAUSE)
    pinnedAt(repo, secondCommit(repo))
    expect(readFileSync(join(at, "one.txt"), "utf8")).toBe("second")
    expect(readFileSync(join(at, "kept", "added.txt"), "utf8")).toBe("added")
    expect(existsSync(join(at, "kept", "gone.txt"))).toBe(false)
    expect(statSync(join(at, "steady.txt")).mtimeMs).toBe(before)
    expect(existsSync(join(at, ".git"))).toBe(false)
  } finally {
    repo.cleanup()
  }
})

test("a file git ignores is left where it is when the tree moves", () => {
  const repo = madeRepo()
  try {
    writeFileSync(join(repo.root, ".gitignore"), "built/\n")
    const at = pinnedAt(repo, firstCommit(repo))
    mkdirSync(join(at, "built"), { recursive: true })
    writeFileSync(join(at, "built", "out.js"), "mine")
    pinnedAt(repo, secondCommit(repo))
    expect(readFileSync(join(at, "built", "out.js"), "utf8")).toBe("mine")
  } finally {
    repo.cleanup()
  }
})

test("a file git does not track is left where it is when the tree moves", () => {
  const repo = madeRepo()
  try {
    const at = pinnedAt(repo, firstCommit(repo))
    writeFileSync(join(at, "mine.txt"), "mine")
    mkdirSync(join(at, "made"), { recursive: true })
    writeFileSync(join(at, "made", "by-a-build.txt"), "mine")
    pinnedAt(repo, secondCommit(repo))
    expect(readFileSync(join(at, "mine.txt"), "utf8")).toBe("mine")
    expect(readFileSync(join(at, "made", "by-a-build.txt"), "utf8")).toBe("mine")
  } finally {
    repo.cleanup()
  }
})

test("the stamp at the root of the tree holds the commit the tree is pinned at", () => {
  const repo = madeRepo()
  try {
    const first = firstCommit(repo)
    const at = pinnedAt(repo, first)
    expect(stampIn(at)).toBe(join(at, PINNED_AT))
    expect(readFileSync(stampIn(at), "utf8").trim()).toBe(first)
    const second = secondCommit(repo)
    pinnedAt(repo, second)
    expect(readFileSync(stampIn(at), "utf8").trim()).toBe(second)
    expect(said(["git", "ls-tree", "--name-only", second], { cwd: repo.root })).not.toContain(
      PINNED_AT
    )
  } finally {
    repo.cleanup()
  }
})

test("a tree git still holds as a worktree is taken out of git and kept as an export", () => {
  const repo = madeRepo()
  try {
    const first = firstCommit(repo)
    const at = join(repo.root, ".git", "trees", KIND)
    said(["git", "worktree", "add", "--detach", at, first], { cwd: repo.root })
    expect(existsSync(join(at, ".git"))).toBe(true)
    writeFileSync(join(at, "mine.txt"), "mine")
    const second = secondCommit(repo)
    expect(pinnedAt(repo, second)).toBe(at)
    expect(existsSync(join(at, ".git"))).toBe(false)
    expect(existsSync(join(repo.root, ".git", "worktrees", KIND))).toBe(false)
    expect(readFileSync(join(at, "one.txt"), "utf8")).toBe("second")
    expect(readFileSync(join(at, "mine.txt"), "utf8")).toBe("mine")
    expect(readFileSync(stampIn(at), "utf8").trim()).toBe(second)
  } finally {
    repo.cleanup()
  }
})

test("a commit the checkout does not hold is refused by naming the kind", () => {
  const repo = madeRepo()
  try {
    firstCommit(repo)
    const pinned = pinnedTree(repo.root, KIND, "0".repeat(40))
    expect("refused" in pinned).toBe(true)
    if (!("refused" in pinned)) return
    expect(pinned.refused).toContain(KIND)
  } finally {
    repo.cleanup()
  }
})
