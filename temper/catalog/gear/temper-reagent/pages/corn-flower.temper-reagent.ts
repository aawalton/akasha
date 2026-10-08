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
  createdAt: "2026-05-13T15:31:51.185Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
