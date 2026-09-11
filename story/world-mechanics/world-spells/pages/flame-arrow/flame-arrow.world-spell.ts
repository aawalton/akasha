import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameArrow = {
  id: "01a06572-95c3-702a-9f97-209b1c44947c",
  type: "world-spell",
  slug: "flame-arrow",
  title: "Flame Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
