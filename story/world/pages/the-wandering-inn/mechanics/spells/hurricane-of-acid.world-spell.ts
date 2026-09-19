import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hurricaneOfAcid = {
  id: "01a06572-95c9-74a2-b799-87195047f98e",
  type: "page-type/world-spell",
  slug: "hurricane-of-acid",
  title: "Hurricane of Acid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
