import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sustainedInvisibility = {
  id: "01a06572-95e4-766f-80c8-75d3bfeff521",
  type: "page-type/world-spell",
  slug: "sustained-invisibility",
  title: "Sustained Invisibility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
