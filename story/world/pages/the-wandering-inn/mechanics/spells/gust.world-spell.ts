import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gust = {
  id: "01a06572-95c8-70aa-89da-3d81b781806e",
  type: "page-type/world-spell",
  slug: "gust",
  title: "Gust",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
