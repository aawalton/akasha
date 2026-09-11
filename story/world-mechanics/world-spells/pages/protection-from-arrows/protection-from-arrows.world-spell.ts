import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const protectionFromArrows = {
  id: "01a06572-95db-78f1-be53-ea80eda12c73",
  type: "world-spell",
  slug: "protection-from-arrows",
  title: "Protection from Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
