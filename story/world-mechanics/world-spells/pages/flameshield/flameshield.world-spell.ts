import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameshield = {
  id: "01a06572-95c3-7e9a-8a36-44f7ea4af220",
  type: "world-spell",
  slug: "flameshield",
  title: "Flameshield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
