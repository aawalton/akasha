import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wildGrowth = {
  id: "01a06572-95ea-746c-99af-40ced9a11119",
  type: "world-spell",
  slug: "wild-growth",
  title: "Wild Growth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
