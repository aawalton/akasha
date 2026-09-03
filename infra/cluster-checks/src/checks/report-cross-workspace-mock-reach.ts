#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import {
  parseArgs,
  STANDARD_FLAGS,
} from "../../../../akasha/checks/cluster-checks/modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../../../akasha/checks/cluster-checks/modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../../../akasha/checks/cluster-checks/modules/retired/retired.module.code.ts"
import { examinePopulation, type Population } from "../../../../tools/lib/check-workflow/population"
import {
  exitOnToolError,
  reportViolations,
} from "../../../../tools/lib/check-workflow/violation-reporter"
import { buildFrom, readAt } from "../../../../tools/lib/graph/held-snapshot.ts"
import { MockModuleAttrsSchema } from "../../../../tools/lib/graph/producers/file/ts-file/parse-mock-module"
import {
  MOCK_MODULE_EDGE_TYPE,
  TS_FILE_NODE_TYPES,
  tsFileNodeIdToCodeRepoRel,
} from "../../../../tools/lib/graph/producers/file/ts-file/types"
import { TsFileAttrsSchema } from "../../../../tools/lib/graph/producers/file/ts-file/types-schemas"
import { resolvePackageExport } from "../../../../tools/lib/graph/producers/lib/resolve-package-export"
import {
  PACKAGE_NODE_TYPE,
  PackageAttrsSchema,
  packageNodeIdToWorkspaceName,
} from "../../../../tools/lib/graph/producers/package/types"
import type { Edge, Graph } from "../../../../tools/lib/graph/types.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[cross-workspace-mock-reach]"

const TS_SUB_PATH_EXTENSIONS = [".ts", ".tsx", "/index.ts", "/index.tsx", ""]
const TS_BARE_IMPORT_CANDIDATES = ["index.ts", "index.tsx", "src/index.ts", "src/index.tsx"]

export type CrossWorkspaceMockReach = {
  readonly file: string
  readonly line: number
  readonly specifier: string
  readonly mockerWorkspace: string
  readonly targetWorkspace: string
  readonly target: string | null
}

export type CrossWorkspaceMockReachReport = {
  readonly members: readonly CrossWorkspaceMockReach[]
  readonly registrations: number
  readonly mockerFiles: number
  readonly unresolved: number
  readonly population: Population
}

type MockTarget = { readonly workspace: string; readonly file: string | null }

const nodeWorkspace = (graph: Graph, id: string): string | null => {
  const node = graph.node(id)
  if (node === undefined) return null
  return TsFileAttrsSchema.parse(node.attrs).package
}

const makeResolveMockTarget = (
  graph: Graph
): ((toId: string, specifier: string) => MockTarget | null) => {
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
    if (fileRel !== null) {
      const workspace = nodeWorkspace(graph, toId)
      return workspace === null ? null : { workspace, file: fileRel }
    }
    const pkgName = packageNodeIdToWorkspaceName(toId)
    if (pkgName === null) return null
    const pkg = packagesByName.get(pkgName)
    if (pkg === undefined) return null
    const rest = specifier === pkgName ? "" : specifier.slice(pkgName.length + 1)
    const file = resolvePackageExport({
      subPath: rest === "" ? null : `./${rest}`,
      exports: pkg.exports,
      packagePath: pkg.path,
      bareImportCandidates: TS_BARE_IMPORT_CANDIDATES,
      subPathExtensions: TS_SUB_PATH_EXTENSIONS,
      acceptResolved: (p) => /\.tsx?$/.test(p),
      exists: (p) => tsFiles.has(p),
    })
    return { workspace: pkgName, file }
  }
}

export const findCrossWorkspaceMockReach = (
  graph: Graph,
  repoRoot: string = getRepoRoot()
): CrossWorkspaceMockReachReport => {
  const resolveMockTarget = makeResolveMockTarget(graph)
  const mockerFiles = new Set<string>()
  let registrations = 0
  let unresolved = 0

  const { population, violations } = examinePopulation<Edge, CrossWorkspaceMockReach>({
    members: graph.edges({ type: [MOCK_MODULE_EDGE_TYPE] }),
    unit: "mock.module registrations",
    membership: {
      kind: "enumerated",
      because:
        "the members are read off the `graph` handed in, which is already whole in memory " +
        "here — its build either returned it entire or raised — so fewer edges means fewer " +
        "`mock.module` registrations in it",
    },
    labelOf: (edge) => `${tsFileNodeIdToCodeRepoRel(edge.from) ?? edge.from} → ${edge.to}`,
    siteOf: (edge) => {
      const fromRel = tsFileNodeIdToCodeRepoRel(edge.from)
      return fromRel === null ? null : `${repoRoot}/${fromRel}`
    },
    examine: (edge) => {
      const fromRel = tsFileNodeIdToCodeRepoRel(edge.from)
      if (fromRel === null) {
        throw new Error(`mocker node ${edge.from} names no repo-relative file`)
      }
      registrations += 1
      mockerFiles.add(fromRel)

      const mockerWorkspace = nodeWorkspace(graph, edge.from)
      const attrs = MockModuleAttrsSchema.parse(edge.attrs)
      const target = mockerWorkspace === null ? null : resolveMockTarget(edge.to, attrs.specifier)
      if (mockerWorkspace === null || target === null) {
        unresolved += 1
        return []
      }
      if (target.workspace === mockerWorkspace) return []

      return [
        {
          file: fromRel,
          line: attrs.line,
          specifier: attrs.specifier,
          mockerWorkspace,
          targetWorkspace: target.workspace,
          target: target.file,
        },
      ]
    },
  })

  const members = [...violations]
  members.sort((a, b) => {
    if (a.file !== b.file) return a.file < b.file ? -1 : 1
    if (a.line !== b.line) return a.line - b.line
    return a.specifier < b.specifier ? -1 : a.specifier > b.specifier ? 1 : 0
  })
  return { members, registrations, mockerFiles: mockerFiles.size, unresolved, population }
}

const NOT_A_DEFECT_COUNT =
  "Cross-workspace reach is a NECESSARY condition for a module-registry leak, not a sufficient one — a member may be deliberate and correct (mocking another workspace's boundary is the sanctioned hermetic idiom). This is a count of reach, not of defects."

function denominator(report: CrossWorkspaceMockReachReport): string {
  const unresolvedNote =
    report.unresolved === 0
      ? ""
      : `, ${report.unresolved.toLocaleString()} of which named a workspace this report could not determine`
  return `over ${report.registrations.toLocaleString()} mock.module registration(s) the graph carries across ${report.mockerFiles.toLocaleString()} mocker file(s)${unresolvedNote}`
}

function formatMember(m: CrossWorkspaceMockReach): string {
  return `${m.file}:${m.line}  ${m.specifier} → ${m.target ?? `${m.targetWorkspace} (exports named no file)`}  [${m.mockerWorkspace} → ${m.targetWorkspace}]`
}

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

async function main(): Promise<undefined> {
  const parsed = parseArgs(
    process.argv.slice(2),
    { ...STANDARD_FLAGS, treeSha: { kind: "string", required: true } },
    { passthrough: true }
  )
  const repoRoot = parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) throw new Error(`--repo-root ${repoRoot} does not exist`)

  let graph: Graph
  try {
    graph = await buildFrom(readAt(parsed.flags.treeSha).ctx)
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const report = findCrossWorkspaceMockReach(graph, repoRoot)
  reportViolations(report.members, {
    format: parsed.flags.json ? "json" : "human",
    prefix: PREFIX,
    population: report.population,
    header: `${report.members.length.toLocaleString()} mock.module registration(s) name a module outside the mocker's own workspace, ${denominator(report)}. ${NOT_A_DEFECT_COUNT}`,
    successMessage: `No mock.module registration names a module outside the mocker's own workspace, ${denominator(report)}. ${NOT_A_DEFECT_COUNT}`,
    footer: (count) =>
      `${PREFIX} ${count.toLocaleString()} cross-workspace reach(es), ${denominator(report)}.`,
    groupBy: (m) => topLevelGroup(m.file),
    formatViolation: formatMember,
  })
}

if (import.meta.main) {
  main().catch((err: unknown) => exitOnToolError({ error: err, prefix: PREFIX }))
}
