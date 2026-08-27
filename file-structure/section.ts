import { relative, resolve } from "node:path"
import { edgesInto, nodesIn } from "../graph/ask.ts"
import { type BuildContext, KEEPS_NOTHING } from "../graph/build-context/build-context.ts"
import { RELATION_EDGE, RELATION_KEY } from "../graph/edge-producer/relation/relation.graph-edge-producer.code.attachment.ts"
import { IMPORT_EDGE } from "../graph/edge-producer/typescript/typescript.graph-edge-producer.code.attachment.ts"
import type { EdgeAttrs, EdgeInit } from "../graph/edge-producer/edge-shape.ts"
import type { FileNode } from "../graph/node-producer/file/file.graph-node-producer.code.attachment.ts"
import { AKASHA, rootFor, rootsHere } from "../repo/roots/roots.ts"

export const ROOT_FOLDER = "."

export const CODE_RELATION: EdgeAttrs = { [RELATION_KEY]: "code" }

export type Section = {
  readonly ctx: BuildContext
  readonly path: string
  readonly nodes: readonly FileNode[]
}

export function folderOf(key: string): string {
  const cut = key.lastIndexOf("/")
  return cut < 0 ? ROOT_FOLDER : key.slice(0, cut)
}

export function sectionAt(argv: readonly string[]): Section {
  const roots = rootsHere()
  const repoRoot = rootFor(roots, AKASHA)
  if (repoRoot === undefined) throw new Error("akasha is not cloned here, so there is no graph to ask")
  const at = resolve(argv[0] ?? ".")
  const path = relative(repoRoot, at)
  if (path === "" || path.startsWith("..")) {
    throw new Error(`${at} is outside akasha, and the graph this asks is the akasha one`)
  }
  const ctx = { roots, said: KEEPS_NOTHING }
  const nodes = nodesIn(ctx, [AKASHA])
    .filter((node) => node.key.startsWith(`${path}/`))
    .sort((one, two) => (one.key < two.key ? -1 : 1))
  if (nodes.length === 0) throw new Error(`${path} holds no file the graph knows`)
  return { ctx, path, nodes }
}

export function pointersInto(section: Section): readonly EdgeInit[] {
  const refs = section.nodes.map((node) => ({ repo: node.repo, key: node.key }))
  const repos = Object.keys(section.ctx.roots)
  return [
    ...edgesInto(section.ctx, refs, repos, [IMPORT_EDGE]),
    ...edgesInto(section.ctx, refs, repos, [RELATION_EDGE], CODE_RELATION),
  ]
}
