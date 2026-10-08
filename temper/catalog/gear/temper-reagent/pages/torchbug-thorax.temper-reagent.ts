import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const torchbugThorax = {
  id: "019e21f7-3b25-7f75-9526-81ac31e17f01",
  type: "page-type/temper-reagent",
  slug: "torchbug-thorax",
  title: "Torchbug Thorax",
  key: "torchbug-thorax",
  icon: "resources/reagent_torchbug_thorax.png",
  itemId: 77581,
  alchemyEffects: [
    "temper-poison-effect/fracture",
    "temper-poison-effect/enervation",
    "temper-poison-effect/detection",
    "temper-poison-effect/vitality",
  ],
  createdAt: "2026-05-13T15:31:51.205Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
