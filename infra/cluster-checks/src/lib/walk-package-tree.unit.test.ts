import { describe, expect, test } from "bun:test"
import { type WalkDirEntry, walkPackageTree } from "./walk-package-tree.ts"

interface FakeFile {
  readonly kind: "file"
  readonly name: string
}
interface FakeDir {
  readonly kind: "dir"
  readonly name: string
  readonly entries: readonly FakeNode[]
}
type FakeNode = FakeFile | FakeDir

const mkdir = (name: string, entries: readonly FakeNode[]): FakeDir => ({
  kind: "dir",
  name,
  entries,
})
const mkfile = (name: string): FakeFile => ({ kind: "file", name })

function buildReader(rootAbs: string, root: FakeDir): (dir: string) => readonly WalkDirEntry[] {
  const byPath = new Map<string, readonly WalkDirEntry[]>()
  function visit(prefix: string, node: FakeDir): undefined {
    byPath.set(
      prefix,
      node.entries.map((e) => ({
        name: e.name,
        isFile: () => e.kind === "file",
        isDirectory: () => e.kind === "dir",
      }))
    )
    for (const e of node.entries) {
      if (e.kind === "dir") visit(`${prefix}/${e.name}`, e)
    }
  }
  visit(rootAbs, root)
  return (dir) => byPath.get(dir) ?? []
}

describe("walkPackageTree", () => {
  test("walks every file in a flat tree", () => {
    const tree = mkdir("pkg", [mkfile("a.ts"), mkfile("b.ts")])
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(),
      skipDirNames: new Set(),
      onFile: (f) => {
        visited.push(f.name)
        return undefined
      },
      readDir: buildReader("/repo/pkg", tree),
    })
    expect(visited.sort()).toEqual(["a.ts", "b.ts"])
  })

  test("recurses into subdirectories", () => {
    const tree = mkdir("pkg", [mkfile("a.ts"), mkdir("src", [mkfile("b.ts"), mkfile("c.ts")])])
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(),
      skipDirNames: new Set(),
      onFile: (f) => {
        visited.push(f.absPath)
        return undefined
      },
      readDir: buildReader("/repo/pkg", tree),
    })
    expect(visited.sort()).toEqual(["/repo/pkg/a.ts", "/repo/pkg/src/b.ts", "/repo/pkg/src/c.ts"])
  })

  test("skips directories listed in skipDirNames", () => {
    const tree = mkdir("pkg", [
      mkfile("a.ts"),
      mkdir("dist", [mkfile("compiled.js")]),
      mkdir("node_modules", [mkfile("dep.ts")]),
    ])
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(),
      skipDirNames: new Set(["dist", "node_modules"]),
      onFile: (f) => {
        visited.push(f.name)
        return undefined
      },
      readDir: buildReader("/repo/pkg", tree),
    })
    expect(visited).toEqual(["a.ts"])
  })

  test("stops at nested workspace boundaries (the #9407 contract)", () => {
    const tree = mkdir("pkg", [mkfile("a.ts"), mkdir("ui", [mkfile("Button.tsx")])])
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(["pkg/ui"]),
      skipDirNames: new Set(),
      onFile: (f) => {
        visited.push(f.name)
        return undefined
      },
      readDir: buildReader("/repo/pkg", tree),
    })
    expect(visited).toEqual(["a.ts"])
  })

  test("descends into non-workspace subdirectories that share a basename with a workspace", () => {
    const tree = mkdir("pkg", [mkdir("src", [mkdir("ui", [mkfile("Button.tsx")])])])
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(["pkg/ui"]),
      skipDirNames: new Set(),
      onFile: (f) => {
        visited.push(f.name)
        return undefined
      },
      readDir: buildReader("/repo/pkg", tree),
    })
    expect(visited).toEqual(["Button.tsx"])
  })

  test("does NOT skip the packageRoot itself when it appears in otherWorkspaceRoots", () => {
    const tree = mkdir("pkg", [mkfile("a.ts")])
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(["pkg"]),
      skipDirNames: new Set(),
      onFile: (f) => {
        visited.push(f.name)
        return undefined
      },
      readDir: buildReader("/repo/pkg", tree),
    })
    expect(visited).toEqual(["a.ts"])
  })

  test("returning 'stop' from onFile halts the walk on the first match", () => {
    const tree = mkdir("pkg", [mkfile("a.ts"), mkfile("b.ts"), mkdir("src", [mkfile("c.ts")])])
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(),
      skipDirNames: new Set(),
      onFile: (f) => {
        visited.push(f.name)
        return "stop"
      },
      readDir: buildReader("/repo/pkg", tree),
    })
    expect(visited.length).toBe(1)
  })

  test("unreadable directories return empty entries (reader contract)", () => {
    const visited: string[] = []
    walkPackageTree({
      packageRoot: "/repo/pkg",
      repoRoot: "/repo",
      otherWorkspaceRoots: new Set(),
      skipDirNames: new Set(),
      onFile: (f) => {
        visited.push(f.name)
        return undefined
      },
      readDir: () => [],
    })
    expect(visited).toEqual([])
  })
})
