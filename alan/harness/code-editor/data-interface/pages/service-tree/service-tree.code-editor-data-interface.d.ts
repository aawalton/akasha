declare type ServiceTreeRow = TreeRow & {
  readonly kind: "root" | "kind" | "service"
  readonly detail: string | null
  readonly children: readonly ServiceTreeRow[]
}

declare type ServiceTreeState = {
  readonly roots: readonly ServiceTreeRow[]
}
