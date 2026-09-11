import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shockWheel = {
  id: "01a06572-95e0-7dc9-bece-352f27f972db",
  type: "world-spell",
  slug: "shock-wheel",
  title: "Shock Wheel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
