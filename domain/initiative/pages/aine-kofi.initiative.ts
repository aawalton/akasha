import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineKofi = {
  id: "01a0b79c-1f93-77a4-8f8b-4946c5589cda",
  type: "page-type/initiative",
  slug: "aine-kofi",
  domain: "domain/kofi",
  persona: "persona/aine",
  intentStack: [
    {
      statement:
        "A payment Stripe reports lands the contributor's page and the contribution points it earns.",
    },
    {
      statement:
        "A refund or dispute Stripe reports posts a negative transaction against the contributor.",
      workingMemory:
        "Ko-fi reports no cancellation, refund or chargeback, and says so itself. Stripe does, because Alan is the merchant rather than Ko-fi.",
    },
  ],
  constraints: [
    "Stripe is the only payment method Ko-fi offers, so every contribution lands in Alan's own Stripe account and nothing is read from Ko-fi.",
    "Ko-fi takes the money, because Patreon's terms forbid leading a contributor from Patreon to Alan's own site, which this model requires.",
  ],
} as const satisfies Initiative
