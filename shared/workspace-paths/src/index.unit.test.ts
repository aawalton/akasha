import { afterAll, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  binNamesFromManifest,
  expectedWorkspaceBinNames,
  findMissingBins,
  isCoveredByWorkspaceGlob,
  listWorkspaceDirs,
} from "./index"

const REPO_ROOT = join(import.meta.dir, "..", "..", "..", "..")

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function makeFixtureRepo(workspaces: readonly string[], dirsWithPkg: readonly string[]): string {
  const root = mkdtempSync(join(tmpdir(), "ws-paths-"))
  made.push(root)
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "fixture-root", workspaces }))
  for (const rel of dirsWithPkg) {
    const abs = join(root, rel)
    mkdirSync(abs, { recursive: true })
    writeFileSync(join(abs, "package.json"), JSON.stringify({ name: rel }))
  }
  return root
}

describe("listWorkspaceDirs", () => {
  it("returns literal entries verbatim, in declaration order", () => {
    const root = makeFixtureRepo(
      ["packages/b", "packages/a", "packages/c"],
      ["packages/b", "packages/a", "packages/c"]
    )
    expect(listWorkspaceDirs(root)).toEqual(["packages/b", "packages/a", "packages/c"])
  })

  it("returns an empty array when no workspaces field is present", () => {
    const root = mkdtempSync(join(tmpdir(), "ws-paths-"))
    made.push(root)
    writeFileSync(join(root, "package.json"), JSON.stringify({ name: "no-ws" }))
    expect(listWorkspaceDirs(root)).toEqual([])
  })

  it("expands a trailing /* glob in place, sorted, only dirs carrying package.json", () => {
    const root = makeFixtureRepo(
      ["packages/first", "packages/group/*", "packages/last"],
      [
        "packages/first",
        "packages/last",
        "packages/group/zeta",
        "packages/group/alpha",
        "packages/group/mid",
      ]
    )
    mkdirSync(join(root, "packages/group/not-a-package"), { recursive: true })
    expect(listWorkspaceDirs(root)).toEqual([
      "packages/first",
      "packages/group/alpha",
      "packages/group/mid",
      "packages/group/zeta",
      "packages/last",
    ])
  })

  it("expands a trailing /*/* glob to grandchild packages, alongside its /* sibling", () => {
    const root = makeFixtureRepo(
      ["packages/group/*", "packages/group/*/*"],
      [
        "packages/group/alpha",
        "packages/group/beta",
        "packages/group/alpha/cli",
        "packages/group/alpha/core",
      ]
    )
    mkdirSync(join(root, "packages/group/beta/not-a-package"), { recursive: true })
    expect(listWorkspaceDirs(root)).toEqual([
      "packages/group/alpha",
      "packages/group/beta",
      "packages/group/alpha/cli",
      "packages/group/alpha/core",
    ])
  })

  it("returns an empty expansion when the glob prefix dir is absent", () => {
    const root = makeFixtureRepo(["packages/missing/*"], [])
    expect(listWorkspaceDirs(root)).toEqual([])
  })

  it("throws on an unsupported glob shape (** and non-trailing *)", () => {
    expect(() => listWorkspaceDirs(makeFixtureRepo(["packages/**/deep"], []))).toThrow(
      /unsupported workspaces glob/
    )
    expect(() => listWorkspaceDirs(makeFixtureRepo(["packages/*/deep"], []))).toThrow(
      /unsupported workspaces glob/
    )
  })

  it("resolves the real repo's addon globs — drift-fixed packages now appear, no glob survives", () => {
    const dirs = listWorkspaceDirs(REPO_ROOT)
    expect(dirs.some((d) => d.includes("*"))).toBe(false)
    expect(dirs).toContain("packages/temper/shared/addon-libraries/lib-async")
    expect(dirs).toContain("packages/temper/game/collections/antiquities/capture/host")
    for (const d of dirs) {
      expect(existsSync(join(REPO_ROOT, d, "package.json"))).toBe(true)
    }
  })
})

describe("isCoveredByWorkspaceGlob", () => {
  const workspaces = ["packages/shared/a", "packages/temper/addons/*", "packages/temper/addons/*/*"]

  it("covers an immediate child of a /* glob", () => {
    expect(isCoveredByWorkspaceGlob(workspaces, "packages/temper/addons/newaddon")).toBe(true)
  })

  it("covers a grandchild of a /*/* glob", () => {
    expect(isCoveredByWorkspaceGlob(workspaces, "packages/temper/addons/characters/cli")).toBe(true)
  })

  it("does not cover a path at the wrong depth", () => {
    expect(isCoveredByWorkspaceGlob(workspaces, "packages/temper/addons/a/b/c")).toBe(false)
  })

  it("does not cover a path outside any glob prefix", () => {
    expect(isCoveredByWorkspaceGlob(workspaces, "packages/shared/b")).toBe(false)
  })

  it("is false when the array has no glob entries", () => {
    expect(isCoveredByWorkspaceGlob(["packages/a", "packages/b"], "packages/c")).toBe(false)
  })
})

describe("binNamesFromManifest", () => {
  it("returns the keys of an object bin map", () => {
    expect(
      binNamesFromManifest({ name: "@shared/cli", bin: { aw: "./a.ts", ops: "./o.ts" } })
    ).toEqual(["aw", "ops"])
  })

  it("returns the unscoped package name for a string bin", () => {
    expect(binNamesFromManifest({ name: "@shared/one-bin", bin: "src/one.ts" })).toEqual([
      "one-bin",
    ])
  })

  it("returns [] when no bin is declared", () => {
    expect(binNamesFromManifest({ name: "@shared/pure" })).toEqual([])
  })

  it("returns [] for a string bin when the package has no name to derive from", () => {
    expect(binNamesFromManifest({ bin: "./cli.ts" })).toEqual([])
  })
})

describe("findMissingBins", () => {
  it("returns the sorted bins absent from the present set", () => {
    expect(findMissingBins(["ops", "aw", "tstl"], new Set(["aw"]))).toEqual(["ops", "tstl"])
  })

  it("returns [] when every expected bin is present", () => {
    expect(findMissingBins(["ops", "aw"], new Set(["ops", "aw", "biome"]))).toEqual([])
  })

  it("de-duplicates repeated expected names", () => {
    expect(findMissingBins(["ops", "ops", "aw"], new Set(["aw"]))).toEqual(["ops"])
  })

  it("returns [] for an empty expected set", () => {
    expect(findMissingBins([], new Set(["biome"]))).toEqual([])
  })
})

describe("expectedWorkspaceBinNames", () => {
  function makeBinFixture(manifests: Record<string, unknown>): string {
    const root = mkdtempSync(join(tmpdir(), "ws-bins-"))
    made.push(root)
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({ name: "fixture-root", workspaces: Object.keys(manifests) })
    )
    for (const [rel, manifest] of Object.entries(manifests)) {
      const abs = join(root, rel)
      mkdirSync(abs, { recursive: true })
      writeFileSync(join(abs, "package.json"), JSON.stringify(manifest))
    }
    return root
  }

  it("collects bin names across workspaces, in workspace order", () => {
    const root = makeBinFixture({
      "packages/a": { name: "@x/a", bin: { ops: "./o.ts" } },
      "packages/b": { name: "@x/b", bin: "./b.ts" },
    })
    expect(expectedWorkspaceBinNames(root)).toEqual(["ops", "b"])
  })

  it("contributes nothing for a workspace that declares no bin", () => {
    const root = makeBinFixture({ "packages/pure": { name: "@x/pure" } })
    expect(expectedWorkspaceBinNames(root)).toEqual([])
  })

  it("skips a declared workspace directory that carries no package.json", () => {
    const root = mkdtempSync(join(tmpdir(), "ws-bins-"))
    made.push(root)
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({ name: "fixture-root", workspaces: ["packages/ghost"] })
    )
    expect(expectedWorkspaceBinNames(root)).toEqual([])
  })

  it("does not de-duplicate, so a name two workspaces declare is not undercounted", () => {
    const root = makeBinFixture({
      "packages/a": { name: "@x/a", bin: { ops: "./o.ts" } },
      "packages/b": { name: "@x/b", bin: { ops: "./o.ts" } },
    })
    expect(expectedWorkspaceBinNames(root)).toEqual(["ops", "ops"])
  })
})
