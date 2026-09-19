import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const glassArrow = {
  id: "01a06572-95c6-7467-ab27-a8785988192c",
  type: "page-type/world-spell",
  slug: "glass-arrow",
  title: "Glass Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
