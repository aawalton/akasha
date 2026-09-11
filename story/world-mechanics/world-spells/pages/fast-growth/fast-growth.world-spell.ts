import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fastGrowth = {
  id: "01a06572-95c0-72c9-be3c-d91c6f6add44",
  type: "world-spell",
  slug: "fast-growth",
  title: "Fast Growth",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
