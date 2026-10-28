import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionLevers = {
  id: "01a18423-dc79-7ea8-bbec-4f623878a305",
  type: "page-type/module",
  slug: "action-levers",
  definition: "the actions the health model weighs, each a change to what is read of Alan",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is a change to what is read of Alan, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action resting on an answer nobody has given waits rather than being weighed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Actions taken together are each applied in turn to the same reading of Alan.",
    },
  ],
  createdAt: "2026-10-28T20:11:45.142Z",
  updatedAt: "2026-10-28T20:11:45.142Z",
} as const satisfies Module
