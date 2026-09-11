import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const handOfTheSpectralGiant = {
  id: "01a06572-95c8-7928-9bf6-8a4a2479581a",
  type: "world-spell",
  slug: "hand-of-the-spectral-giant",
  title: "Hand of the Spectral Giant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
