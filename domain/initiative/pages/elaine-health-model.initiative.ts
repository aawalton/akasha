import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const elaineHealthModel = {
  id: "01a183a0-db3c-7934-8e81-f7eaac8d19a1",
  type: "page-type/initiative",
  slug: "elaine-health-model",
  domain: "domain/medicine",
  persona: "persona/elaine",
  intentStack: [
    {
      statement:
        "A command ranks Alan's likeliest causes of death, each with an age range and a risk range.",
    },
    {
      statement:
        "A command ranks the voluntary actions that most lower Alan's risk of death, each with a range.",
    },
  ],
  createdAt: "2026-10-28T17:48:39.611Z",
  updatedAt: "2026-10-28T19:17:41.446Z",
} as const satisfies Initiative
