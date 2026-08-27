#!/usr/bin/env bun

import { classifyExtension } from "../../../../../instructions/tools/lib/graph/producers/file/file-kind.ts"
import { repoFilesAt } from "../../../../../instructions/tools/lib/repo-files-at.ts"
import { alanwaltonIosSeamFiles, readAlanwaltonIosSeam } from "../lib/alanwalton-ios-seam.ts"
import {
  findMissingAuthorizationSite,
  type HealthKitReadOnlyViolation,
  scanHealthKitScript,
} from "../lib/healthkit-read-only-violations.ts"
import { examineFilePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

function main(): undefined {
  const repoRoot = getRepoRoot()

  let authorizationSites = 0

  const seamMembers = new Set(alanwaltonIosSeamFiles(repoRoot))
  const seamText = readAlanwaltonIosSeam(repoRoot)

  const { population, violations } = examineFilePopulation<HealthKitReadOnlyViolation>({
    files: repoFilesAt(repoRoot).filter((rel) => classifyExtension(rel) === "sh"),
    unit: "shell scripts",
    membership: {
      kind: "enumerated",
      because:
        "the members are `repoFilesAt` narrowed by `classifyExtension`, and the `git ls-files` beneath it raises with git's own stderr rather than returning short — so fewer members means fewer shell scripts in the tree",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) => {
      const scan = scanHealthKitScript(rel, source, seamMembers.has(rel) ? seamText : source)
      authorizationSites += scan.authorizationSites
      return scan.violations
    },
  })

  exitOnResult<HealthKitReadOnlyViolation>({
    violations: [...violations, ...findMissingAuthorizationSite(authorizationSites)],
    options: {
      population,
      prefix: "[healthkit-read-only]",
      header: "HealthKit access must stay read-only and stay shippable",
      successMessage:
        "every HealthKit authorization request pins toShare: [], and every script making one adds NSHealthUpdateUsageDescription to its plist.",
    },
  })
}

main()
