import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const communications = {
  id: "01a06572-95b9-752f-99ed-d9a369edbd0e",
  type: "page-type/world-spell",
  slug: "communications",
  title: "Communications",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
