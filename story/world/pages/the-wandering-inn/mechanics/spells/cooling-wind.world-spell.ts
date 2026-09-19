import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const coolingWind = {
  id: "01a06572-95bb-723c-bfa7-a5e0f3e8df19",
  type: "page-type/world-spell",
  slug: "cooling-wind",
  title: "Cooling Wind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
