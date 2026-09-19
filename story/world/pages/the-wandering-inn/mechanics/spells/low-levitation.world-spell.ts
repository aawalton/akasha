import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lowLevitation = {
  id: "01a06572-95d0-7696-8cf8-e58fbca35c15",
  type: "page-type/world-spell",
  slug: "low-levitation",
  title: "Low Levitation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
