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
  createdAt: "2026-05-13T15:31:51.201Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
