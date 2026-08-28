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

/**
 * The tree as it stood before the change, handed to a check that asks for it and nothing else.
 *
 * SEPARATE FROM `Act` BECAUSE THE TWO NEEDS ARE DIFFERENT. `Act` carries the writer as well, and a
 * check that asks for it is dropped from every audit and from every mechanical write — the writer
 * is who a check about reading judges, and neither of those has one. A check that only wants to
 * compare two trees has nothing to say about a writer and must keep running in both.
 *
 * NULL WHERE NOTHING CHANGED. An audit judges a tree standing still, so there is no earlier tree
 * to compare it against, and a check handed null answers about the one tree it has.
 */
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
