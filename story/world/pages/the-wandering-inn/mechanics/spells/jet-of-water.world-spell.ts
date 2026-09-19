import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const jetOfWater = {
  id: "01a06572-95cc-722f-af35-340d81af0685",
  type: "page-type/world-spell",
  slug: "jet-of-water",
  title: "Jet of Water",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
