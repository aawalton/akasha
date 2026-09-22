import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const butterflyWing = {
  id: "019e21f7-3b0a-7b4e-ba3b-53ccd2d693f6",
  type: "page-type/temper-reagent",
  slug: "butterfly-wing",
  title: "Butterfly Wing",
  key: "butterfly-wing",
  icon: "resources/reagent_butterfly_wing.png",
  itemId: 77585,
  alchemyEffects: [
    "temper-poison-effect/restore-health",
    "temper-poison-effect/uncertainty",
    "temper-poison-effect/lingering-health",
    "temper-poison-effect/vitality",
  ],
} as const satisfies TemperReagent
