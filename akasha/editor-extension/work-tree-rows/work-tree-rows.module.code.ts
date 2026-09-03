// THE SHAPE OF THE WORK TREE, HELD APART FROM THE READING THAT FILLS IT.
//
// `work-tree-reading` parses an answer into these and calls `rollUp` in `work-tree-colors` to raise
// the colors through them. Holding the shape here leaves that one call as the only edge between the
// two, so each can land on its own; naming the shape from its parser would put an edge back the
// other way and neither could land first.

export interface WorkNode {
  readonly key: string
  readonly label: string
  readonly relPath: string | null
  readonly detail: string | null
  readonly note: string | null
  readonly color: string | null
  readonly children: readonly WorkNode[]
}

export interface WorkTree {
  readonly repo: string
  readonly roots: readonly WorkNode[]
}

export interface WorkColors {
  readonly repo: string
  readonly byInitiative: Readonly<Record<string, string>>
}
