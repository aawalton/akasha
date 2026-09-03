#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import {
  ALLOWED_ALLOW_IMPORTING_TS_EXTENSIONS,
  ALLOWED_CYCLES,
  ALLOWED_MISSING_REFERENCES,
  ALLOWED_NON_CANONICAL_INCLUDE,
  ALLOWED_SPURIOUS_REFERENCES,
} from "../../../../../infra/cluster-checks/src/lib/check-tsconfig-allowlists.ts"
import { parseArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import {
  type TreeReading,
  treeReadingAt,
} from "../../../../../infra/cluster-checks/src/lib/tree-reading.ts"
import {
  evaluateTsconfigConventions,
  type TsconfigDrains,
  type Violation,
} from "../../../../../infra/cluster-checks/src/lib/tsconfig-conventions.ts"
import {
  cycleKey,
  findCycles,
  getReferencedPaths,
  type ImportGraphs,
} from "../../../../../infra/cluster-checks/src/lib/tsconfig-import-graph.ts"
import { rollUpPackageImportGraphs } from "../../../../../infra/cluster-checks/src/lib/tsconfig-import-graph-rollup.ts"
import {
  groupHeading,
  guidedText,
} from "../../../../../infra/cluster-checks/src/lib/tsconfig-rule-guidance.ts"
import { validateNestedPackageContainment } from "../../../../../infra/cluster-checks/src/lib/tsconfig-source-layout.ts"
import { workspaceDirsIn } from "../../../../../infra/cluster-checks/src/lib/workspace-packages.ts"
import {
  type FunctionalType,
  FunctionalTypeSchema,
} from "../../../../../tools/lib/check-workflow/functional-type"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

const PREFIX = "[tsconfig]"

const TSCONFIG_NAME = "tsconfig.json"

const MANIFEST_NAME = "package.json"

const WORKSPACE_TSCONFIGS_AT_LEAST = 200

const DRAINS: TsconfigDrains = {
  nonCanonicalInclude: ALLOWED_NON_CANONICAL_INCLUDE,
  allowImportingTsExtensions: ALLOWED_ALLOW_IMPORTING_TS_EXTENSIONS,
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null
}

function asRecord(x: unknown): Record<string, unknown> {
  return isRecord(x) ? x : {}
}

function readTsconfig(reading: TreeReading, path: string): Record<string, unknown> {
  const body = reading.read(path)
  if (body === null) throw new Error(`${path} stood in the tree and then read back as nothing`)
  const parsed = ts.parseConfigFileTextToJson(path, body)
  if (parsed.error) {
    throw new Error(
      `${path} could not be read: ${ts.flattenDiagnosticMessageText(parsed.error.messageText, " ")}`
    )
  }
  if (!isRecord(parsed.config)) throw new Error(`${path} does not hold a JSON object`)
  return parsed.config
}

function functionalTypeOf(reading: TreeReading, workspace: string): FunctionalType | null {
  const body = reading.read(`${workspace}/${MANIFEST_NAME}`)
  if (body === null) return null
  const declared = asRecord(JSON.parse(body)).functionalType
  const read = FunctionalTypeSchema.safeParse(declared)
  return read.success ? read.data : null
}

function cycleViolations(workspace: string, cycles: ReadonlySet<string>): readonly Violation[] {
  const found: Violation[] = []
  for (const cycle of cycles) {
    if (ALLOWED_CYCLES.has(cycle)) continue
    const [a, b] = cycle.split(" -> ")
    if (a === undefined || b === undefined) continue
    if (a !== workspace) continue
    found.push({
      rule: "cycle",
      workspace: a,
      message: `circular import dependency: "${a}" ↔ "${b}"`,
    })
  }
  return found
}

interface ReferenceInput {
  readonly workspace: string
  readonly tsconfig: Record<string, unknown>
  readonly graphs: ImportGraphs
  readonly cycles: ReadonlySet<string>
  readonly codeRoot: string
}

function referenceViolations(input: ReferenceInput): readonly Violation[] {
  const { workspace, tsconfig, graphs, cycles, codeRoot } = input
  if (asRecord(tsconfig.compilerOptions).composite !== true) return []

  const found: Violation[] = []
  const includedDeps = graphs.included.get(workspace) ?? new Set<string>()
  const allDeps = graphs.all.get(workspace) ?? new Set<string>()
  const referencedPaths = getReferencedPaths(workspace, tsconfig, codeRoot)

  for (const dep of includedDeps) {
    if (referencedPaths.has(dep)) continue
    const pair = cycleKey(workspace, dep)
    if (ALLOWED_CYCLES.has(pair)) continue
    if (cycles.has(pair)) continue
    if (ALLOWED_MISSING_REFERENCES.has(`${workspace} -> ${dep}`)) continue
    found.push({
      rule: "missingReference",
      workspace,
      message: `"${workspace}" imports from "${dep}" but missing tsconfig reference`,
    })
  }

  for (const ref of referencedPaths) {
    if (allDeps.has(ref)) continue
    if (ALLOWED_SPURIOUS_REFERENCES.has(`${workspace} -> ${ref}`)) continue
    if (ALLOWED_CYCLES.has(cycleKey(workspace, ref))) continue
    found.push({
      rule: "spuriousReference",
      workspace,
      message: `"${workspace}" has tsconfig reference to "${ref}" but no source imports from it`,
    })
  }

  return found
}

interface Member {
  readonly workspace: string
  readonly path: string
}

function workspaceTsconfigs(reading: TreeReading): readonly Member[] {
  const members: Member[] = []
  for (const workspace of workspaceDirsIn(reading)) {
    const path = `${workspace}/${TSCONFIG_NAME}`
    if (reading.hasFile(path)) members.push({ workspace, path })
  }
  return members
}

const MEMBERSHIP_FROM =
  "the workspace list the tracked tree states — the root " +
  "`package.json` `workspaces` field expanded against the tracked tree, kept to the " +
  "workspaces that carry a `tsconfig.json`. At 1075b25bba470c34e695e8aa1660b7268f7bc7e6 " +
  "that stood at 228 of 231 workspaces. `workspaceDirsIn` hands back an empty list rather " +
  "than raising when the root manifest is unreadable, so a run arriving under this least " +
  "count read a smaller tree than the repo holds; lower it only alongside deliberately " +
  "retiring that many workspaces"

function main(): never {
  const parsed = parseArgs(process.argv.slice(2), FLAG_SPEC, { passthrough: true })

  const root = codeRoot()

  let reading: TreeReading
  let graphs: ImportGraphs
  try {
    reading = treeReadingAt(root, parsed.flags.treeSha)
    graphs = rollUpPackageImportGraphs(reading)
  } catch (err) {
    return toolExit(`failed to read the tree at ${parsed.flags.treeSha}: ${errorMessage(err)}`)
  }

  const members = workspaceTsconfigs(reading)
  const cycles = findCycles(graphs.included)

  const nested = new Map<string, Violation[]>()
  for (const violation of validateNestedPackageContainment(members.map((m) => m.workspace))) {
    const standing = nested.get(violation.workspace) ?? []
    standing.push(violation)
    nested.set(violation.workspace, standing)
  }

  const examine = (member: Member): readonly Violation[] => {
    const tsconfig = readTsconfig(reading, member.path)
    const functionalType = functionalTypeOf(reading, member.workspace)
    const conventions =
      functionalType === null
        ? []
        : evaluateTsconfigConventions({
            workspace: member.workspace,
            tsconfig,
            functionalType,
            drains: DRAINS,
          })
    return [
      ...conventions,
      ...cycleViolations(member.workspace, cycles),
      ...referenceViolations({
        workspace: member.workspace,
        tsconfig,
        graphs,
        cycles,
        codeRoot: root,
      }),
      ...(nested.get(member.workspace) ?? []),
    ]
  }

  const { population, violations } = examinePopulation<Member, Violation>({
    members,
    unit: "workspace tsconfigs",
    labelOf: (member) => member.path,
    siteOf: (member) => resolve(root, member.path),
    examine,
    membership: {
      kind: "atLeast",
      members: WORKSPACE_TSCONFIGS_AT_LEAST,
      from: MEMBERSHIP_FROM,
    },
  })

  return exitOnResult({
    violations,
    options: {
      population,
      format: parsed.flags.json ? "json" : "human",
      prefix: PREFIX,
      header: "tsconfig convention violations",
      successMessage: `All ${population.examined.length} workspace tsconfig.json files follow conventions.`,
      groupBy: (violation) => groupHeading(violation.rule),
      formatViolation: (violation) =>
        guidedText(violation.rule, violation.workspace, violation.message),
    },
  })
}

try {
  main()
} catch (err: unknown) {
  exitOnToolError({ error: err, prefix: PREFIX })
}
