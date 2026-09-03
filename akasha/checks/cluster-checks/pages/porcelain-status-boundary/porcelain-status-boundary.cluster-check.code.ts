#!/usr/bin/env bun

import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import {
  examineFilePopulation,
  examinePopulation,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import {
  type ChangeClosure,
  describeClosure,
  resolveChangeClosure,
} from "../../modules/change-closure/change-closure.module.code.ts"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type PorcelainBoundaryViolation,
  scanPorcelainStatusBoundary,
  scanPorcelainStatusBoundaryText,
} from "../../modules/porcelain-status-boundary/porcelain-status-boundary.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[porcelain-status-boundary]"

const ACT_REQUIRED: Record<PorcelainBoundaryViolation["kind"], string> = {
  "unsanctioned-flag":
    "read the status through `readPorcelainStatus` from `@akasha/git/porcelain-status-reading`, or spell the argv as `PORCELAIN_STATUS_ARGS` from `@akasha/git/porcelain-status` and parse what comes back with `parsePorcelainStatusZ`",
  "argv-without-parse":
    "hand what this read returns to `parsePorcelainStatusZ` from `@akasha/git/porcelain-status` rather than reading the columns off it, or call `readPorcelainStatus` and take its entries",
}

const BOUNDARY_PATHS = ["infra/git-porcelain/", "infra/git-cli/src/lib/porcelain-status.ts"]

const RULE_PATHS = [
  "akasha/checks/cluster-checks/modules/porcelain-status-boundary/porcelain-status-boundary.module.code.ts",
  "infra/cluster-checks/src/checks/check-porcelain-status-boundary.ts",
]

function isScannable(rel: string): boolean {
  return /\.tsx?$/.test(rel) || /\.(sh|bash)$/.test(rel)
}

function isExcluded(rel: string): boolean {
  if (rel.includes("/dist/") || rel.includes("/node_modules/")) return true
  if (rel.endsWith(".d.ts")) return true
  if (/\.(test|spec)\.tsx?$/.test(rel)) return true
  if (BOUNDARY_PATHS.some((p) => rel.startsWith(p))) return true
  if (RULE_PATHS.includes(rel)) return true
  return false
}

function selfTestFailure(): string | undefined {
  const bad = scanPorcelainStatusBoundary("t.ts", `runGit(["status", "--porcelain"], root)`)
  if (bad.length === 0) return "detector did not fire on a known-bad acquisition"
  const reintroduced = scanPorcelainStatusBoundary(
    "t.ts",
    `import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@akasha/git/porcelain-status"
     export const reparse = (s: string) => parsePorcelainStatusZ(s)
     const r = await runGit([...PORCELAIN_STATUS_ARGS], root)
     const paths = r.stdout.split("\\0").map((l) => l.slice(3))`
  )
  if (reintroduced.length === 0) return "detector did not fire on #16843's own reproduction"
  const good = scanPorcelainStatusBoundary(
    "t.ts",
    `import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@akasha/git/porcelain-status"
     const r = await runGitRaw([...PORCELAIN_STATUS_ARGS], root)
     parsePorcelainStatusZ(r.stdout)`
  )
  if (good.length > 0) return "detector fired on the sanctioned acquisition"
  return undefined
}

const CLOSURE_WIDENING_PATHS = [...RULE_PATHS, ...BOUNDARY_PATHS]

function trackedFiles(repoRoot: string): readonly string[] {
  const result = spawnSync("git", ["ls-files", "-z"], {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  if (result.status !== 0) throw new Error(`git ls-files failed in ${repoRoot}`)
  return (result.stdout ?? "").split("\0").filter((f) => f !== "")
}

function main(): never {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), STANDARD_FLAGS, { passthrough: true })
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    return exitOnToolError({
      error: new Error(`--repo-root ${repoRoot} does not exist`),
      prefix: PREFIX,
    })
  }

  const selfTest = selfTestFailure()
  if (selfTest !== undefined) {
    return exitOnToolError({
      error: new Error(`self-test failed, so a clean scan would mean nothing: ${selfTest}`),
      prefix: PREFIX,
    })
  }

  const closure: ChangeClosure = resolveChangeClosure({
    repoRoot,
    widening: CLOSURE_WIDENING_PATHS,
  })

  const inClosure = (rel: string): boolean =>
    closure.kind === "whole-tree" || closure.files.has(rel)

  const files = trackedFiles(repoRoot).filter(
    (rel) => isScannable(rel) && !isExcluded(rel) && inClosure(rel)
  )

  if (files.length === 0 && closure.kind === "changed-files") {
    const { population: closurePopulation } = examinePopulation<string, never>({
      members: [...closure.files].sort(),
      unit: "files this change touched",
      membership: {
        kind: "enumerated",
        because:
          "the members are `closure.files` itself, the `Set` `resolveChangeClosure` already built in memory — this branch is reached only on the `changed-files` arm, which exists only because a manifest was read whole",
      },
      labelOf: (rel) => rel,
      siteOf: (rel) => join(repoRoot, rel),
      examine: () => [],
    })
    return exitOnResult({
      violations: [],
      options: {
        format: flags.json ? "json" : "human",
        prefix: PREFIX,
        population: closurePopulation,
        successMessage: `No .ts/.tsx/.sh source lies in ${describeClosure(closure)}, so this change could not have introduced an unsanctioned acquisition.`,
      },
    })
  }

  const { population, violations } = examineFilePopulation<PorcelainBoundaryViolation>({
    files,
    unit: `.ts/.tsx/.sh source files in ${describeClosure(closure)}`,
    membership: {
      kind: "enumerated",
      because:
        "`trackedFiles` throws unless `git ls-files -z` exits 0, and the index it reads is complete whatever is on disk; the closure narrowing it is a `Set` already in memory, which `resolveChangeClosure` widens to whole-tree when no manifest states the change rather than returning an empty one",
    },
    pathOf: (rel) => join(repoRoot, rel),
    scan: (rel, source) =>
      /\.tsx?$/.test(rel)
        ? scanPorcelainStatusBoundary(rel, source)
        : scanPorcelainStatusBoundaryText(rel, source),
  })

  return exitOnResult({
    violations,
    options: {
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `git status machine-format acquisitions outside @akasha/git/porcelain-status — ${violations.length.toLocaleString()} finding(s) across ${new Set(violations.map((v) => v.file)).size.toLocaleString()} file(s)`,
      successMessage:
        "Every git status machine-format acquisition names PORCELAIN_STATUS_ARGS and reaches a boundary parse.",
      population,
      formatViolation: (v: PorcelainBoundaryViolation) =>
        `${v.file}:${v.line}:${v.column} — [${v.kind}] ${ACT_REQUIRED[v.kind]}\n    ${v.snippet}`,
    },
  })
}

if (import.meta.main) {
  main()
}
