import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windShield = {
  id: "01a06572-95ea-7ee7-915d-485957f92cbc",
  type: "page-type/world-spell",
  slug: "wind-shield",
  title: "Wind Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
