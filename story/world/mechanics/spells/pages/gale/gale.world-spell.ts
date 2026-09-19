import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gale = {
  id: "01a06572-95c6-709c-a2ed-e4f232e182a3",
  type: "page-type/world-spell",
  slug: "gale",
  title: "Gale",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
