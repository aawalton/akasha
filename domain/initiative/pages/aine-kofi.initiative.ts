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
    {
      statement: "Ko-fi Gold is on before Alan's first member.",
      workingMemory:
        "Ko-fi cannot change the platform fee on a Stripe membership after that membership starts. A membership taken before Gold pays 5% for life; one taken while Gold is on pays nothing for life, even if Gold is cancelled afterwards. A new account defaults into the 5% tier, and Gold is $12 a month.",
    },
  ],
} as const satisfies Initiative
