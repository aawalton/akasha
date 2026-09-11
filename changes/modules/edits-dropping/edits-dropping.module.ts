import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const editsDropping = {
  id: "01a09280-f5bf-7819-a752-07a3d5996019",
  type: "module",
  slug: "edits-dropping",
  definition: "the edits an answer keeps once a body rewritten where nothing may be is dropped",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body replaced at a path only added to at its end is dropped from the answer.",
    },
    {
      invariantKind: "departure",
      statement: "Dropping is done here rather than asked for by each change.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is dropped from before the world carries that answer.",
    },
    {
      invariantKind: "departure",
      statement: "An edit adding at the end of such a file is kept.",
    },
    {
      invariantKind: "departure",
      statement: "An edit moving or taking away such a file is kept.",
    },
    {
      invariantKind: "departure",
      statement: "An answer with no such body is answered as the answer that answer already was.",
    },
    {
      invariantKind: "absence",
      statement: "No refusal is said for a body dropped.",
    },
  ],
} as const satisfies Module
