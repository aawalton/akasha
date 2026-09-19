declare type GapTreeRow = TreeRow & {
  readonly gaps: number
  readonly children: readonly GapTreeRow[]
}

declare type GapTreeState = {
  readonly roots: readonly GapTreeRow[]
  readonly unreached: readonly string[]
}
