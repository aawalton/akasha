// The work panel. A row's color is already raised from the rows beneath it, so the editor draws
// the color it is given rather than working one out.

declare type WorkTreeRow = TreeRow & {
  readonly detail: string | null
  readonly note: string | null
  readonly children: readonly WorkTreeRow[]
}

declare type WorkTreeState = {
  readonly roots: readonly WorkTreeRow[]
}
