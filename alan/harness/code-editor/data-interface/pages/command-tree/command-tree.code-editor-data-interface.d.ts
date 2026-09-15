declare type CommandTreeRow = TreeRow & {
  readonly kind: "root" | "namespace" | "command"
  readonly called: string
  readonly detail: string | null
  readonly children: readonly CommandTreeRow[]
}

declare type CommandTreeState = {
  readonly roots: readonly CommandTreeRow[]
  readonly unreached: readonly string[]
}
