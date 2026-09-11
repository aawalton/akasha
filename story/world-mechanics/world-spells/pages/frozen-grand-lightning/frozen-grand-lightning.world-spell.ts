import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frozenGrandLightning = {
  id: "01a06572-95c5-728e-adf0-06e449fbd93a",
  type: "world-spell",
  slug: "frozen-grand-lightning",
  title: "Frozen Grand Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
