import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const powderedMotherOfPearl = {
  id: "019e21f7-3b22-795b-861d-1ec33cba9bab",
  type: "page-type/temper-reagent",
  slug: "powdered-mother-of-pearl",
  title: "Powdered Mother of Pearl",
  key: "powdered-mother-of-pearl",
  icon: "resources/reagent_scrib_powered_pearl.png",
  itemId: 139019,
  alchemyEffects: [
    "temper-poison-effect/lingering-health",
    "temper-poison-effect/speed",
    "temper-poison-effect/vitality",
    "temper-poison-effect/protection",
  ],
} as const satisfies TemperReagent
