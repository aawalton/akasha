import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const powerfulDigestion = {
  id: "01a06572-95db-77d5-8884-028e616e2987",
  type: "page-type/world-spell",
  slug: "powerful-digestion",
  title: "Powerful Digestion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
