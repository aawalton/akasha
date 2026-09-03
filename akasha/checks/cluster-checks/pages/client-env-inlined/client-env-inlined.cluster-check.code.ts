#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { relative } from "node:path"
import { discoverRouterApps } from "../../../../../tools/lib/check-workflow/router-apps"
import {
  extractRouteModulePaths,
  isServerModulePath,
  isTestFilePath,
} from "../../../../../tools/lib/check-workflow/rr-server-module-imports"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type ClientEnvViolation,
  extractDefinedEnvKeys,
  scanClientEnvRefs,
} from "../../modules/client-env-inlined/client-env-inlined.module.code.ts"
import { findFiles } from "../../modules/file-finding/file-finding.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

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
