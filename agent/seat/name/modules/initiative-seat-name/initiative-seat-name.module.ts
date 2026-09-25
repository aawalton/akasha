import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const initiativeSeatName = {
  id: "01a0a5b3-3d06-776e-aea8-407ef8b05e0a",
  type: "page-type/module",
  slug: "initiative-seat-name",
  definition: "the name of an initiative's seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat an initiative goes to is named by the initiative's first segment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An initiative of one segment names the seat of that whole slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hyphen parts the first segment from the rest.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a seat or an initiative.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says whether that seat is there.",
    },
  ],
} as const satisfies Module
