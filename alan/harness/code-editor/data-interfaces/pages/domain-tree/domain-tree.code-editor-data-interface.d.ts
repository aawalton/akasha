declare type DomainTreeRow = TreeRow & {
  readonly persona: string | null
  readonly position: number | null
  readonly children: readonly DomainTreeRow[]
}

declare type DomainTreeState = {
  readonly roots: readonly DomainTreeRow[]
  readonly unreached: readonly string[]
}
