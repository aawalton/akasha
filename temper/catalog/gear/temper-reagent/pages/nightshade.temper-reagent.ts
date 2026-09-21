import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const nightshade = {
  id: "019e21f7-3b20-7fa2-9748-abb3c5b67fee",
  type: "page-type/temper-reagent",
  slug: "nightshade",
  title: "Nightshade",
  key: "nightshade",
  icon: "resources/nightshade_01.png",
  itemId: 77590,
  alchemyEffects: ["ravage-health", "protection", "gradual-ravage-health", "defile"],
} as const satisfies TemperReagent
