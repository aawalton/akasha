import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const waterHyacinth = {
  id: "019e21f7-3b28-76bb-9ffb-f5bf7132e5b8",
  type: "page-type/temper-reagent",
  slug: "water-hyacinth",
  title: "Water Hyacinth",
  key: "water-hyacinth",
  icon: "resources/plant_water_hyacinth_r1.png",
  itemId: 30166,
  alchemyEffects: [
    "temper-poison-effect/restore-health",
    "temper-poison-effect/spell-critical",
    "temper-poison-effect/increase-weapon-crit",
    "temper-poison-effect/entrapment",
  ],
} as const satisfies TemperReagent
