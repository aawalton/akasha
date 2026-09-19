declare type FindingTreeRow = TreeRow & {
  readonly findings: number
  readonly children: readonly FindingTreeRow[]
}

declare type FindingTreeState = {
  readonly roots: readonly FindingTreeRow[]
  readonly unreached: readonly string[]
}
