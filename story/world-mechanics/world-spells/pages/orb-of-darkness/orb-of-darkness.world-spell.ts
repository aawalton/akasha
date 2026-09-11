import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const orbOfDarkness = {
  id: "01a06572-95da-7d14-be50-d5794cda0bd8",
  type: "world-spell",
  slug: "orb-of-darkness",
  title: "Orb of Darkness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
