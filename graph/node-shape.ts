import type { Roots } from "../../instructions/tools/lib/roots.ts"

export type BuildContext = {
  readonly roots: Roots
}

export type NodeRef = {
  readonly repo: string
  readonly key: string
}

export type NodeProducer<Node extends NodeRef> = {
  readonly name: string
  readonly nodeKinds: readonly string[]
  readonly at: (ctx: BuildContext, ref: NodeRef) => Node | null
  readonly all: (ctx: BuildContext) => readonly Node[]
}
