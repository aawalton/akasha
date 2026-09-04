import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatActConfirm = {
  id: "01a0686b-bfe9-7d14-9f46-c9701b005af8",
  pageTypeSlug: "module",
  slug: "seat-act-confirm",
  definition: "what Alan is asked before an act loses the turn a seat is part-way through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reset is always confirmed, whether the seat runs or not.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped seat is asked nothing, because it has no turn to lose.",
    },
    {
      invariantKind: "departure",
      statement: "A running seat is asked only where a step stops or restarts its process.",
    },
    {
      invariantKind: "departure",
      statement: "The prompt names the seat and names the act in the act's own word.",
    },
    {
      invariantKind: "departure",
      statement: "A reset says what is lost is the agent rather than the turn.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks anything of Alan.",
    },
  ],
} as const satisfies Module
