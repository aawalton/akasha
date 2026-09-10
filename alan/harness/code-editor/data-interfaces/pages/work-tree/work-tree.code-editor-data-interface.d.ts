declare type WorkTreeRow = TreeRow & {
  readonly kind: "initiative" | "intent"
  readonly detail: string | null
  readonly note: string | null
  readonly children: readonly WorkTreeRow[]
}

declare type WorkTreeState = {
  readonly roots: readonly WorkTreeRow[]
}
