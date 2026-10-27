import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settlingFinding = {
  id: "01a17f62-99b3-7c26-bfe6-8d4b1e5489ad",
  type: "page-type/module",
  slug: "settling-finding",
  definition: "the code that settles a check, its own or the code of the check it names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A check's code is the settling code beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check naming `settledBy` is settled by the code beside the check it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One hop reaches the code, since the check named carries its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check, or a check named, that is no page here has no code.",
    },
  ],
  createdAt: "2026-10-27T22:02:10.738Z",
  updatedAt: "2026-10-27T22:02:10.738Z",
} as const satisfies Module
