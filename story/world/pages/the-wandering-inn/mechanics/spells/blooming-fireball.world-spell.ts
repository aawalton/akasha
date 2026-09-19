import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bloomingFireball = {
  id: "01a06572-95b6-7a72-a32b-d5b8454b4bb6",
  type: "page-type/world-spell",
  slug: "blooming-fireball",
  title: "Blooming Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
