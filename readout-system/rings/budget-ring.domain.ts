import type { Domain } from "@akasha/domains/domain"

export const budgetRing = {
  id: "01a0655b-9cdd-7c1c-9464-84a197fb9eab",
  pageTypeSlug: "domain",
  slug: "budget-ring",
  definition: "how much of an allowance is spent, colored by how long until it renews",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The arc and the color measure different quantities, so a full ring can be any color.",
    },
  ],
} as const satisfies Domain
