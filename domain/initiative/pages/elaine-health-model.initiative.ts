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
    {
      statement:
        "A command prices an activity Alan names in disability-adjusted micromorts, as a range.",
    },
    {
      statement:
        "Each cause of death the model weighs is a page carrying its rates and their sources.",
    },
    {
      statement:
        "Each activity the model prices is a page carrying its risk and that risk's sources.",
    },
  ],
  createdAt: "2026-10-28T17:48:39.611Z",
  updatedAt: "2026-10-28T18:16:44.229Z",
} as const satisfies Initiative
