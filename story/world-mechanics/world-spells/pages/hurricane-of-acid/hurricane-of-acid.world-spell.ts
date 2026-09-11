import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hurricaneOfAcid = {
  id: "01a06572-95c9-74a2-b799-87195047f98e",
  type: "world-spell",
  slug: "hurricane-of-acid",
  title: "Hurricane of Acid",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
