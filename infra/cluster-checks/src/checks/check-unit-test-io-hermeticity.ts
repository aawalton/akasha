#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { buildFrom, readAt } from "../../../../../instructions/tools/lib/graph/held-snapshot.ts"
import type { Graph } from "../../../../../instructions/tools/lib/graph/types.ts"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args"
import { errorMessage } from "../../../../../instructions/tools/lib/check-workflow/error-message"
import { examinePopulation, type Population } from "../../../../../instructions/tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root"
import {
  IO_BOUNDARY_MODULES,
  type IoBoundaryModule,
  type IoSeam,
  neutralizesBoundary,
  spiedIoSeams,
} from "../lib/unit-test-io-boundaries"
import { exitOnResult, exitOnToolError } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"
import { MockModuleAttrsSchema } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/parse-mock-module"
import { IMPORT_DYNAMIC_EDGE_TYPE, IMPORT_STATIC_EDGE_TYPE, MOCK_MODULE_EDGE_TYPE, TS_FILE_NODE_TYPES, tsFileNodeIdToCodeRepoRel } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/types"
import { ImportDynamicAttrsSchema, ImportStaticAttrsSchema } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/types-schemas"
import { resolvePackageExport } from "../../../../../instructions/tools/lib/graph/producers/lib/resolve-package-export"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema, packageNodeIdToWorkspaceName } from "../../../../../instructions/tools/lib/graph/producers/package/types"

const PREFIX = "[unit-test-io-hermeticity]"

const TEST_RE = /\.(unit|property|component)\.test\.tsx?$/

export type UnitTestIoHermeticityFinding = {
  readonly file: string
  readonly boundary: string
}

const TS_SUB_PATH_EXTENSIONS = [".ts", ".tsx", "/index.ts", "/index.tsx", ""]
const TS_BARE_IMPORT_CANDIDATES = ["index.ts", "index.tsx", "src/index.ts", "src/index.tsx"]

type ResolveEdgeTarget = (toId: string, specifier: string) => string | null

function makeResolveEdgeTarget(graph: Graph): ResolveEdgeTarget {
  const packagesByName = new Map<string, ReturnType<typeof PackageAttrsSchema.parse>>()
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    packagesByName.set(attrs.name, attrs)
  }
  const tsFiles = new Set<string>()
  for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
    const rel = tsFileNodeIdToCodeRepoRel(node.id)
    if (rel !== null) tsFiles.add(rel)
  }
  return (toId, specifier) => {
    const fileRel = tsFileNodeIdToCodeRepoRel(toId)
    if (fileRel !== null) return fileRel
    const pkgName = packageNodeIdToWorkspaceName(toId)
    if (pkgName === null) return null
    const pkg = packagesByName.get(pkgName)
    if (pkg === undefined) return null
    const rest = specifier === pkgName ? "" : specifier.slice(pkgName.length + 1)
    return resolvePackageExport({
      subPath: rest === "" ? null : `./${rest}`,
      exports: pkg.exports,
      packagePath: pkg.path,
      bareImportCandidates: TS_BARE_IMPORT_CANDIDATES,
      subPathExtensions: TS_SUB_PATH_EXTENSIONS,
      acceptResolved: (p) => /\.tsx?$/.test(p),
      exists: (p) => tsFiles.has(p),
    })
  }
}

function buildImportAdjacency(
  graph: Graph,
  resolveTarget: ResolveEdgeTarget
): Map<string, string[]> {
  const adjacency = new Map<string, string[]>()
  const add = (fromId: string, toId: string, specifier: string): undefined => {
    const fromRel = tsFileNodeIdToCodeRepoRel(fromId)
    const toRel = resolveTarget(toId, specifier)
    if (fromRel === null || toRel === null) return
    const list = adjacency.get(fromRel) ?? []
    list.push(toRel)
    adjacency.set(fromRel, list)
  }
  for (const edge of graph.edges({ type: [IMPORT_STATIC_EDGE_TYPE] })) {
    const attrs = ImportStaticAttrsSchema.parse(edge.attrs)
    if (attrs.typeOnly) continue
    add(edge.from, edge.to, attrs.specifier)
  }
  for (const edge of graph.edges({ type: [IMPORT_DYNAMIC_EDGE_TYPE] })) {
    add(edge.from, edge.to, ImportDynamicAttrsSchema.parse(edge.attrs).specifier)
  }
  return adjacency
}

function buildMockedTargets(
  graph: Graph,
  resolveTarget: ResolveEdgeTarget
): Map<string, Set<string>> {
  const mocked = new Map<string, Set<string>>()
  for (const edge of graph.edges({ type: [MOCK_MODULE_EDGE_TYPE] })) {
    const fromRel = tsFileNodeIdToCodeRepoRel(edge.from)
    const toRel = resolveTarget(edge.to, MockModuleAttrsSchema.parse(edge.attrs).specifier)
    if (fromRel === null || toRel === null) continue
    const set = mocked.get(fromRel) ?? new Set<string>()
    set.add(toRel)
    mocked.set(fromRel, set)
  }
  return mocked
}

function reachableWithCut(
  start: string,
  adjacency: Map<string, string[]>,
  cut: ReadonlySet<string>
): Set<string> {
  const seen = new Set<string>()
  const stack = [start]
  while (stack.length > 0) {
    const node = stack.pop()
    if (node === undefined) continue
    for (const next of adjacency.get(node) ?? []) {
      if (cut.has(next) || seen.has(next)) continue
      seen.add(next)
      stack.push(next)
    }
  }
  return seen
}

function isOwnSiblingTest(testFile: string, boundary: string): boolean {
  const boundaryBase = boundary.replace(/\.tsx?$/, "")
  const testBase = testFile.replace(TEST_RE, "")
  return testBase === boundaryBase
}

const examineUnitTestIoHermeticity = (args: {
  readonly graph: Graph
  readonly repoRoot: string
  readonly boundaries?: readonly IoBoundaryModule[]
  readonly readSource?: (repoRelFile: string) => string | null
}): {
  readonly population: Population
  readonly violations: readonly UnitTestIoHermeticityFinding[]
} => {
  const { graph, repoRoot, readSource } = args
  const resolveTarget = makeResolveEdgeTarget(graph)
  const adjacency = buildImportAdjacency(graph, resolveTarget)
  const mocked = buildMockedTargets(graph, resolveTarget)
  const boundariesByPath = new Map(
    (args.boundaries ?? IO_BOUNDARY_MODULES).map((entry) => [entry.path, entry])
  )

  const testFiles = new Set<string>()
  for (const from of adjacency.keys()) if (TEST_RE.test(from)) testFiles.add(from)
  for (const from of mocked.keys()) if (TEST_RE.test(from)) testFiles.add(from)

  const { population, violations } = examinePopulation<string, UnitTestIoHermeticityFinding>({
    members: [...testFiles].sort(),
    unit: "test files",
    membership: {
      kind: "enumerated",
      because:
        "`testFiles` is read off the import and mock-module adjacency built from the `graph` " +
        "handed in, which is already whole in memory here — the build that produced it either " +
        "returned it entire or rejected — so fewer members means fewer test files in it",
    },
    labelOf: (testFile) => testFile,
    siteOf: (testFile) => resolve(repoRoot, testFile),
    examine: (testFile) => {
      const cut = mocked.get(testFile) ?? new Set<string>()
      const reachable = reachableWithCut(testFile, adjacency, cut)
      const found: UnitTestIoHermeticityFinding[] = []
      let spied: ReadonlySet<IoSeam> | undefined
      const seamsTaken = (): ReadonlySet<IoSeam> => {
        if (spied === undefined) {
          const source = readSource === undefined ? null : readSource(testFile)
          spied = source === null ? new Set<IoSeam>() : spiedIoSeams(testFile, source)
        }
        return spied
      }
      for (const boundary of reachable) {
        const entry = boundariesByPath.get(boundary)
        if (entry === undefined) continue
        if (isOwnSiblingTest(testFile, boundary)) continue
        if (neutralizesBoundary(entry, seamsTaken())) continue
        found.push({ file: testFile, boundary })
      }
      return found
    },
  })

  const findings = [...violations]
  findings.sort((a, b) => {
    if (a.file !== b.file) return a.file < b.file ? -1 : 1
    return a.boundary < b.boundary ? -1 : a.boundary > b.boundary ? 1 : 0
  })
  return { population, violations: findings }
}

export const findUnitTestIoHermeticityViolations = (
  graph: Graph,
  boundaries: readonly IoBoundaryModule[] = IO_BOUNDARY_MODULES,
  readSource?: (repoRelFile: string) => string | null
): readonly UnitTestIoHermeticityFinding[] =>
  examineUnitTestIoHermeticity({ graph, repoRoot: getRepoRoot(), boundaries, readSource })
    .violations

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function formatViolation(v: UnitTestIoHermeticityFinding): string {
  return `${v.file} — reaches real-IO boundary ${v.boundary} through its SUT without neutralizing it; mock.module() the boundary, or spyOn(Bun, "which"/"spawn") to control the subprocess seam, so the test is hermetic`
}

async function main(): Promise<undefined> {
  let flags: {
    json: boolean
    repoRoot: string | undefined
    treeSha: string
  }
  try {
    const parsed = parseArgs(
      process.argv.slice(2),
      { ...STANDARD_FLAGS, treeSha: { kind: "string", required: true } },
      { passthrough: true }
    )
    flags = {
      json: parsed.flags.json,
      repoRoot: parsed.flags.repoRoot,
      treeSha: parsed.flags.treeSha,
    }
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    return exitOnToolError({
      error: new Error(`--repo-root ${repoRoot} does not exist`),
      prefix: PREFIX,
    })
  }

  let graph: Graph
  try {
    graph = await buildFrom(readAt(flags.treeSha).ctx)
  } catch (err) {
    return exitOnToolError({
      error: new Error(`Failed to build ts-file graph at ${flags.treeSha}: ${errorMessage(err)}`),
      prefix: PREFIX,
    })
  }

  const { population, violations: findings } = examineUnitTestIoHermeticity({
    graph,
    repoRoot,
    boundaries: IO_BOUNDARY_MODULES,
    readSource: (rel) => {
      const abs = resolve(repoRoot, rel)
      return existsSync(abs) ? readFileSync(abs, "utf-8") : null
    },
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `unit-test IO hermeticity — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "No unit-test IO hermeticity violations detected.",
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main().catch((err: unknown) =>
    exitOnToolError({ error: new Error(`Unexpected error: ${errorMessage(err)}`), prefix: PREFIX })
  )
}
