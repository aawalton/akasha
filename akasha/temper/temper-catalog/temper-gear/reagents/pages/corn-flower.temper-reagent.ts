import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const cornFlower = {
  id: "019e21f7-3b11-7146-8395-93dcf667836c",
  pageTypeSlug: "temper-reagent",
  slug: "corn-flower",
  title: "Corn Flower",
  key: "corn-flower",
  icon: "resources/corn_flower_r1.png",
  itemId: 30161,
  alchemyEffects: ["restore-magicka", "increase-spell-power", "ravage-health", "detection"],
} as const satisfies TemperReagent
