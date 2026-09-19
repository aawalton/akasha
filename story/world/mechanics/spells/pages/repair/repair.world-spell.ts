import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const repair = {
  id: "01a06572-95dd-7140-82be-b904b3bd6b85",
  type: "page-type/world-spell",
  slug: "repair",
  title: "Repair",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
