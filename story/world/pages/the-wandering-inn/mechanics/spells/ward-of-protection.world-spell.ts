import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wardOfProtection = {
  id: "01a06572-95e9-7e91-acb0-b4a99ee24f15",
  type: "page-type/world-spell",
  slug: "ward-of-protection",
  title: "Ward of Protection",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
