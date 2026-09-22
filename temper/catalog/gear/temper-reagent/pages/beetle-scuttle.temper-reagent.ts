import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const beetleScuttle = {
  id: "019e21f7-3b00-7bbc-965f-18425a744647",
  type: "page-type/temper-reagent",
  slug: "beetle-scuttle",
  title: "Beetle Scuttle",
  key: "beetle-scuttle",
  icon: "resources/reagent_scuttle.png",
  itemId: 77583,
  alchemyEffects: [
    "temper-poison-effect/breach",
    "temper-poison-effect/increase-armor",
    "temper-poison-effect/protection",
    "temper-poison-effect/vitality",
  ],
} as const satisfies TemperReagent
