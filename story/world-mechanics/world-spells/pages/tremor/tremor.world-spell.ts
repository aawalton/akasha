import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const tremor = {
  id: "01a06572-95e7-7aac-b4b5-99cd99db9630",
  type: "world-spell",
  slug: "tremor",
  title: "Tremor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
