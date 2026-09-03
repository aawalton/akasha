#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import {
  type EnvUnsetBashViolation,
  scanEnvUnsetBash,
} from "../../modules/env-unset-bash/env-unset-bash.module.code.ts"
import { findFiles } from "../../modules/file-finding/file-finding.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const SCAN_GLOBS = ["**/*.ts", "**/*.tsx", "**/*.sh", "**/*.bash"]

function readsBashStartupFile(repoRoot: string, relPath: string, scriptRef: string): boolean {
  const candidates = [
    resolve(repoRoot, dirname(relPath), scriptRef),
    resolve(repoRoot, scriptRef.replace(/^\.\//, "")),
  ]
  const found = candidates.find((path) => existsSync(path))
  if (found === undefined) return true
  const firstLine = readFileSync(found, "utf8").split("\n", 1)[0] ?? ""
  if (!firstLine.startsWith("#!")) return true
  return /\bbash\b/.test(firstLine)
}

function main(): never {
  const repoRoot = getRepoRoot()
  const { population, violations } = examineFilePopulation<EnvUnsetBashViolation>({
    files: findFiles({ cwd: repoRoot, patterns: SCAN_GLOBS, absolute: false }),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`findFiles` globs the repo root with `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, so a shorter list is fewer executed-source files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) =>
      scanEnvUnsetBash(source, rel, {
        readsBashStartupFile: (scriptRef) => readsBashStartupFile(repoRoot, rel, scriptRef),
      }),
  })
  exitOnResult({
    violations,
    options: {
      population,
      prefix: "[env-unset-bash]",
      header:
        "`env -u`-style credential deprivation is silently undone by the BASH_ENV auto-source of ~/.secrets.env (the unset var is restored before the subprocess runs) — use `env -u VAR BASH_ENV= bash -c '...'`",
      successMessage:
        "No `env -u` invocation deprives a variable without neutralizing the BASH_ENV re-source.",
      groupBy: (v) => v.file,
      formatViolation: (v) => `line ${v.line}: ${v.message}`,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    console.error("[env-unset-bash] Unexpected error:", err)
    process.exit(2)
  }
}
