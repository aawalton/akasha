export type Tree = {
  readonly root: string
  readonly at: (path: string) => Buffer | null
  readonly paths: () => readonly string[]
  readonly gone: () => readonly string[]
  readonly goneElsewhere: () => readonly string[]
  readonly repointedElsewhere: () => ReadonlyMap<string, string>
  readonly dir: () => string
}

export type CheckFailure = {
  readonly path: string
  readonly reason: string
}

export type At = {
  readonly root: string
  readonly path: string
}

export type File = At & {
  readonly body: Buffer
}

export type Batch = {
  readonly root: string
  readonly paths: readonly string[]
  readonly tree: Tree
  readonly keep: () => string
}

export type Act = {
  readonly writer: string | null
  readonly before: Tree
}

export type Was = {
  readonly before: Tree | null
}

export type Needs = "path" | "file" | "tree"

type Given = {
  path: At
  file: File
  tree: Batch
}

type Answer = {
  path: readonly string[]
  file: readonly string[]
  tree: readonly CheckFailure[]
}

type CheckOf<K extends Needs> =
  | {
      readonly slug: string
      readonly needs: K
      readonly needsAuthor?: false
      readonly needsBefore?: false
      readonly cached?: boolean
      readonly run: (given: Given[K]) => Answer[K]
    }
  | {
      readonly slug: string
      readonly needs: K
      readonly needsAuthor: true
      readonly needsBefore?: false
      readonly cached?: boolean
      readonly run: (given: Given[K], act: Act) => Answer[K]
    }
  | {
      readonly slug: string
      readonly needs: K
      readonly needsAuthor?: false
      readonly needsBefore: true
      readonly cached?: boolean
      readonly run: (given: Given[K], was: Was) => Answer[K]
    }

export type Check = CheckOf<"path"> | CheckOf<"file"> | CheckOf<"tree">

export type Outcome = {
  readonly slug: string
  readonly path: string
  readonly reasons: readonly string[]
}

export type CheckRun =
  | { readonly slug: string; readonly failures: readonly CheckFailure[] }
  | { readonly slug: string; readonly threw: string }
