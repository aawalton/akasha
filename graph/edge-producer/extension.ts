import { BORROWED_REPO, borrowedPages } from "../../page/borrowed.ts"
import { blockOf, stringAt, textAt } from "../../page/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"

export const FILE_KIND_EDGE = "file-kind"

const FILE_KIND_PAGE_TYPE = "file-kind-domain"

const EXTENSION_KEY = "extension"

const HELD = new WeakMap<BuildContext, ReadonlyMap<string, NodeRef>>()

function spellingIn(ctx: BuildContext): ReadonlyMap<string, NodeRef> {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made = new Map<string, NodeRef>()
  const root = ctx.roots[BORROWED_REPO]
  if (root !== undefined) {
    for (const key of borrowedPages(root, FILE_KIND_PAGE_TYPE)) {
      const text = textAt(root, key)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      const spelled = stringAt(fm, EXTENSION_KEY)
      if (spelled === null || made.has(spelled)) continue
      made.set(spelled, { repo: BORROWED_REPO, key })
    }
  }
  HELD.set(ctx, made)
  return made
}

export const extensionEdgeProducer: EdgeProducer = {
  name: "extension",
  edgeKinds: () => [FILE_KIND_EDGE],
  from: (ctx, file) => {
    const extension = file.attrs["file-extension"]
    if (extension === null) return []
    const to = spellingIn(ctx).get(extension)
    if (to === undefined) return []
    const edge: EdgeInit = {
      kind: FILE_KIND_EDGE,
      from: { repo: file.repo, key: file.key },
      to,
      attrs: {},
    }
    return [edge]
  },
}

export default extensionEdgeProducer
