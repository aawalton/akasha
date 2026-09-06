export type Edit = {
  readonly path: string
  readonly body: string | null
}

export type Answer = {
  readonly edits: readonly Edit[]
  readonly refused: string | null
}
