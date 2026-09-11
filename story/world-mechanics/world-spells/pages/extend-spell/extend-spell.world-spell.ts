import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const extendSpell = {
  id: "01a06572-95bf-796f-ae6e-5a07e8988084",
  type: "world-spell",
  slug: "extend-spell",
  title: "Extend Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
