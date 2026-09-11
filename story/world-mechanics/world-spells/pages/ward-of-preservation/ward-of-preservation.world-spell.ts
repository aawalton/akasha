import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wardOfPreservation = {
  id: "01a06572-95e9-72aa-8d65-172cb4b20c39",
  type: "world-spell",
  slug: "ward-of-preservation",
  title: "Ward of Preservation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
