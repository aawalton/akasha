#!/usr/bin/env bun

import {
  ALANWALTON_IOS_SEAM_SCRIPT,
  alanwaltonIosSeamFiles,
  readAlanwaltonIosSeam,
} from "../../modules/alanwalton-ios-seam/alanwalton-ios-seam.module.code.ts"
import {
  type AppIntentBrandWordViolation,
  findAppIntentBrandWordViolations,
  findMissingAppIntentViolations,
} from "../../modules/app-intent-brand-word-violations/app-intent-brand-word-violations.module.code.ts"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

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
