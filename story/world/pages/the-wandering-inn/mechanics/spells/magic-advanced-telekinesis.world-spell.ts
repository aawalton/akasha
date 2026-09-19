import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicAdvancedTelekinesis = {
  id: "01a06572-95d0-725e-8e07-d6933fcb0da6",
  type: "page-type/world-spell",
  slug: "magic-advanced-telekinesis",
  title: "Magic: Advanced Telekinesis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
