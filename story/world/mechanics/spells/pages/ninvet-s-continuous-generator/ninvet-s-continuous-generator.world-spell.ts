import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ninvetSContinuousGenerator = {
  id: "01a06572-95d9-7cb8-ac4f-122fa3163c21",
  type: "page-type/world-spell",
  slug: "ninvet-s-continuous-generator",
  title: "Ninvet’s Continuous Generator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
