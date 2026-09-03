#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { relative } from "node:path"
import { parseArgs, STANDARD_FLAGS } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import {
  type ClientEnvViolation,
  extractDefinedEnvKeys,
  scanClientEnvRefs,
} from "../../../../../infra/cluster-checks/src/lib/client-env-inlined.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { discoverRouterApps } from "../../../../../tools/lib/check-workflow/router-apps"
import {
  extractRouteModulePaths,
  isServerModulePath,
  isTestFilePath,
} from "../../../../../tools/lib/check-workflow/rr-server-module-imports"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

const PREFIX = "[client-env-inlined]"

const DEFINE_SOURCES = [
  "akasha/supabase-rr/client-env-define/client-env-define.module.code.ts",
  "akasha/web-build-sha/build-sha/build-sha.module.code.ts",
] as const

function readTextIfPresent(absPath: string): string | undefined {
  return existsSync(absPath) ? readFileSync(absPath, "utf-8") : undefined
}

function main(): never {
  const { flags } = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  const repoRoot = flags.repoRoot ?? getRepoRoot()

  const defineSources = DEFINE_SOURCES.map((rel) => readFileSync(`${repoRoot}/${rel}`, "utf-8"))
  const allowedKeys = extractDefinedEnvKeys(defineSources)

  const apps = discoverRouterApps(repoRoot)

  const clientFiles: string[] = []
  const isRouteModuleByFile = new Map<string, boolean>()

  for (const app of apps) {
    const appDir = `${repoRoot}/${app.appDir}`
    const routeModules = extractRouteModulePaths(appDir, readTextIfPresent(`${appDir}/routes.ts`))
    const files = findFiles({ cwd: appDir, patterns: ["**/*.ts", "**/*.tsx"], absolute: true })
    for (const absPath of files) {
      if (isServerModulePath(absPath) || isTestFilePath(absPath)) continue
      clientFiles.push(absPath)
      isRouteModuleByFile.set(absPath, routeModules.has(absPath))
    }
  }

  const { population, violations } = examineFilePopulation<ClientEnvViolation>({
    files: clientFiles,
    unit: "client source files",
    membership: {
      kind: "enumerated",
      because:
        "both walks are `findFiles`, which globs through `Bun.Glob.scanSync` — that raises ENOENT on a root that is not there, so a missing repo root or a missing declared `appDirectory` stops the run rather than contributing no files to it",
    },
    scan: (absPath, text) =>
      scanClientEnvRefs({
        relPath: relative(repoRoot, absPath),
        text,
        allowedKeys,
        isRouteModule: isRouteModuleByFile.get(absPath) === true,
      }),
  })

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "Client NEXT_PUBLIC_* env reads the shipped bundle would not have inlined — a key no vite define handles, or a spelling define cannot replace",
      successMessage:
        "Every client NEXT_PUBLIC_* read is a direct process.env property access handled by a vite define.",
      formatViolation: (v) => `${v.file}:${v.line} — ${v.message}`,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    process.stderr.write(`${PREFIX} ${err instanceof Error ? err.message : String(err)}\n`)
    process.exit(2)
  }
}
