import besideEdgeProducer from "./edge-producer/beside.ts"
import extensionEdgeProducer from "./edge-producer/extension.ts"
import frontmatterEdgeProducer from "./edge-producer/frontmatter.ts"
import typescriptEdgeProducer from "./edge-producer/typescript.ts"
import type { EdgeInit, EdgeProducer } from "./edge-shape.ts"
import fileNodeProducer, { type FileNode } from "./node-producer/file.ts"
import type { BuildContext, NodeRef } from "./node-shape.ts"

export const EDGE_PRODUCERS: readonly EdgeProducer[] = [
  frontmatterEdgeProducer,
  extensionEdgeProducer,
  typescriptEdgeProducer,
  besideEdgeProducer,
]

export function nodeAt(ctx: BuildContext, ref: NodeRef): FileNode | null {
  return fileNodeProducer.at(ctx, ref)
}

export function everyNode(ctx: BuildContext): readonly FileNode[] {
  return fileNodeProducer.all(ctx)
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

export function everyEdge(ctx: BuildContext, kind: string | null = null): readonly EdgeInit[] {
  const edges: EdgeInit[] = []
  for (const file of everyNode(ctx)) edges.push(...edgesFrom(ctx, file, kind))
  return edges
}

export function edgesInto(
  ctx: BuildContext,
  ref: NodeRef,
  kind: string | null = null
): readonly EdgeInit[] {
  return everyEdge(ctx, kind).filter(
    (edge) => edge.to.repo === ref.repo && edge.to.key === ref.key
  )
}
