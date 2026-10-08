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
  createdAt: "2026-05-13T15:31:51.194Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
