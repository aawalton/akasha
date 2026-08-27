import { IMPORT_DYNAMIC_EDGE_TYPE, IMPORT_STATIC_EDGE_TYPE, RE_EXPORT_EDGE_TYPE, TS_FILE_NODE_TYPES, tsFileNodeIdToCodeRepoRel } from "../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import { ImportStaticAttrsSchema, ReExportAttrsSchema } from "../../../../tools/lib/graph/producers/file/ts-file/types-schemas"
import type { Graph } from "../../../../tools/lib/graph/types.ts"

const WORKER_ENTRY_SUFFIX = ".worker.ts"
const SRC_SEGMENT = "/src/"

export interface TickPopulationCandidate {
  readonly relPath: string
  readonly runtimeImports: readonly string[]
}

function isJudgeableSource(relPath: string): boolean {
  if (!relPath.endsWith(".ts") && !relPath.endsWith(".tsx")) return false
  if (relPath.endsWith(".test.ts") || relPath.endsWith(".test.tsx")) return false
  const segs = relPath.split("/")
  if (segs.includes("dist")) return false
  const base = segs[segs.length - 1] ?? ""
  if (base.startsWith("_") && base.endsWith("-test-helpers.ts")) return false
  return true
}

export function workerEntryPaths(relPaths: Iterable<string>): ReadonlySet<string> {
  const entries = new Set<string>()
  for (const rel of relPaths) {
    if (!rel.endsWith(WORKER_ENTRY_SUFFIX)) continue
    if (rel.endsWith(".test.ts")) continue
    if (rel.split("/").includes("dist")) continue
    entries.add(rel)
  }
  return entries
}

export function workerPackageRoots(entries: Iterable<string>): ReadonlySet<string> {
  const roots = new Set<string>()
  for (const rel of entries) {
    const idx = rel.indexOf(SRC_SEGMENT)
    if (idx === -1) continue
    roots.add(rel.slice(0, idx + SRC_SEGMENT.length))
  }
  return roots
}

function reachableFrom(
  entries: Iterable<string>,
  importsByRelPath: ReadonlyMap<string, readonly string[]>
): ReadonlySet<string> {
  const visited = new Set<string>(entries)
  const queue: string[] = [...visited]
  while (queue.length > 0) {
    const cur = queue.shift()
    if (cur === undefined) break
    for (const target of importsByRelPath.get(cur) ?? []) {
      if (visited.has(target)) continue
      visited.add(target)
      queue.push(target)
    }
  }
  return visited
}

export function tickParticipatingPaths(
  candidates: readonly TickPopulationCandidate[]
): readonly string[] {
  const importsByRelPath = new Map<string, readonly string[]>()
  for (const c of candidates) importsByRelPath.set(c.relPath, c.runtimeImports)

  const entries = workerEntryPaths(importsByRelPath.keys())
  const roots = workerPackageRoots(entries)
  const reachable = reachableFrom(entries, importsByRelPath)

  const members: string[] = []
  for (const c of candidates) {
    if (!isJudgeableSource(c.relPath)) continue
    if (!reachable.has(c.relPath)) continue
    let underRoot = false
    for (const root of roots) {
      if (c.relPath.startsWith(root)) {
        underRoot = true
        break
      }
    }
    if (!underRoot && !entries.has(c.relPath)) continue
    members.push(c.relPath)
  }
  members.sort()
  return members
}

export function runtimeImportsByRelPath(graph: Graph): ReadonlyMap<string, readonly string[]> {
  const out = new Map<string, readonly string[]>()
  for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
    const from = tsFileNodeIdToCodeRepoRel(node.id)
    if (from === null) continue
    const targets: string[] = []
    for (const edge of graph.outEdges(node.id, [
      IMPORT_STATIC_EDGE_TYPE,
      IMPORT_DYNAMIC_EDGE_TYPE,
      RE_EXPORT_EDGE_TYPE,
    ])) {
      if (edge.type === IMPORT_STATIC_EDGE_TYPE) {
        if (ImportStaticAttrsSchema.parse(edge.attrs).typeOnly === true) continue
      } else if (edge.type === RE_EXPORT_EDGE_TYPE) {
        if (ReExportAttrsSchema.parse(edge.attrs).typeOnly === true) continue
      }
      const to = tsFileNodeIdToCodeRepoRel(edge.to)
      if (to === null) continue
      targets.push(to)
    }
    out.set(from, targets)
  }
  return out
}
