#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { repoFilesAt } from "../../../../tools/lib/repo-files-at.ts"
import { listWorkspaceDirs } from "../../../../tools/lib/check-workflow/workspace-paths"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { findOrphanSources, type OrphanReport } from "../lib/orphan-source.ts"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[no-orphan-source]"
const SUCCESS_MESSAGE = "Every recognized source file under packages/ is owned by a workspace."

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
        "source files under packages/ not contained in any workspace package (add a package.json + workspaces entry, or move the file into an existing package)",
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
