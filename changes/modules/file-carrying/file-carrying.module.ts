import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const fileCarrying = {
  id: "01a0922a-d01c-7afe-a069-81d098846385",
  type: "module",
  slug: "file-carrying",
  definition: "the edits carrying many files to new paths and following them everywhere named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file that moves is answered as one move.",
    },
    {
      invariantKind: "departure",
      statement: "The importers of everything that moved are asked of the index in one call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is repointed over one map of what moved rather than one map for each file.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved is repointed at the path that body landed at.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a file that moved as a way in states where that file landed.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests are read once for the whole carry rather than once for a file.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that moved is moved by the caller rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A whole carry answers the moves, then the repointing, then the ways in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
