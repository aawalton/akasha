#!/usr/bin/env bun

import {
  readLeadingComment,
  type SourceFileHeader,
  scanGeneratedSuffix,
} from "../../modules/check-generated-suffix/check-generated-suffix.module.code.ts"
import { findFiles } from "../../modules/file-finding/file-finding.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[generated-suffix]"

function main(): never {
  const repoRoot = getRepoRoot()

  const { population, violations: inputs } = examineFilePopulation<SourceFileHeader>({
    files: findFiles({ cwd: repoRoot, patterns: ["**/*.ts", "**/*.tsx"], absolute: false }),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`findFiles` globs the repo root with `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, so a shorter list is fewer `.ts`/`.tsx` files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) => [{ file: rel, header: readLeadingComment(source) }],
  })

  const violations = scanGeneratedSuffix(inputs)

  exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header:
        "Source files whose header declares machine provenance but are not named *.generated.ts",
      successMessage: `OK — ${inputs.length} source files scanned, none mis-suffixed.`,
      formatViolation: (v) => `${v.file} — header carries "${v.marker}"; rename to *.generated.ts`,
    },
  })
}

main()
