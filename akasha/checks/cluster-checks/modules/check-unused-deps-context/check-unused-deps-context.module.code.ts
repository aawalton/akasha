import { execFileSync } from "node:child_process"
import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { z } from "zod"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import {
  LOCKFILE_RESOLVES_EDGE_TYPE,
  LockfilePackageAttrsSchema,
} from "../../../../../tools/lib/graph/producers/lockfile-package/types.ts"
import {
  PACKAGE_NODE_TYPE,
  type PackageAttrs,
  PackageAttrsSchema,
  type PkgDependsKind,
} from "../../../../../tools/lib/graph/producers/package/types.ts"
import type { Graph, Node } from "../../../../../tools/lib/graph/types.ts"
import type {
  CliArgs,
  RepoContext,
  WorkspaceInfo,
} from "../check-unused-deps-types/check-unused-deps-types.module.code.ts"
import { usageByWorkspace } from "../check-unused-deps-usage/check-unused-deps-usage.module.code.ts"
import { parseArgs as parseCliArgs } from "../cli-args/cli-args.module.code.ts"
import { examinePopulation } from "../population/population.module.code.ts"

const GIT_CEILING_MS = 60_000

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

export function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    throw new Error(errorMessage(err).replace(/^Unknown flag: /, "unknown argument: "))
  }
  if (parsed.positionals.length > 0) {
    throw new Error(`unknown argument: ${parsed.positionals[0]}`)
  }
  return { jsonOutput: parsed.flags.json, treeSha: parsed.flags.treeSha }
}

const RootManifestSchema = z
  .object({ patchedDependencies: z.record(z.string(), z.string()).optional() })
  .passthrough()

function patchedDepNameFromKey(key: string): string {
  const at = key.lastIndexOf("@")
  if (at <= 0) return key
  return key.slice(0, at)
}

export function readPatchedDeps(root: string, treeSha: string): ReadonlySet<string> {
  const at = `${treeSha}:package.json`
  let raw: string
  try {
    raw = execFileSync("git", ["-C", root, "show", at], {
      encoding: "utf-8",
      timeout: GIT_CEILING_MS,
      stdio: ["ignore", "pipe", "pipe"],
    })
  } catch (err) {
    throw new Error(
      `could not read ${at} in ${root} within ${GIT_CEILING_MS}ms, and the root manifest is ` +
        `the only place \`patchedDependencies\` stands — the package graph carries no such attribute: ${errorMessage(err)}`
    )
  }
  const manifest = RootManifestSchema.parse(JSON.parse(raw))
  const names = new Set<string>()
  for (const key of Object.keys(manifest.patchedDependencies ?? {})) {
    names.add(patchedDepNameFromKey(key))
  }
  return names
}

function kindsByDep(attrs: PackageAttrs): ReadonlyMap<string, ReadonlySet<PkgDependsKind>> {
  const byDep = new Map<string, ReadonlySet<PkgDependsKind>>()
  for (const [name, kind] of Object.entries(attrs.dependencies)) {
    byDep.set(name, new Set<PkgDependsKind>([kind]))
  }
  for (const [name, kinds] of Object.entries(attrs.externalDependencies)) {
    byDep.set(name, new Set<PkgDependsKind>(kinds))
  }
  return byDep
}

function namesUnder(
  byDep: ReadonlyMap<string, ReadonlySet<PkgDependsKind>>,
  kind: PkgDependsKind
): ReadonlySet<string> {
  const names = new Set<string>()
  for (const [name, kinds] of byDep) {
    if (kinds.has(kind)) names.add(name)
  }
  return names
}

function resolvedLockfilePackages(graph: Graph, nodeId: string): ReadonlyMap<string, string> {
  const byName = new Map<string, string>()
  for (const edge of graph.outEdges(nodeId, [LOCKFILE_RESOLVES_EDGE_TYPE])) {
    const target = graph.node(edge.to)
    if (target === undefined) continue
    byName.set(LockfilePackageAttrsSchema.parse(target.attrs).name, edge.to)
  }
  return byName
}

export function workspaceInfoOf(graph: Graph, node: Node): WorkspaceInfo {
  const attrs = PackageAttrsSchema.parse(node.attrs)
  const byDep = kindsByDep(attrs)
  const dependencies = namesUnder(byDep, "dependencies")
  const devDependencies = namesUnder(byDep, "devDependencies")
  const declared = new Set<string>([...dependencies, ...devDependencies])
  return {
    nodeId: node.id,
    root: attrs.path,
    name: attrs.name,
    dependencies,
    devDependencies,
    declared,
    peerDependencies: namesUnder(byDep, "peerDependencies"),
    resolved: resolvedLockfilePackages(graph, node.id),
  }
}

export function indexWorkspacesByName(
  workspaces: readonly WorkspaceInfo[]
): ReadonlyMap<string, WorkspaceInfo> {
  const byName = new Map<string, WorkspaceInfo>()
  for (const ws of workspaces) {
    if (ws.name !== "") byName.set(ws.name, ws)
  }
  return byName
}

export function computeTransitiveClosure(
  workspaces: readonly WorkspaceInfo[]
): ReadonlyMap<string, ReadonlySet<string>> {
  const byName = indexWorkspacesByName(workspaces)
  const byRoot = new Map<string, WorkspaceInfo>()
  for (const ws of workspaces) byRoot.set(ws.root, ws)
  const closure = new Map<string, ReadonlySet<string>>()

  const visit = (wsRoot: string, acc: Set<string>): undefined => {
    if (acc.has(wsRoot)) return
    acc.add(wsRoot)
    const ws = byRoot.get(wsRoot)
    if (ws === undefined) return
    for (const depName of ws.declared) {
      const target = byName.get(depName)
      if (target !== undefined) visit(target.root, acc)
    }
  }

  for (const ws of workspaces) {
    const acc = new Set<string>()
    visit(ws.root, acc)
    closure.set(ws.root, acc)
  }

  return closure
}

export async function loadRepoContext(args: CliArgs): Promise<RepoContext> {
  const root = codeRoot()
  const graph = await buildFrom(readAt(args.treeSha).ctx)

  const { population, violations: workspaces } = examinePopulation<Node, WorkspaceInfo>({
    members: graph.nodes(PACKAGE_NODE_TYPE),
    unit: "workspaces",
    labelOf: (node) => node.id,
    siteOf: (node) => {
      const attrs = PackageAttrsSchema.safeParse(node.attrs)
      return attrs.success ? resolve(root, attrs.data.path, "package.json") : null
    },
    examine: (node) => [workspaceInfoOf(graph, node)],
    membership: {
      kind: "enumerated",
      because:
        "these are the `package` nodes of the graph built at the tree sha above, and a build that " +
        "could not complete throws out of `buildFrom` rather than handing back a partial node set",
    },
  })

  return {
    codeRoot: root,
    treeSha: args.treeSha,
    workspaces,
    wsByName: indexWorkspacesByName(workspaces),
    closure: computeTransitiveClosure(workspaces),
    patchedDeps: readPatchedDeps(root, args.treeSha),
    usageByRoot: usageByWorkspace(graph, workspaces),
    graph,
    population,
  }
}
