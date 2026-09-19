import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spearsOfLight = {
  id: "01a06572-95e1-7702-944b-475f13d4afc5",
  type: "page-type/world-spell",
  slug: "spears-of-light",
  title: "Spears of Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
