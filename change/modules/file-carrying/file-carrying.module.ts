import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileCarrying = {
  id: "01a0922a-d01c-7afe-a069-81d098846385",
  type: "page-type/module",
  slug: "file-carrying",
  definition:
    "how code finds the edits that move files with the edits to every file that uses the old paths",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file that moves is answered as one move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carry handing in no path is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no body, or landing where a body already sits, refuses the carry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path landing where it already sits refuses the carry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a carry is refused is one question here rather than one in each caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The importers of everything that moved are asked of the index in one call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is repointed over one map of what moved rather than one map for each file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that moved is repointed at the path that body landed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A whole carry answers the moves, then the repointing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sidecar of uncommitted values lands exporting the name its own writer would compose there.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a change.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
  createdAt: "2026-09-11T20:31:14.460Z",
  updatedAt: "2026-10-30T17:42:26.873Z",
} as const satisfies Module
