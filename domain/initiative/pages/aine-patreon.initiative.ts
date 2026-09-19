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
        "A patron is a page holding every point transaction and the balance those transactions reach.",
    },
    { statement: "Every feature request is a page naming the product that request is for." },
    {
      statement:
        "A pledge Patreon reports lands the patron's page and the points that pledge earns.",
    },
    {
      statement:
        "Every product serves the feature requests for that product at `requests` under its own domain.",
    },
    { statement: "Every feature Alan already means to build is a published feature request." },
    { statement: "A patron commits points to a published feature request." },
    {
      statement:
        "Anyone proposes a feature request, and Alan's review is what publishes that request.",
    },
    {
      statement:
        "A command completes a feature request, burning its points, or denies it, refunding them.",
    },
  ],
  constraints: [
    "Each product carries a brand of its own and calls for backing on the one shared Patreon.",
    "A backer's points are one pool across every product, and every reading of those points is filtered to one product.",
    "Nothing Alan makes is held back from anyone; backing buys weight in what Alan builds next and nothing else.",
    "Alan keeps full discretion over what he builds, and points committed to a request he denies are refunded.",
  ],
} as const satisfies Initiative
