import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterHaste = {
  id: "01a06572-95c7-7d29-9986-bd63fac8d23e",
  type: "world-spell",
  slug: "greater-haste",
  title: "Greater Haste",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
