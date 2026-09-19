import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineContribution = {
  id: "01a0b743-eea8-743e-826e-771bc840d92f",
  type: "page-type/initiative",
  slug: "aine-contribution",
  domain: "domain/contribution-point",
  persona: "persona/aine",
  intentStack: [
    {
      statement:
        "A contributor is a page holding every contribution point transaction and the running balance.",
    },
    { statement: "A contributor commits contribution points to a published feature request." },
    {
      statement:
        "Only a contributor proposes a feature request, paying contribution points, and Alan publishes it.",
    },
    {
      statement:
        "A command completes a feature request and burns its contribution points, or denies it and refunds.",
    },
    { statement: "An account newly made holds a hundred contribution points." },
  ],
  constraints: [
    "Nothing Alan makes is held back from anyone; backing buys weight in what Alan builds next and nothing else.",
    "Alan keeps full discretion over what he builds, and points committed to a request he denies are refunded.",
    "A contributor's contribution points are one pool across every product, and every reading of them is filtered to one product.",
    "A feature request has no price, and the contribution points committed to it only order the queue Alan reviews.",
    "A cent contributed earns one contribution point, and that rate is fixed until something proves it wrong.",
    "A reversed contribution takes back its points wherever they went, and a contributor's balance goes negative rather than a completed request losing its credit.",
    "Each product carries a brand of its own and calls for backing on the one shared Ko-fi account.",
    "A contributor signs in at alanwalton.com, and the payment Stripe reports is matched to that sign-in by email address.",
    "Proposing a feature request costs a hundred contribution points, which back that request and remain spent whatever becomes of it.",
  ],
} as const satisfies Initiative
