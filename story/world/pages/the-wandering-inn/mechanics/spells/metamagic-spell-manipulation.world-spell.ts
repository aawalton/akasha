import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const metamagicSpellManipulation = {
  id: "01a06572-95d8-71b3-ae30-cdf0f162c4a5",
  type: "page-type/world-spell",
  slug: "metamagic-spell-manipulation",
  title: "Metamagic: Spell Manipulation",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.416Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
