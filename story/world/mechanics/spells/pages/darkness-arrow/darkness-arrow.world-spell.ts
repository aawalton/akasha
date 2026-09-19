import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const darknessArrow = {
  id: "01a06572-95bb-728a-9151-40387d324faf",
  type: "page-type/world-spell",
  slug: "darkness-arrow",
  title: "Darkness Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
