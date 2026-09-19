import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectLies = {
  id: "01a06572-95bd-706f-a2fb-82b261cfdfda",
  type: "page-type/world-spell",
  slug: "detect-lies",
  title: "Detect Lies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
