import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const stinkhorn = {
  id: "019e21f7-3b25-713e-bb1a-86b2b005caf4",
  type: "page-type/temper-reagent",
  slug: "stinkhorn",
  title: "Stinkhorn",
  key: "stinkhorn",
  icon: "resources/stinkhorn_cap_r1.png",
  itemId: 30149,
  alchemyEffects: [
    "temper-poison-effect/fracture",
    "temper-poison-effect/ravage-health",
    "temper-poison-effect/increase-weapon-power",
    "temper-poison-effect/ravage-stamina",
  ],
} as const satisfies TemperReagent
