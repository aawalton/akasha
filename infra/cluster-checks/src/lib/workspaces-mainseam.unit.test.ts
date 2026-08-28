import { afterAll, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { listWorkspaceDirs } from "../../../../tools/lib/check-workflow/workspace-paths"
import { renderBound } from "../../../../tools/lib/check-workflow/population-bound"
import { computeExitCode } from "../../../../tools/lib/check-workflow/violation-reporter"
import { type SeamFn, validateWorkspacesAgainstSeam } from "./workspaces-mainseam.ts"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function makeFixtureRepo(workspaces: readonly string[], dirsWithPkg: readonly string[]): string {
  const root = mkdtempSync(join(tmpdir(), "mainseam-test-"))
  made.push(root)
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "fixture-root", workspaces }))
  for (const rel of dirsWithPkg) {
    const abs = join(root, rel)
    mkdirSync(abs, { recursive: true })
    writeFileSync(join(abs, "package.json"), JSON.stringify({ name: rel }))
  }
  return root
}

describe("validateWorkspacesAgainstSeam", () => {
  it("passes (no violations) on all-literal workspaces", () => {
    const root = makeFixtureRepo(
      ["packages/a", "packages/b", "packages/c"],
      ["packages/a", "packages/b", "packages/c"]
    )
    expect(validateWorkspacesAgainstSeam(listWorkspaceDirs, root).violations).toEqual([])
  })

  it("passes on a valid trailing /* glob entry", () => {
    const root = makeFixtureRepo(
      ["packages/first", "packages/group/*", "packages/last"],
      ["packages/first", "packages/last", "packages/group/alpha", "packages/group/zeta"]
    )
    expect(validateWorkspacesAgainstSeam(listWorkspaceDirs, root).violations).toEqual([])
  })

  it("passes on the once-wedging packages/temper/addons/*/* shape now that the seam parses trailing /*/*", () => {
    const root = makeFixtureRepo(["packages/temper/addons/*/*"], [])
    expect(validateWorkspacesAgainstSeam(listWorkspaceDirs, root).violations).toEqual([])
  })

  it("fails on a ** glob shape the seam cannot parse", () => {
    const root = makeFixtureRepo(["packages/**/deep"], [])
    const { violations } = validateWorkspacesAgainstSeam(listWorkspaceDirs, root)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.message).toContain("packages/**/deep")
  })

  it("fails on a mid-position * glob shape the seam cannot parse", () => {
    const root = makeFixtureRepo(["packages/*/cli"], [])
    const { violations } = validateWorkspacesAgainstSeam(listWorkspaceDirs, root)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.message).toContain("packages/*/cli")
  })

  it("declares the entries the manifest carries, not the directories they expand to", () => {
    const root = makeFixtureRepo(
      ["packages/first", "packages/group/*", "packages/last"],
      ["packages/first", "packages/last", "packages/group/alpha", "packages/group/zeta"]
    )
    const { population } = validateWorkspacesAgainstSeam(listWorkspaceDirs, root)
    expect(listWorkspaceDirs(root)).toHaveLength(4)
    expect(population.examined).toEqual(["packages/first", "packages/group/*", "packages/last"])
    expect(renderBound(population)).toContain("over 3 of 3 workspace entries")
    expect(computeExitCode({ violationCount: 0, population })).toBe(0)
  })

  it("states the population on the refusing path as well as the passing one", () => {
    const root = makeFixtureRepo(["packages/a", "packages/**/deep"], ["packages/a"])
    const { population, violations } = validateWorkspacesAgainstSeam(listWorkspaceDirs, root)
    expect(violations).toHaveLength(1)
    expect(renderBound(population)).toContain("over 2 of 2 workspace entries")
    expect(computeExitCode({ violationCount: violations.length, population })).toBe(1)
  })

  it("judges the entries after a refusal instead of counting them behind it", () => {
    const root = makeFixtureRepo(["packages/**", "packages/a", "packages/*/cli"], ["packages/a"])
    const { population, violations } = validateWorkspacesAgainstSeam(listWorkspaceDirs, root)
    expect(violations).toHaveLength(2)
    expect(violations[0]?.message).toContain("packages/**")
    expect(violations[1]?.message).toContain("packages/*/cli")
    expect(population.examined).toEqual(["packages/**", "packages/a", "packages/*/cli"])
    expect(renderBound(population)).toContain("over 3 of 3 workspace entries")
    expect(computeExitCode({ violationCount: violations.length, population })).toBe(1)
  })

  it("puts each entry to the seam over a root that expands as the real tree does", () => {
    const root = makeFixtureRepo(
      ["packages/group/*"],
      ["packages/group/alpha", "packages/group/zeta"]
    )
    const expansions: string[][] = []
    const seam: SeamFn = (probeRoot) => {
      const dirs = listWorkspaceDirs(probeRoot)
      expansions.push([...dirs])
      return dirs
    }
    const { violations } = validateWorkspacesAgainstSeam(seam, root)
    expect(violations).toEqual([])
    expect(expansions).toEqual([["packages/group/alpha", "packages/group/zeta"]])
  })

  it("leaves the tree it stood in for intact", () => {
    const root = makeFixtureRepo(["packages/group/*"], ["packages/group/alpha"])
    validateWorkspacesAgainstSeam(listWorkspaceDirs, root)
    expect(existsSync(join(root, "packages/group/alpha/package.json"))).toBe(true)
  })

  it("reports an empty population, certifying nothing, when no workspaces field is present", () => {
    const root = mkdtempSync(join(tmpdir(), "mainseam-test-"))
    made.push(root)
    writeFileSync(join(root, "package.json"), JSON.stringify({ name: "no-ws" }))
    const { population, violations } = validateWorkspacesAgainstSeam(listWorkspaceDirs, root)
    expect(violations).toEqual([])
    expect(population.examined).toEqual([])
    expect(renderBound(population)).toContain("EMPTY POPULATION — 0 workspace entries")
    expect(computeExitCode({ violationCount: 0, population })).toBe(2)
  })
})
