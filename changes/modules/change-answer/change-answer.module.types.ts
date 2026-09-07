export type Edit = {
  readonly path: string
  readonly was: string | null
  readonly body: string | null
  readonly from?: string
  readonly readersOweReading?: boolean
}

export type Answer = {
  readonly edits: readonly Edit[]
  readonly refused: string | null
}
