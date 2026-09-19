import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonLesserFamiliar = {
  id: "01a06572-95e4-7538-b89f-cecd24568fed",
  type: "page-type/world-spell",
  slug: "summon-lesser-familiar",
  title: "Summon Lesser Familiar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
