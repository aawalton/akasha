import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lesserTwister = {
  id: "01a06572-95cd-7e75-a612-eb85b0d0312d",
  type: "world-spell",
  slug: "lesser-twister",
  title: "Lesser Twister",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
