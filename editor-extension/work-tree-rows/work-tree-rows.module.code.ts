// THE SHAPE OF THE WORK TREE, HELD APART FROM BOTH SIDES THAT HANDLE IT.
//
// The panel composes these from the rows the service writes, and the view draws them. Holding the
// shape here leaves neither of those naming the other, so each can land on its own.

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
