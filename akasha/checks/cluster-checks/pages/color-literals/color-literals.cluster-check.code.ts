#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import {
  type ChangeClosure,
  describeClosure,
  resolveChangeClosure,
} from "../../../../../infra/cluster-checks/src/lib/change-closure.ts"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import {
  type ColorLiteralViolation,
  scanFileForColorLiterals,
  shouldScanColorFile,
} from "../../../../../infra/cluster-checks/src/lib/color-literal-scan.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import {
  examineFilePopulation,
  examinePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-color-literals]"

const FLAG_SPEC = {
  json: { kind: "boolean" },
  repoRoot: { kind: "string" },
} as const

const CLOSURE_WIDENING_PATHS = [
  "infra/cluster-checks/src/lib/color-literal-scan.ts",
  "infra/cluster-checks/src/lib/color-literal-grants.ts",
  "infra/cluster-checks/src/checks/check-color-literals.ts",
]

function main(): never {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (error) {
    return exitOnToolError({ error, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    return exitOnToolError({
      error: new Error(`--repo-root ${repoRoot} does not exist`),
      prefix: PREFIX,
    })
  }

  const closure: ChangeClosure = resolveChangeClosure({
    repoRoot,
    widening: CLOSURE_WIDENING_PATHS,
  })
  const inClosure = (rel: string): boolean =>
    closure.kind === "whole-tree" || closure.files.has(rel)

  let examined: {
    readonly population: Population
    readonly violations: readonly ColorLiteralViolation[]
  }
  try {
    const files = findFiles({
      cwd: repoRoot,
      patterns: ["**/*.{css,ts,tsx}"],
      absolute: false,
    })
      .filter(shouldScanColorFile)
      .filter(inClosure)

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
          population: closurePopulation,
          format: flags.json ? "json" : "human",
          prefix: PREFIX,
          successMessage: `No app CSS or TS/TSX source lies in ${describeClosure(closure)}, so this change could not have written a hand-rolled color literal.`,
        },
      })
    }

    examined = examineFilePopulation<ColorLiteralViolation>({
      files,
      unit: `source files in ${describeClosure(closure)}`,
      membership: {
        kind: "enumerated",
        because:
          "`findFiles` globs the repo root with `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, so a shorter list is fewer sources on disk; the closure narrowing it is a `Set` already in memory, which `resolveChangeClosure` widens to whole-tree when no manifest states the change rather than returning an empty one",
      },
      pathOf: (rel) => join(repoRoot, rel),
      scan: scanFileForColorLiterals,
    })
  } catch (error) {
    return exitOnToolError({ error, prefix: PREFIX })
  }

  return exitOnResult<ColorLiteralViolation>({
    violations: examined.violations,
    options: {
      population: examined.population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "Hand-rolled color literals outside design-system tokens. The rule is Standardized Palette: reference a design-system token, or obtain an Alan grant and record it against the literal in COLOR_LITERAL_ALLOWLIST in infra/cluster-checks/src/lib/color-literal-grants.ts",
      successMessage: "No unexempted hand-rolled color literals.",
      formatViolation: (v) => `${v.file}:${v.line} — ${v.value}`,
    },
  })
}

main()
