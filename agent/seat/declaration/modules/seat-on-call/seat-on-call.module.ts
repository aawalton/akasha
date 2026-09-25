import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatOnCall = {
  id: "01a06949-b281-7ac9-9029-67b66a0efb23",
  type: "page-type/module",
  slug: "seat-on-call",
  definition: "how code reads whether work is sent to a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is on call only where its page holds true under the on-call key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything other than true under that key reads as not on call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no page in akasha reads as not on call.",
    },
  ],
} as const satisfies Module
