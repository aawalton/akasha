import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const temporaryHoldingWater = {
  id: "01a06572-95e6-72ea-8f62-68bbe80ad60e",
  type: "world-spell",
  slug: "temporary-holding-water",
  title: "Temporary Holding: Water",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
