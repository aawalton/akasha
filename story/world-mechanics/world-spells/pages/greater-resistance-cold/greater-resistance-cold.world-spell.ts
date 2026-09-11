import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterResistanceCold = {
  id: "01a06572-95c7-7b39-b457-9c4af9676b7d",
  type: "world-spell",
  slug: "greater-resistance-cold",
  title: "Greater Resistance: Cold",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
