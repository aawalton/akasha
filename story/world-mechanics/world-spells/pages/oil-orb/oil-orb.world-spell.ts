import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const oilOrb = {
  id: "01a06572-95da-764a-b8cb-b469c9d40716",
  type: "world-spell",
  slug: "oil-orb",
  title: "Oil Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
