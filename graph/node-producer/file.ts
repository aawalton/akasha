import { execFileSync } from "node:child_process"
import type { NodeProducer, NodeRef } from "../node-shape.ts"

export const FILE_NODE_KIND = "file"

const AKASHA = "akasha"

const BUFFER_CEILING = 64 * 1024 * 1024

export type FileNode = NodeRef & {
  readonly kind: typeof FILE_NODE_KIND
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

export const fileNodeProducer: NodeProducer<FileNode> = {
  name: "file",
  nodeKinds: [FILE_NODE_KIND],
  build: (ctx) => {
    const root = ctx.roots[AKASHA]
    if (root === undefined) return []
    return trackedIn(root).map((key) => ({ kind: FILE_NODE_KIND, repo: AKASHA, key }))
  },
}

export default fileNodeProducer
