import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const metamagicSpellManipulation = {
  id: "01a06572-95d8-71b3-ae30-cdf0f162c4a5",
  type: "page-type/world-spell",
  slug: "metamagic-spell-manipulation",
  title: "Metamagic: Spell Manipulation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
