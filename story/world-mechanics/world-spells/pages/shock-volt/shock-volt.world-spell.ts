import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shockVolt = {
  id: "01a06572-95e0-72dc-b1fc-2287bc31022c",
  type: "world-spell",
  slug: "shock-volt",
  title: "Shock Volt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
