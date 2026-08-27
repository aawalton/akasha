#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { z } from "zod"
import { listWorkspaceDirs } from "../../../../tools/lib/check-workflow/workspace-paths.ts"
import {
  type CoverageConfig,
  OUT_OF_SCOPE_PREDICATES,
  reconcileCoverage,
} from "../lib/ast-unused-coverage"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[ast-unused-coverage]"
const CONFIG_FILE = "ast-unused.config.json"

const CONFIG_SCHEMA = z
  .object({
    workspaces: z.record(z.string(), z.unknown()).optional(),
    outOfScope: z.record(z.string(), z.enum(OUT_OF_SCOPE_PREDICATES)).optional(),
    pendingCuration: z.array(z.string()).optional(),
  })
  .passthrough()

const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".git", ".next", "generated"])

function countTypescriptFiles(absDir: string): number {
  let total = 0
  const walk = (dir: string): undefined => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name))
        continue
      }
      if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) total++
    }
  }
  walk(absDir)
  return total
}

function main(): never {
  let parsed: ReturnType<typeof parseArgs<typeof STANDARD_FLAGS>>
  try {
    parsed = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot()
  const configPath = resolve(repoRoot, CONFIG_FILE)
  if (!existsSync(configPath)) {
    return exitOnToolError({
      error: new Error(`config not found: ${configPath}`),
      prefix: PREFIX,
    })
  }

  let config: CoverageConfig
  try {
    const raw = CONFIG_SCHEMA.parse(JSON.parse(readFileSync(configPath, "utf-8")))
    config = {
      analysed: Object.keys(raw.workspaces ?? {}),
      outOfScope: new Map(Object.entries(raw.outOfScope ?? {})),
      pendingCuration: raw.pendingCuration ?? [],
    }
  } catch (err) {
    return exitOnToolError({
      error: new Error(`${CONFIG_FILE}: ${errorMessage(err)}`),
      prefix: PREFIX,
    })
  }

  const declared = listWorkspaceDirs(repoRoot)

  const typescriptFileCounts = new Map<string, number>()
  const { population } = examinePopulation({
    members: declared,
    unit: "workspaces",
    membership: {
      kind: "enumerated",
      because:
        "`declared` is `listWorkspaceDirs`, which throws when the root `package.json` is missing or unparseable, so fewer workspaces means fewer workspaces declared there",
    },
    labelOf: (workspace) => workspace,
    siteOf: (workspace) => resolve(repoRoot, workspace),
    examine: (workspace) => {
      const absDir = resolve(repoRoot, workspace)
      if (config.outOfScope.has(workspace) && existsSync(absDir)) {
        typescriptFileCounts.set(workspace, countTypescriptFiles(absDir))
      }
      return []
    },
  })

  const { violations, tally } = reconcileCoverage({
    declared,
    config,
    dirExists: (relPath) => existsSync(resolve(repoRoot, relPath)),
    typescriptFileCount: (relPath) => typescriptFileCounts.get(relPath) ?? 0,
  })

  return exitOnResult({
    violations,
    options: {
      population,
      format: parsed.flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `Workspace coverage violations in ${CONFIG_FILE}`,
      successMessage: `${tally.declared} declared workspace(s) all accounted for — ${tally.analysed} analysed, ${tally.outOfScope} out of scope, ${tally.pendingCuration} pending curation.`,
      formatViolation: (v) => (v.file != null ? `${v.file} — ${v.message}` : v.message),
      footer: (count) => `${PREFIX} ${count} violation(s) found`,
    },
  })
}

main()
