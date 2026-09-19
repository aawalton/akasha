import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const regeneration = {
  id: "01a06572-95dc-7ac6-980b-a1f4d334f4cf",
  type: "page-type/world-spell",
  slug: "regeneration",
  title: "Regeneration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
