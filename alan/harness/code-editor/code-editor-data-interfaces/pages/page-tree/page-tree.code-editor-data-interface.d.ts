declare type PageTreeRow = TreeRow & {
  readonly detail: string | null
  readonly children: readonly PageTreeRow[]
}

declare type PageTreeState = {
  readonly roots: readonly PageTreeRow[]
  readonly unreached: readonly string[]
}
