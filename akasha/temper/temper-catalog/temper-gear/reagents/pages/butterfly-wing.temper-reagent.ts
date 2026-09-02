import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const butterflyWing = {
  id: "01a05fd8-a450-75d6-81fa-78b123dfd359",
  pageTypeSlug: "temper-reagent",
  slug: "butterfly-wing",
  title: "Butterfly Wing",
  key: "butterfly-wing",
  icon: "resources/reagent_butterfly_wing.png",
  itemId: 77585,
  alchemyEffects: ["restore-health", "uncertainty", "lingering-health", "vitality"],
} as const satisfies TemperReagent
