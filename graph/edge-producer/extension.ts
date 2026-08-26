import { blockOf, stringAt, textAt } from "../../../instructions/tools/page/page-types.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import type { FileNode } from "../node-producer/file.ts"

export const FILE_KIND_EDGE = "file-kind"

const FILE_KIND_PAGE_TYPE = "file-kind-domain"

const EXTENSION_KEY = "extension"

export const extensionEdgeProducer: EdgeProducer = {
  name: "extension",
  edgeKinds: [FILE_KIND_EDGE],
  build: (ctx, files) => {
    const spelling = new Map<string, FileNode>()
    for (const file of files) {
      if (file.attrs["page-type-slug"] !== FILE_KIND_PAGE_TYPE) continue
      const root = ctx.roots[file.repo]
      if (root === undefined) continue
      const text = textAt(root, file.key)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      const spelled = stringAt(fm, EXTENSION_KEY)
      if (spelled === null || spelling.has(spelled)) continue
      spelling.set(spelled, file)
    }
    const edges: EdgeInit[] = []
    for (const file of files) {
      const extension = file.attrs["file-extension"]
      if (extension === null) continue
      const kind = spelling.get(extension)
      if (kind === undefined) continue
      edges.push({
        kind: FILE_KIND_EDGE,
        from: { repo: file.repo, key: file.key },
        to: { repo: kind.repo, key: kind.key },
      })
    }
    return edges
  },
}

export default extensionEdgeProducer
