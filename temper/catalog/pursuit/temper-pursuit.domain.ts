import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperPursuit = {
  id: "01a06153-0ea9-7000-8bea-a58f74ace441",
  type: "page-type/domain",
  slug: "temper-pursuit",
  definition: "what the game keeps a tally of a player having sought out",
  parts: [
    "page-type/temper-achievement-category",
    "page-type/temper-antiquity-category",
    "page-type/temper-antiquity-set",
    "page-type/temper-cadwell-level",
    "page-type/temper-collectible-category",
    "page-type/temper-craft-type",
    "page-type/temper-lore-collection",
    "page-type/temper-pursuit-thing",
    "page-type/temper-recipe-list",
    "page-type/temper-research-line",
    "page-type/temper-tribute-patron",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page here is one node of a catalog the game shows a player's progress against.",
    },
  ],
} as const satisfies Domain
