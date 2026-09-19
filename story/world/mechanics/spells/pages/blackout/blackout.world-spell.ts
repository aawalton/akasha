import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blackout = {
  id: "01a06572-95b6-76f6-ac18-b8c6978a9058",
  type: "page-type/world-spell",
  slug: "blackout",
  title: "Blackout",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
