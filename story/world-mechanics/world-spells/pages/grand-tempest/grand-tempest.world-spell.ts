import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const grandTempest = {
  id: "01a06572-95c6-75ba-9871-0c77490e5ef8",
  type: "world-spell",
  slug: "grand-tempest",
  title: "Grand Tempest",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
