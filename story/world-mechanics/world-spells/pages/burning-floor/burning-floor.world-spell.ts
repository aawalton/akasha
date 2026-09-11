import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const burningFloor = {
  id: "01a06572-95b8-70f1-9162-209269509aa6",
  type: "world-spell",
  slug: "burning-floor",
  title: "Burning Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
