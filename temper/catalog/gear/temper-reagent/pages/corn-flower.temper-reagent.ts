import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const cornFlower = {
  id: "019e21f7-3b11-7146-8395-93dcf667836c",
  type: "page-type/temper-reagent",
  slug: "corn-flower",
  title: "Corn Flower",
  key: "corn-flower",
  icon: "resources/corn_flower_r1.png",
  itemId: 30161,
  alchemyEffects: [
    "temper-poison-effect/restore-magicka",
    "temper-poison-effect/increase-spell-power",
    "temper-poison-effect/ravage-health",
    "temper-poison-effect/detection",
  ],
} as const satisfies TemperReagent
