import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fireArrow = {
  id: "01a06572-95c0-7064-b139-e2e37643f806",
  type: "world-spell",
  slug: "fire-arrow",
  title: "Fire Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
