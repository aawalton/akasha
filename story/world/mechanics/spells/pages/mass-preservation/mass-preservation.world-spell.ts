import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massPreservation = {
  id: "01a06572-95d2-79f3-ab3f-45ac874be360",
  type: "page-type/world-spell",
  slug: "mass-preservation",
  title: "Mass Preservation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
