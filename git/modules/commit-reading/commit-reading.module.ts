import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commitReading = {
  id: "01a0523f-0e48-7c39-8708-125994cc3e59",
  type: "module",
  slug: "commit-reading",
  definition: "the body a commit holds at a path, read without a git run for each one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One `git cat-file --batch` answers every body asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer comes back as bytes rather than as text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the commit does not have answers as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A base that names no commit is said out loud.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a base names a commit is answered without a body being asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A base the reader already asked after is not asked again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree the reader already walked is not walked again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is asked for by its object name rather than by its path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path no tree the commit has names is answered without an ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reader is kept between calls and ended where a call throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reader that has answered enough bytes is retired for a fresh reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reader is ended as the process exits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The text git says on the error stream is carried into the error thrown.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The commit is named by the caller asking.",
    },
  ],
} as const satisfies Module
