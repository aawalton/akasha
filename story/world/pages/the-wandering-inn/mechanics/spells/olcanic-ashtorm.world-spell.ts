import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const olcanicAshtorm = {
  id: "01a06572-95da-70d6-b236-f034a3f97a05",
  type: "page-type/world-spell",
  slug: "olcanic-ashtorm",
  title: "—olcanic Ashtorm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
