import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pebbleshot = {
  id: "01a06572-95da-73da-b17a-ab129e481eaf",
  type: "page-type/world-spell",
  slug: "pebbleshot",
  title: "Pebbleshot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
