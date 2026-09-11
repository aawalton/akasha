import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const zoneOfAbsoluteChill = {
  id: "01a06572-95ea-7e1c-ae0b-c960126d66de",
  type: "world-spell",
  slug: "zone-of-absolute-chill",
  title: "Zone of Absolute Chill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
