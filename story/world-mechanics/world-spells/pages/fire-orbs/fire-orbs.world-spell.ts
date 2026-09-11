import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fireOrbs = {
  id: "01a06572-95c0-77ca-b1bd-c8d9658f4d14",
  type: "world-spell",
  slug: "fire-orbs",
  title: "Fire Orbs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
