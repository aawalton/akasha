import { attachmentFileOf } from "../../../page/attachment-file.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import fileNodeProducer from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"

export const CODE_EDGE = "code"

const CODE_KEY = "code"

const CODE_EXTENSION = "ts"

export const besideEdgeProducer: EdgeProducer = {
  name: "beside",
  edgeKinds: () => [CODE_EDGE],
  from: (ctx, file) => {
    if (file.attrs["page-type-slug"] === null) return []
    const ref = { repo: file.repo, key: attachmentFileOf(file.key, CODE_KEY, CODE_EXTENSION) }
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
