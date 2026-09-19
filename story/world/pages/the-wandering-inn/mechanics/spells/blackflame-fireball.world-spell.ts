import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blackflameFireball = {
  id: "01a06572-95b6-76db-a96d-98683e518148",
  type: "page-type/world-spell",
  slug: "blackflame-fireball",
  title: "Blackflame Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
