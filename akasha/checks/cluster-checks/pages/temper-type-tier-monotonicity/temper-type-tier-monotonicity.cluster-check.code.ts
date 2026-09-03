#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import {
  PACKAGE_NODE_TYPE,
  type PackageAttrs,
  PackageAttrsSchema,
  PKG_DEPENDS_EDGE_TYPE,
  type PkgDependsAttrs,
  PkgDependsAttrsSchema,
  packageNodeIdToWorkspaceName,
} from "../../../../../tools/lib/graph/producers/package/types.ts"
import type { Graph, Node } from "../../../../../tools/lib/graph/types.ts"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type Finding,
  judgeLayerMonotonicity,
  type PackageEdge,
  type WorkspaceEntry,
} from "../../modules/layer-monotonicity/layer-monotonicity.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { repoDoc } from "../../modules/remediation-doc/remediation-doc.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  isCompositionRoot,
  TEMPER_TIERS,
  TIER_RANK_BY_TIER,
  tierForWorkspacePath,
} from "../../modules/temper-type-tier/temper-type-tier.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-temper-type-tier-monotonicity]"

const REMEDIATION = repoDoc(
  "akasha/checks/cluster-checks/modules/temper-type-tier/temper-type-tier.module.code.ts"
)

const TIER_HOMED_LEAST_COUNT = 120

const TIER_HOMED_FROM =
  "the temper tier layout: every workspace standing directly under `temper/` whose name begins " +
  "`shared-`, `game-` or `player-` is tier-homed, and those three prefixes held 145 workspaces " +
  "(62 shared, 72 game, 11 player) when this least count was set"

const tierDirsWhereRank = (accept: (rank: number) => boolean): string =>
  TEMPER_TIERS.filter((tier) => accept(TIER_RANK_BY_TIER[tier]))
    .map((tier) => `temper/${tier}-`)
    .join(" or ")

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

function stripPackagePrefix(id: string): string {
  return packageNodeIdToWorkspaceName(id) ?? id
}

const parsePackageNode = (n: Node): Node<"package", PackageAttrs> => ({
  ...n,
  type: PACKAGE_NODE_TYPE,
  attrs: PackageAttrsSchema.parse(n.attrs),
})

function readGraph(graph: Graph): {
  workspaces: readonly WorkspaceEntry[]
  typeByPath: Map<string, string>
  edges: readonly PackageEdge[]
} {
  const workspaces: WorkspaceEntry[] = graph
    .nodes(PACKAGE_NODE_TYPE)
    .map(parsePackageNode)
    .map((n) => ({ name: n.attrs.name, path: n.attrs.path }))

  const typeByPath = new Map<string, string>()
  for (const ws of workspaces) {
    const tier = tierForWorkspacePath(ws.path)
    if (tier !== null) typeByPath.set(ws.path, tier)
  }

  const edges: PackageEdge[] = graph.edges({ type: [PKG_DEPENDS_EDGE_TYPE] }).map((e) => {
    const attrs: PkgDependsAttrs = PkgDependsAttrsSchema.parse(e.attrs)
    return {
      source: stripPackagePrefix(e.from),
      target: stripPackagePrefix(e.to),
      kind: attrs.kind,
    }
  })

  return { workspaces, typeByPath, edges }
}

async function main(): Promise<never> {
  const args = parseArgs()

  let fullGraph: Graph
  try {
    fullGraph = await buildFrom(readAt(args.treeSha).ctx)
  } catch (err) {
    return toolExit(`failed to build the package graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const root = codeRoot()
  const { workspaces, typeByPath, edges } = readGraph(fullGraph)

  const rankByType = new Map<string, number>(Object.entries(TIER_RANK_BY_TIER))

  const { findings, judgedEdges } = judgeLayerMonotonicity({
    workspaces,
    typeByPath,
    rankByType,
    edges,
  })

  const exemptRoots = workspaces.filter((ws) => isCompositionRoot(ws.path)).length

  const tierHomed = workspaces.filter((ws) => typeByPath.has(ws.path))
  const findingsByImporter = new Map<string, Finding[]>()
  for (const f of findings) {
    const forImporter = findingsByImporter.get(f.importer.name) ?? []
    forImporter.push(f)
    findingsByImporter.set(f.importer.name, forImporter)
  }

  const { population } = examinePopulation<WorkspaceEntry, Finding>({
    members: tierHomed,
    unit: "tier-homed temper workspaces",
    labelOf: (ws) => ws.name,
    siteOf: (ws) => resolve(root, ws.path, "package.json"),
    examine: (ws) => findingsByImporter.get(ws.name) ?? [],
    membership: {
      kind: "atLeast",
      members: TIER_HOMED_LEAST_COUNT,
      from: TIER_HOMED_FROM,
    },
  })

  return exitOnResult<Finding & Violation>({
    violations: findings,
    options: {
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header:
        "Temper type-tier rank inversion(s) (uphill import — imports must flow downhill player → game → shared)",
      successMessage: `OK — ${workspaces.length} workspace(s) in the graph, ${typeByPath.size} type-homed and analyzed, ${exemptRoots} composition-root(s) exempt, ${judgedEdges.length} of ${edges.length} package dependency edge(s) tier-judgeable, zero tier inversions`,
      population,
      remediationDoc: REMEDIATION,
      formatViolation: (f) =>
        `${f.importer.name} (tier=${f.importer.functionalType}, rank=${f.importer.rank}) → ` +
        `${f.importee.name} (tier=${f.importee.functionalType}, rank=${f.importee.rank}) — ` +
        `re-home ${f.importer.name} under ${tierDirsWhereRank((r) => r >= f.importee.rank)}, ` +
        `or re-home ${f.importee.name} under ${tierDirsWhereRank((r) => r <= f.importer.rank)}, ` +
        `or drop the dependency declared in ${f.importer.path}/package.json`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
