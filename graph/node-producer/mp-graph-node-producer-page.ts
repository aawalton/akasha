import type { Roots } from "../../../instructions/tools/lib/roots.ts"
import { diskFileTree } from "../../../instructions/tools/page/page-file-tree.ts"
import { registryOf } from "../../../instructions/tools/page/page-registry.ts"
import {
  blockOf,
  PAGE_TYPE_SLUG,
  pagesOf,
  stringAt,
  textAt,
} from "../../../instructions/tools/page/page-types.ts"

export const PAGE_NODE_KIND = "page"

const SLUG = "slug"

export type BuildContext = {
  readonly roots: Roots
}

export type NodeRef = {
  readonly repo: string
  readonly key: string
}

export type PageNodeAttrs = {
  readonly slug: string | null
  readonly pageTypeSlug: string
}

export type PageNode = NodeRef & {
  readonly kind: typeof PAGE_NODE_KIND
  readonly attrs: PageNodeAttrs
}

export type NodeProducer<Node extends NodeRef> = {
  readonly name: string
  readonly nodeKinds: readonly string[]
  readonly build: (ctx: BuildContext) => readonly Node[]
}

function pageNodeAt(root: string, relPath: string, claimedBy: string): PageNodeAttrs | null {
  const text = textAt(root, relPath)
  if (text === null) return null
  const { fm, why } = blockOf(text)
  if (why !== null) return { slug: null, pageTypeSlug: claimedBy }
  return {
    slug: stringAt(fm, SLUG),
    pageTypeSlug: stringAt(fm, PAGE_TYPE_SLUG) ?? claimedBy,
  }
}

export const pageNodeProducer: NodeProducer<PageNode> = {
  name: "page",
  nodeKinds: [PAGE_NODE_KIND],
  build: (ctx) => {
    const nodes: PageNode[] = []
    const standing = new Set<string>()
    for (const pageType of registryOf(diskFileTree(ctx.roots))) {
      const repo = pageType.repo
      if (repo === null) continue
      const root = ctx.roots[repo]
      if (root === undefined) continue
      for (const relPath of pagesOf(root, pageType)) {
        const at = `${repo}:${relPath}`
        if (standing.has(at)) continue
        standing.add(at)
        const attrs = pageNodeAt(root, relPath, pageType.slug)
        if (attrs === null) continue
        nodes.push({ kind: PAGE_NODE_KIND, repo, key: relPath, attrs })
      }
    }
    return nodes
  },
}

export default pageNodeProducer
