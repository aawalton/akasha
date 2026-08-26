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
  readonly build: (ctx: BuildContext) => readonly Node[]
}
