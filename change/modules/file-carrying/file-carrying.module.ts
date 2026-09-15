import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileCarrying = {
  id: "01a0922a-d01c-7afe-a069-81d098846385",
  type: "module",
  slug: "file-carrying",
  definition: "the edits carrying many files to new paths and following them everywhere named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file that moves is answered as one move.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carry handing in no path is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with no body, or landing where a body already sits, refuses the carry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path landing where it already sits refuses the carry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a carry is refused is one question here rather than one in each caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The importers of everything that moved are asked of the index in one call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body is repointed over one map of what moved rather than one map for each file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that moved is repointed at the path that body landed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A whole carry answers the moves, then the repointing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a change.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
