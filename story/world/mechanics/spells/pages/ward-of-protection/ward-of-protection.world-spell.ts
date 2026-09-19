import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wardOfProtection = {
  id: "01a06572-95e9-7e91-acb0-b4a99ee24f15",
  type: "page-type/world-spell",
  slug: "ward-of-protection",
  title: "Ward of Protection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
