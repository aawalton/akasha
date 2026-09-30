import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const overwhereIiiGlimmerstone = {
  id: "01a0f1ee-43b9-7b71-a490-cd18837beabe",
  type: "page-type/world-currency",
  slug: "overwhere-iii-glimmerstone",
  title: "Glimmerstones",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "Small glowing monster cores that the System keeps for its bearer and takes as payment.",
} as const satisfies WorldCurrency
