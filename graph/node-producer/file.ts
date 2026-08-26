import { execFileSync } from "node:child_process"
import { BORROWED_PAGE_TYPES, BORROWED_REPO, borrowedPages } from "../../page/borrowed.ts"
import { blockOf, PAGE_TYPE_SLUG, stringAt, textAt } from "../../page/text.ts"
import type { NodeProducer, NodeRef } from "../node-shape.ts"

export const FILE_NODE_KIND = "file"

export const AKASHA = "akasha"

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

export function trackedIn(root: string, key: string | null = null): readonly string[] {
  const listed = execFileSync(
    "git",
    key === null ? ["-C", root, "ls-files", "-z"] : ["-C", root, "ls-files", "-z", "--", key],
    { maxBuffer: BUFFER_CEILING }
  )
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

function nodeOf(repo: string, key: string, attrs: FileNodeAttrs): FileNode {
  return { kind: FILE_NODE_KIND, repo, key, attrs }
}

function borrowed(root: string, key: string): string | null {
  const text = textAt(root, key)
  if (text === null) return null
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  const slug = stringAt(fm, PAGE_TYPE_SLUG)
  return slug !== null && BORROWED_PAGE_TYPES.includes(slug) ? slug : null
}

export const fileNodeProducer: NodeProducer<FileNode> = {
  name: "file",
  nodeKinds: [FILE_NODE_KIND],
  at: (ctx, ref) => {
    const root = ctx.roots[ref.repo]
    if (root === undefined) return null
    const attrs = namedBy(ref.key)
    if (ref.repo === AKASHA) {
      return trackedIn(root, ref.key).length === 0 ? null : nodeOf(ref.repo, ref.key, attrs)
    }
    const held = borrowed(root, ref.key)
    if (held === null) return null
    return nodeOf(ref.repo, ref.key, { ...attrs, "page-type-slug": held })
  },
  all: (ctx) => {
    const nodes: FileNode[] = []
    const standing = new Set<string>()
    const own = ctx.roots[AKASHA]
    if (own !== undefined) {
      for (const key of trackedIn(own)) {
        standing.add(`${AKASHA}:${key}`)
        nodes.push(nodeOf(AKASHA, key, namedBy(key)))
      }
    }
    const lending = ctx.roots[BORROWED_REPO]
    if (lending !== undefined) {
      for (const slug of BORROWED_PAGE_TYPES) {
        for (const key of borrowedPages(lending, slug)) {
          const at = `${BORROWED_REPO}:${key}`
          if (standing.has(at)) continue
          standing.add(at)
          const attrs = namedBy(key)
          nodes.push(
            nodeOf(BORROWED_REPO, key, {
              ...attrs,
              "page-type-slug": attrs["page-type-slug"] ?? slug,
            })
          )
        }
      }
    }
    return nodes
  },
}

export default fileNodeProducer
