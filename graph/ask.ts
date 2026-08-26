import besideEdgeProducer from "./edge-producer/beside.ts"
import extensionEdgeProducer from "./edge-producer/extension.ts"
import frontmatterEdgeProducer from "./edge-producer/frontmatter.ts"
import pathEdgeProducer from "./edge-producer/path.ts"
import typescriptEdgeProducer from "./edge-producer/typescript.ts"
import type { EdgeInit, EdgeProducer } from "./edge-shape.ts"
import fileNodeProducer, { type FileNode } from "./node-producer/file.ts"
import type { BuildContext, NodeRef } from "./node-shape.ts"

export const EDGE_PRODUCERS: readonly EdgeProducer[] = [
  frontmatterEdgeProducer,
  extensionEdgeProducer,
  typescriptEdgeProducer,
  besideEdgeProducer,
  pathEdgeProducer,
]
export function nodeAt(ctx: BuildContext, ref: NodeRef): FileNode | null {
  return fileNodeProducer.at(ctx, ref)
}

export function nodesIn(ctx: BuildContext, repos: readonly string[]): readonly FileNode[] {
  return fileNodeProducer.all(ctx, repos)
}

export function edgesFrom(
  ctx: BuildContext,
  file: FileNode,
  kind: string | null = null
): readonly EdgeInit[] {
  const edges: EdgeInit[] = []
  for (const producer of EDGE_PRODUCERS) {
    if (kind !== null && !producer.edgeKinds(ctx).includes(kind)) continue
    for (const edge of producer.from(ctx, file)) {
      if (kind !== null && edge.kind !== kind) continue
      edges.push(edge)
    }
  }
  return edges
}

function refKey(ref: NodeRef): string {
  return `${ref.repo}\u0000${ref.key}`
}

export function edgesInto(
  ctx: BuildContext,
  refs: readonly NodeRef[],
  repos: readonly string[],
  kind: string | null = null
): readonly EdgeInit[] {
  const wanted = new Set(refs.map(refKey))
  if (wanted.size === 0) return []
  const found: EdgeInit[] = []
  for (const file of nodesIn(ctx, repos)) {
    for (const edge of edgesFrom(ctx, file, kind)) {
      if (wanted.has(refKey(edge.to))) found.push(edge)
    }
  }
  return found
}
