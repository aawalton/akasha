import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const editsDropping = {
  id: "01a09280-f5bf-7819-a752-07a3d5996019",
  type: "page-type/module",
  slug: "edits-dropping",
  definition: "the refusal an answer gets for rewriting a body that is only appended to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body replaced at a path only added to at its end refuses the whole answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names each such file, says it is append-only, and says to append.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No such body is dropped from an answer that then lands as if it had been.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal is made here rather than asked for by each change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer is judged before the world carries that answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit adding at the end of such a file is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit moving or taking away such a file is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer with no such body is answered as the answer that answer already was.",
    },
  ],
  createdAt: "2026-09-11T22:05:20.191Z",
  updatedAt: "2026-10-27T21:46:57.348Z",
} as const satisfies Module
