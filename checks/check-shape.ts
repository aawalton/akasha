export type CheckFailure = {
  readonly path: string
  readonly reason: string
}

export type Check = {
  readonly slug: string
  readonly run: (paths: readonly string[]) => readonly CheckFailure[]
}
