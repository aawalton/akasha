import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const apistaSJetflame = {
  id: "01a06572-95b4-7ba2-9cda-3e041628dc4e",
  type: "page-type/world-spell",
  slug: "apista-s-jetflame",
  title: "Apista’s Jetflame",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
