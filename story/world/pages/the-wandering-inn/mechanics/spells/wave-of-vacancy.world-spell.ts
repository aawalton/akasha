import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waveOfVacancy = {
  id: "01a06572-95e9-7b09-b372-4ecaeb5c155e",
  type: "page-type/world-spell",
  slug: "wave-of-vacancy",
  title: "Wave of Vacan—",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
