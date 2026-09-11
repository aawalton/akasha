import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const seeHeat = {
  id: "01a06572-95df-7219-87b8-e1ac26ca9c0a",
  type: "world-spell",
  slug: "see-heat",
  title: "See Heat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
