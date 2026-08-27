#!/usr/bin/env bun

import { resolve } from "node:path"
import { createGraph } from "../../../../../instructions/tools/lib/graph/graph.ts"
import { buildFrom, readAt } from "../../../../../instructions/tools/lib/graph/held-snapshot.ts"
import { IMPORT_DYNAMIC_EDGE_TYPE, IMPORT_STATIC_EDGE_TYPE, RE_EXPORT_EDGE_TYPE, TS_FILE_NODE_TYPES, type TsFileAttrs } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/types.ts"
import { ImportStaticAttrsSchema, ReExportAttrsSchema, TsFileAttrsSchema } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/types-schemas"
import {
  TSCONFIG_FILE_NODE_TYPE,
  TsconfigFileAttrsSchema,
} from "../../../../../instructions/tools/lib/graph/producers/file/tsconfig-file/types.ts"
import { findCycles } from "../../../../../instructions/tools/lib/graph/queries/cycles.ts"
import type { Edge, Graph, Node, NodeId } from "../../../../../instructions/tools/lib/graph/types.ts"
import { resolveRoots } from "../../../../repo/roots/roots"
import { parseArgs as parseCliArgs } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../../instructions/tools/lib/check-workflow/error-message"
import { examinePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { DEFAULT_ADAPTERS, roleFor } from "../lib/ts-adapter-roles.ts"
import { exitOnResult, exitOnToolError, type Violation } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const PREFIX = "[check-acyclic-imports]"

const CODE_REPO = "code"

const ROOT_TSCONFIG = "tsconfig.json"

const CYCLE_EDGE_TYPES = [
  IMPORT_STATIC_EDGE_TYPE,
  IMPORT_DYNAMIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
] as const

const ENTRY_DISCOVERED_VIA = new Set<TsFileAttrs["discoveredVia"]>([
  "tsconfig",
  "adapter",
  "entry-glob",
])

const MODULES_AT_LEAST = 6000

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

interface ImportCycleFinding extends Violation {
  readonly kind: "ImportCycle"
  readonly size: number
  readonly nodes: readonly string[]
}

function compareFindings(a: ImportCycleFinding, b: ImportCycleFinding): number {
  if (a.size !== b.size) return a.size - b.size
  const aFirst = a.nodes[0] ?? ""
  const bFirst = b.nodes[0] ?? ""
  if (aFirst < bFirst) return -1
  if (aFirst > bFirst) return 1
  return 0
}

function formatViolation(f: ImportCycleFinding): string {
  const lines = [`cycle of size ${f.size}:`, ...f.nodes.map((node) => `    ${node}`)]
  const first = f.nodes[0]
  if (first !== undefined) lines.push(`    ${first}`)
  return lines.join("\n")
}

const curatedWorkspaceRoots = (graph: Graph): ReadonlySet<string> => {
  const roots = new Set<string>()
  for (const node of graph.nodes(TSCONFIG_FILE_NODE_TYPE)) {
    const path = TsconfigFileAttrsSchema.parse(node.attrs).path
    if (path === ROOT_TSCONFIG) roots.add("")
    else if (path.endsWith(`/${ROOT_TSCONFIG}`)) {
      roots.add(path.slice(0, -(ROOT_TSCONFIG.length + 1)))
    }
  }
  return roots
}

const carriesRuntime = (edge: Edge): boolean => {
  if (edge.type === IMPORT_DYNAMIC_EDGE_TYPE) return true
  if (edge.type === IMPORT_STATIC_EDGE_TYPE) {
    return ImportStaticAttrsSchema.parse(edge.attrs).typeOnly !== true
  }
  if (edge.type === RE_EXPORT_EDGE_TYPE) {
    return ReExportAttrsSchema.parse(edge.attrs).typeOnly !== true
  }
  return false
}

const forwardClosure = (
  entries: readonly NodeId[],
  outward: ReadonlyMap<NodeId, readonly NodeId[]>
): ReadonlySet<NodeId> => {
  const reached = new Set<NodeId>(entries)
  const queue: NodeId[] = [...entries]
  while (queue.length > 0) {
    const id = queue.pop()
    if (id === undefined) break
    for (const to of outward.get(id) ?? []) {
      if (reached.has(to)) continue
      reached.add(to)
      queue.push(to)
    }
  }
  return reached
}

async function main(): Promise<never> {
  const args = parseArgs()

  let fullGraph: Graph
  try {
    fullGraph = await buildFrom(readAt(args.treeSha).ctx)
  } catch (err) {
    return toolExit(`failed to build the import graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const codeRoot = resolveRoots().code
  const curatedRoots = curatedWorkspaceRoots(fullGraph)

  const curated = new Map<NodeId, TsFileAttrs>()
  for (const node of fullGraph.nodes(TS_FILE_NODE_TYPES)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = TsFileAttrsSchema.parse(node.attrs)
    if (!curatedRoots.has(attrs.workspaceRoot)) continue
    curated.set(node.id, attrs)
  }

  const runtimeEdges: Edge[] = []
  const outward = new Map<NodeId, NodeId[]>()
  for (const edge of fullGraph.edges({ type: [...CYCLE_EDGE_TYPES] })) {
    if (!curated.has(edge.from) || !curated.has(edge.to)) continue
    if (!carriesRuntime(edge)) continue
    runtimeEdges.push(edge)
    const standing = outward.get(edge.from)
    if (standing === undefined) outward.set(edge.from, [edge.to])
    else standing.push(edge.to)
  }

  const entries: NodeId[] = []
  for (const [id, attrs] of curated) {
    if (ENTRY_DISCOVERED_VIA.has(attrs.discoveredVia)) entries.push(id)
  }
  const reached = forwardClosure(entries, outward)

  const inScope = new Map<NodeId, string>()
  for (const [id, attrs] of curated) {
    if (!reached.has(id)) continue
    if (roleFor(attrs.path, DEFAULT_ADAPTERS) === "ignore") continue
    inScope.set(id, attrs.path)
  }

  const { population } = examinePopulation({
    members: [...inScope.values()],
    unit: "modules",
    labelOf: (path) => path,
    siteOf: (path) => resolve(codeRoot, path),
    examine: () => [],
    membership: {
      kind: "atLeast",
      members: MODULES_AT_LEAST,
      from:
        "the code repo's tracked TypeScript tree read at the tree sha above, which held 6718 " +
        "modules reachable from an entry across the workspace roots carrying a `tsconfig.json` " +
        "when this least count was taken — the graph hands back whatever it discovered rather " +
        "than raising when it discovers less, so a run arriving under this saw a smaller tree " +
        "than the repo holds, and lower it only alongside deliberately retiring that many modules",
    },
  })

  const inScopeNodes: readonly Node[] = fullGraph
    .nodes(TS_FILE_NODE_TYPES)
    .filter((n) => inScope.has(n.id))
  const inScopeEdges = runtimeEdges.filter(
    (e) => inScope.has(e.from) && inScope.has(e.to) && e.from !== e.to
  )
  const subGraph = createGraph(inScopeNodes, inScopeEdges)

  const sccs = findCycles(subGraph, { edgeTypes: [...CYCLE_EDGE_TYPES] })

  const findings: ImportCycleFinding[] = sccs.map((scc) => {
    const nodes = scc.map((id) => inScope.get(id) ?? id)
    return { kind: "ImportCycle", size: nodes.length, nodes }
  })
  findings.sort(compareFindings)

  return exitOnResult({
    violations: findings,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Cycles in the runtime import graph",
      successMessage: `OK — ${inScope.size} module(s) analyzed, zero cycles`,
      formatViolation,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
