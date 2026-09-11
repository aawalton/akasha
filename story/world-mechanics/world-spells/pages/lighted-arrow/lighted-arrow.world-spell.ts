import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightedArrow = {
  id: "01a06572-95cf-7fc7-aef0-b4c120b72e9c",
  type: "world-spell",
  slug: "lighted-arrow",
  title: "Lighted Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
