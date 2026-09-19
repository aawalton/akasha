import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const completeHopelessness = {
  id: "01a06572-95b9-793c-8c58-4b5f13663b8f",
  type: "page-type/world-spell",
  slug: "complete-hopelessness",
  title: "Complete Hopelessness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
