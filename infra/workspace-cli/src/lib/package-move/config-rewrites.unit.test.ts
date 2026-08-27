import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { codeRoot } from "../../../../../../instructions/tools/lib/code-root.ts"
import { PATH_LITERAL_TS_TARGETS, rewriteConfigs } from "./config-rewrites"
import { exists, listFiles, readText } from "./fs"
import type { Logger } from "./logger"
import type { WorkspaceMove } from "./types"

const REPO_ROOT = codeRoot()
const CHECKS_SRC = "packages/infra/checks/src"

const registry = new Set(PATH_LITERAL_TS_TARGETS)
const silent: Logger = { info: () => {}, warn: () => {} }

const quotedPackagesPath = /"\/?packages\//
const quotedTstlForkPath = /"\/?packages\/temper\/tstl/

describe("PATH_LITERAL_TS_TARGETS registry integrity", () => {
  it("resolves the repo root (sanity)", () => {
    expect(exists(REPO_ROOT, "ast-unused.config.json")).toBe(true)
    expect(exists(REPO_ROOT, CHECKS_SRC)).toBe(true)
  })

  it("every registered target exists on disk", () => {
    for (const target of PATH_LITERAL_TS_TARGETS) {
      expect(exists(REPO_ROOT, target)).toBe(true)
    }
  })

  it("every registered target still carries a workspace-path literal", () => {
    for (const target of PATH_LITERAL_TS_TARGETS) {
      expect(quotedPackagesPath.test(readText(REPO_ROOT, target))).toBe(true)
    }
  })
})

describe("path-keyed config surfaces are all covered (discovery guard)", () => {
  it("every check file with a hardcoded TSTL-fork path-prefix carveout is registered", () => {
    const uncovered = listFiles(REPO_ROOT, CHECKS_SRC)
      .filter((p) => p.endsWith(".ts") && !p.includes(".test."))
      .filter((p) => quotedTstlForkPath.test(readText(REPO_ROOT, p)))
      .filter((p) => !registry.has(p))
    expect(uncovered).toEqual([])
  })

  it("every extracted *allowlist* check file with workspace-path literals is registered", () => {
    const uncovered = listFiles(REPO_ROOT, `${CHECKS_SRC}/lib`)
      .filter((p) => /allowlist[^/]*\.ts$/.test(p) && !p.includes(".test."))
      .filter((p) => quotedPackagesPath.test(readText(REPO_ROOT, p)))
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
    mkdirSync(join(r, "packages"), { recursive: true })
    writeFileSync(join(r, "package.json"), JSON.stringify({ scripts: {} }))
    return r
  }

  const move: WorkspaceMove = {
    old: "packages/temper/tstl",
    new: "packages/temper/lua",
    oldName: "@temper/tstl",
    newName: "@temper/lua",
  }

  it("rewrites ast-unused.config.json path-keyed workspace entries", () => {
    const root = fixtureRoot()
    writeFileSync(
      join(root, "ast-unused.config.json"),
      JSON.stringify({
        ignoreWorkspaces: [],
        workspaces: { "packages/temper/tstl": { entry: [] } },
      })
    )
    rewriteConfigs(root, move, silent)
    const after = readFileSync(join(root, "ast-unused.config.json"), "utf8")
    expect(after).toContain("packages/temper/lua")
    expect(after).not.toContain("packages/temper/tstl")
  })

  it("rewrites hardcoded path-prefix literals inside a registered TS target", () => {
    const root = fixtureRoot()
    const target = PATH_LITERAL_TS_TARGETS[1] ?? ""
    mkdirSync(dirname(join(root, target)), { recursive: true })
    writeFileSync(
      join(root, target),
      'const TSTL_FORK_PREFIX = "packages/temper/tstl/"\nconst SEG = "/packages/temper/tstl/"\n'
    )
    rewriteConfigs(root, move, silent)
    const after = readFileSync(join(root, target), "utf8")
    expect(after).toContain('"packages/temper/lua/"')
    expect(after).toContain('"/packages/temper/lua/"')
    expect(after).not.toContain("packages/temper/tstl")
  })
})
