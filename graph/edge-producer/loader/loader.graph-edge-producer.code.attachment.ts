import type { BuildContext } from "../../build-context/build-context.ts"
import { frontmatterAt } from "../../frontmatter-at/frontmatter-at.ts"
import fileNodeProducer, { FILE_NODE_KIND } from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import { attachmentFileOf } from "../../../page/attachment-file.ts"
import { pagesOfType } from "../../page-index/page-index.ts"
import type { EdgeInit, EdgeProducer, GraphNode } from "../edge-shape.ts"
import { IMPORT_EDGE } from "../import/import.graph-edge-producer.code.attachment.ts"

const PAGE_TYPE = "page-type"

const LOADER_KEY = "code-loaded-by"

const CODE_KEY = "code"

const CODE_EXTENSION = "ts"

const NONE = "none"

const CODE_TAIL = `.${CODE_KEY}.attachment.${CODE_EXTENSION}`

const PAGE_TAIL = ".md"

const HELD = new WeakMap<BuildContext, ReadonlyMap<string, NodeRef>>()

function statedLoader(said: unknown): NodeRef | null {
  if (typeof said !== "string") return null
  const text = said.trim()
  if (text === "" || text === NONE) return null
  const cut = text.indexOf(":")
  if (cut < 1 || cut === text.length - 1) return null
  return { repo: text.slice(0, cut), key: text.slice(cut + 1) }
}

function loadersOver(ctx: BuildContext): ReadonlyMap<string, NodeRef> {
  const found = new Map<string, NodeRef>()
  for (const at of pagesOfType(ctx, PAGE_TYPE)) {
    const fm = frontmatterAt(ctx, at.repo, at.key)
    if (fm === null) continue
    const loader = statedLoader(fm.fields.get(LOADER_KEY))
    if (loader === null) continue
    found.set(at.stem, loader)
  }
  return found
}

function loadersIn(ctx: BuildContext): ReadonlyMap<string, NodeRef> {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made = loadersOver(ctx)
  HELD.set(ctx, made)
  return made
}

function loadingOf(ctx: BuildContext, page: GraphNode, ref: NodeRef): readonly EdgeInit[] {
  if (page.kind !== FILE_NODE_KIND) return []
  const type = page.attrs["page-type-slug"]
  if (typeof type !== "string") return []
  const loader = loadersIn(ctx).get(type)
  if (loader === undefined) return []
  if (fileNodeProducer.at(ctx, ref) === null) return []
  if (ref.repo === loader.repo && ref.key === loader.key) return []
  const edge: EdgeInit = { kind: IMPORT_EDGE, from: loader, to: ref, attrs: {} }
  return [edge]
}

export const loaderEdgeProducer: EdgeProducer = {
  name: "loader",
  edgeKinds: () => [IMPORT_EDGE],
  from: (ctx: BuildContext, file: GraphNode) => {
    if (file.kind !== FILE_NODE_KIND) return []
    const ref = { repo: file.repo, key: attachmentFileOf(file.key, CODE_KEY, CODE_EXTENSION) }
    return loadingOf(ctx, file, ref)
  },
  into: (ctx: BuildContext, ref: NodeRef) => {
    if (!ref.key.endsWith(CODE_TAIL)) return []
    const key = `${ref.key.slice(0, -CODE_TAIL.length)}${PAGE_TAIL}`
    const page = fileNodeProducer.at(ctx, { repo: ref.repo, key })
    if (page === null) return []
    return loadingOf(ctx, page, ref)
  },
}

export default loaderEdgeProducer
