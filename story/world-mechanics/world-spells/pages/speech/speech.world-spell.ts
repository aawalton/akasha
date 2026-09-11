import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const speech = {
  id: "01a06572-95e2-7bdd-a65f-f435a354cf02",
  type: "world-spell",
  slug: "speech",
  title: "Speech",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
