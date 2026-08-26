import { execFileSync } from "node:child_process"
import { diskFileTree } from "../../../instructions/tools/page/page-file-tree.ts"
import { registryOf } from "../../../instructions/tools/page/page-registry.ts"
import { pagesOf } from "../../../instructions/tools/page/page-types.ts"
import type { NodeProducer, NodeRef } from "../node-shape.ts"

export const FILE_NODE_KIND = "file"

const AKASHA = "akasha"

const PAGE_EXTENSION = "md"

const BUFFER_CEILING = 64 * 1024 * 1024

export const SCHEMA_PAGE_TYPES: readonly string[] = [
  "page-type",
  "page-property-type",
  "page-property-definition",
]

export type FileNodeAttrs = {
  readonly "file-stem": string
  readonly "page-type-slug": string | null
  readonly "file-extension": string | null
}

export type FileNode = NodeRef & {
  readonly kind: typeof FILE_NODE_KIND
  readonly attrs: FileNodeAttrs
}

function trackedIn(root: string): readonly string[] {
  const listed = execFileSync("git", ["-C", root, "ls-files", "-z"], {
    maxBuffer: BUFFER_CEILING,
  })
  return listed
    .toString("utf8")
    .split("\0")
    .filter((one) => one !== "")
}

export function namedBy(key: string): FileNodeAttrs {
  const base = key.slice(key.lastIndexOf("/") + 1)
  const dot = base.lastIndexOf(".")
  if (dot <= 0) return { "file-stem": base, "page-type-slug": null, "file-extension": null }
  const extension = base.slice(dot + 1)
  const rest = base.slice(0, dot)
  const plain = { "file-stem": rest, "page-type-slug": null, "file-extension": extension }
  if (extension !== PAGE_EXTENSION) return plain
  const inner = rest.lastIndexOf(".")
  if (inner <= 0) return plain
  return {
    "file-stem": rest.slice(0, inner),
    "page-type-slug": rest.slice(inner + 1),
    "file-extension": extension,
  }
}

export const fileNodeProducer: NodeProducer<FileNode> = {
  name: "file",
  nodeKinds: [FILE_NODE_KIND],
  build: (ctx) => {
    const nodes: FileNode[] = []
    const standing = new Set<string>()
    const own = ctx.roots[AKASHA]
    if (own !== undefined) {
      for (const key of trackedIn(own)) {
        standing.add(`${AKASHA}:${key}`)
        nodes.push({ kind: FILE_NODE_KIND, repo: AKASHA, key, attrs: namedBy(key) })
      }
    }
    for (const pageType of registryOf(diskFileTree(ctx.roots))) {
      if (!SCHEMA_PAGE_TYPES.includes(pageType.slug)) continue
      const repo = pageType.repo
      if (repo === null) continue
      const root = ctx.roots[repo]
      if (root === undefined) continue
      for (const key of pagesOf(root, pageType)) {
        const at = `${repo}:${key}`
        if (standing.has(at)) continue
        standing.add(at)
        const attrs = namedBy(key)
        nodes.push({
          kind: FILE_NODE_KIND,
          repo,
          key,
          attrs: { ...attrs, "page-type-slug": attrs["page-type-slug"] ?? pageType.slug },
        })
      }
    }
    return nodes
  },
}

export default fileNodeProducer
