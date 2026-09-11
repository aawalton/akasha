import { expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  pinnedTree,
  treeIn,
} from "akasha/commands/pages/deploy/tree-pinning/deploy-tree-pinning.module.code.ts"
import { said } from "akasha/utils/run/running/running.module.code.ts"

const SCRATCH = "/var/tmp"

const KIND = "example-kind"

type Repo = { readonly root: string; readonly cleanup: () => void }

function committed(root: string, what: string): string {
  writeFileSync(join(root, "one.txt"), what)
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

test("a tree is named for its kind under the folder every worktree shares", () => {
  const repo = madeRepo()
  try {
    committed(repo.root, "first")
    expect(treeIn(repo.root, KIND)).toBe(join(repo.root, ".git", "trees", KIND))
  } finally {
    repo.cleanup()
  }
})

test("a root git answers no folder for has no tree", () => {
  expect(treeIn(join(SCRATCH, "no-repo-is-here"), KIND)).toBe(null)
})

test("the first pinning makes the tree holding what the commit holds", () => {
  const repo = madeRepo()
  try {
    const commit = committed(repo.root, "first")
    const pinned = pinnedTree(repo.root, KIND, commit)
    expect("at" in pinned).toBe(true)
    if (!("at" in pinned)) return
    expect(readFileSync(join(pinned.at, "one.txt"), "utf8")).toBe("first")
  } finally {
    repo.cleanup()
  }
})

test("pinning again moves the tree to the second commit", () => {
  const repo = madeRepo()
  try {
    pinnedTree(repo.root, KIND, committed(repo.root, "first"))
    const pinned = pinnedTree(repo.root, KIND, committed(repo.root, "second"))
    expect("at" in pinned).toBe(true)
    if (!("at" in pinned)) return
    expect(readFileSync(join(pinned.at, "one.txt"), "utf8")).toBe("second")
  } finally {
    repo.cleanup()
  }
})

test("a file git does not track is left where it is when the tree moves", () => {
  const repo = madeRepo()
  try {
    const first = pinnedTree(repo.root, KIND, committed(repo.root, "first"))
    if (!("at" in first)) throw new Error("the first pinning refused")
    writeFileSync(join(first.at, "kept.txt"), "mine")
    pinnedTree(repo.root, KIND, committed(repo.root, "second"))
    expect(existsSync(join(first.at, "kept.txt"))).toBe(true)
  } finally {
    repo.cleanup()
  }
})

test("a commit the checkout does not hold is refused by naming the kind", () => {
  const repo = madeRepo()
  try {
    committed(repo.root, "first")
    const pinned = pinnedTree(repo.root, KIND, "0".repeat(40))
    expect("refused" in pinned).toBe(true)
    if (!("refused" in pinned)) return
    expect(pinned.refused).toContain(KIND)
  } finally {
    repo.cleanup()
  }
})
