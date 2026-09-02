import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const mudcrabChitin = {
  id: "01a05fd8-a455-7409-a461-7b1630b406ad",
  pageTypeSlug: "temper-reagent",
  slug: "mudcrab-chitin",
  title: "Mudcrab Chitin",
  key: "mudcrab-chitin",
  icon: "resources/reagent_mudcrab_chitin.png",
  itemId: 77591,
  alchemyEffects: ["increase-spell-resist", "increase-armor", "protection", "defile"],
} as const satisfies TemperReagent
