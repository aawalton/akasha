#!/usr/bin/env bun

import {
  readLeadingComment,
  type SourceFileHeader,
  scanGeneratedSuffix,
} from "../../../../../infra/cluster-checks/src/checks/check-generated-suffix.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"

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
