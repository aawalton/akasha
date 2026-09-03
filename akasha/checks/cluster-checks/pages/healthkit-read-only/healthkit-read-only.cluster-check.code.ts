#!/usr/bin/env bun

import { classifyExtension } from "@akasha/code-system/file-kind"
import {
  alanwaltonIosSeamFiles,
  readAlanwaltonIosSeam,
} from "../../modules/alanwalton-ios-seam/alanwalton-ios-seam.module.code.ts"
import {
  findMissingAuthorizationSite,
  type HealthKitReadOnlyViolation,
  scanHealthKitScript,
} from "../../modules/healthkit-read-only-violations/healthkit-read-only-violations.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { discoverRepoFiles } from "../../modules/repo-files/repo-files.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

function main(): undefined {
  const repoRoot = getRepoRoot()

  let authorizationSites = 0

  const seamMembers = new Set(alanwaltonIosSeamFiles(repoRoot))
  const seamText = readAlanwaltonIosSeam(repoRoot)

  const { population, violations } = examineFilePopulation<HealthKitReadOnlyViolation>({
    files: discoverRepoFiles(repoRoot).filter((rel) => classifyExtension(rel) === "sh"),
    unit: "shell scripts",
    membership: {
      kind: "enumerated",
      because:
        "the members are `discoverRepoFiles` narrowed by `classifyExtension`, and the `git ls-files` beneath it raises with git's own stderr rather than returning short — so fewer members means fewer shell scripts in the tree",
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
