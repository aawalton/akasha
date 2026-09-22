import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const fleshflyLarva = {
  id: "019e21f7-3b1a-710f-b11c-9c0291c31f85",
  type: "page-type/temper-reagent",
  slug: "fleshfly-larva",
  title: "Fleshfly Larva",
  key: "fleshfly-larva",
  icon: "resources/reagent_fleshfly_larva.png",
  itemId: 77587,
  alchemyEffects: [
    "temper-poison-effect/ravage-stamina",
    "temper-poison-effect/vulnerability",
    "temper-poison-effect/gradual-ravage-health",
    "temper-poison-effect/vitality",
  ],
} as const satisfies TemperReagent
