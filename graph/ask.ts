import frontmatterEdgeProducer from "./edge-producer/frontmatter/frontmatter.graph-edge-producer.code.attachment.ts"
import loaderEdgeProducer from "./edge-producer/loader/loader.graph-edge-producer.code.attachment.ts"
import typescriptEdgeProducer from "./edge-producer/typescript/typescript.graph-edge-producer.code.attachment.ts"
import type { EdgeAttrs, EdgeInit, EdgeProducer } from "./edge-producer/edge-shape.ts"
import fileNodeProducer, { type FileNode } from "./node-producer/file/file.graph-node-producer.code.attachment.ts"
import type { BuildContext } from "./build-context/build-context.ts"
import type { NodeRef } from "./node-producer/node-shape.ts"

export const EDGE_PRODUCERS: readonly EdgeProducer[] = [
  frontmatterEdgeProducer,
  typescriptEdgeProducer,
  loaderEdgeProducer,
]
export function nodeAt(ctx: BuildContext, ref: NodeRef): FileNode | null {
  return fileNodeProducer.at(ctx, ref)
}

export function nodesIn(ctx: BuildContext, repos: readonly string[]): readonly FileNode[] {
  return fileNodeProducer.all(ctx, repos)
}

export const NARROWS_NOTHING: EdgeAttrs = {}

function carries(edge: EdgeInit, narrowing: readonly (readonly [string, string])[]): boolean {
  for (const [name, value] of narrowing) if (edge.attrs[name] !== value) return false
  return true
}

export function edgesFrom(
  ctx: BuildContext,
  file: FileNode,
  kinds: readonly string[],
  attrs: EdgeAttrs = NARROWS_NOTHING
): readonly EdgeInit[] {
  const wanted = new Set(kinds)
  if (wanted.size === 0) return []
  const narrowing = Object.entries(attrs)
  const edges: EdgeInit[] = []
  for (const producer of EDGE_PRODUCERS) {
    if (!producer.edgeKinds(ctx).some((kind) => wanted.has(kind))) continue
    for (const edge of producer.from(ctx, file)) {
      if (!wanted.has(edge.kind)) continue
      if (!carries(edge, narrowing)) continue
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
  kinds: readonly string[],
  attrs: EdgeAttrs = NARROWS_NOTHING
): readonly EdgeInit[] {
  const wanted = new Set(refs.map(refKey))
  if (wanted.size === 0) return []
  const found: EdgeInit[] = []
  for (const file of nodesIn(ctx, repos)) {
    for (const edge of edgesFrom(ctx, file, kinds, attrs)) {
      if (wanted.has(refKey(edge.to))) found.push(edge)
    }
  }
  return found
}
