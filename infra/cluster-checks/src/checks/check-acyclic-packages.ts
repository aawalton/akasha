#!/usr/bin/env bun

import { resolve } from "node:path"
import { createGraph } from "../../../../../instructions/tools/lib/graph/graph.ts"
import { buildFrom, readAt } from "../../../../../instructions/tools/lib/graph/held-snapshot.ts"
import {
  PACKAGE_NODE_TYPE,
  type PackageAttrs,
  PackageAttrsSchema,
  PKG_DEPENDS_EDGE_TYPE,
  type PkgDependsAttrs,
  PkgDependsAttrsSchema,
  type PkgDependsEdgeType,
} from "../../../../../instructions/tools/lib/graph/producers/package/types.ts"
import { findCycles } from "../../../../../instructions/tools/lib/graph/queries/cycles.ts"
import type { Edge, Graph, Node } from "../../../../../instructions/tools/lib/graph/types.ts"
import { resolveRoots } from "../../../../repo/roots/roots"
import { parseArgs as parseCliArgs } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../../instructions/tools/lib/check-workflow/error-message"
import { examinePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { exitOnResult, exitOnToolError, type Violation } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

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

async function main(): Promise<never> {
  const args = parseArgs()

  let fullGraph: Graph
  try {
    fullGraph = await buildFrom(readAt(args.treeSha).ctx)
  } catch (err) {
    return toolExit(`failed to build the package graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const codeRoot = resolveRoots().code
  const packageNodes = fullGraph.nodes(PACKAGE_NODE_TYPE).map(parsePackageNode)

  const { population } = examinePopulation({
    members: packageNodes,
    unit: "workspace packages",
    labelOf: (node) => node.attrs.name,
    siteOf: (node) => resolve(codeRoot, node.attrs.path, "package.json"),
    examine: () => [],
    membership: {
      kind: "enumerated",
      because:
        "these are the `package` nodes of the graph built at the tree sha above, and a build that could not complete throws out of `buildFrom` into the `toolExit` beside it rather than handing over a partial node set",
    },
  })

  if (packageNodes.length === 0) {
    return exitOnResult({
      violations: [],
      options: {
        population,
        format: args.jsonOutput ? "json" : "human",
        prefix: PREFIX,
      },
    })
  }

  const cycleEdges = fullGraph
    .edges({ type: [PKG_DEPENDS_EDGE_TYPE] })
    .map(parsePkgDependsEdge)
    .filter((e) => e.attrs.kind === "dependencies" || e.attrs.kind === "devDependencies")
  const cycleGraph = createGraph(packageNodes, cycleEdges)

  const cycles = findCycles(cycleGraph, { edgeTypes: [PKG_DEPENDS_EDGE_TYPE] })

  const idToName = new Map<string, string>()
  for (const node of packageNodes) idToName.set(node.id, node.attrs.name)

  const findings: PackageCycleFinding[] = cycles.map((cycle) => {
    const names = cycle.map((id) => idToName.get(id) ?? id)
    return { kind: "PackageCycle", size: names.length, nodes: names }
  })
  findings.sort(compareFindings)

  return exitOnResult({
    violations: findings,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Cycles in the workspace package dependency graph",
      successMessage: `OK — ${packageNodes.length} package(s) analyzed, zero cycles`,
      formatViolation,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
