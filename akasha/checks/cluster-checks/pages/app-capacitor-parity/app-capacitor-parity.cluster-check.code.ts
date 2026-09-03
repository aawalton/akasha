#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"
import {
  extractRouteEntries,
  hasDefaultExport,
  type PairSource,
  type ParityViolation,
  ROLE_PAIRS,
  scanParity,
} from "../../modules/app-capacitor-parity/app-capacitor-parity.module.code.ts"
import { CAPACITOR_PARITY_DIVERGENCES } from "../../modules/app-capacitor-parity-divergences/app-capacitor-parity-divergences.module.code.ts"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[app-capacitor-parity]"

type AppBaseline = Omit<PairSource, "capText">

function loadAppBaselines(repoRoot: string): ReadonlyMap<string, AppBaseline> {
  return new Map(
    ROLE_PAIRS.map((pair): readonly [string, AppBaseline] => [
      pair.axis,
      { pair, appText: readFileSync(join(repoRoot, pair.appFile), "utf-8") },
    ])
  )
}

function serverOnlyRoutes(repoRoot: string, routesFile: string, routesText: string): Set<string> {
  const appDir = join(repoRoot, dirname(routesFile))
  const out = new Set<string>()
  for (const entry of extractRouteEntries(routesText, routesFile)) {
    const candidates = [entry.module, `${entry.module}.ts`, `${entry.module}.tsx`]
      .filter((candidate) => candidate !== "")
      .map((candidate) => join(appDir, candidate))
    const resolved = candidates.find((candidate) => existsSync(candidate))
    if (resolved === undefined) {
      throw new Error(
        `route "${entry.path}" in ${routesFile} names module "${entry.module}", which resolves to no file under ${appDir} — cannot tell whether it is a server-only resource route, so nothing is certified about it`
      )
    }
    if (!hasDefaultExport(readFileSync(resolved, "utf-8"), resolved)) out.add(entry.path)
  }
  return out
}

function main(): never {
  const { flags } = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  const repoRoot = flags.repoRoot ?? getRepoRoot()

  const baselines = loadAppBaselines(repoRoot)
  const baselineFor = (axis: string): AppBaseline => {
    const baseline = baselines.get(axis)
    if (baseline === undefined) throw new Error(`no role-pair on axis "${axis}"`)
    return baseline
  }

  const routesBaseline = baselineFor("routes")
  const exemptRoutes = serverOnlyRoutes(
    repoRoot,
    routesBaseline.pair.appFile,
    routesBaseline.appText
  )

  const { population, violations } = examineFilePopulation<ParityViolation>({
    files: ROLE_PAIRS.map((pair) => pair.axis),
    unit: "app/capacitor pairs",
    membership: {
      kind: "enumerated",
      because:
        "the members are the axes of `ROLE_PAIRS`, a `const` table spelled in this repo's source, so nothing acquires them and the array cannot arrive short of itself",
    },
    pathOf: (axis) => join(repoRoot, baselineFor(axis).pair.capacitorFile),
    scan: (axis, capText) =>
      scanParity({
        sources: [{ ...baselineFor(axis), capText }],
        manifest: CAPACITOR_PARITY_DIVERGENCES,
        serverOnlyRoutes: exemptRoutes,
      }),
  })

  exitOnResult({
    violations: [...violations],
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `app/ ↔ app-capacitor/ parity drift — ${violations.length} finding(s)`,
      successMessage: "app/ and app-capacitor/ are in declared parity.",
      formatViolation: (v) => `[${v.kind}] ${v.message}`,
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
