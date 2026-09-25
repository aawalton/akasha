declare type RefusalTreeRow = TreeRow & {
  readonly refusals: number
  readonly children: readonly RefusalTreeRow[]
}

declare type RefusalTreeState = {
  readonly roots: readonly RefusalTreeRow[]
  readonly unreached: readonly string[]
}
