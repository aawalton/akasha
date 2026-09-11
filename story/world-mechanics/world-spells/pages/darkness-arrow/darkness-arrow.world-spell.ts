import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const darknessArrow = {
  id: "01a06572-95bb-728a-9151-40387d324faf",
  type: "world-spell",
  slug: "darkness-arrow",
  title: "Darkness Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
