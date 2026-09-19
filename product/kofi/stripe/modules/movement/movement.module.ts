import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const movement = {
  id: "01a0ba9a-9aa0-7d5a-a08f-4fd31546c134",
  type: "page-type/module",
  slug: "movement",
  definition: "what one Stripe event moves in a contributor's points",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A charge that succeeded earns its whole amount in points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A charge refunded takes back the amount refunded rather than the amount charged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address is the one billed, or the one a receipt was sent to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is lowercased here and hashed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An event of any other kind is passed over with a reason rather than refused.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A dispute names no address, so a disputed charge is passed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Stripe or the pages.",
    },
  ],
} as const satisfies Module
