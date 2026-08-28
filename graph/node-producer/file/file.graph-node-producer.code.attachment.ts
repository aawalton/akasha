import type { BuildContext } from "../../build-context/build-context.ts"
import type { NodeProducer, NodeRef } from "../node-shape.ts"
import { pageNameOf } from "../../../page/name/name.ts"
import { trackedIn } from "../../../page/tracked/tracked.ts"

export const FILE_NODE_KIND = "file"

export type FileNodeAttrs = {
  readonly "file-stem": string
  readonly "page-type-slug": string | null
  readonly "file-extension": string | null
}

export type FileNode = NodeRef & {
  readonly kind: typeof FILE_NODE_KIND
  readonly attrs: FileNodeAttrs
}

const HELD = new WeakMap<BuildContext, Map<string, ReadonlySet<string>>>()

export function keysIn(ctx: BuildContext, repo: string, root: string): ReadonlySet<string> {
  let held = HELD.get(ctx)
  if (held === undefined) {
    held = new Map()
    HELD.set(ctx, held)
  }
  const found = held.get(repo)
  if (found !== undefined) return found
  const made = new Set(trackedIn(root))
  held.set(repo, made)
  return made
}

export function namedBy(key: string): FileNodeAttrs {
  const base = key.slice(key.lastIndexOf("/") + 1)
  const dot = base.lastIndexOf(".")
  if (dot <= 0) return { "file-stem": base, "page-type-slug": null, "file-extension": null }
  const extension = base.slice(dot + 1)
  const named = pageNameOf(key)
  if (named === null)
    return { "file-stem": base.slice(0, dot), "page-type-slug": null, "file-extension": extension }
  return { "file-stem": named.stem, "page-type-slug": named.type, "file-extension": extension }
}

function nodeOf(repo: string, key: string, attrs: FileNodeAttrs): FileNode {
  return { kind: FILE_NODE_KIND, repo, key, attrs }
}

export const fileNodeProducer: NodeProducer<FileNode> = {
  name: "file",
  nodeKinds: [FILE_NODE_KIND],
  at: (ctx, ref) => {
    const root = ctx.roots[ref.repo]
    if (root === undefined) return null
    if (!keysIn(ctx, ref.repo, root).has(ref.key)) return null
    return nodeOf(ref.repo, ref.key, namedBy(ref.key))
  },
  all: (ctx, repos) => {
    const nodes: FileNode[] = []
    for (const repo of repos) {
      const root = ctx.roots[repo]
      if (root === undefined) continue
      for (const key of keysIn(ctx, repo, root)) nodes.push(nodeOf(repo, key, namedBy(key)))
    }
    return nodes
  },
}

export default fileNodeProducer
