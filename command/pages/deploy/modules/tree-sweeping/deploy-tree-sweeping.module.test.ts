import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  foundIn,
  PINNED,
  takingFrom,
  type Unowned,
} from "akasha/command/pages/deploy/modules/tree-sweeping/deploy-tree-sweeping.module.code.ts"
import {
  storeIn,
  TREE_INDEXES,
  TREES,
} from "akasha/file/modules/git-place/git-place.module.code.ts"

const SCRATCH = "/var/tmp"

const PINS = "service-workstation"

const UNOWNED = "gone-kind"

const STUCK = "stuck-kind"

const STRAY = "stray-kind"

const HELD = "held.txt"

type Repo = {
  readonly root: string
  readonly trees: string
  readonly indexes: string
  readonly cleanup: () => void
}

function madeRepo(): Repo {
  const root = mkdtempSync(join(SCRATCH, "deploy-tree-sweeping-"))
  said(["git", "init", "-q", "-b", "main"], { cwd: root })
  return {
    root,
    trees: storeIn(root, TREES),
    indexes: storeIn(root, TREE_INDEXES),
    cleanup: () => rmSync(root, { recursive: true, force: true }),
  }
}

function treeNamed(repo: Repo, name: string): string {
  const at = join(repo.trees, name)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, HELD), "held")
  mkdirSync(repo.indexes, { recursive: true })
  writeFileSync(join(repo.indexes, name), "an index")
  return at
}

test("a tree named for a kind a deploy pins is passed over", () => {
  const repo = madeRepo()
  try {
    treeNamed(repo, PINS)
    expect(PINNED.has(PINS)).toBe(true)
    expect(foundIn(repo.root)).toEqual([])
    expect(takingFrom(foundIn(repo.root))).toEqual({ took: [], refusals: [] })
    expect(existsSync(join(repo.trees, PINS))).toBe(true)
    expect(existsSync(join(repo.indexes, PINS))).toBe(true)
  } finally {
    repo.cleanup()
  }
})

test("a tree named for no kind a deploy pins is answered with its tree and its index", () => {
  const repo = madeRepo()
  try {
    treeNamed(repo, UNOWNED)
    treeNamed(repo, PINS)
    const found: readonly Unowned[] = foundIn(repo.root)
    expect(found).toEqual([
      { name: UNOWNED, at: join(repo.trees, UNOWNED), index: join(repo.indexes, UNOWNED) },
    ])
  } finally {
    repo.cleanup()
  }
})

test("a tree no kind pins goes, and the index that tree is written from goes with it", () => {
  const repo = madeRepo()
  try {
    treeNamed(repo, UNOWNED)
    treeNamed(repo, PINS)
    expect(takingFrom(foundIn(repo.root))).toEqual({ took: [UNOWNED], refusals: [] })
    expect(existsSync(join(repo.trees, UNOWNED))).toBe(false)
    expect(existsSync(join(repo.indexes, UNOWNED))).toBe(false)
    expect(existsSync(join(repo.trees, PINS))).toBe(true)
    expect(existsSync(repo.trees)).toBe(true)
    expect(existsSync(repo.indexes)).toBe(true)
  } finally {
    repo.cleanup()
  }
})

test("a checkout whose git directory holds no trees store answers nothing found", () => {
  const repo = madeRepo()
  try {
    expect(existsSync(repo.trees)).toBe(false)
    expect(foundIn(repo.root)).toEqual([])
    expect(takingFrom(foundIn(repo.root))).toEqual({ took: [], refusals: [] })
  } finally {
    repo.cleanup()
  }
})

test("a file directly under the trees store is no tree and is passed over", () => {
  const repo = madeRepo()
  try {
    mkdirSync(repo.trees, { recursive: true })
    writeFileSync(join(repo.trees, STRAY), "a stray file")
    expect(foundIn(repo.root)).toEqual([])
    expect(existsSync(join(repo.trees, STRAY))).toBe(true)
  } finally {
    repo.cleanup()
  }
})

test("a tree that will not go is reported against its path while the rest are still taken", () => {
  const repo = madeRepo()
  try {
    treeNamed(repo, UNOWNED)
    mkdirSync(repo.trees, { recursive: true })
    writeFileSync(join(repo.trees, STRAY), "a stray file")
    const stuck: Unowned = {
      name: STUCK,
      at: join(repo.trees, STRAY, STUCK),
      index: join(repo.indexes, STUCK),
    }
    const swept = takingFrom([...foundIn(repo.root), stuck])
    expect(swept.took).toEqual([UNOWNED])
    expect(swept.refusals.length).toBe(1)
    expect(swept.refusals[0]).toContain(stuck.at)
    expect(swept.refusals[0]).toContain("would not go")
    expect(existsSync(join(repo.trees, STRAY))).toBe(true)
    expect(existsSync(join(repo.trees, UNOWNED))).toBe(false)
  } finally {
    repo.cleanup()
  }
})
