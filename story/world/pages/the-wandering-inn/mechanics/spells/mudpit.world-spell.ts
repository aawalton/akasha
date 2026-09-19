import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mudpit = {
  id: "01a06572-95d9-7a71-9b7b-086c1c4669f2",
  type: "page-type/world-spell",
  slug: "mudpit",
  title: "Mudpit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
