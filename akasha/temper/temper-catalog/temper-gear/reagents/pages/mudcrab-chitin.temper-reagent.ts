import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const mudcrabChitin = {
  id: "019e21f7-3b1f-7598-8279-e510dfe1a76a",
  pageTypeSlug: "temper-reagent",
  slug: "mudcrab-chitin",
  title: "Mudcrab Chitin",
  key: "mudcrab-chitin",
  icon: "resources/reagent_mudcrab_chitin.png",
  itemId: 77591,
  alchemyEffects: ["increase-spell-resist", "increase-armor", "protection", "defile"],
} as const satisfies TemperReagent
