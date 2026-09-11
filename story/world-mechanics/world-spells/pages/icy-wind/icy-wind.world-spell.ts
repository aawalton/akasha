import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const icyWind = {
  id: "01a06572-95cb-74c0-a9d2-c24a45533349",
  type: "world-spell",
  slug: "icy-wind",
  title: "Icy Wind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
