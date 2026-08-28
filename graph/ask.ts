import containsEdgeProducer from "./edge-producer/contains/contains.graph-edge-producer.code.attachment.ts"
import relationEdgeProducer, { LINKS_SAID } from "./edge-producer/relation/relation.graph-edge-producer.code.attachment.ts"
import loaderEdgeProducer from "./edge-producer/loader/loader.graph-edge-producer.code.attachment.ts"
import importEdgeProducer, { IMPORT_SAID } from "./edge-producer/import/import.graph-edge-producer.code.attachment.ts"
import type { EdgeAttrs, EdgeInit, EdgeProducer, GraphNode } from "./edge-producer/edge-shape.ts"
import fileNodeProducer, { type FileNode } from "./node-producer/file/file.graph-node-producer.code.attachment.ts"
import folderNodeProducer, { type FolderNode } from "./node-producer/folder/folder.graph-node-producer.code.attachment.ts"
import type { BuildContext, SaidName } from "./build-context/build-context.ts"
import { FRONTMATTER_SAID } from "./frontmatter-at/frontmatter-at.ts"
import type { NodeRef } from "./node-producer/node-shape.ts"

export const EDGE_PRODUCERS: readonly EdgeProducer[] = [
  relationEdgeProducer,
  importEdgeProducer,
  loaderEdgeProducer,
  containsEdgeProducer,
]
export const HELD_ANSWERS: readonly SaidName[] = [FRONTMATTER_SAID, IMPORT_SAID, LINKS_SAID]

export function nodeAt(ctx: BuildContext, ref: NodeRef): FileNode | null {
  return fileNodeProducer.at(ctx, ref)
}

export function nodesIn(ctx: BuildContext, repos: readonly string[]): readonly FileNode[] {
  return fileNodeProducer.all(ctx, repos)
}

export function folderAt(ctx: BuildContext, ref: NodeRef): FolderNode | null {
  return folderNodeProducer.at(ctx, ref)
}

export function foldersIn(ctx: BuildContext, repos: readonly string[]): readonly FolderNode[] {
  return folderNodeProducer.all(ctx, repos)
}

export const NARROWS_NOTHING: EdgeAttrs = {}

function carries(edge: EdgeInit, narrowing: readonly (readonly [string, string])[]): boolean {
  for (const [name, value] of narrowing) if (edge.attrs[name] !== value) return false
  return true
}

function edgesOf(
  ctx: BuildContext,
  node: GraphNode,
  producers: readonly EdgeProducer[],
  kinds: readonly string[],
  attrs: EdgeAttrs
): readonly EdgeInit[] {
  const wanted = new Set(kinds)
  if (wanted.size === 0) return []
  const narrowing = Object.entries(attrs)
  const edges: EdgeInit[] = []
  for (const producer of producers) {
    if (!producer.edgeKinds(ctx).some((kind) => wanted.has(kind))) continue
    for (const edge of producer.from(ctx, node)) {
      if (!wanted.has(edge.kind)) continue
      if (!carries(edge, narrowing)) continue
      edges.push(edge)
    }
  }
  return edges
}

export function edgesFrom(
  ctx: BuildContext,
  node: GraphNode,
  kinds: readonly string[],
  attrs: EdgeAttrs = NARROWS_NOTHING
): readonly EdgeInit[] {
  return edgesOf(ctx, node, EDGE_PRODUCERS, kinds, attrs)
}

function refKey(ref: NodeRef): string {
  return `${ref.repo}\0${ref.key}`
}

export function edgesInto(
  ctx: BuildContext,
  refs: readonly NodeRef[],
  repos: readonly string[],
  kinds: readonly string[],
  attrs: EdgeAttrs = NARROWS_NOTHING
): readonly EdgeInit[] {
  const wanted = new Set(kinds)
  if (wanted.size === 0 || refs.length === 0) return []
  const narrowing = Object.entries(attrs)
  const reached = new Set(repos)
  const found: EdgeInit[] = []

  const walked: EdgeProducer[] = []
  for (const producer of EDGE_PRODUCERS) {
    if (!producer.edgeKinds(ctx).some((kind) => wanted.has(kind))) continue
    const into = producer.into
    if (into === undefined) {
      walked.push(producer)
      continue
    }
    const answered: EdgeInit[] = []
    let targeted = true
    for (const ref of refs) {
      if (!reached.has(ref.repo)) continue
      const said = into(ctx, ref)
      if (said === null) {
        targeted = false
        break
      }
      for (const edge of said) {
        if (!wanted.has(edge.kind)) continue
        if (!carries(edge, narrowing)) continue
        answered.push(edge)
      }
    }
    if (!targeted) {
      walked.push(producer)
      continue
    }
    for (const edge of answered) found.push(edge)
  }
  if (walked.length === 0) return found

  const at = new Set(refs.map(refKey))
  const walk = (nodes: readonly GraphNode[]): void => {
    for (const node of nodes) {
      for (const edge of edgesOf(ctx, node, walked, kinds, attrs)) {
        if (at.has(refKey(edge.to))) found.push(edge)
      }
    }
  }
  walk(nodesIn(ctx, repos))
  walk(foldersIn(ctx, repos))
  return found
}
