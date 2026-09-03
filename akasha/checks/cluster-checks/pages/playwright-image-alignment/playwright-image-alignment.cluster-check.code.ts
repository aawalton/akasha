#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  computeAlignmentViolations,
  extractLockPlaywrightCoreVersions,
  extractMcrPlaywrightVersions,
  type VersionReading,
} from "../../modules/playwright-image-alignment/playwright-image-alignment.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  type Violation,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PACKAGE_JSON_SCHEMA = z.record(z.string(), z.unknown())
const DEP_TYPES = ["dependencies", "devDependencies", "optionalDependencies"] as const

const MIRROR_SCRIPT = "infra/scripts/mirror-base-images.sh"
const LOCKFILE = "bun.lock"

type SourceKind = "package-json" | "lockfile" | "dockerfile-extensions" | "mirror-list"

interface VersionSource {
  readonly rel: string
  readonly kind: SourceKind
  readonly root: string
}

const repoRoot =
  parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
  getRepoRoot()

function versionSources(): readonly VersionSource[] {
  const sources: VersionSource[] = []
  sources.push({ rel: "package.json", kind: "package-json", root: repoRoot })
  for (const ws of listWorkspaceDirs(repoRoot)) {
    const rel = `${ws}/package.json`
    if (!existsSync(resolve(repoRoot, rel))) continue
    sources.push({ rel, kind: "package-json", root: repoRoot })
  }
  sources.push({ rel: LOCKFILE, kind: "lockfile", root: repoRoot })
  const extensionFiles = [
    ...new Bun.Glob("**/*.dockerfile-extensions.json").scanSync({
      cwd: repoRoot,
    }),
  ].filter((f) => !f.includes("node_modules/"))
  for (const file of extensionFiles.sort()) {
    sources.push({ rel: file, kind: "dockerfile-extensions", root: repoRoot })
  }
  sources.push({ rel: MIRROR_SCRIPT, kind: "mirror-list", root: ownRepoRoot() })
  return sources
}

function requiredReadings(rel: string, versions: readonly string[]): readonly VersionReading[] {
  if (versions.length === 0) return [{ source: rel, version: null }]
  return versions.map((version) => ({ source: rel, version }))
}

function readingsFrom(source: VersionSource, text: string): readonly VersionReading[] {
  switch (source.kind) {
    case "package-json": {
      const pkg = PACKAGE_JSON_SCHEMA.parse(JSON.parse(text))
      const readings: VersionReading[] = []
      for (const depType of DEP_TYPES) {
        const deps = pkg[depType]
        if (!deps || typeof deps !== "object") continue
        const spec = z
          .string()
          .optional()
          .parse(Object.entries(deps).find(([name]) => name === "playwright-core")?.[1])
        if (spec !== undefined) readings.push({ source: source.rel, version: spec })
      }
      return readings
    }
    case "lockfile":
      return requiredReadings(source.rel, extractLockPlaywrightCoreVersions(text))
    case "dockerfile-extensions":
      if (!text.includes("mcr.microsoft.com/playwright")) return []
      return requiredReadings(source.rel, extractMcrPlaywrightVersions(text))
    case "mirror-list":
      return requiredReadings(source.rel, extractMcrPlaywrightVersions(text))
    default:
      return assertNever(source.kind)
  }
}

const readings: VersionReading[] = []

const { population } = examinePopulation<VersionSource, never>({
  members: versionSources(),
  unit: "Playwright version sources",
  membership: {
    kind: "enumerated",
    because:
      "every arm of `versionSources` is every member there is rather than a sample: the root `package.json`, `LOCKFILE` and `MIRROR_SCRIPT` are constants spelled in this file, the extension files come from `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, and `listWorkspaceDirs` raises if the root `package.json` cannot be read or parsed. Each member carries the root it stands under: the mirror list stands in the instructions repo beside this check, and every other member in the code checkout",
  },
  labelOf: (source) => source.rel,
  siteOf: (source) => resolve(source.root, source.rel),
  examine: (source) => {
    readings.push(...readingsFrom(source, readFileSync(resolve(source.root, source.rel), "utf-8")))
    return []
  },
})

interface AlignmentRow extends Violation {
  source: string
  version: string | null
  reason: string
}

const rows: AlignmentRow[] = computeAlignmentViolations(readings).map((v) => ({ ...v }))

exitOnResult({
  violations: rows,
  options: {
    population,
    prefix: "[playwright-image-alignment]",
    header: "Playwright dep/image version misalignment",
    successMessage: "Playwright dep, lockfile, image tag, and mirror list agree.",
    groupBy: (r) => r.source,
    formatViolation: (r) => `${r.version ?? "(none)"} — ${r.reason}`,
    footer: (count) => `[playwright-image-alignment] ${count} violation(s) found.`,
  },
})
