import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const nirnroot = {
  id: "019e21f7-3b21-7c57-8f17-5af0fa934677",
  type: "page-type/temper-reagent",
  slug: "nirnroot",
  title: "Nirnroot",
  key: "nirnroot",
  icon: "resources/plant_nirnroot_r1.png",
  itemId: 30165,
  alchemyEffects: [
    "temper-poison-effect/ravage-health",
    "temper-poison-effect/uncertainty",
    "temper-poison-effect/enervation",
    "temper-poison-effect/invisible",
  ],
} as const satisfies TemperReagent
