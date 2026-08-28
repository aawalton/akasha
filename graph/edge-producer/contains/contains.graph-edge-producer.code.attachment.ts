import type { BuildContext } from "../../build-context/build-context.ts"
import type { EdgeInit, EdgeProducer, GraphNode } from "../edge-shape.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import fileNodeProducer from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import folderNodeProducer, {
  FOLDER_NODE_KIND,
} from "../../node-producer/folder/folder.graph-node-producer.code.attachment.ts"

export const CONTAINS_EDGE = "contains"

const ROOT_FOLDER = ""

const KINDS: readonly string[] = [CONTAINS_EDGE]

const HOLDS_PLAINLY = {}

const HELD = new WeakMap<BuildContext, Map<string, ReadonlyMap<string, readonly string[]>>>()

function folderOf(key: string): string {
  const cut = key.lastIndexOf("/")
  return cut < 0 ? ROOT_FOLDER : key.slice(0, cut)
}

function edgeOf(repo: string, folder: string, child: string): EdgeInit {
  return { kind: CONTAINS_EDGE, from: { repo, key: folder }, to: { repo, key: child }, attrs: HOLDS_PLAINLY }
}

function childrenOver(ctx: BuildContext, repo: string): ReadonlyMap<string, readonly string[]> {
  const made = new Map<string, string[]>()
  const put = (key: string): void => {
    if (key === ROOT_FOLDER) return
    const parent = folderOf(key)
    const there = made.get(parent)
    if (there === undefined) made.set(parent, [key])
    else there.push(key)
  }
  for (const file of fileNodeProducer.all(ctx, [repo])) put(file.key)
  for (const folder of folderNodeProducer.all(ctx, [repo])) put(folder.key)
  return made
}

function childrenIn(ctx: BuildContext, repo: string): ReadonlyMap<string, readonly string[]> {
  let held = HELD.get(ctx)
  if (held === undefined) {
    held = new Map()
    HELD.set(ctx, held)
  }
  const there = held.get(repo)
  if (there !== undefined) return there
  const made = childrenOver(ctx, repo)
  held.set(repo, made)
  return made
}

export const containsEdgeProducer: EdgeProducer = {
  name: "contains",
  edgeKinds: () => KINDS,
  from: (ctx: BuildContext, node: GraphNode): readonly EdgeInit[] => {
    if (node.kind !== FOLDER_NODE_KIND) return []
    const children = childrenIn(ctx, node.repo).get(node.key)
    if (children === undefined) return []
    return children.map((child) => edgeOf(node.repo, node.key, child))
  },
  into: (ctx: BuildContext, ref: NodeRef): readonly EdgeInit[] => {
    if (ref.key === ROOT_FOLDER) return []
    const parent = folderOf(ref.key)
    if (folderNodeProducer.at(ctx, { repo: ref.repo, key: parent }) === null) return []
    const held =
      fileNodeProducer.at(ctx, ref) ?? folderNodeProducer.at(ctx, ref)
    if (held === null) return []
    return [edgeOf(ref.repo, parent, ref.key)]
  },
}

export default containsEdgeProducer
