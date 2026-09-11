import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fireResistance = {
  id: "01a06572-95c0-7b50-88d8-487010ff35f8",
  type: "world-spell",
  slug: "fire-resistance",
  title: "Fire Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
