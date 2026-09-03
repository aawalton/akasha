#!/usr/bin/env bun

import {
  ALANWALTON_IOS_SEAM_LABEL,
  ALANWALTON_IOS_SEAM_SCRIPT,
  alanwaltonIosSeamFiles,
  readAlanwaltonIosSeam,
} from "../../../../../infra/cluster-checks/src/lib/alanwalton-ios-seam.ts"
import { parseArgs, REPO_ROOT_FLAG } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import {
  findHealthSamplesStreamViolations,
  type HealthSamplesStreamViolation,
} from "../../../../../infra/cluster-checks/src/lib/health-samples-stream-violations.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"

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
