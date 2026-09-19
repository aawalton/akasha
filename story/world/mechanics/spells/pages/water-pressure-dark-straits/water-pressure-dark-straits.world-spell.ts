import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterPressureDarkStraits = {
  id: "01a06572-95e9-7c3a-97a2-704154644cbf",
  type: "page-type/world-spell",
  slug: "water-pressure-dark-straits",
  title: "Water Pressure — Dark Straits",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
