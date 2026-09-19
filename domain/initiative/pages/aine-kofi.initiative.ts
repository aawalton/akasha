import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineKofi = {
  id: "01a0b79c-1f93-77a4-8f8b-4946c5589cda",
  type: "page-type/initiative",
  slug: "aine-kofi",
  domain: "domain/kofi",
  persona: "persona/aine",
  intentStack: [
    { statement: "Alan has a Ko-fi page people can back him on." },
    {
      statement:
        "A payment Stripe reports lands the contributor's page and the contribution points it earns.",
    },
  ],
} as const satisfies Initiative
