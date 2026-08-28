import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { listWorkspaceDirs } from "@shared/workspace-paths"
import { codeRoot } from "../../../../../tools/lib/code-root.ts"
import { PATH_LITERAL_TS_TARGETS, rewriteConfigs } from "./config-rewrites.ts"
import { exists, listFiles, readText } from "./fs.ts"
import type { Logger } from "./logger.ts"
import type { WorkspaceMove } from "./types.ts"

const REPO_ROOT = codeRoot()
const CHECKS_SRC = "infra/cluster-checks/src"

const registry = new Set(PATH_LITERAL_TS_TARGETS)
const silent: Logger = { info: () => {}, warn: () => {} }

const WORKSPACE_PATHS = new Set<string>()
for (const dir of listWorkspaceDirs(REPO_ROOT)) {
  const segments = dir.split("/")
  for (let i = 1; i <= segments.length; i += 1) {
    WORKSPACE_PATHS.add(segments.slice(0, i).join("/"))
  }
}

const QUOTED_STRING = /"([^"\n]*)"|'([^'\n]*)'/g

function carriesWorkspacePathLiteral(source: string): boolean {
  for (const match of source.matchAll(QUOTED_STRING)) {
    for (const candidate of (match[1] ?? match[2] ?? "").split(/[^A-Za-z0-9._@/-]+/)) {
      const path = candidate.replace(/^\/+/, "").replace(/\/+$/, "")
      if (path !== "" && WORKSPACE_PATHS.has(path)) return true
    }
  }
  return false
}

const quotedForkPath = /["']\/?lua-compiler\//

describe("PATH_LITERAL_TS_TARGETS registry integrity", () => {
  it("resolves the repo root (sanity)", () => {
    expect(exists(REPO_ROOT, "tools/lib/code-audit-ast-unused/ast-unused.config.json")).toBe(true)
    expect(exists(REPO_ROOT, CHECKS_SRC)).toBe(true)
  })

  it("every registered target exists on disk", () => {
    for (const target of PATH_LITERAL_TS_TARGETS) {
      expect(exists(REPO_ROOT, target)).toBe(true)
    }
  })

  it("every registered target still carries a workspace-path literal", () => {
    for (const target of PATH_LITERAL_TS_TARGETS) {
      expect(carriesWorkspacePathLiteral(readText(REPO_ROOT, target))).toBe(true)
    }
  })
})

describe("path-keyed config surfaces are all covered (discovery guard)", () => {
  it("every check file with a hardcoded lua-compiler-fork path-prefix carveout is registered", () => {
    const uncovered = listFiles(REPO_ROOT, CHECKS_SRC)
      .filter((p) => p.endsWith(".ts") && !p.includes(".test."))
      .filter((p) => quotedForkPath.test(readText(REPO_ROOT, p)))
      .filter((p) => !registry.has(p))
    expect(uncovered).toEqual([])
  })

  it("every extracted *allowlist* check file with workspace-path literals is registered", () => {
    const uncovered = listFiles(REPO_ROOT, `${CHECKS_SRC}/lib`)
      .filter((p) => /allowlist[^/]*\.ts$/.test(p) && !p.includes(".test."))
      .filter((p) => carriesWorkspacePathLiteral(readText(REPO_ROOT, p)))
      .filter((p) => !registry.has(p))
    expect(uncovered).toEqual([])
  })
})

describe("rewriteConfigs repaths path-keyed surfaces end-to-end", () => {
  const roots: string[] = []
  afterAll(() => {
    for (const r of roots) rmSync(r, { recursive: true, force: true })
  })

  function fixtureRoot(): string {
    const r = mkdtempSync(join(tmpdir(), "config-rewrites-"))
    roots.push(r)
    writeFileSync(join(r, "package.json"), JSON.stringify({ scripts: {} }))
    return r
  }

  const move: WorkspaceMove = {
    old: "lua-compiler/vendor/tstl",
    new: "lua-compiler/vendor/lua",
    oldName: "@lua-compiler/vendor-tstl",
    newName: "@lua-compiler/vendor-lua",
  }

  it("rewrites ast-unused.config.json path-keyed workspace entries", () => {
    const root = fixtureRoot()
    writeFileSync(
      join(root, "ast-unused.config.json"),
      JSON.stringify({
        ignoreWorkspaces: [],
        workspaces: { "lua-compiler/vendor/tstl": { entry: [] } },
      })
    )
    rewriteConfigs(root, move, silent)
    const after = readFileSync(join(root, "ast-unused.config.json"), "utf8")
    expect(after).toContain("lua-compiler/vendor/lua")
    expect(after).not.toContain("lua-compiler/vendor/tstl")
  })

  it("rewrites hardcoded path-prefix literals inside a registered TS target", () => {
    const root = fixtureRoot()
    const target = PATH_LITERAL_TS_TARGETS[1] ?? ""
    mkdirSync(dirname(join(root, target)), { recursive: true })
    writeFileSync(
      join(root, target),
      'const FORK_PREFIX = "lua-compiler/vendor/tstl/"\nconst SEG = "/lua-compiler/vendor/tstl/"\n'
    )
    rewriteConfigs(root, move, silent)
    const after = readFileSync(join(root, target), "utf8")
    expect(after).toContain('"lua-compiler/vendor/lua/"')
    expect(after).toContain('"/lua-compiler/vendor/lua/"')
    expect(after).not.toContain("lua-compiler/vendor/tstl")
  })

  it("rewrites a yaml file inside a workspace package", () => {
    const root = fixtureRoot()
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({ workspaces: ["lua-compiler/vendor/*"] })
    )
    mkdirSync(join(root, "lua-compiler/vendor/lua"), { recursive: true })
    writeFileSync(
      join(root, "lua-compiler/vendor/lua/package.json"),
      JSON.stringify({ name: "@lua-compiler/vendor-lua" })
    )
    writeFileSync(
      join(root, "lua-compiler/vendor/lua/deploy.yaml"),
      "source: lua-compiler/vendor/tstl/src\n"
    )
    rewriteConfigs(root, move, silent)
    const after = readFileSync(join(root, "lua-compiler/vendor/lua/deploy.yaml"), "utf8")
    expect(after).toBe("source: lua-compiler/vendor/lua/src\n")
  })
})
