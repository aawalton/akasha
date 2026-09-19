import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hexEater = {
  id: "01a06572-95c8-751f-9241-4449d2f35115",
  type: "page-type/world-spell",
  slug: "hex-eater",
  title: "Hex Eater",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
