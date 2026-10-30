import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatReset = {
  id: "01a069cb-0380-715a-9d83-e8177fb074e2",
  type: "page-type/module",
  slug: "seat-reset",
  definition: "how code starts a new agent in a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ops dispatcher imports this module and calls the default export this module declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat resetting itself is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset ends the turn that asked for the reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The declarations the seat states are read back from its last committed page where no page is live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat whose declarations spell no name is refused rather than reset into nothing.",
    },
  ],
  createdAt: "2026-09-04T00:21:47.520Z",
  updatedAt: "2026-10-30T14:48:05.928Z",
} as const satisfies Module
