#!/usr/bin/env bun

import { spawnSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { parseDockerfileExtensions } from "@akasha/dockerfiles/dockerfile-extensions"
import { SERVICES } from "@akasha/dockerfiles/dockerfile-services"
import { getOutputPath } from "@akasha/dockerfiles/dockerfile-tool-image"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[service-dockerfiles-gitignored]"

const REGISTRY_REL =
  "infrastructure/dockerfiles/dockerfile-services/dockerfile-services.module.code.ts"

interface Violation {
  service: string
  file: string
  message: string
}

export function computeExpectedDockerfilePaths(
  repoRoot: string
): readonly { service: string; path: string }[] {
  const results: { service: string; path: string }[] = []
  for (const [name, config] of Object.entries(SERVICES)) {
    const extFilename = config.extensionFile ?? "dockerfile-extensions.json"
    const extPath = join(repoRoot, config.dir, "deploy", extFilename)
    const ext = existsSync(extPath)
      ? parseDockerfileExtensions(JSON.parse(readFileSync(extPath, "utf8")))
      : {}
    const absolutePath = getOutputPath(repoRoot, config, ext)
    results.push({ service: name, path: relative(repoRoot, absolutePath) })
  }
  return results
}

function isGitignored(repoRoot: string, relativePath: string): boolean {
  const proc = spawnSync("git", ["check-ignore", "--no-index", "--", relativePath], {
    cwd: repoRoot,
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
  })
  if (proc.status === 0) return true
  if (proc.status === 1) return false
  throw new Error(
    `git check-ignore failed for ${relativePath} (exit ${proc.status}): ${proc.stderr.trim()}`
  )
}

export function trackedPaths(
  repoRoot: string,
  relativePaths: readonly string[]
): ReadonlySet<string> {
  if (relativePaths.length === 0) return new Set()
  const proc = spawnSync("git", ["ls-files", "-z", "--", ...relativePaths], {
    cwd: repoRoot,
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
  })
  if (proc.status !== 0) {
    throw new Error(`git ls-files failed (exit ${proc.status}): ${proc.stderr.trim()}`)
  }
  return new Set(proc.stdout.split("\0").filter((entry) => entry.length > 0))
}

if (import.meta.main) {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()

  let expected: readonly { service: string; path: string }[]
  try {
    expected = computeExpectedDockerfilePaths(repoRoot)
  } catch (error) {
    exitOnToolError({ error, prefix: PREFIX })
  }
  const tracked = trackedPaths(
    repoRoot,
    expected.map((entry) => entry.path)
  )
  const found = new Map<string, Violation[]>()
  const record = (violation: Violation): undefined => {
    const bucket = found.get(violation.service) ?? []
    bucket.push(violation)
    found.set(violation.service, bucket)
  }
  for (const { service, path } of expected) {
    if (tracked.has(path)) {
      record({
        service,
        file: path,
        message: `service "${service}" output path is tracked by git; it is generated, so remove it with \`git rm --cached ${path}\``,
      })
    }
    if (!isGitignored(repoRoot, path)) {
      record({
        service,
        file: path,
        message: `service "${service}" output path is not covered by .gitignore`,
      })
    }
  }
  const { population, violations } = examinePopulation<
    { service: string; path: string },
    Violation
  >({
    members: expected,
    unit: "services",
    membership: {
      kind: "atLeast",
      members: Object.keys(SERVICES).length,
      from: `the \`SERVICES\` registry in \`${REGISTRY_REL}\``,
    },
    labelOf: (entry) => entry.service,
    siteOf: (entry) => join(repoRoot, entry.path),
    examine: (entry) => found.get(entry.service) ?? [],
  })
  exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: "Service Dockerfile output paths must be untracked and gitignored",
      successMessage: "All service Dockerfile output paths are untracked and gitignored.",
    },
  })
}
