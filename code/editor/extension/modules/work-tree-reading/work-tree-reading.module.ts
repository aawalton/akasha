import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workTreeReading = {
  id: "01a06867-dbcb-78e4-a9b3-4a59f26c06ca",
  type: "module",
  slug: "work-tree-reading",
  definition: "what is counted and keyed from work tree rows already in hand",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count of the rows counts every row beneath a root as well as that root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are counted by the kind each row is as well as all together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys are answered with a row before every row beneath that row.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here composes a tree or reads an answer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
