#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { repoFilesAt } from "../../../../../tools/lib/repo-files-at.ts"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  findOrphanSources,
  type OrphanReport,
} from "../../modules/orphan-source/orphan-source.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[no-orphan-source]"
const SUCCESS_MESSAGE =
  "Every recognized source file under a workspace scope is owned by a workspace."

function main(): never {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(Bun.argv.slice(2), STANDARD_FLAGS, { passthrough: true })
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    exitOnToolError({ error: `--repo-root ${repoRoot} does not exist`, prefix: PREFIX })
  }

  const files = repoFilesAt(repoRoot, { includeFixtures: true, includeGenerated: true })
  const workspaceDirs = listWorkspaceDirs(repoRoot)
  const orphans = findOrphanSources({ files, workspaceDirs })

  const orphaned = new Set(orphans.map((orphan) => orphan.file))
  const { population, violations } = examinePopulation<string, OrphanReport>({
    members: files,
    unit: "git-tracked files",
    membership: {
      kind: "enumerated",
      because:
        "`repoFilesAt` throws — with git's own stderr in the message — when `git ls-files` fails, " +
        "instead of the `catch { return [] }` it used to have, so a shorter list is fewer files git " +
        "tracks rather than an enumeration that failed",
    },
    labelOf: (file) => file,
    siteOf: (file) => join(repoRoot, file),
    examine: (file) => (orphaned.has(file) ? [{ file }] : []),
  })

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "source files under a workspace scope not contained in any workspace package (add a package.json + workspaces entry, or move the file into an existing package)",
      successMessage: SUCCESS_MESSAGE,
      formatViolation: (v) => v.file,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }
}
