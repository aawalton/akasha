import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setCarryOver = {
  id: "01a0d8ea-db08-7d5f-aed7-6844a42118f5",
  type: "page-type/module",
  slug: "set-carry-over",
  definition: "the carrying of each set's facts off the sets addon's ported tables onto its page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact is carried once, and after that the page is where the fact is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Item ids and piece types are carried only onto a page the capture left without them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose page would work out other marks than the row has is a fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding any fault carries nothing.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This module goes once the facts it carries have landed.",
    },
  ],
} as const satisfies Module
