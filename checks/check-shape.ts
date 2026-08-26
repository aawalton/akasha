export type CheckFailure = {
  readonly path: string
  readonly reason: string
}

export type Check = {
  readonly slug: string
  readonly run: (paths: readonly string[]) => readonly CheckFailure[]
}

export type CheckOutcome = {
  readonly slug: string
  readonly failures: readonly CheckFailure[]
}
