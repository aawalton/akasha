import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameRay = {
  id: "01a06572-95c3-7a0e-add2-cc3448b72752",
  type: "world-spell",
  slug: "flame-ray",
  title: "Flame Ray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
