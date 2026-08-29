export type Judged = {
  readonly path: string
  readonly reason: string
}

export type Leaving = {
  readonly root: string
  readonly changed: readonly string[]
  readonly at: (path: string) => Uint8Array | null
}

export type Judging = {
  readonly named: readonly string[]
  readonly over: (leaving: Leaving) => readonly Judged[]
}
