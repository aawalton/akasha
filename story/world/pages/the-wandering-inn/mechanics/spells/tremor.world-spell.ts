import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const tremor = {
  id: "01a06572-95e7-7aac-b4b5-99cd99db9630",
  type: "page-type/world-spell",
  slug: "tremor",
  title: "Tremor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
