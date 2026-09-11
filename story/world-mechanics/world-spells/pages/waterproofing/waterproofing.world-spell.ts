import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterproofing = {
  id: "01a06572-95e9-7aa5-80bf-1e298a03248a",
  type: "world-spell",
  slug: "waterproofing",
  title: "Waterproofing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
