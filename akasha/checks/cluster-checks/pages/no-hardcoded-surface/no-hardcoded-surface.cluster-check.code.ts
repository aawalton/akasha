#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPES,
  tsFileNodeIdToCodeRepoRel,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import { readRepoFile } from "../../../../../tools/lib/graph/repos.ts"
import type { BuildContext, Graph } from "../../../../../tools/lib/graph/types.ts"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { CODE_REPO } from "../../modules/repo-scope/repo-scope.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  declaresSurfaceHelper,
  findSurfaceLiteralSites,
  isTestFilePath,
} from "../../modules/surface-literal-sites/surface-literal-sites.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-no-hardcoded-surface]"

interface SurfaceViolation extends Violation {
  readonly file: string
  readonly line: number
  readonly message: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

interface CliArgs {
  readonly jsonOutput: boolean
  readonly treeSha: string
}

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

const MODULE_REACH_EDGES = [
  IMPORT_STATIC_EDGE_TYPE,
  IMPORT_DYNAMIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
] as const

function checkSource(source: string, repoRelative: string): readonly SurfaceViolation[] {
  if (declaresSurfaceHelper(source, repoRelative)) return []
  return findSurfaceLiteralSites(source, repoRelative).map((site) => ({
    file: repoRelative,
    line: site.line,
    message: `hard-coded surface literal \`${site.token}\` — replace with \`surfaceClass(N)\` so elevation derives from <SurfaceProvider> context`,
  }))
}

interface Walked {
  readonly files: readonly string[]
  readonly seeds: number
}

function walk(graph: Graph): Walked {
  const reached = new Set<string>()
  const frontier: string[] = []
  let seeds = 0
  for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
    if (node.repo !== CODE_REPO) continue
    const rel = tsFileNodeIdToCodeRepoRel(node.id)
    if (rel === null || !rel.endsWith(".tsx") || rel.endsWith(".generated.tsx")) continue
    reached.add(node.id)
    frontier.push(node.id)
    if (!isTestFilePath(rel)) seeds += 1
  }
  while (frontier.length > 0) {
    const id = frontier.pop()
    if (id === undefined) continue
    for (const edge of graph.outEdges(id, MODULE_REACH_EDGES)) {
      if (reached.has(edge.to)) continue
      if (tsFileNodeIdToCodeRepoRel(edge.to) === null) continue
      reached.add(edge.to)
      frontier.push(edge.to)
    }
  }
  const files: string[] = []
  for (const id of reached) {
    const rel = tsFileNodeIdToCodeRepoRel(id)
    if (rel === null || rel.endsWith(".generated.tsx")) continue
    if (isTestFilePath(rel)) continue
    files.push(rel)
  }
  files.sort()
  return { files, seeds }
}

const membershipFrom = (seeds: number): string =>
  `the ${seeds} non-test, non-generated \`.tsx\` node(s) the graph holds for the code repo at ` +
  `this tree sha, and one module above them — every one of those nodes is itself a member here, ` +
  `so a closure that came back having added nothing would stand at exactly their number and read ` +
  `as a clean repo, and the member above that count is the least the import walk has to reach ` +
  `before it can be said to have run`

async function main(): Promise<never> {
  const args = parseArgs()

  let ctx: BuildContext
  let graph: Graph
  try {
    ctx = readAt(args.treeSha).ctx
    graph = await buildFrom(ctx)
  } catch (err) {
    return toolExit(`failed to build the ts-file graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const root = codeRoot()
  const { files, seeds } = walk(graph)

  const { population, violations } = examinePopulation<string, SurfaceViolation>({
    members: files,
    unit: "component-reachable TS files",
    membership: { kind: "atLeast", members: seeds + 1, from: membershipFrom(seeds) },
    labelOf: (rel) => rel,
    siteOf: (rel) => resolve(root, rel),
    examine: (rel) => {
      const source = readRepoFile(ctx, CODE_REPO, rel)
      if (source === null) {
        throw new Error(`the code repo holds no body for this path at ${args.treeSha}`)
      }
      return checkSource(source, rel)
    },
  })

  return exitOnResult({
    violations,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Hard-coded surface literals",
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
