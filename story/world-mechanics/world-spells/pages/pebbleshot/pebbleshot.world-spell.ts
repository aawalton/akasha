import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pebbleshot = {
  id: "01a06572-95da-73da-b17a-ab129e481eaf",
  type: "world-spell",
  slug: "pebbleshot",
  title: "Pebbleshot",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
