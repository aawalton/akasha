import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const scryingCeria = {
  id: "01a06572-95de-763f-84cc-2b8639d05971",
  type: "world-spell",
  slug: "scrying-ceria",
  title: "Scrying: Ceria",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
