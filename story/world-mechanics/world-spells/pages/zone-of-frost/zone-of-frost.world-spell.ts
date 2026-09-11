import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const zoneOfFrost = {
  id: "01a06572-95ea-7821-b6af-c8a218c9961e",
  type: "world-spell",
  slug: "zone-of-frost",
  title: "Zone of Frost",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
