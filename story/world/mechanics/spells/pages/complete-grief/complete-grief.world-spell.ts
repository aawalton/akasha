import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const completeGrief = {
  id: "01a06572-95b9-727d-b2e6-47280c5dd320",
  type: "page-type/world-spell",
  slug: "complete-grief",
  title: "Complete Grief",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
