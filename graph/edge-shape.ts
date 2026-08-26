import type { FileNode } from "./node-producer/file.ts"
import type { BuildContext, NodeRef } from "./node-shape.ts"

export type EdgeInit = {
  readonly kind: string
  readonly from: NodeRef
  readonly to: NodeRef
}

export type EdgeProducer = {
  readonly name: string
  readonly edgeKinds: readonly string[]
  readonly build: (ctx: BuildContext, files: readonly FileNode[]) => readonly EdgeInit[]
}
