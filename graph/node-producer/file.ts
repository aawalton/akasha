import { execFileSync } from "node:child_process"
import type { NodeProducer, NodeRef } from "../node-shape.ts"

export const FILE_NODE_KIND = "file"

const AKASHA = "akasha"

const PAGE_EXTENSION = "md"

const BUFFER_CEILING = 64 * 1024 * 1024

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
    const root = ctx.roots[AKASHA]
    if (root === undefined) return []
    return trackedIn(root).map((key) => ({
      kind: FILE_NODE_KIND,
      repo: AKASHA,
      key,
      attrs: namedBy(key),
    }))
  },
}

export default fileNodeProducer
