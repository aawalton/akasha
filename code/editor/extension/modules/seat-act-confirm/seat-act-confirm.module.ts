import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatActConfirm = {
  id: "01a0686b-bfe9-7d14-9f46-c9701b005af8",
  type: "module",
  slug: "seat-act-confirm",
  definition: "what Alan is asked before an act loses the turn a seat is part-way through",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset is always confirmed whether the seat runs or not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stopped seat is asked nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A running seat is asked only where a step stops or restarts its process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The prompt names the seat and names the act in the act's own word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset says the agent is lost rather than the turn.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks anything of Alan.",
    },
  ],
} as const satisfies Module
