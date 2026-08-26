import { stringAt } from "../../../page/text/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { frontmatterAt } from "../../frontmatter-at/frontmatter-at.ts"
import type { BuildContext } from "../../build-context/build-context.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import { saidAt } from "../../../page/page.ts"
import { pagesOfType } from "../../page-index/page-index.ts"

export const FILE_KIND_EDGE = "file-kind"

const FILE_KIND_PAGE_TYPE = "file-kind-domain"

const EXTENSION_KEY = "extension"

const HELD = new WeakMap<BuildContext, ReadonlyMap<string, NodeRef>>()

function spellingIn(ctx: BuildContext): ReadonlyMap<string, NodeRef> {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made = new Map<string, NodeRef>()
  const where = new Map<string, string>()
  for (const at of pagesOfType(ctx, FILE_KIND_PAGE_TYPE)) {
    const fm = frontmatterAt(ctx, at.repo, at.key)
    if (fm === null) continue
    const spelled = stringAt(fm, EXTENSION_KEY)
    if (spelled === null) continue
    const already = where.get(spelled)
    if (already !== undefined) {
      throw new Error(
        `two file kinds claim the extension \`${spelled}\` — ${already} and ${saidAt(at)} — so nothing says which one a file carrying it is`
      )
    }
    where.set(spelled, saidAt(at))
    made.set(spelled, { repo: at.repo, key: at.key })
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
