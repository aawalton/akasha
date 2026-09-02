import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const mountainFlower = {
  id: "01a05fd8-a454-7ecb-910a-78a95b17128d",
  pageTypeSlug: "temper-reagent",
  slug: "mountain-flower",
  title: "Mountain Flower",
  key: "mountain-flower",
  icon: "resources/mountain_flower_r1.png",
  itemId: 30163,
  alchemyEffects: ["increase-armor", "restore-health", "maim", "restore-stamina"],
} as const satisfies TemperReagent
