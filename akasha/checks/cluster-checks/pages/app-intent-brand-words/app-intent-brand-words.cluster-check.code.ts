#!/usr/bin/env bun

import {
  ALANWALTON_IOS_SEAM_SCRIPT,
  alanwaltonIosSeamFiles,
  readAlanwaltonIosSeam,
} from "../../../../../infra/cluster-checks/src/lib/alanwalton-ios-seam.ts"
import {
  type AppIntentBrandWordViolation,
  findAppIntentBrandWordViolations,
  findMissingAppIntentViolations,
} from "../../../../../infra/cluster-checks/src/lib/app-intent-brand-word-violations.ts"
import { parseArgs, REPO_ROOT_FLAG } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

function main(): undefined {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()

  const { population, violations } = examineFilePopulation<AppIntentBrandWordViolation>({
    files: alanwaltonIosSeamFiles(repoRoot),
    unit: "seam scripts",
    membership: {
      kind: "enumerated",
      because:
        "the members are the seam's own files, read off its parts directory rather than listed here, so a part added tomorrow is scanned without this check being edited; a member that will not open throws inside `scan` and lands as unexaminable rather than going missing",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, seamText) =>
      findAppIntentBrandWordViolations(seamText, { requireIntentPresent: false }).map((v) => ({
        ...v,
        file: rel,
      })),
  })

  const missing = findMissingAppIntentViolations(readAlanwaltonIosSeam(repoRoot))

  exitOnResult<AppIntentBrandWordViolation>({
    violations: [...violations, ...missing],
    options: {
      population,
      prefix: "[app-intent-brand-words]",
      header: 'App Intent metadata must not contain "apple" (Apple rejects it with ITMS-90626)',
      successMessage: `${ALANWALTON_IOS_SEAM_SCRIPT} and its sourced parts: no App Intent title, description, phrase, or shortTitle contains "apple".`,
      formatViolation: (v) =>
        v.line === 0 ? v.detail : `${v.file ?? ALANWALTON_IOS_SEAM_SCRIPT}:${v.line} — ${v.detail}`,
    },
  })
}

main()
