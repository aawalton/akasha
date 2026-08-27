import { describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

interface RepoRootModule {
  readonly getRepoRoot: () => string
}

async function freshly(tag: string): Promise<RepoRootModule> {
  return (await import(`./repo-root.ts?${tag}`)) as RepoRootModule
}

function treeCarryingMarker(): string {
  const dir = mkdtempSync(join(tmpdir(), "repo-root-marked-"))
  writeFileSync(join(dir, "bun.lock"), "")
  return dir
}

function naming<T>(workspace: string | undefined, run: () => T): T {
  const held = process.env.WORKSPACE
  if (workspace === undefined) delete process.env.WORKSPACE
  else process.env.WORKSPACE = workspace
  try {
    return run()
  } finally {
    if (held === undefined) delete process.env.WORKSPACE
    else process.env.WORKSPACE = held
  }
}

function discarding(dirs: readonly string[], run: () => void): void {
  try {
    run()
  } finally {
    for (const dir of dirs) rmSync(dir, { recursive: true, force: true })
  }
}

describe("getRepoRoot is named a tree rather than deriving one", () => {
  test("refuses when nothing names a checkout", async () => {
    const { getRepoRoot } = await freshly("unnamed")
    expect(() => naming(undefined, getRepoRoot)).toThrow(/WORKSPACE/)
  })

  test("reads an empty name as no name at all", async () => {
    const { getRepoRoot } = await freshly("empty")
    expect(() => naming("", getRepoRoot)).toThrow(/WORKSPACE/)
  })

  test("refuses a named tree carrying no marker rather than scanning it", async () => {
    const bare = mkdtempSync(join(tmpdir(), "repo-root-bare-"))
    const { getRepoRoot } = await freshly("unmarked")
    discarding([bare], () => {
      expect(() => naming(bare, getRepoRoot)).toThrow(/bun\.lock/)
    })
  })

  test("returns the tree it was named", async () => {
    const marked = treeCarryingMarker()
    const { getRepoRoot } = await freshly("marked")
    discarding([marked], () => {
      expect(naming(marked, getRepoRoot)).toBe(resolve(marked))
    })
  })

  test("holds the first tree it returned, so a later name cannot repoint a run", async () => {
    const first = treeCarryingMarker()
    const second = treeCarryingMarker()
    const { getRepoRoot } = await freshly("held")
    discarding([first, second], () => {
      expect(naming(first, getRepoRoot)).toBe(resolve(first))
      expect(naming(second, getRepoRoot)).toBe(resolve(first))
    })
  })
})
