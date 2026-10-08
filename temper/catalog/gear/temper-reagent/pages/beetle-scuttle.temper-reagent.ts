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
  createdAt: "2026-05-13T15:31:51.168Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
