#!/usr/bin/env bun

import { execFileSync } from "node:child_process"
import {
  type BinModeViolation,
  type BinTargetPath,
  extractBinTargets,
  findBinModeViolations,
  parseManifest,
} from "../../../../../infra/cluster-checks/src/lib/bin-mode-violations.ts"
import { parseArgs, REPO_ROOT_FLAG } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

function listWorkspacePackageJsons(repoRoot: string): readonly string[] {
  const stdout = execFileSync("git", ["ls-files", "--", "**/package.json", "package.json"], {
    cwd: repoRoot,
    encoding: "utf8",
  })
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.includes("/node_modules/"))
    .sort()
}

function gitModeLookup(
  repoRoot: string,
  paths: readonly string[]
): (target: string) => string | undefined {
  if (paths.length === 0) return () => undefined
  const stdout = execFileSync("git", ["ls-files", "--stage", "--", ...paths], {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  const byPath = new Map<string, string>()
  for (const line of stdout.split("\n")) {
    if (line === "") continue
    const tabIndex = line.indexOf("\t")
    if (tabIndex === -1) continue
    const header = line.slice(0, tabIndex)
    const path = line.slice(tabIndex + 1)
    const mode = header.split(" ")[0]
    if (mode !== undefined && mode !== "") byPath.set(path, mode)
  }
  return (target) => byPath.get(target)
}

function main(): undefined {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()
  const pkgJsonPaths = listWorkspacePackageJsons(repoRoot)

  const { population, violations: allEntries } = examineFilePopulation<BinTargetPath>({
    files: pkgJsonPaths,
    unit: "package.json files",
    membership: {
      kind: "enumerated",
      because:
        "`listWorkspacePackageJsons` is `git ls-files` through `execFileSync`, which throws on a non-zero status rather than returning a short list, so fewer manifests means fewer manifests in the index",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, raw) => extractBinTargets(parseManifest(raw), rel),
  })

  const modeOf = gitModeLookup(
    repoRoot,
    allEntries.map((e) => e.target)
  )
  const violations = findBinModeViolations(allEntries, modeOf)

  exitOnResult<BinModeViolation>({
    violations,
    options: {
      population,
      prefix: "[bin-mode]",
      header: "Workspace `bin` targets must be committed at mode 100755",
      successMessage: "All workspace `bin` targets are mode 100755 in git.",
      groupBy: (v) => v.pkgJsonPath,
      formatViolation: (v) =>
        `${v.command} → ${v.target} (actual: ${v.actualMode}; expected: 100755) — run \`chmod 0755 ${v.target}\` and commit so bun's install-time chmod stops producing drift`,
    },
  })
}

main()
