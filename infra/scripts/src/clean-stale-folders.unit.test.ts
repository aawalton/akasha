import { describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import {
  discoverStaleFolders,
  knownDirsFromFileList,
  type OrphanFolder,
} from "./clean-stale-folders"

const FIXTURES = resolve(import.meta.dir, "..", "__fixtures__/clean-stale-folders")

function paths(orphans: readonly OrphanFolder[]): readonly string[] {
  return orphans.map((o) => o.relativePath)
}

describe("knownDirsFromFileList", () => {
  test("adds every ancestor directory of each file, plus empty-string root", () => {
    const dirs = knownDirsFromFileList([
      "package.json",
      "packages/shared/cli/src/index.ts",
      "packages/shared/cli/package.json",
    ])
    expect([...dirs].sort()).toEqual(
      ["", "packages", "packages/shared", "packages/shared/cli", "packages/shared/cli/src"].sort()
    )
  })

  test("ignores blank lines and trims whitespace", () => {
    const dirs = knownDirsFromFileList(["", "  ", "a/b.ts", "a/c.ts"])
    expect([...dirs].sort()).toEqual(["", "a"].sort())
  })
})

describe("discoverStaleFolders", () => {
  test("flags folder with no package.json whose subtree is entirely gitignored", () => {
    const root = resolve(FIXTURES, "orphan-basic")
    const known = knownDirsFromFileList([
      "package.json",
      "packages/live/package.json",
      "packages/live/src/index.ts",
    ])
    expect(paths(discoverStaleFolders(root, known))).toEqual(["packages/orphan"])
  })

  test("never descends into a leaf package (package.json without workspaces)", () => {
    const root = resolve(FIXTURES, "live-with-dist")
    const known = knownDirsFromFileList([
      "package.json",
      "packages/live/package.json",
      "packages/live/src/index.ts",
    ])
    expect(paths(discoverStaleFolders(root, known))).toEqual([])
  })

  test("recurses through a workspace root (package.json WITH workspaces field)", () => {
    const root = resolve(FIXTURES, "orphan-basic")
    const known = knownDirsFromFileList([
      "package.json",
      "packages/live/package.json",
      "packages/live/src/index.ts",
    ])
    const orphans = discoverStaleFolders(root, known)
    expect(paths(orphans)).toEqual(["packages/orphan"])
    expect(requireFirst(orphans).sizeBytes).toBeGreaterThan(0)
  })

  test("flags the shallowest orphan, not nested sub-dirs inside it", () => {
    const root = resolve(FIXTURES, "orphan-nested")
    const known = knownDirsFromFileList([
      "package.json",
      "packages/live/package.json",
      "packages/live/src/index.ts",
    ])
    expect(paths(discoverStaleFolders(root, known))).toEqual(["packages/orphan"])
  })

  test("skips .git and node_modules directories", () => {
    const root = resolve(FIXTURES, "excluded-dirs")
    const gitDir = resolve(root, ".git")
    mkdirSync(gitDir, { recursive: true })
    writeFileSync(resolve(gitDir, "HEAD"), "ref: refs/heads/main\n")
    try {
      const known = knownDirsFromFileList([
        "package.json",
        "packages/live/package.json",
        "packages/live/src/index.ts",
      ])
      expect(paths(discoverStaleFolders(root, known))).toEqual([])
    } finally {
      rmSync(gitDir, { recursive: true, force: true })
    }
  })

  test("reports multiple orphans sorted by path", () => {
    const root = resolve(FIXTURES, "orphan-multiple")
    const known = knownDirsFromFileList([
      "package.json",
      "packages/live/package.json",
      "packages/live/src/index.ts",
    ])
    expect(paths(discoverStaleFolders(root, known))).toEqual([
      "packages/a-orphan",
      "packages/b-orphan",
    ])
  })

  test("fixtures directory exists (sanity check)", () => {
    expect(existsSync(FIXTURES)).toBe(true)
  })
})
