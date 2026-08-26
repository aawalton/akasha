export type Roots = Readonly<Record<string, string | undefined>>

export type Said = {
  readonly of: (name: string, repo: string, key: string, work: () => unknown) => unknown
  readonly done: () => void
}

export const KEEPS_NOTHING: Said = {
  of: (_name, _repo, _key, work) => work(),
  done: () => {},
}

export type BuildContext = {
  readonly roots: Roots
  readonly said: Said
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
