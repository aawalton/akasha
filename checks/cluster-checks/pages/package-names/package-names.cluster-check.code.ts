#!/usr/bin/env bun

import { resolve } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PACKAGE_JSON_SCHEMA = z.record(z.string(), z.unknown())

const PREFIX = "[package-names]"

export function expectedPackageName(workspacePath: string): string {
  const segs = workspacePath.split("/").filter((s) => s !== "")
  if (segs.length < 2)
    throw new Error(`workspace path must have at least scope + one segment: ${workspacePath}`)
  const [scope, ...rest] = segs
  return `@${scope}/${rest.join("-")}`
}

function parsePackageJson(source: string): Record<string, unknown> {
  return PACKAGE_JSON_SCHEMA.parse(JSON.parse(source))
}

if (import.meta.main) {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()
  const { population, violations } = examineFilePopulation<{ file: string; message: string }>({
    files: listWorkspaceDirs(repoRoot),
    unit: "packages",
    membership: {
      kind: "enumerated",
      because:
        "`listWorkspaceDirs` raises if the root `package.json` cannot be read or parsed, and every literal `workspaces` entry passes through whether or not its directory is there — so a workspace missing from disk arrives as a member whose `package.json` read fails below, not as one that never arrived",
    },
    pathOf: (ws) => resolve(repoRoot, ws, "package.json"),
    scan: (ws, source) => {
      const want = expectedPackageName(ws)
      const pkg = parsePackageJson(source)
      const name = typeof pkg.name === "string" ? pkg.name : undefined
      return name === want ? [] : [{ file: ws, message: `name=${name} expected=${want}` }]
    },
  })
  exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header:
        "Workspace package names must match the path-derived value — clear each by renaming the package to the expected name, or by moving it to a path that derives the name it has",
      successMessage: "All workspace package names match their path.",
    },
  })
}
