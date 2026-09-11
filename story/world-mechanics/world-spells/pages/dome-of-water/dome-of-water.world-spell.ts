import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const domeOfWater = {
  id: "01a06572-95be-787d-95fc-ffe798089cd1",
  type: "world-spell",
  slug: "dome-of-water",
  title: "Dome of Water",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
