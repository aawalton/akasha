import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const coolingBreeze = {
  id: "01a06572-95ba-723c-b0f6-88e6d182c8ca",
  type: "page-type/world-spell",
  slug: "cooling-breeze",
  title: "Cooling Breeze",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
