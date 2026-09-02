import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const nightshade = {
  id: "01a05fd8-a455-76b9-9a5f-baa7b166b0c2",
  pageTypeSlug: "temper-reagent",
  slug: "nightshade",
  title: "Nightshade",
  key: "nightshade",
  icon: "resources/nightshade_01.png",
  itemId: 77590,
  alchemyEffects: ["ravage-health", "protection", "gradual-ravage-health", "defile"],
} as const satisfies TemperReagent
