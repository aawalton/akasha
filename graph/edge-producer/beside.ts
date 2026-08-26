import type { EdgeInit, EdgeProducer } from "./edge-shape.ts"
import fileNodeProducer from "../node-producer/file/file.ts"

export const CODE_EDGE = "code"

const CODE_EXTENSION = "ts"

export const besideEdgeProducer: EdgeProducer = {
  name: "beside",
  edgeKinds: () => [CODE_EDGE],
  from: (ctx, file) => {
    if (file.attrs["page-type-slug"] === null) return []
    const cut = file.key.lastIndexOf("/")
    const within = cut < 0 ? "" : file.key.slice(0, cut + 1)
    const ref = { repo: file.repo, key: `${within}${file.attrs["file-stem"]}.${CODE_EXTENSION}` }
    if (fileNodeProducer.at(ctx, ref) === null) return []
    const edge: EdgeInit = {
      kind: CODE_EDGE,
      from: { repo: file.repo, key: file.key },
      to: ref,
      attrs: {},
    }
    return [edge]
  },
}

export default besideEdgeProducer
