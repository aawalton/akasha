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
  // A producer that can name what reaches a node without producing every node answers here, and
  // `edgesInto` asks it instead of walking the repository. Leaving it off is what says the walk is
  // the only way to know.
  //
  // AN ANSWER MUST BE EVERY EDGE OF ITS KINDS REACHING THAT NODE, because the walk is skipped for a
  // producer that answers, so a partial answer makes the rest unreachable rather than slow. A
  // producer that cannot answer completely this time answers `null`, which asks to be walked.
  readonly into?: (ctx: BuildContext, ref: NodeRef) => readonly EdgeInit[] | null
}
