import type { BuildContext } from "../build-context/build-context.ts"

export type NodeRef = {
  readonly repo: string
  readonly key: string
}

export type NodeProducer<Node extends NodeRef> = {
  readonly name: string
  readonly nodeKinds: readonly string[]
  readonly at: (ctx: BuildContext, ref: NodeRef) => Node | null
  readonly all: (ctx: BuildContext, repos: readonly string[]) => readonly Node[]
}
