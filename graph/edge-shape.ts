import type { FileNode } from "./node-producer/file.ts"
import type { BuildContext, NodeRef } from "./build-context/build-context.ts"

export type EdgeAttrs = Readonly<Record<string, string>>

export type EdgeInit = {
  readonly kind: string
  readonly from: NodeRef
  readonly to: NodeRef
  readonly attrs: EdgeAttrs
}

export type EdgeProducer = {
  readonly name: string
  readonly edgeKinds: (ctx: BuildContext) => readonly string[]
  readonly from: (ctx: BuildContext, file: FileNode) => readonly EdgeInit[]
}
