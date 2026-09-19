import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostArrows = {
  id: "01a06572-95c5-7247-a99d-002d6ad0b2fb",
  type: "page-type/world-spell",
  slug: "frost-arrows",
  title: "Frost Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
