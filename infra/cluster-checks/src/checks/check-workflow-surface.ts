#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { parseArgs } from "../../../../akasha/checks/cluster-checks/modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../../../akasha/checks/cluster-checks/modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../../../akasha/checks/cluster-checks/modules/retired/retired.module.code.ts"
import { examinePopulation, type Population } from "../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../tools/lib/check-workflow/violation-reporter"
import { buildWorkflowSurface, scannedFilePaths } from "../lib/workflow-surface/build"
import { DEFAULT_CACHE_DIR, surfacePath, writeCachedSurface } from "../lib/workflow-surface/write"

if (import.meta.main) refuseRetired()

const PREFIX = "[workflow-surface]"

async function scannedFiles(repoRoot: string): Promise<Population> {
  const files = await scannedFilePaths(repoRoot)
  const { population } = examinePopulation<string, never>({
    members: files,
    unit: "workflow source files",
    labelOf: (path) => path,
    siteOf: (path) => `${repoRoot}/${path}`,
    examine: () => [],
    membership: {
      kind: "enumerated",
      because:
        "`workflowPages` answers a page query for the `workflow-template` page type and throws where that type names no file pages, so a tree it cannot read raises rather than answering an empty list, and the members are every page that query returned",
    },
  })
  return population
}

function done(population: Population, successMessage: string): never {
  return exitOnResult<never>({
    violations: [],
    options: {
      population,
      prefix: PREFIX,
      header: "the workflow surface could not be put in place for this tree",
      successMessage,
      formatViolation: () => "",
    },
  })
}

async function main(): Promise<never> {
  const { flags } = parseArgs(process.argv.slice(2), {
    treeSha: { kind: "string", required: true },
    cacheDir: { kind: "string", default: DEFAULT_CACHE_DIR },
    repoRoot: { kind: "string" },
  })

  const treeSha = flags.treeSha
  const cacheDir = flags.cacheDir
  const repoRoot = flags.repoRoot ?? getRepoRoot()
  const population = await scannedFiles(repoRoot)

  if (!/^[0-9a-f]{40}$/.test(treeSha)) {
    return done(
      population,
      `--tree-sha is not a 40-hex string (got: ${treeSha}); no cache key is possible, so nothing was written and every reader will build its own surface.`
    )
  }

  const finalPath = surfacePath(cacheDir, treeSha)
  if (existsSync(finalPath)) {
    return done(population, `cache hit: ${finalPath} already holds this tree's surface.`)
  }

  process.stdout.write(`${PREFIX} cache miss: acquiring the workflow surface for ${treeSha}\n`)
  const surface = await buildWorkflowSurface(repoRoot)
  writeCachedSurface({ cacheDir, treeSha, surface })
  const steps = surface.workflows.reduce((n, workflow) => n + workflow.steps.length, 0)
  return done(
    population,
    `wrote ${finalPath} over ${surface.workflows.length} loaded workflow(s) and ${steps} step(s).`
  )
}

try {
  await main()
} catch (err) {
  console.error(`${PREFIX} ${errorMessage(err)}`)
  process.exit(1)
}
