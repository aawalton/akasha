import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rainOfFrozenTears = {
  id: "01a06572-95dc-7f7e-a5c5-f6dd799d16bc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "rain-of-frozen-tears",
  title: "Rain of Frozen Tears",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
