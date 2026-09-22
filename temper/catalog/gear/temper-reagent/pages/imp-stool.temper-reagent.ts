import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const impStool = {
  id: "019e21f7-3b1b-71b8-9e7a-d1bb71b50fd5",
  type: "page-type/temper-reagent",
  slug: "imp-stool",
  title: "Imp Stool",
  key: "imp-stool",
  icon: "resources/imp_stool_r2.png",
  itemId: 30156,
  alchemyEffects: [
    "temper-poison-effect/maim",
    "temper-poison-effect/ravage-stamina",
    "temper-poison-effect/increase-armor",
    "temper-poison-effect/enervation",
  ],
} as const satisfies TemperReagent
