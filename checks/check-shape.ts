export type CheckFailure = {
  readonly path: string
  readonly reason: string
}

export type Tree = {
  readonly root: string
  readonly at: (path: string) => Buffer | null
  readonly paths: () => readonly string[]
  readonly dir: () => string
}

export type Check = {
  readonly slug: string
  readonly run: (paths: readonly string[], tree: Tree) => readonly CheckFailure[]
}

export type Outcome = {
  readonly slug: string
  readonly path: string
  readonly reasons: readonly string[]
}

export type CheckRun =
  | { readonly slug: string; readonly failures: readonly CheckFailure[] }
  | { readonly slug: string; readonly threw: string }
