import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const completeHush = {
  id: "01a06572-95b9-77a3-a116-94633e06b32c",
  type: "page-type/world-spell",
  slug: "complete-hush",
  title: "Complete Hush",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
