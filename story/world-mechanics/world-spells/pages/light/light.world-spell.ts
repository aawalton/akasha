import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const light = {
  id: "01a06572-95cf-7f7b-a110-132cbf1f3831",
  type: "world-spell",
  slug: "light",
  title: "Light",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
