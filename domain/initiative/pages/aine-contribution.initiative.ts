import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineContribution = {
  id: "01a0b743-eea8-743e-826e-771bc840d92f",
  type: "page-type/initiative",
  slug: "aine-contribution",
  domain: "domain/kofi",
  persona: "persona/aine",
  intentStack: [
    {
      statement:
        "A contributor is a page holding every contribution point transaction and the running balance.",
    },
    { statement: "Every feature request is a page naming the product that request is for." },
    {
      statement:
        "Every product serves the feature requests for that product at `requests` under its own domain.",
    },
    { statement: "Every feature Alan already means to build is a published feature request." },
    { statement: "A contributor commits contribution points to a published feature request." },
    {
      statement:
        "Only a contributor proposes a feature request, paying contribution points, and Alan publishes it.",
    },
    {
      statement:
        "A command completes a feature request and burns its contribution points, or denies it and refunds.",
    },
    {
      statement:
        "A feature request names each contributor backing it and the points committed, most first.",
    },
    { statement: "An account newly made holds a hundred contribution points." },
    { statement: "Anyone makes an account at alanwalton.com, and that account is a contributor." },
    { statement: "A contributor signs in at alanwalton.com with Google or with Discord." },
  ],
  constraints: [
    "Nothing Alan makes is held back from anyone; backing buys weight in what Alan builds next and nothing else.",
    "Alan keeps full discretion over what he builds, and points committed to a request he denies are refunded.",
    "A contributor's contribution points are one pool across every product, and every reading of them is filtered to one product.",
    "A feature request has no price, and the contribution points committed to it only order the queue Alan reviews.",
    "Past launch, a feature of the request system is itself a feature request contributors back, like a feature of any other product.",
    "A cent contributed earns one contribution point, and that rate is fixed until something proves it wrong.",
    "Ko-fi takes the money, because Patreon's terms forbid leading a contributor from Patreon to Alan's own site, which this model requires.",
    "A reversed contribution takes back its points wherever they went, and a contributor's balance goes negative rather than a completed request losing its credit.",
    "Each product carries a brand of its own and calls for backing on the one shared Ko-fi account.",
    "A contributor signs in at alanwalton.com, and the payment Stripe reports is matched to that sign-in by email address.",
    "Stripe is the only payment method Ko-fi offers, so every contribution lands in Alan's own Stripe account and nothing is read from Ko-fi.",
    "Proposing a feature request costs a hundred contribution points, which back that request and remain spent whatever becomes of it.",
  ],
} as const satisfies Initiative
