import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const crossFlameblast = {
  id: "01a06572-95bb-7ef3-abc1-d9ba81d18162",
  type: "page-type/world-spell",
  slug: "cross-flameblast",
  title: "Cross Flameblast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
