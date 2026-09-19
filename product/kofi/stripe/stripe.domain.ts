import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const stripe = {
  id: "01a0ba93-b192-7535-b398-9f14143a73fa",
  type: "page-type/domain",
  slug: "stripe",
  definition: "the money Ko-fi takes, landing in an account of Alan's own",
  parts: ["module/verify-stripe-signature"],
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
} as const satisfies Domain
