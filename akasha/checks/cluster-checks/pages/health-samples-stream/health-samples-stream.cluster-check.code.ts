#!/usr/bin/env bun

import {
  ALANWALTON_IOS_SEAM_LABEL,
  ALANWALTON_IOS_SEAM_SCRIPT,
  alanwaltonIosSeamFiles,
  readAlanwaltonIosSeam,
} from "../../modules/alanwalton-ios-seam/alanwalton-ios-seam.module.code.ts"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  findHealthSamplesStreamViolations,
  type HealthSamplesStreamViolation,
} from "../../modules/health-samples-stream-violations/health-samples-stream-violations.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

function main(): undefined {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()

  const { population, violations } = examinePopulation<string, HealthSamplesStreamViolation>({
    members: [ALANWALTON_IOS_SEAM_LABEL],
    unit: "native seams",
    membership: {
      kind: "enumerated",
      because:
        "the member is the seam itself, one of them, and the files it is written across are read off its parts directory rather than listed here — a part that will not open throws inside `examine` rather than shrinking what is judged",
    },
    labelOf: (label) => label,
    siteOf: () => `${repoRoot}/${ALANWALTON_IOS_SEAM_SCRIPT}`,
    examine: () => findHealthSamplesStreamViolations(readAlanwaltonIosSeam(repoRoot)),
  })

  const fileCount = alanwaltonIosSeamFiles(repoRoot).length

  exitOnResult<HealthSamplesStreamViolation>({
    violations,
    options: {
      population,
      prefix: "[health-samples-stream]",
      header: "The health-sample stream must not silently lose samples",
      successMessage: `${ALANWALTON_IOS_SEAM_SCRIPT} and its ${fileCount - 1} sourced parts: the anchor advances only on an acknowledged POST, no floor is persisted, the cursor-free backstop stands and is reached, and the one-shot state reset runs first.`,
      formatViolation: (v) => `${ALANWALTON_IOS_SEAM_SCRIPT} — ${v.rule}: ${v.message}`,
    },
  })
}

main()
