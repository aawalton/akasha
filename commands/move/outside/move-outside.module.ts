import type { Module } from "@akasha/code-system/module"

export const moveOutside = {
  id: "01a05f06-c7a5-7dd1-8ddd-a9cfa93cc222",
  pageTypeSlug: "module",
  slug: "move-outside",
  definition: "a tracked file respelled to name where a moved path arrived",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which files spell a path that moved is answered by `outside-naming`.",
    },
    {
      invariantKind: "departure",
      statement: "The names looked for are the paths that moved.",
    },
    {
      invariantKind: "departure",
      statement: "A path is repointed where a body spells that path whole.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path resolving to a path that moved is repointed.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path is resolved against the folder of the file carrying that path.",
    },
    {
      invariantKind: "departure",
      statement: "A resolved path is weighed against what moved as a path rather than as text.",
    },
    {
      invariantKind: "departure",
      statement: "A resolved path under a folder that moved arrives under what that folder became.",
    },
    {
      invariantKind: "departure",
      statement: "The longest path that moved and covers a resolved path is the one it follows.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is written back is a relative path from the folder of the file carrying that path.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path closing with a slash keeps that slash and whatever follows.",
    },
    {
      invariantKind: "absence",
      statement: "A relative path resolving to no path that moved is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "A relative path climbing out of the repository is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "A name carrying more of a segment than the path that moved is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A body no rewriting changed is left out of the change.",
    },
    {
      invariantKind: "departure",
      statement: "The files that reached in by a relative path are named apart from the rest.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
