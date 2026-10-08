import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const stripe = {
  id: "01a0ba93-b192-7535-b398-9f14143a73fa",
  type: "page-type/domain",
  slug: "stripe",
  definition: "the money Ko-fi takes, landing in an account of Alan's own",
  parts: ["module/verify-stripe-signature", "module/movement"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every contribution is read from Stripe rather than from Ko-fi.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Stripe signs a webhook with a secret shared between Stripe and the receiver.",
    },
  ],
  createdAt: "2026-09-19T16:50:36.562Z",
  updatedAt: "2026-09-19T16:59:16.000Z",
} as const satisfies Domain
