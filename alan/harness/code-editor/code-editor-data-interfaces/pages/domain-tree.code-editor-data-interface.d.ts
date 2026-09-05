// The domains panel, assembled whole. A row is a domain, and the tree is the part-of edge read
// downward. The champion is carried because the panel draws it: it is the row's description, part
// of the tooltip, and one of the two fields a filter is matched against.

declare type DomainTreeRow = TreeRow & {
  readonly persona: string | null
  readonly position: number | null
  readonly children: readonly DomainTreeRow[]
}

declare type DomainTreeState = {
  readonly roots: readonly DomainTreeRow[]
  readonly unreached: readonly string[]
}
