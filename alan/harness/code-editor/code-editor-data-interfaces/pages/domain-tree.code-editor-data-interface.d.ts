// The domains panel, assembled whole. A row is a domain, and the tree is the part-of edge read
// downward. The champion each domain carries is not here: the tree the panel draws never read it.

declare type DomainTreeRow = TreeRow & {
  readonly position: number | null
  readonly children: readonly DomainTreeRow[]
}

declare type DomainTreeState = {
  readonly roots: readonly DomainTreeRow[]
  readonly unreached: readonly string[]
}
