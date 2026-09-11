import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const gravityPaw = {
  id: "01a06572-95c6-7922-9f07-12704ed267e4",
  type: "world-spell",
  slug: "gravity-paw",
  title: "Gravity Paw",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
