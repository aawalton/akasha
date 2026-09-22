import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const mudcrabChitin = {
  id: "019e21f7-3b1f-7598-8279-e510dfe1a76a",
  type: "page-type/temper-reagent",
  slug: "mudcrab-chitin",
  title: "Mudcrab Chitin",
  key: "mudcrab-chitin",
  icon: "resources/reagent_mudcrab_chitin.png",
  itemId: 77591,
  alchemyEffects: [
    "temper-poison-effect/increase-spell-resist",
    "temper-poison-effect/increase-armor",
    "temper-poison-effect/protection",
    "temper-poison-effect/defile",
  ],
} as const satisfies TemperReagent
