#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { z } from "zod"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { listWorkspaceDirs } from "../../../../../tools/lib/check-workflow/workspace-paths"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import { computePinViolations } from "../../modules/dep-version-policy/dep-version-policy.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PACKAGE_JSON_SCHEMA = z.record(z.string(), z.unknown())

interface DepEntry {
  workspace: string
  version: string
  depType: string
}

interface DepDeclaration {
  readonly name: string
  readonly entry: DepEntry
}

const repoRoot =
  parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
  getRepoRoot()

const DEP_TYPES = ["dependencies", "devDependencies", "optionalDependencies"] as const

const ROOT_LABEL = "(root)"

function packageJsonPath(member: string): string {
  return member === ROOT_LABEL
    ? resolve(repoRoot, "package.json")
    : resolve(repoRoot, member, "package.json")
}

function parsePackageJson(raw: string): Record<string, unknown> | undefined {
  try {
    return PACKAGE_JSON_SCHEMA.parse(JSON.parse(raw))
  } catch {
    return undefined
  }
}

function extractDeps(
  pkg: Record<string, unknown>,
  workspaceName: string
): readonly DepDeclaration[] {
  const out: DepDeclaration[] = []
  for (const depType of DEP_TYPES) {
    const deps = pkg[depType]
    if (!deps || typeof deps !== "object") continue

    for (const [name, version] of Object.entries(deps)) {
      if (typeof version !== "string") continue
      out.push({ name, entry: { workspace: workspaceName, version, depType } })
    }
  }
  return out
}

function foldDeps(
  declarations: readonly DepDeclaration[],
  map: Map<string, DepEntry[]>
): undefined {
  for (const { name, entry } of declarations) {
    const list = map.get(name) ?? []
    list.push(entry)
    map.set(name, list)
  }
}

function workspaceDirs(): readonly string[] {
  try {
    return listWorkspaceDirs(repoRoot)
  } catch (error) {
    exitOnToolError({ error, prefix: "[dep-versions]" })
  }
}

const workspaces = workspaceDirs()
const depMap = new Map<string, DepEntry[]>()

const { population, violations: declarations } = examineFilePopulation<DepDeclaration>({
  files: [ROOT_LABEL, ...workspaces.filter((ws) => existsSync(packageJsonPath(ws)))],
  unit: "package manifests",
  membership: {
    kind: "atLeast",
    members: workspaces.length + 1,
    from: "the `workspaces` list `listWorkspaceDirs` expands from the root `package.json`, plus that root manifest itself",
  },
  pathOf: packageJsonPath,
  scan: (ws, raw) => {
    const pkg = parsePackageJson(raw)
    return pkg === undefined ? [] : extractDeps(pkg, ws)
  },
})
foldDeps(declarations, depMap)

const pinViolations = computePinViolations(depMap)

interface PolicyRow extends Violation {
  package: string
  workspace: string
  version: string
  depType: string
  reason: string
}

const flatRows: PolicyRow[] = pinViolations.map((v) => ({
  ...v,
  reason: "must be exact-pinned (no caret/tilde/range)",
}))

exitOnResult({
  violations: flatRows,
  options: {
    population,
    prefix: "[dep-versions]",
    header: "Dependency version policy violations",
    successMessage: "All dependency versions satisfy policy.",
    groupBy: (r) => r.package,
    formatViolation: (r) => `${r.workspace}  ${r.version} (${r.depType}) — ${r.reason}`,
    footer: (count) => `[dep-versions] ${count} violation(s) found.`,
  },
})
