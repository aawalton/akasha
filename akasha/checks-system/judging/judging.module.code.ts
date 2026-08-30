export type Judged = {
  readonly path: string
  readonly reason: string
}

export type Change = {
  readonly root: string
  readonly changed: readonly string[]
  readonly before: (path: string) => Uint8Array | null
  readonly after: (path: string) => Uint8Array | null
}

export type Judging = {
  readonly named: readonly string[]
  readonly over: (change: Change) => readonly Judged[]
}
