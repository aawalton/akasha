#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { remediationHint } from "../../../../../tools/lib/check-workflow/remediation-doc"
import {
  extractRouteModulePaths,
  type ServerInClientViolation,
  scanFileForServerLeaks,
} from "../../../../../tools/lib/check-workflow/rr-server-module-imports"
import { discoverUnbuiltRouterApps } from "../../../../../tools/lib/check-workflow/unbuilt-router-apps"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[rr-server-module-in-client]"

const REMEDIATION_DOC = remediationHint(
  "fix: make the import type-only (`import type`), or move the server-only reach into a route module's `loader`/`action` and pass the result down, or split the value the client needs out of the `.server` module"
)

function readTextIfPresent(absPath: string): string | undefined {
  return existsSync(absPath) ? readFileSync(absPath, "utf-8") : undefined
}

interface FileContext {
  readonly appDir: string
  readonly routeModules: ReadonlySet<string>
}

function main(): never {
  const { flags } = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  const repoRoot = flags.repoRoot ?? getRepoRoot()

  const apps = discoverUnbuiltRouterApps(repoRoot)

  if (apps.length === 0) {
    exitOnToolError({
      error: new Error(
        "no React Router app is left unbuilt: every app on disk has a pre-merge `bun run build` covering it, so this gate examined nothing. Retire it, or repair the discovery, rather than reading this run as clean"
      ),
      prefix: PREFIX,
    })
  }

  const files: string[] = []
  const contextOf = new Map<string, FileContext>()
  let appCount = 0

  for (const app of apps) {
    const appDir = resolve(repoRoot, app.appDir)
    if (!existsSync(appDir)) continue
    appCount++
    const routeModules = extractRouteModulePaths(appDir, readTextIfPresent(`${appDir}/routes.ts`))
    for (const absPath of findFiles({
      cwd: appDir,
      patterns: ["**/*.ts", "**/*.tsx"],
      absolute: true,
    })) {
      files.push(absPath)
      contextOf.set(absPath, { appDir, routeModules })
    }
  }

  const { population, violations } = examineFilePopulation<ServerInClientViolation>({
    files,
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "both walks are `Bun.Glob.scanSync`, which raises ENOENT on a root that is not " +
        "there rather than returning nothing, and the one `existsSync` skip above drops " +
        "an app whose appDirectory is ABSENT — a directory with no files under it to " +
        "miss, since a config that exists and cannot be read raises out of " +
        "`discoverRouterApps` instead of resolving to a default",
    },
    scan: (absPath, text) => {
      const context = contextOf.get(absPath)
      if (context === undefined) return []
      return scanFileForServerLeaks({
        absPath,
        relPath: relative(repoRoot, absPath),
        text,
        appDir: context.appDir,
        routeModules: context.routeModules,
      })
    },
  })

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "Server-only (.server) modules referenced by client-bundled modules (would fail a production react-router build, which no CI step runs for these apps)",
      successMessage: `OK — ${population.examined.length} files across ${appCount} unbuilt React Router app(s) scanned, no server-module-in-client leaks.`,
      formatViolation: (v) =>
        `${v.file}:${v.line} value-imports "${v.specifier}" (a .server module) into the client bundle`,
      remediationDoc: REMEDIATION_DOC,
    },
  })
}

main()
