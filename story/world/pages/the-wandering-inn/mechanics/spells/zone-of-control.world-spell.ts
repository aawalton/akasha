import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const zoneOfControl = {
  id: "01a06572-95ea-7f94-876d-1b603f227199",
  type: "page-type/world-spell",
  slug: "zone-of-control",
  title: "Zone of Control",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
