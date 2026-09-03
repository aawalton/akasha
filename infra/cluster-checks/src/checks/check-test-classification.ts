#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import {
  parseArgs,
  STANDARD_FLAGS,
} from "../../../../akasha/checks/cluster-checks/modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../../../akasha/checks/cluster-checks/modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../../../akasha/checks/cluster-checks/modules/retired/retired.module.code.ts"
import {
  classify,
  describeViolation,
  isViolation,
  type RepairKind,
  type RequiredTypeBasis,
  repairKind,
  type TestType,
} from "../../../../akasha/checks/cluster-checks/modules/test-classification/test-classification.module.code.ts"
import { CHECK_EXEMPT_DIRS } from "../../../../repo/scope/scope.ts"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  type Violation,
} from "../../../../tools/lib/check-workflow/violation-reporter"
import { buildFrom, readAt } from "../../../../tools/lib/graph/held-snapshot.ts"
import {
  TS_FILE_NODE_TYPES,
  tsFileNodeIdToCodeRepoRel,
} from "../../../../tools/lib/graph/producers/file/ts-file/types"

if (import.meta.main) refuseRetired()

interface TestClassificationViolation extends Violation {
  file: string
  declaredType: TestType | null
  requiredType: TestType
  basis: RequiredTypeBasis
  evidence: readonly string[]
  conflict: readonly string[]
}

const PREFIX = "[test-classification]"

async function main(): Promise<undefined> {
  const { flags } = parseArgs(
    process.argv.slice(2),
    { ...STANDARD_FLAGS, treeSha: { kind: "string", required: true } },
    { passthrough: true }
  )
  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    console.error(`${PREFIX} --repo-root ${repoRoot} does not exist`)
    process.exit(2)
  }

  let allTsFiles: readonly string[]
  try {
    const graph = await buildFrom(readAt(flags.treeSha).ctx)
    const collected: string[] = []
    for (const node of graph.nodes(TS_FILE_NODE_TYPES))
      collected.push(tsFileNodeIdToCodeRepoRel(node.id) ?? node.id)
    allTsFiles = collected
  } catch (err) {
    console.error(`${PREFIX} Failed to build ts-file graph: ${errorMessage(err)}`)
    process.exit(2)
  }

  const files: string[] = []
  for (const rel of allTsFiles) {
    if (!rel.endsWith(".test.ts") && !rel.endsWith(".test.tsx")) continue
    if (rel.split("/").some((p) => CHECK_EXEMPT_DIRS.has(p))) continue
    files.push(rel)
  }

  const { population, violations } = examineFilePopulation<TestClassificationViolation>({
    files,
    unit: "test files",
    membership: {
      kind: "enumerated",
      because:
        "`allTsFiles` is read off `graph.nodes(TS_FILE_NODE_TYPES)` on the ts-file graph " +
        "built above, and a build that throws is caught by the surrounding `try` and exits 2 " +
        "rather than leaving a partial graph, so fewer members means fewer test files on disk",
    },
    pathOf: (file) => resolve(repoRoot, file),
    scan: (file, content) => {
      const result = classify(file, content)
      if (!isViolation(result)) return []
      return [
        {
          file,
          declaredType: result.declaredType,
          requiredType: result.requiredType,
          basis: result.basis,
          evidence: result.evidence,
          conflict: result.conflict,
        },
      ]
    },
  })

  const counted = (kind: RepairKind): number =>
    violations.filter((v) => repairKind(v) === kind).length

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `${violations.length} misclassified test file(s) — ${counted("mismatch")} declared the wrong type, ${counted("unestablished")} declared a type nothing in the file establishes, ${counted("undeclared-start")} starting a process without declaring it, ${counted("contradiction")} declaring two types at once`,
      successMessage: `All ${files.length} test file(s) match their declared type.`,
      formatViolation: (v) => describeViolation(v.file, v),
    },
  })
}

main().catch((err) => {
  console.error(`${PREFIX} Unexpected error: ${errorMessage(err)}`)
  process.exit(2)
})
