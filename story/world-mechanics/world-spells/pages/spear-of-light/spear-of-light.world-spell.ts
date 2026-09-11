import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spearOfLight = {
  id: "01a06572-95e1-7a96-801a-ff65967804dd",
  type: "world-spell",
  slug: "spear-of-light",
  title: "Spear of Light",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
