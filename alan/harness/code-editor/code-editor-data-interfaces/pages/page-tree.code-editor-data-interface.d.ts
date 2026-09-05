// The pages panel, assembled whole. The editor was building this tree out of three flat lists of
// rows on its own thread; the service builds it now and the editor reads it.

declare type PageTreeRow = TreeRow & {
  readonly detail: string | null
  readonly children: readonly PageTreeRow[]
}

declare type PageTreeState = {
  readonly roots: readonly PageTreeRow[]
  readonly unreached: readonly string[]
}
