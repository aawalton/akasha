import type { FileNode } from "../node-producer/file/file.graph-node-producer.code.attachment.ts"
import type { FolderNode } from "../node-producer/folder/folder.graph-node-producer.code.attachment.ts"
import type { BuildContext } from "../build-context/build-context.ts"
import type { NodeRef } from "../node-producer/node-shape.ts"

export type EdgeAttrs = Readonly<Record<string, string>>

export type GraphNode = FileNode | FolderNode

export type EdgeInit = {
  readonly kind: string
  readonly from: NodeRef
  readonly to: NodeRef
  readonly attrs: EdgeAttrs
}

export type EdgeProducer = {
  readonly name: string
  readonly edgeKinds: (ctx: BuildContext) => readonly string[]
  readonly from: (ctx: BuildContext, node: GraphNode) => readonly EdgeInit[]
  readonly into?: (ctx: BuildContext, ref: NodeRef) => readonly EdgeInit[] | null
}
