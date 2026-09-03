import { LockfilePackageAttrsSchema } from "../../../../../tools/lib/graph/producers/lockfile-package/types.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"
import type {
  EffectiveUsage,
  Finding,
  RepoContext,
  WorkspaceInfo,
} from "../check-unused-deps-types/check-unused-deps-types.module.code.ts"

const NOTHING: ReadonlySet<string> = new Set<string>()

const NOT_USED = "not used directly by this workspace"

function lockfileAttrsFor(
  graph: Graph,
  ws: WorkspaceInfo,
  depName: string
): ReturnType<typeof LockfilePackageAttrsSchema.parse> | null {
  const id = ws.resolved.get(depName)
  if (id === undefined) return null
  const node = graph.node(id)
  if (node === undefined) return null
  return LockfilePackageAttrsSchema.parse(node.attrs)
}

function peersOf(graph: Graph, ws: WorkspaceInfo, depName: string): ReadonlySet<string> {
  const attrs = lockfileAttrsFor(graph, ws, depName)
  if (attrs === null) return NOTHING
  const peers = new Set<string>()
  for (const declared of attrs.declaredDeps) {
    if (declared.kind === "peerDependencies") peers.add(declared.name)
  }
  return peers
}

function binCommandsOf(graph: Graph, ws: WorkspaceInfo, depName: string): readonly string[] {
  return lockfileAttrsFor(graph, ws, depName)?.binCommands ?? []
}

function typesTarget(typesName: string): string {
  const bare = typesName.slice("@types/".length)
  if (bare.includes("__")) {
    const [scope, rest] = bare.split("__", 2)
    return `@${scope}/${rest}`
  }
  return bare
}

function effectiveUsage(ws: WorkspaceInfo, ctx: RepoContext): EffectiveUsage {
  const usage = ctx.usageByRoot.get(ws.root)
  const peerDeps = new Set<string>()
  for (const directDep of ws.declared) {
    const directWs = ctx.wsByName.get(directDep)
    if (directWs === undefined) continue
    for (const peer of directWs.peerDependencies) peerDeps.add(peer)
  }
  return {
    specifiers: usage?.specifiers ?? NOTHING,
    commands: usage?.commands ?? NOTHING,
    peerDeps,
    protocols: usage?.protocols ?? NOTHING,
    hasTsconfig: usage?.hasTsconfig ?? false,
    configFileNames: usage?.configFileNames ?? NOTHING,
  }
}

export function findingsForWorkspace(ws: WorkspaceInfo, ctx: RepoContext): readonly Finding[] {
  if (ws.declared.size === 0) return []

  const effective = effectiveUsage(ws, ctx)

  const findings: Finding[] = []
  for (const dep of ws.declared) {
    const reason = judgeDep(dep, ws, ctx, effective)
    if (reason === null) continue
    findings.push({
      workspace: ws.name,
      workspaceRoot: ws.root,
      dep,
      depType: ws.dependencies.has(dep) ? "dependencies" : "devDependencies",
      reason,
    })
  }
  return findings
}

function judgeDep(
  dep: string,
  ws: WorkspaceInfo,
  ctx: RepoContext,
  effective: EffectiveUsage
): string | null {
  if (ctx.wsByName.has(dep)) return null

  if (effective.specifiers.has(dep)) return null

  if (ws.root === "" && ctx.patchedDeps.has(dep)) return null

  if (effective.peerDeps.has(dep)) return null

  if (ws.peerDependencies.has(dep)) return null

  for (const ownDep of ws.declared) {
    if (ownDep === dep) continue
    if (ctx.wsByName.has(ownDep)) continue
    if (peersOf(ctx.graph, ws, ownDep).has(dep)) return null
  }

  const isOpaqueWorkspace = ws.root !== "" && ctx.usageByRoot.get(ws.root)?.hasTsconfig === false
  if (isOpaqueWorkspace) {
    for (const [otherRoot, otherClosure] of ctx.closure) {
      if (otherRoot === ws.root) continue
      if (!otherClosure.has(ws.root)) continue
      const otherUsage = ctx.usageByRoot.get(otherRoot)
      if (otherUsage?.specifiers.has(dep) === true) return null
      if (otherUsage?.protocols.has(dep) === true) return null
    }
  }

  if (dep === "typescript" && effective.hasTsconfig) return null

  if (dep === "@types/bun") {
    for (const protocol of effective.protocols) {
      if (protocol.startsWith("bun:")) return null
    }
  }

  if (dep === "@types/node") {
    for (const protocol of effective.protocols) {
      if (protocol.startsWith("node:")) return null
    }
  }

  if (dep.startsWith("@types/")) {
    const target = typesTarget(dep)
    if (effective.specifiers.has(target)) return null
    if (ws.declared.has(target)) return null
  }

  if (effective.commands.size > 0) {
    for (const cmd of binCommandsOf(ctx.graph, ws, dep)) {
      if (effective.commands.has(cmd)) return null
    }
    if (effective.commands.has(dep)) return null
  }

  return NOT_USED
}
