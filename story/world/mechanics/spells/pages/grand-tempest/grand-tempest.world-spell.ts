import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandTempest = {
  id: "01a06572-95c6-75ba-9871-0c77490e5ef8",
  type: "page-type/world-spell",
  slug: "grand-tempest",
  title: "Grand Tempest",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
