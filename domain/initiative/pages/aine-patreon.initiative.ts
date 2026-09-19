import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const ainePatreon = {
  id: "01a0b743-eea8-743e-826e-771bc840d92f",
  type: "page-type/initiative",
  slug: "aine-patreon",
  domain: "domain/product",
  persona: "persona/aine",
  intentStack: [
    { statement: "Alan has a Patreon page people can back him on." },
    {
      statement:
        "A contributor is a page holding every contribution point transaction and the running balance.",
    },
    { statement: "Every feature request is a page naming the product that request is for." },
    {
      statement:
        "A pledge Patreon reports lands the contributor's page and the contribution points it earns.",
    },
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
    { statement: "A completed feature request names the contributors whose points it burned." },
  ],
  constraints: [
    "Each product carries a brand of its own and calls for backing on the one shared Patreon.",
    "Nothing Alan makes is held back from anyone; backing buys weight in what Alan builds next and nothing else.",
    "Alan keeps full discretion over what he builds, and points committed to a request he denies are refunded.",
    "A contributor's contribution points are one pool across every product, and every reading of them is filtered to one product.",
    "The contribution points proposing a feature request costs buy Alan's review and are spent whether or not he publishes that request.",
    "A feature request has no price, and the contribution points committed to it only order the queue Alan reviews.",
    "A contributor signs in at alanwalton.com, and the payment the vendor reports is matched to that sign-in by email address.",
  ],
} as const satisfies Initiative
