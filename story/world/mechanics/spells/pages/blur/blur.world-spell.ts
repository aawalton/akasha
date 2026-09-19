import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blur = {
  id: "01a06572-95b6-7c5a-99d2-2a134bc6bf9a",
  type: "page-type/world-spell",
  slug: "blur",
  title: "Blur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
