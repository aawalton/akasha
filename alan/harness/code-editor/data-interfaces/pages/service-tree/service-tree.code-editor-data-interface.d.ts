declare type ServiceTreeRow = TreeRow & {
  readonly kind: "kind" | "service"
  readonly detail: string | null
  readonly children: readonly ServiceTreeRow[]
}

declare type ServiceTreeState = {
  readonly roots: readonly ServiceTreeRow[]
}
