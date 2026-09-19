import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const moveEarth = {
  id: "01a06572-95d9-7e57-bd44-cc51657aa7d4",
  type: "page-type/world-spell",
  slug: "move-earth",
  title: "Move Earth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
