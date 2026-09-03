#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { packageDependencyCycles } from "../../../../../infra/cluster-checks/src/lib/package-cycles.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { treeReadingAt } from "../../../../../infra/cluster-checks/src/lib/tree-reading.ts"
import {
  readWorkspacePackages,
  type WorkspacePackage,
} from "../../../../../infra/cluster-checks/src/lib/workspace-packages.ts"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-acyclic-packages]"

interface CliArgs {
  jsonOutput: boolean
  treeSha: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    return toolExit(errorMessage(err).replace(/^Unknown flag: /, "unknown argument: "))
  }
  if (parsed.positionals.length > 0) {
    return toolExit(`unknown argument: ${parsed.positionals[0]}`)
  }
  return {
    jsonOutput: parsed.flags.json,
    treeSha: parsed.flags.treeSha,
  }
}

interface PackageCycleFinding extends Violation {
  readonly kind: "PackageCycle"
  readonly size: number
  readonly nodes: readonly string[]
}

function compareFindings(a: PackageCycleFinding, b: PackageCycleFinding): number {
  if (a.size !== b.size) return a.size - b.size
  const aFirst = a.nodes[0] ?? ""
  const bFirst = b.nodes[0] ?? ""
  if (aFirst < bFirst) return -1
  if (aFirst > bFirst) return 1
  return 0
}

function formatViolation(f: PackageCycleFinding): string {
  const lines = [`cycle of size ${f.size}:`, ...f.nodes.map((node) => `    ${node}`)]
  const first = f.nodes[0]
  if (first !== undefined) lines.push(`    ${first}`)
  return lines.join("\n")
}

function main(): never {
  const args = parseArgs()

  const root = codeRoot()

  let packages: readonly WorkspacePackage[]
  try {
    packages = readWorkspacePackages(treeReadingAt(root, args.treeSha))
  } catch (err) {
    return toolExit(`failed to read the packages at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const { population } = examinePopulation({
    members: packages,
    unit: "workspace packages",
    labelOf: (one) => one.name,
    siteOf: (one) => resolve(root, one.path, "package.json"),
    examine: () => [],
    membership: {
      kind: "enumerated",
      because:
        "these are every workspace the root manifest declares at the tree sha above, read from that tree rather than from disk, and a listing or a body that could not be read throws out of `readWorkspacePackages` into the `toolExit` beside it rather than handing over a partial set",
    },
  })

  if (packages.length === 0) {
    return exitOnResult({
      violations: [],
      options: {
        population,
        format: args.jsonOutput ? "json" : "human",
        prefix: PREFIX,
      },
    })
  }

  const findings: PackageCycleFinding[] = packageDependencyCycles(packages).map((cycle) => ({
    kind: "PackageCycle",
    size: cycle.length,
    nodes: [...cycle],
  }))
  findings.sort(compareFindings)

  return exitOnResult({
    violations: findings,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Cycles in the workspace package dependency graph",
      successMessage: `OK — ${packages.length} package(s) analyzed, zero cycles`,
      formatViolation,
    },
  })
}

try {
  main()
} catch (err: unknown) {
  exitOnToolError({ error: err, prefix: PREFIX })
}
