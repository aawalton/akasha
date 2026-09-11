import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lesserResistance = {
  id: "01a06572-95cd-7896-8655-165e63bb64bb",
  type: "world-spell",
  slug: "lesser-resistance",
  title: "Lesser Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
