import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shockOrb = {
  id: "01a06572-95e0-7a37-9377-47379f631487",
  type: "page-type/world-spell",
  slug: "shock-orb",
  title: "Shock Orb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
