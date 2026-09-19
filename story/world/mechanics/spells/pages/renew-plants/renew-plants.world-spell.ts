import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const renewPlants = {
  id: "01a06572-95dd-7ccc-88b6-8718e396e249",
  type: "page-type/world-spell",
  slug: "renew-plants",
  title: "Renew Plants",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
