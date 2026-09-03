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
  type PkgDependsEdgeType,
  packageNodeIdToWorkspaceName,
} from "../../../../../tools/lib/graph/producers/package/types.ts"
import { readRepoFile } from "../../../../../tools/lib/graph/repos.ts"
import type { Edge, Graph, Node } from "../../../../../tools/lib/graph/types.ts"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type FunctionalType,
  FunctionalTypeSchema,
  RANK_BY_TYPE,
} from "../../modules/functional-type/functional-type.module.code.ts"
import {
  judgeLayerMonotonicity,
  type PackageEdge,
  type RankInversionFinding,
  type WorkspaceEntry,
} from "../../modules/layer-monotonicity/layer-monotonicity.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { remediationHint } from "../../modules/remediation-doc/remediation-doc.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-layer-monotonicity]"

const CODE_REPO = "code"

const REMEDIATION = remediationHint(
  "fix: drop the dependency, move what it reaches into a workspace at or below the importee's rank, or correct whichever of the two `functionalType` declarations is wrong"
)

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
  return { jsonOutput: parsed.flags.json, treeSha: parsed.flags.treeSha }
}

const parsePackageNode = (n: Node): Node<"package", PackageAttrs> => ({
  ...n,
  type: PACKAGE_NODE_TYPE,
  attrs: PackageAttrsSchema.parse(n.attrs),
})

const parsePkgDependsEdge = (e: Edge): Edge<PkgDependsEdgeType, PkgDependsAttrs> => ({
  ...e,
  type: PKG_DEPENDS_EDGE_TYPE,
  attrs: PkgDependsAttrsSchema.parse(e.attrs),
})

const packageJsonIn = (workspacePath: string): string =>
  workspacePath === "" ? "package.json" : `${workspacePath}/package.json`

const functionalTypeIn = (body: string | null): FunctionalType | null => {
  if (body === null) return null
  let held: unknown
  try {
    held = JSON.parse(body)
  } catch {
    return null
  }
  if (typeof held !== "object" || held === null) return null
  const read = FunctionalTypeSchema.safeParse((held as Record<string, unknown>).functionalType)
  return read.success ? read.data : null
}

async function main(): Promise<never> {
  const args = parseArgs()

  let held: { reading: ReturnType<typeof readAt>; graph: Graph }
  try {
    const reading = readAt(args.treeSha)
    held = { reading, graph: await buildFrom(reading.ctx) }
  } catch (err) {
    return toolExit(`failed to build the package graph at ${args.treeSha}: ${errorMessage(err)}`)
  }
  const { reading, graph: fullGraph } = held

  const root = codeRoot()
  const packageNodes = fullGraph.nodes(PACKAGE_NODE_TYPE).map(parsePackageNode)
  const workspaces: readonly WorkspaceEntry[] = packageNodes.map((n) => ({
    name: n.attrs.name,
    path: n.attrs.path,
  }))

  const typeByPath = new Map<string, string>()
  const { population } = examinePopulation<WorkspaceEntry, never>({
    members: workspaces,
    unit: "workspaces",
    membership: {
      kind: "enumerated",
      because:
        "the members are the `package` nodes of the graph built at the tree sha above: `readAt` takes one git reading of one commit and `buildFrom` either hands back that graph whole or throws into the `toolExit` beside it, so there is no per-workspace fetch that can come back short one at a time. Each workspace's `functionalType` is read back out of that same held snapshot rather than off a working tree, so no member is judged against a package.json newer than the graph it stands in. Fewer members is therefore a shorter workspace list at that commit, never a reading that arrived half made",
    },
    labelOf: (ws) => ws.path,
    siteOf: (ws) => resolve(root, packageJsonIn(ws.path)),
    examine: (ws) => {
      const type = functionalTypeIn(readRepoFile(reading.ctx, CODE_REPO, packageJsonIn(ws.path)))
      if (type !== null) typeByPath.set(ws.path, type)
      return []
    },
  })

  const edges: readonly PackageEdge[] = fullGraph
    .edges({ type: [PKG_DEPENDS_EDGE_TYPE] })
    .map(parsePkgDependsEdge)
    .map((e) => ({
      source: packageNodeIdToWorkspaceName(String(e.from)) ?? String(e.from),
      target: packageNodeIdToWorkspaceName(String(e.to)) ?? String(e.to),
      kind: e.attrs.kind,
    }))

  const rankByType = new Map<string, number>(Object.entries(RANK_BY_TYPE))

  const { findings, judgedEdges } = judgeLayerMonotonicity({
    workspaces,
    typeByPath,
    rankByType,
    edges,
  })

  return exitOnResult<RankInversionFinding & Violation>({
    violations: findings,
    options: {
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "RankInversion finding(s)",
      successMessage: `OK — ${workspaces.length} workspace(s) analyzed, ${judgedEdges.length} of ${edges.length} edge(s) judged, zero findings`,
      population,
      remediationDoc: REMEDIATION,
      formatViolation: (f) =>
        `${f.importer.name} (${f.importer.functionalType}, rank=${f.importer.rank}) → ${f.importee.name} (${f.importee.functionalType}, rank=${f.importee.rank})`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
