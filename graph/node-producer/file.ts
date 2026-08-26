import type { BuildContext, NodeProducer, NodeRef } from "../node-shape.ts"
import { pageNameOf } from "../../page/page-name.ts"
import { trackedIn } from "../../page/pages.ts"
import { AKASHA } from "../roots.ts"

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

function keysIn(ctx: BuildContext, repo: string, root: string): ReadonlySet<string> {
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

function carried(repo: string, key: string): boolean {
  return repo === AKASHA || pageNameOf(key) !== null
}

export const fileNodeProducer: NodeProducer<FileNode> = {
  name: "file",
  nodeKinds: [FILE_NODE_KIND],
  at: (ctx, ref) => {
    const root = ctx.roots[ref.repo]
    if (root === undefined) return null
    if (!carried(ref.repo, ref.key)) return null
    if (!keysIn(ctx, ref.repo, root).has(ref.key)) return null
    return nodeOf(ref.repo, ref.key, namedBy(ref.key))
  },
  all: (ctx) => {
    const nodes: FileNode[] = []
    for (const [repo, root] of Object.entries(ctx.roots)) {
      if (root === undefined) continue
      for (const key of keysIn(ctx, repo, root)) {
        if (!carried(repo, key)) continue
        nodes.push(nodeOf(repo, key, namedBy(key)))
      }
    }
    return nodes
  },
}

export default fileNodeProducer
