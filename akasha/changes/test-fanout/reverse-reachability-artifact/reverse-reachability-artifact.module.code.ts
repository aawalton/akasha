#!/usr/bin/env bun

import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { CODE_REPO } from "@akasha/checks/repo-scope"
import { TEST_TYPES } from "@akasha/checks/test-step-paths"
import { buildFrom, readAt } from "@tools/lib/graph/held-snapshot"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPES,
  tsFileNodeId,
  tsFileNodeIdToCodeRepoRel,
} from "@tools/lib/graph/producers/file/ts-file/types"
import { curatedWorkspaces } from "@tools/lib/graph/producers/lib/curation"
import { repoTree } from "@tools/lib/graph/producers/lib/repo-tree"
import { workspaceDirsAt } from "@tools/lib/graph/producers/lib/workspace-dirs"
import { transitiveClosure } from "@tools/lib/graph/queries/transitive"
import type { BuildContext } from "@tools/lib/graph/types"
import {
  computeTestReachability,
  type ReachabilityHelpers,
} from "../test-reverse-reachability/test-reverse-reachability.module.code.ts"

const PREFIX = "[compute-reverse-reachability]"
const SCHEMA_VERSION = 2

const ROOT_MARKER = "bun.lock"

const TSCONFIG = "tsconfig.json"

const CURATION_ROOT_KEY = "."

interface WorkspaceConfig {
  readonly root: string
  readonly audited: boolean
}

interface CliArgs {
  outputPath: string
  inputsHash: string
  treeSha: string
  jsonOutput: boolean
}

function refuseUnlessCodeCheckout(root: string): void {
  if (existsSync(resolve(root, ROOT_MARKER))) return
  console.error(
    `${PREFIX} ${root} holds no ${ROOT_MARKER}, so it is not a checkout of the code repo. ` +
      "A reading pointed at the wrong tree reaches no test file and reports an empty map as a complete one."
  )
  process.exit(2)
}

function parseArgs(argv: readonly string[]): CliArgs {
  let outputPath: string | null = null
  let inputsHash: string | null = null
  let treeSha: string | null = null
  let jsonOutput = false

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === undefined) continue
    if (arg === "--json") {
      jsonOutput = true
    } else if (arg === "--output") {
      outputPath = argv[++i] ?? null
    } else if (arg.startsWith("--output=")) {
      outputPath = arg.slice("--output=".length)
    } else if (arg === "--inputs-hash") {
      inputsHash = argv[++i] ?? null
    } else if (arg.startsWith("--inputs-hash=")) {
      inputsHash = arg.slice("--inputs-hash=".length)
    } else if (arg === "--tree-sha") {
      treeSha = argv[++i] ?? null
    } else if (arg.startsWith("--tree-sha=")) {
      treeSha = arg.slice("--tree-sha=".length)
    } else {
      console.error(`${PREFIX} unknown argument: ${arg}`)
      process.exit(1)
    }
  }

  if (outputPath === null) {
    console.error(`${PREFIX} missing --output <path>`)
    process.exit(1)
  }
  if (inputsHash === null) {
    console.error(`${PREFIX} missing --inputs-hash <hex>`)
    process.exit(1)
  }

  if (treeSha === null) {
    console.error(
      `${PREFIX} missing --tree-sha <tree-ish>. The reading is keyed on a commit, and taking ` +
        "the working tree instead would map a state no pipeline is running against."
    )
    process.exit(1)
  }

  return {
    outputPath: resolve(outputPath),
    inputsHash,
    treeSha,
    jsonOutput,
  }
}

const TEST_SUFFIXES = TEST_TYPES.flatMap((t) => [`.${t}.test.ts`, `.${t}.test.tsx`])

function isTestFile(relPath: string): boolean {
  return TEST_SUFFIXES.some((s) => relPath.endsWith(s))
}

interface WorkspaceSummary {
  testFiles: readonly string[]
  reverseMap: Record<string, string[]>
}

interface Artifact {
  schemaVersion: number
  inputsHash: string
  byWorkspace: Record<string, WorkspaceSummary>
  outsideMap: readonly string[]
}

function codeRootIn(ctx: BuildContext): string {
  const root = ctx.repoRoots.get(CODE_REPO)
  if (root === undefined) {
    console.error(`${PREFIX} the reading holds no root for the ${CODE_REPO} repo`)
    return process.exit(2)
  }
  return root
}

function curatedRoots(ctx: BuildContext): ReadonlySet<string> {
  try {
    const merged = curatedWorkspaces(ctx)
    if (merged === null) return new Set()
    return new Set(Object.keys(merged))
  } catch (cause) {
    console.error(`${PREFIX} ${cause instanceof Error ? cause.message : String(cause)}`)
    return process.exit(2)
  }
}

function discoverWorkspaces(ctx: BuildContext): readonly WorkspaceConfig[] {
  const tree = repoTree(ctx, CODE_REPO)
  const curated = curatedRoots(ctx)
  const auditedRoot = (root: string): boolean => curated.size === 0 || curated.has(root)
  const out: WorkspaceConfig[] = []
  if (tree.hasFile(TSCONFIG) && auditedRoot(CURATION_ROOT_KEY)) {
    out.push({ root: "", audited: true })
  }
  for (const wsRoot of workspaceDirsAt(ctx, CODE_REPO)) {
    if (!tree.hasFile(`${wsRoot}/${TSCONFIG}`)) continue
    out.push({ root: wsRoot, audited: auditedRoot(wsRoot) })
  }
  return out
}

function assignToWorkspace(relPath: string, workspaceRoots: readonly string[]): string | null {
  for (const root of workspaceRoots) {
    if (relPath === root || relPath.startsWith(`${root}/`)) return root
  }
  return null
}

function writeWholeOrNothing(path: string, body: string): void {
  const scratch = `${path}.tmp-${process.pid}-${Math.random().toString(36).slice(2, 10)}`
  try {
    writeFileSync(scratch, body)
    renameSync(scratch, path)
  } catch (err) {
    rmSync(scratch, { force: true })
    throw err
  }
}

export async function main(argv: readonly string[]): Promise<void> {
  const args = parseArgs(argv)

  const { ctx } = readAt(args.treeSha)
  refuseUnlessCodeCheckout(codeRootIn(ctx))

  const discovered = discoverWorkspaces(ctx)
  if (discovered.length === 0) {
    console.error(`${PREFIX} no workspaces discovered`)
    process.exit(2)
  }
  const workspaces = discovered.filter((w) => w.audited)
  const outsideMap = discovered
    .filter((w) => !w.audited)
    .map((w) => w.root)
    .sort()

  const graph = await buildFrom(ctx)

  const helpers: ReachabilityHelpers = {
    tsFileNodeTypes: TS_FILE_NODE_TYPES,
    importEdgeTypes: [IMPORT_STATIC_EDGE_TYPE, IMPORT_DYNAMIC_EDGE_TYPE, RE_EXPORT_EDGE_TYPE],
    tsFileNodeId,
    tsFileNodeIdToCodeRepoRel,
    transitiveClosure: (_reached, from, opts) => transitiveClosure(graph, from, opts),
  }

  const workspaceRoots = workspaces.map((w) => w.root).sort((a, b) => b.length - a.length)

  const scratchTestFiles = new Map<string, string[]>()
  const scratchReverseMap = new Map<string, Map<string, string[]>>()
  for (const w of workspaces) {
    scratchTestFiles.set(w.root, [])
    scratchReverseMap.set(w.root, new Map())
  }

  for (const { testFile, reachedFiles } of computeTestReachability(graph, isTestFile, helpers)) {
    const workspace = assignToWorkspace(testFile, workspaceRoots)
    if (workspace === null) continue
    const testFiles = scratchTestFiles.get(workspace)
    const reverseMap = scratchReverseMap.get(workspace)
    if (testFiles === undefined || reverseMap === undefined) continue
    testFiles.push(testFile)
    for (const reachedRel of reachedFiles) {
      let importers = reverseMap.get(reachedRel)
      if (importers === undefined) {
        importers = []
        reverseMap.set(reachedRel, importers)
      }
      importers.push(testFile)
    }
  }

  const byWorkspace: Record<string, WorkspaceSummary> = {}
  for (const w of workspaces) {
    const testFiles = scratchTestFiles.get(w.root) ?? []
    const reverseMap = scratchReverseMap.get(w.root) ?? new Map<string, string[]>()
    const sortedMap: Record<string, string[]> = {}
    for (const key of [...reverseMap.keys()].sort()) {
      const list = reverseMap.get(key) ?? []
      sortedMap[key] = [...new Set(list)].sort()
    }
    byWorkspace[w.root] = {
      testFiles: [...testFiles].sort(),
      reverseMap: sortedMap,
    }
  }

  const artifact: Artifact = {
    schemaVersion: SCHEMA_VERSION,
    inputsHash: args.inputsHash,
    byWorkspace,
    outsideMap,
  }

  const serialized = `${JSON.stringify(artifact, null, 2)}\n`
  mkdirSync(dirname(args.outputPath), { recursive: true })
  try {
    writeWholeOrNothing(args.outputPath, serialized)
  } catch (err) {
    console.error(`${PREFIX} failed to write ${args.outputPath}: ${err}`)
    process.exit(3)
  }

  const mapped = Object.keys(byWorkspace).length
  const testFiles = Object.values(byWorkspace).reduce((a, w) => a + w.testFiles.length, 0)
  if (args.jsonOutput) {
    process.stdout.write(
      `${JSON.stringify({
        outputPath: args.outputPath,
        inputsHash: args.inputsHash,
        discovered: discovered.length,
        workspaces: mapped,
        outsideMap: outsideMap.length,
        testFiles,
      })}\n`
    )
  } else {
    console.log(
      `${PREFIX} wrote ${args.outputPath} (${discovered.length} workspaces discovered: ${mapped} in the map, ${outsideMap.length} outside it; ${testFiles} test files)`
    )
  }
}

if (import.meta.main) {
  await main(Bun.argv.slice(2))
}
