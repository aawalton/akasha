import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const firespray = {
  id: "01a06572-95c2-7fc2-8961-1f653bf1c7ba",
  type: "world-spell",
  slug: "firespray",
  title: "Firespray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
