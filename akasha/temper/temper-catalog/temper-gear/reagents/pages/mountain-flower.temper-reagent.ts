import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const mountainFlower = {
  id: "019e21f7-3b1e-73f9-ad0a-84d5d456442b",
  pageTypeSlug: "temper-reagent",
  slug: "mountain-flower",
  title: "Mountain Flower",
  key: "mountain-flower",
  icon: "resources/mountain_flower_r1.png",
  itemId: 30163,
  alchemyEffects: ["increase-armor", "restore-health", "maim", "restore-stamina"],
} as const satisfies TemperReagent
